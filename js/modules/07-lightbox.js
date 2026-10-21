// ========== Lightbox ==========
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCount = document.getElementById('lightboxCount');

function openLightbox(index) {
  currentIndex = index;
  renderLightbox();
  lightbox.hidden = false;
}

function renderLightbox() {
  const item = currentItems[currentIndex];
  if (!item) return;
  lightboxContent.innerHTML = '';
  if (item.type === 'video') {
    const v = document.createElement('video');
    v.src = item.src;
    v.controls = true;
    v.autoplay = true;
    v.playsInline = true;
    lightboxContent.appendChild(v);
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = '';
    lightboxContent.appendChild(img);
  }
  lightboxCount.textContent = `${currentIndex + 1} / ${currentItems.length}`;
}

function closeLightbox() {
  lightbox.hidden = true;
  const v = lightboxContent.querySelector('video');
  if (v) {
    v.pause();
    v.src = '';
  }
  lightboxContent.innerHTML = '';
}

function navLightbox(dir) {
  currentIndex = (currentIndex + dir + currentItems.length) % currentItems.length;
  renderLightbox();
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navLightbox(-1));
lightboxNext.addEventListener('click', () => navLightbox(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) {
    if (e.key === 'Escape' && !albumModal.hidden) closeAlbum();
    return;
  }
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navLightbox(-1);
  if (e.key === 'ArrowRight') navLightbox(1);
});

