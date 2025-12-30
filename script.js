// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Helper: escapar HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Reseñas
const reviewsList = document.getElementById('reviews-list');
const submitBtn = document.getElementById('submit-review');
const nameInput = document.getElementById('review-name');
const messageInput = document.getElementById('review-message');
const stars = document.querySelectorAll('.star');
let selectedRating = 5;

// Seleccionar calificación
stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-value'));
    stars.forEach(s => {
      s.textContent = '☆';
      if (parseInt(s.getAttribute('data-value')) <= selectedRating) {
        s.textContent = '★';
        s.classList.add('selected');
      } else {
        s.classList.remove('selected');
      }
    });
  });
});

// Renderizar reseña
function addReviewToDOM(review) {
  const div = document.createElement('div');
  div.classList.add('review-item');
  const starsHTML = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
  div.innerHTML = `
    <h4>${escapeHtml(review.name)} <span class="review-stars">${starsHTML}</span></h4>
    <p>${escapeHtml(review.message)}</p>
    <div class="review-date">${new Date(review.date).toLocaleDateString('es-CO')}</div>
  `;
  reviewsList.prepend(div);
}

// Cargar reseñas
function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('alejoReviews') || '[]');
  reviewsList.innerHTML = '';
  reviews.slice(0, 20).forEach(addReviewToDOM);
}

// Enviar reseña
submitBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) {
    alert('Por favor, completa tu nombre y comentario.');
    return;
  }

  const newReview = {
    name,
    message,
    rating: selectedRating,
    date: new Date().toISOString()
  };

  let reviews = JSON.parse(localStorage.getItem('alejoReviews') || '[]');
  reviews.unshift(newReview);
  reviews = reviews.slice(0, 20); // Máximo 20
  localStorage.setItem('alejoReviews', JSON.stringify(reviews));

  // Reset
  nameInput.value = '';
  messageInput.value = '';
  selectedRating = 5;
  stars.forEach(s => {
    s.textContent = parseInt(s.getAttribute('data-value')) <= 5 ? '★' : '☆';
    s.classList.toggle('selected', parseInt(s.getAttribute('data-value')) <= 5);
  });

  addReviewToDOM(newReview);
});

// Iniciar
loadReviews();