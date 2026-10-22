// Memainkan musik pada klik pertama
let musicPlayed = false;
const bgMusic = document.getElementById('bg-music');

// Fungsi Pindah Scene
function nextScene(sceneIndex) {
    // Putar musik jika belum
    if (!musicPlayed) {
        bgMusic.volume = 0.4; // Volume lembut
        bgMusic.play().catch(e => console.log("Autoplay dicegah browser, perlu interaksi pengguna."));
        musicPlayed = true;
    }

    // Sembunyikan semua scene
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => {
        scene.classList.remove('active');
    });

    // Tampilkan scene yang dituju
    const nextSceneEl = document.getElementById('scene-' + sceneIndex);
    if (nextSceneEl) {
        nextSceneEl.classList.add('active');
    }
}

// Logika Kartu Interaktif (The Retrospective)
let cardsFlipped = 0;
const totalCards = 4;

function flipCard(cardElement) {
    if (!cardElement.classList.contains('flipped')) {
        cardElement.classList.add('flipped');
        cardsFlipped++;
        
        // Munculkan tombol baca surat jika semua memori sudah dibaca
        if (cardsFlipped === totalCards) {
            document.getElementById('btn-to-letter').style.display = 'inline-block';
        }
    }
}

// Logika Membuka Surat
function openLetter() {
    const envelope = document.getElementById('envelope');
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        
        // Munculkan tombol ke closing setelah jeda membaca (3 detik)
        setTimeout(() => {
            const btnClosing = document.getElementById('btn-to-closing');
            btnClosing.style.display = 'inline-block';
            // Sedikit delay agar transisi display block ke opacity berjalan
            setTimeout(() => {
                btnClosing.style.opacity = '1';
            }, 100);
        }, 3000);
    }
}

// Logika Simpan Momen (Closing)
function saveMoment() {
    const msgEl = document.getElementById('save-msg');
    msgEl.innerHTML = "Momen tersimpan di hati. ✨<br>Selamat istirahat, Graduate!";
    msgEl.style.opacity = '1';
}

// Logika Membuat Bintang Latar Belakang (Ringan)
function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 20; // Dibatasi 20 agar tidak memberatkan laptop 4GB

    for (let i = 0; i < starCount; i++) {
        let star = document.createElement('div');
        star.classList.add('star');
        
        // Ukuran random (1px - 3px)
        let size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Posisi random
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        
        // Durasi kelap-kelip random (1.5s - 4s)
        star.style.animationDuration = (Math.random() * 2.5 + 1.5) + 's';
        // Delay random agar tidak berkedip bersamaan
        star.style.animationDelay = (Math.random() * 2) + 's';
        
        container.appendChild(star);
    }
}

// Jalankan pembuatan bintang saat halaman dimuat
window.onload = () => {
    createStars();
};