// Scroll suave (ya existente)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Popup Año Nuevo (aparece siempre al cargar)
window.addEventListener('load', showNewYearPopup);

function showNewYearPopup() {
  const popup = document.getElementById('newYearPopup');
  popup.style.display = 'flex';

  createFallingConfetti();
  createSideConfetti();

  // Cerrar con botón o clic afuera
  document.querySelector('.close-popup').onclick = closeNewYearPopup;
  popup.onclick = function(e) {
    if (e.target === popup) closeNewYearPopup();
  };
}

function closeNewYearPopup() {
  const popup = document.getElementById('newYearPopup');
  popup.style.animation = 'fadeOut 0.6s ease-out';
  setTimeout(() => {
    popup.style.display = 'none';
    popup.style.animation = '';
    document.querySelectorAll('.confetti, .side-confetti').forEach(el => el.remove());
  }, 600);
}

function createFallingConfetti() {
  const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#a78bfa', '#ff9ff3', '#54a0ff'];
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 8000);
  }
}

function createSideConfetti() {
  const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#a78bfa', '#ff9ff3'];
  const popupContent = document.querySelector('.popup-content');

  // Lado izquierdo
  for (let i = 0; i < 30; i++) {
    const c = document.createElement('div');
    c.className = 'side-confetti';
    c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    c.style.left = '8%';
    c.style.top = Math.random() * 80 + 10 + '%';
    c.style.setProperty('--dx', (Math.random() * 250 + 150) + 'px');
    c.style.setProperty('--dy', (Math.random() * 200 - 100) + 'px');
    c.style.animationDelay = Math.random() * 0.8 + 's';
    popupContent.appendChild(c);
  }

  // Lado derecho
  for (let i = 0; i < 30; i++) {
    const c = document.createElement('div');
    c.className = 'side-confetti';
    c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    c.style.right = '8%';
    c.style.left = 'auto';
    c.style.top = Math.random() * 80 + 10 + '%';
    c.style.setProperty('--dx', -(Math.random() * 250 + 150) + 'px');
    c.style.setProperty('--dy', (Math.random() * 200 - 100) + 'px');
    c.style.animationDelay = Math.random() * 0.8 + 0.5 + 's';
    popupContent.appendChild(c);
  }
}
