// Albums are configured in albums/manifest.json.
// Static hosting cannot enumerate directory contents, so add each new file to that manifest.
const ALBUMS = Object.create(null);
const ALBUM_EXTENSIONS = /\.(mp4|png|jpe?g|gif|webp)$/i;

const albumModal = document.getElementById('albumModal');
const albumTitle = document.getElementById('albumTitle');
const albumBody = document.getElementById('albumBody');
const albumClose = document.getElementById('albumClose');
const albumBackdrop = document.getElementById('albumBackdrop');

let currentItems = [];
let currentIndex = 0;

function albumItemType(item) {
  if (item.type === 'video' || /\.mp4(?:$|[?#])/i.test(item.src || '')) return 'video';
  return 'image';
}

async function loadAlbumManifest() {
  try {
    const response = await fetch('albums/manifest.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    (data.albums || []).forEach((album) => {
      if (!album || !album.id || !Array.isArray(album.items)) return;
      ALBUMS[album.id] = {
        title: album.title || album.id,
        description: album.description || '',
        items: album.items.filter((item) =>
          item && typeof item.src === 'string' && ALBUM_EXTENSIONS.test(item.src)
        ).map((item) => ({ ...item, type: albumItemType(item) }))
      };
    });
    document.querySelectorAll('[data-album]').forEach((el) => {
      el.addEventListener('click', () => openAlbum(el.dataset.album));
      el.addEventListener('keydown', (event) => {
        if ((event.key === 'Enter' || event.key === ' ') && el.matches('[role="button"], button')) {
          event.preventDefault();
          openAlbum(el.dataset.album);
        }
      });
    });
    renderCharacterPreview();
  } catch (error) {
    console.error('Unable to load albums/manifest.json:', error);
    albumTitle.textContent = 'Albums could not be loaded';
    albumBody.replaceChildren();
    const note = document.createElement('p');
    note.className = 'album-empty';
    note.textContent = 'ตรวจสอบไฟล์ albums/manifest.json และลองรีเฟรชหน้าเว็บ';
    albumBody.appendChild(note);
  }
}

function renderCharacterPreview() {
  const preview = document.getElementById('charsPreview');
  if (!preview) return;
  preview.replaceChildren();
  const items = ALBUMS.chars?.items || [];
  if (!items.length) {
    preview.classList.add('is-empty');
    return;
  }
  preview.classList.remove('is-empty');
  items.slice(0, 8).forEach((item, index) => {
    const tile = createAlbumTile(item, index);
    tile.classList.add('char-preview');
    preview.appendChild(tile);
  });
}

function createAlbumTile(item, index) {
  const tile = document.createElement('button');
  tile.type = 'button';
  tile.className = 'album-item';
  tile.setAttribute('aria-label', item.title || `Open item ${index + 1}`);
  tile.style.animationDelay = `${Math.min(0.04 * index, 0.4)}s`;

  if (albumItemType(item) === 'video') {
    const poster = item.thumb || '';
    if (poster) {
      const image = document.createElement('img');
      image.src = poster;
      image.alt = item.title || `Video ${index + 1}`;
      image.loading = 'lazy';
      image.decoding = 'async';
      tile.appendChild(image);
    } else {
      const placeholder = document.createElement('span');
      placeholder.className = 'album-video-placeholder';
      placeholder.innerHTML = '<i class="fas fa-film" aria-hidden="true"></i>';
      tile.appendChild(placeholder);
    }
    const badge = document.createElement('span');
    badge.className = 'play-badge';
    badge.innerHTML = '<i class="fas fa-play" aria-hidden="true"></i>';
    tile.appendChild(badge);
  } else {
    const image = document.createElement('img');
    image.src = item.src;
    image.alt = item.title || `Image ${index + 1}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    tile.appendChild(image);
  }

  tile.addEventListener('click', () => {
    if (tile.classList.contains('char-preview')) currentItems = ALBUMS.chars?.items || [];
    openLightbox(index);
  });
  return tile;
}

function openAlbum(key) {
  const album = ALBUMS[key];
  if (!album) return;
  currentItems = album.items;
  albumTitle.textContent = album.title;
  albumBody.replaceChildren();

  if (!currentItems.length) {
    const empty = document.createElement('div');
    empty.className = 'album-empty';
    const icon = document.createElement('span');
    icon.className = 'album-empty-icon';
    icon.innerHTML = '<i class="far fa-images" aria-hidden="true"></i>';
    const heading = document.createElement('strong');
    heading.textContent = 'ยังไม่มีไฟล์ในอัลบั้มนี้';
    const description = document.createElement('p');
    description.textContent = 'เพิ่ม .mp4, .png, .jpg หรือ .gif ในโฟลเดอร์ albums แล้วลงทะเบียนไฟล์ใน manifest.json';
    empty.append(icon, heading, description);
    albumBody.appendChild(empty);
  } else {
    currentItems.forEach((item, index) => albumBody.appendChild(createAlbumTile(item, index)));
  }

  albumModal.hidden = false;
  document.body.style.overflow = 'hidden';
  albumClose.focus();
}

function closeAlbum() {
  albumModal.hidden = true;
  document.body.style.overflow = (typeof entered !== 'undefined' && entered) ? '' : 'hidden';
}

albumClose.addEventListener('click', closeAlbum);
albumBackdrop.addEventListener('click', closeAlbum);
loadAlbumManifest();
