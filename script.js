(() => {
  const scenes = [...document.querySelectorAll('.scene')];
  const topbar = document.getElementById('topbar');
  const navigation = document.getElementById('navigation');
  const label = document.getElementById('chapter-label');
  const dots = document.getElementById('dots');
  const audio = document.getElementById('music');
  let current = 0;
  let musicOn = false;

  function showScene(index) {
    current = Math.max(0, Math.min(index, scenes.length - 1));
    scenes.forEach((scene, i) => {
      scene.classList.toggle('active', i === current);
      if (i === current) scene.scrollTop = 0;
    });
    topbar.hidden = current === 0;
    navigation.hidden = current === 0;
    label.textContent = `${String(current + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;
    [...dots.children].forEach((dot, i) => dot.classList.toggle('current', i === current));
    document.getElementById('previous').disabled = current === 0;
    document.getElementById('next').disabled = current === scenes.length - 1;
  }

  scenes.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Buka bagian ${i + 1}`);
    dot.addEventListener('click', () => showScene(i));
    dots.appendChild(dot);
  });

  document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', async () => {
    if (!musicOn) {
      try { audio.volume = 0.24; await audio.play(); musicOn = true; document.getElementById('music-toggle').textContent = '♫'; }
      catch { /* Audio may be unavailable; the card still works without it. */ }
    }
    showScene(current + 1);
  }));
  document.getElementById('previous').addEventListener('click', () => showScene(current - 1));
  document.getElementById('next').addEventListener('click', () => showScene(current + 1));
  document.getElementById('home').addEventListener('click', () => showScene(0));
  document.getElementById('restart').addEventListener('click', () => showScene(0));
  document.getElementById('music-toggle').addEventListener('click', async event => {
    if (musicOn) { audio.pause(); musicOn = false; event.currentTarget.textContent = '♪'; }
    else { try { await audio.play(); musicOn = true; event.currentTarget.textContent = '♫'; } catch { event.currentTarget.textContent = '♪'; } }
  });
  document.getElementById('save-button').addEventListener('click', event => {
    document.getElementById('saved-note').hidden = false;
    event.currentTarget.textContent = 'Tersimpan dengan cinta ✓';
    event.currentTarget.disabled = true;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') showScene(current + 1);
    if (event.key === 'ArrowLeft') showScene(current - 1);
  });
})();
