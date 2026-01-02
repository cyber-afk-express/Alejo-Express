// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Countdown hasta Día de Reyes (6 enero 2026 00:00:00)
const reyesDate = new Date('2026-01-06T00:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = reyesDate - now;

  if (distance < 0) {
    document.getElementById('countdown').innerHTML = '<p style="font-size:1.5rem; color:#dc2626;">¡Feliz Día de Reyes! 👑🎉</p>';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Actualiza cada segundo
setInterval(updateCountdown, 1000);

// Primera ejecución inmediata
updateCountdown();
