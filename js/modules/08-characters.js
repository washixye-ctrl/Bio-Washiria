// ========== Character preview grid ==========
const charsPreview = document.getElementById('charsPreview');
const previewChars = ALBUMS.chars.items.slice(0, 8);
previewChars.forEach((item, i) => {
  const div = document.createElement('div');
  div.className = 'char-preview';
  div.innerHTML = `<img src="${item.src}" alt="Character" loading="lazy" />`;
  div.addEventListener('click', () => {
    currentItems = ALBUMS.chars.items;
    openLightbox(i);
  });
  charsPreview.appendChild(div);
});

