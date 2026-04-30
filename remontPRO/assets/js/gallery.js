const lightbox = document.getElementById('galleryLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const closeBtn = document.querySelector('.lightbox-close');

document.querySelectorAll('.photo-card').forEach((card) => {
  card.addEventListener('click', () => {
    lightboxTitle.textContent = card.dataset.title || 'Realizacja';
    lightboxDesc.textContent = card.dataset.desc || 'Opis realizacji.';
    lightboxImage.src = card.dataset.src || '';
    lightboxImage.alt = card.dataset.title || 'Podgląd realizacji';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
