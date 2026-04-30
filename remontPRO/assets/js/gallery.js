const lightbox = document.getElementById('galleryLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxCounter = document.getElementById('lightboxCounter');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

const cards = Array.from(document.querySelectorAll('.photo-card'));
let activeIndex = 0;

function renderLightbox(index) {
  if (!cards.length) return;
  activeIndex = (index + cards.length) % cards.length;
  const card = cards[activeIndex];

  lightboxTitle.textContent = card.dataset.title || 'Realizacja';
  lightboxDesc.textContent = card.dataset.desc || 'Opis realizacji.';
  lightboxImage.src = card.dataset.src || '';
  lightboxImage.alt = card.dataset.title || 'Podgląd realizacji';
  lightboxCounter.textContent = `${activeIndex + 1} / ${cards.length}`;
}

function openLightbox(index) {
  renderLightbox(index);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  lightboxImage.src = '';
}

cards.forEach((card, index) => {
  card.addEventListener('click', () => openLightbox(index));
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => renderLightbox(activeIndex - 1));
nextBtn.addEventListener('click', () => renderLightbox(activeIndex + 1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') renderLightbox(activeIndex - 1);
  if (e.key === 'ArrowRight') renderLightbox(activeIndex + 1);
});
