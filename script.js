let musicPlayed = false;
const bgMusic = document.getElementById('bg-music');

// Play Music & Change Scene
function nextScene(index) {
    if (!musicPlayed) {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(e => console.log("Autoplay dicegah browser."));
        musicPlayed = true;
    }
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById('scene-' + index).classList.add('active');
}

// SCENE 0: The Blooming Bud Logic
const bud = document.getElementById('the-bud');
let holdTimer;

function startBloom(e) {
    e.preventDefault();
    bud.classList.add('bud-blooming');
    document.getElementById('hold-instruction').innerText = "Tahan terus...";
    
    holdTimer = setTimeout(() => {
        bud.innerText = "🌸"; // Berubah jadi mekar
        document.getElementById('hold-instruction').style.display = "none";
        document.getElementById('op-title').classList.add('show-text');
        document.getElementById('op-sub').classList.add('show-text');
        document.getElementById('op-desc').classList.add('show-text');
        document.getElementById('btn-scene1').classList.add('show-text');
    }, 1500); // 1.5 detik ditahan
}

function stopBloom() {
    clearTimeout(holdTimer);
    if (bud.innerText !== "🌸") {
        bud.classList.remove('bud-blooming');
        document.getElementById('hold-instruction').innerText = "Sentuh dan tahan kuncup ini...";
    }
}

bud.addEventListener('mousedown', startBloom);
bud.addEventListener('touchstart', startBloom);
window.addEventListener('mouseup', stopBloom);
window.addEventListener('touchend', stopBloom);


// SCENE 1: Blooming Stats
let statsBloomed = 0;
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

// SCENE 2: Fireflies Memories
const memories = [
    "Mengingat malam-malam revisi skripsi yang melelahkan dan bikin kamu ragu...",
    "Mengingat rasa gugup yang luar biasa sebelum masuk ruang sidang waktu itu...",
    "Dan melihatmu hari ini, memakai toga kebanggaan itu dengan senyum lega...",
    "Rasanya semua usahamu terbayar lunas. Kamu membuktikan kalau kamu bisa."
];

let firefliesCaught = 0;
const fireflyArea = document.getElementById('firefly-area');

function createFireflies() {
    const positions = [
        {top: '10%', left: '10%'}, {top: '60%', left: '70%'},
        {top: '20%', left: '80%'}, {top: '70%', left: '20%'}
    ];
    
    memories.forEach((mem, i) => {
        let f = document.createElement('div');
        f.className = 'firefly';
        f.style.top = positions[i].top;
        f.style.left = positions[i].left;
        f.style.animationDelay = (i * 0.5) + 's';
        
        let text = document.createElement('span');
        text.className = 'firefly-text';
        text.innerText = mem;
        f.appendChild(text);
        
        f.onclick = function() {
            if(!this.classList.contains('caught')) {
                this.classList.add('caught');
                this.style.top = (i * 25) + '%'; // Susun rapi ke bawah
                this.style.left = '0';
                firefliesCaught++;
                if(firefliesCaught === 4) {
                    document.getElementById('btn-scene3').style.display = "inline-block";
                }
            }
        };
        fireflyArea.appendChild(f);
    });
}


// SCENE 3: Written by the Stars
let letterWritten = false;
function writeLetter() {
    if(letterWritten) return;
    letterWritten = true;
    document.getElementById('star-instruction').style.display = "none";
    
    const lines = document.querySelectorAll('.letter-line');
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('revealed');
        }, index * 1200); // Muncul perlahan per baris
    });

    setTimeout(() => {
        document.getElementById('btn-scene4').style.display = "inline-block";
    }, lines.length * 1200);
}


// SCENE 4: Fly Lantern
function flyLantern() {
    document.getElementById('btn-fly').style.display = "none";
    document.getElementById('lantern').classList.add('fly-away');
    setTimeout(() => {
        document.getElementById('save-msg').style.opacity = '1';
    }, 1500);
}


// BG Stars Generator
window.onload = () => {
    createFireflies();
    const container = document.getElementById('stars-container');
    for (let i = 0; i < 25; i++) {
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
};