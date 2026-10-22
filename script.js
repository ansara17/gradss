let musicPlayed = false;
let holdTimer;
let statsBloomed = 0;
let firefliesCaught = 0;
let clickedFireflies = new Set();
let letterWritten = false;

// Tunggu sampai HTML benar-benar termuat di HP
document.addEventListener("DOMContentLoaded", () => {
    // Registrasi Event Listener Bunga dengan aman
    const bud = document.getElementById('the-bud');
    if(bud) {
        bud.addEventListener('mousedown', startBloom);
        bud.addEventListener('touchstart', startBloom, { passive: true });
        window.addEventListener('mouseup', stopBloom);
        window.addEventListener('touchend', stopBloom);
    }

    createFireflies();
    createStars();
});

function nextScene(index) {
    if (!musicPlayed) {
        const bgMusic = document.getElementById('bg-music');
        if(bgMusic) {
            bgMusic.volume = 0.4;
            bgMusic.play().catch(e => console.log("Menunggu interaksi pengguna untuk audio."));
        }
        musicPlayed = true;
    }
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById('scene-' + index).classList.add('active');
}

function startBloom() {
    const bud = document.getElementById('the-bud');
    if(!bud) return;
    
    bud.classList.add('bud-blooming');
    document.getElementById('hold-instruction').innerText = "Tahan terus...";
    
    holdTimer = setTimeout(() => {
        bud.innerText = "🌸"; 
        document.getElementById('hold-instruction').style.display = "none";
        document.getElementById('op-title').classList.add('show-text');
        document.getElementById('op-sub').classList.add('show-text');
        document.getElementById('op-desc').classList.add('show-text');
        document.getElementById('btn-scene1').classList.add('show-text');
    }, 1500);
}

function stopBloom() {
    clearTimeout(holdTimer);
    const bud = document.getElementById('the-bud');
    if (bud && bud.innerText !== "🌸") {
        bud.classList.remove('bud-blooming');
        document.getElementById('hold-instruction').innerText = "Sentuh dan tahan kuncup ini...";
    }
}

function bloomStat(element, text) {
    if (!element.classList.contains('bloomed')) {
        element.classList.add('bloomed');
        element.querySelector('.bud-icon').innerText = "🌸";
        element.querySelector('.stat-text').innerText = text;
        statsBloomed++;
        if (statsBloomed === 3) {
            document.getElementById('btn-scene2').style.display = "inline-block";
        }
    }
}

function createFireflies() {
    const memories = [
        "Mengingat malam-malam revisi skripsi yang melelahkan dan sering bikin kamu ragu...",
        "Mengingat rasa gugup yang luar biasa sebelum masuk ruang sidang waktu itu...",
        "Dan melihatmu hari ini, memakai toga kebanggaan itu dengan senyum paling lega...",
        "Rasanya semua usahamu terbayar lunas. Kamu membuktikan kalau kamu bisa."
    ];
    const fireflyArea = document.getElementById('firefly-area');
    if(!fireflyArea) return;

    const positions = [
        {top: '15%', left: '20%'}, 
        {top: '75%', left: '80%'},
        {top: '40%', left: '85%'}, 
        {top: '60%', left: '15%'}
    ];
    
    memories.forEach((mem, i) => {
        let f = document.createElement('div');
        f.className = 'firefly';
        f.style.top = positions[i].top;
        f.style.left = positions[i].left;
        f.style.animationDelay = (i * 0.7) + 's';
        
        f.onclick = function() {
            if(!clickedFireflies.has(i)) {
                clickedFireflies.add(i);
                this.style.opacity = '0';
                this.style.pointerEvents = 'none';
                
                document.getElementById('memory-text').innerText = mem;
                document.getElementById('memory-modal').classList.add('show');
                
                firefliesCaught++;
                if(firefliesCaught === 4) {
                    document.getElementById('firefly-instruction').innerText = "Semua ingatan telah terkumpul.";
                    document.getElementById('btn-scene3').style.display = "inline-block";
                }
            }
        };
        fireflyArea.appendChild(f);
    });
}

function closeMemory() {
    document.getElementById('memory-modal').classList.remove('show');
}

function writeLetter() {
    if(letterWritten) return;
    letterWritten = true;
    document.getElementById('star-instruction').style.opacity = "0";
    
    const lines = document.querySelectorAll('.letter-line');
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('revealed');
        }, index * 1500); 
    });

    setTimeout(() => {
        document.getElementById('btn-scene4').style.display = "inline-block";
    }, lines.length * 1500);
}

function flyLantern() {
    document.getElementById('btn-fly').style.display = "none";
    document.getElementById('lantern').classList.add('fly-away');
    setTimeout(() => {
        document.getElementById('save-msg').style.opacity = '1';
    }, 2000);
}

function createStars() {
    const container = document.getElementById('stars-container');
    if(!container) return;
    for (let i = 0; i < 30; i++) {
        let star = document.createElement('div');
        star.classList.add('star-bg');
        let size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = (Math.random() * 2) + 's';
        container.appendChild(star);
    }
}