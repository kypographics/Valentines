// Nav Logic
function show(id) {
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + id).classList.add('active');
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Letter Logic
function revealLetter() {
    const card = document.getElementById('letter-open');
    const placeholder = document.getElementById('letter-closed');
    placeholder.classList.add('hidden');
    card.classList.remove('hidden');
    setTimeout(() => card.classList.add('visible'), 10);
}

function hideLetter() {
    const card = document.getElementById('letter-open');
    const placeholder = document.getElementById('letter-closed');
    card.classList.remove('visible');
    setTimeout(() => {
        card.classList.add('hidden');
        placeholder.classList.remove('hidden');
    }, 800);
}

// === BLOOM & FIREWORKS LOGIC ===
let hasBloomed = false;

function startBloom() {
    if (hasBloomed) return; // prevent double clicks
    hasBloomed = true;
    
    // 1. Start Flower Animation
    document.getElementById('garden').classList.add('is-blooming');
    document.getElementById('bloomBtn').style.opacity = '0'; // Hide button

    // 2. Schedule Fireworks Finale (4 seconds later)
    setTimeout(() => {
        launchFireworksFinale();
    }, 4000);
}

function launchFireworksFinale() {
    // Launch 5 bursts randomly across the screen
    for(let i=0; i<5; i++) {
        setTimeout(() => {
            const x = 20 + Math.random() * 60; // random position between 20% and 80% width
            const y = 30 + Math.random() * 40; // random height
            createExplosion(x, y);
        }, i * 800); // stagger them every 800ms
    }
}

function createExplosion(xPos, yPos) {
    const container = document.getElementById('fireworks-container');
    const colors = ['#ff4d6d', '#ff9933', '#ffffff', '#ffd700', '#ff0055'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.style.backgroundColor = color;
        particle.style.color = color; // for box-shadow
        
        // Position Center of explosion
        particle.style.left = xPos + 'vw';
        particle.style.top = yPos + 'vh';

        // Calculate random angle and distance for explosion velocity
        const angle = Math.random() * Math.PI * 2;
        const velocity = 10 + Math.random() * 20; // Explosion radius
        const vx = Math.cos(angle) * velocity + 'vw';
        const vy = Math.sin(angle) * velocity + 'vh';

        // Set custom variables for CSS animation
        particle.style.setProperty('--vx', vx);
        particle.style.setProperty('--vy', vy);

        container.appendChild(particle);

        // Clean up particle after animation
        setTimeout(() => particle.remove(), 1500);
    }
}

// === BACKGROUND GENERATORS ===

// Generate Garden with Leaves
function initGarden() {
    const garden = document.getElementById('garden');
    const colors = ['#ff4d6d', '#ff85a1', '#ffb3c1', '#ff92a9'];
    
    for(let i = 0; i < 7; i++) {
        const height = 220 + Math.random() * 80;
        const color = colors[i % colors.length];
        const delay = i * 0.2;
        const leafY1 = 200 - (height - 50) * 0.4;
        const leafY2 = 200 - (height - 50) * 0.7;

        const tulip = `
            <svg class="tulip-svg" viewBox="0 0 100 200" style="height: ${height}px;">
                <path class="stem" d="M50,200 Q${45 + Math.random()*10},150 50,50" style="transition-delay: ${delay}s"></path>
                <path class="leaf leaf-left" d="M50,${leafY1} Q30,${leafY1 - 30} 35,${leafY1 - 60}" style="transition-delay: ${delay + 0.5}s"></path>
                <path class="leaf leaf-right" d="M50,${leafY2} Q70,${leafY2 - 30} 65,${leafY2 - 60}" style="transition-delay: ${delay + 1.0}s"></path>
                <g class="flower-head" style="transition-delay: ${delay + 1.5}s; animation-delay: ${delay + 2}s">
                    <ellipse cx="50" cy="45" rx="20" ry="30" fill="${color}"></ellipse>
                    <ellipse cx="35" cy="50" rx="15" ry="25" fill="${color}" opacity="0.9" transform="rotate(-15 35 50)"></ellipse>
                    <ellipse cx="65" cy="50" rx="15" ry="25" fill="${color}" opacity="0.9" transform="rotate(15 65 50)"></ellipse>
                </g>
            </svg>
        `;
        garden.innerHTML += tulip;
    }
}

// Falling Petals
function createPetals() {
    const container = document.getElementById('petal-container');
    for (let i = 0; i < 20; i++) {
        let petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 10 + 5;
        petal.style.width = size + 'px'; petal.style.height = size + 'px';
        petal.style.animationDuration = Math.random() * 5 + 8 + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(petal);
    }
}

// Sky Lanterns
function createLanterns() {
    const container = document.getElementById('lantern-container');
    for (let i = 0; i < 18; i++) {
        let lantern = document.createElement('div');
        lantern.className = 'lantern';
        lantern.style.left = Math.random() * 100 + 'vw';
        lantern.style.animationDuration = Math.random() * 15 + 20 + 's'; 
        lantern.style.animationDelay = Math.random() * 20 + 's';
        container.appendChild(lantern);
    }
}

initGarden();
createPetals();
createLanterns();