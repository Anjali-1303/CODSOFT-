const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const themeBtn = document.getElementById('themeBtn');
const infoBtn = document.getElementById('infoBtn');
const modal = document.getElementById('infoModal');
const closeModal = document.querySelector('.close');
let input = '';
let resultShown = false;
let darkMode = false;
let lastPressTime = 0;
// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    //  glow effect
    const now = Date.now();
    if (now - lastPressTime < 300) {
      button.style.animation = 'comboGlow 0.3s ease';
      setTimeout(() => (button.style.animation = ''), 300);
    }
    lastPressTime = now;
    if (value === 'C') {
      input = '';
      display.textContent = '0';
    } else if (value === '⌫') {
      input = input.slice(0, -1);
      display.textContent = input || '0';
    } else if (value === '=') {
      try {
        // evaluate + - * / % *
        let res = Function(`"use strict"; return (${input})`)();
        display.textContent = res;
        input = res.toString();
        resultShown = true;
        spawnParticles();
      } catch {
        display.textContent = 'Error';
        input = '';
      }
    } else {
      if (resultShown && !isNaN(value)) {
        input = '';
        resultShown = false;
      }
      input += value;
      display.textContent = input;
    }
  });
});
// Theme toggle
themeBtn.addEventListener('click', () => {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-theme', darkMode);
});
// Modal open/close
infoBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target == modal) modal.style.display = 'none';
});
// Particle explosion effect
function spawnParticles() {
  const calc = document.querySelector('.calculator');
  const rect = calc.getBoundingClientRect();
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('span');
    particle.classList.add('particle');
    particle.style.left = `${rect.width / 2}px`;
    particle.style.top = `50px`;
    const dx = (Math.random() - 0.5) * 200;
    const dy = (Math.random() - 0.5) * 200;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    particle.style.background = color;
    calc.appendChild(particle);
    let start = null;
    const duration = 800;
    function animate(time) {
      if (!start) start = time;
      const progress = (time - start) / duration;
      if (progress < 1) {
        particle.style.transform = `translate(${dx * progress}px, ${dy * progress}px) scale(${1 - progress})`;
        particle.style.opacity = `${1 - progress}`;
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    }
    requestAnimationFrame(animate);
  }
}
