// ========== Albums (core from pro + extra from profile assets) ==========
const ALBUMS = {
  videos: {
    title: 'Clips & Videos',
    items: [
      { type: 'video', src: 'assets/videos/1.1.mp4', thumb: 'images/vid-1.1.jpg' },
      { type: 'video', src: 'assets/videos/1.2.mp4', thumb: 'images/vid-1.2.jpg' },
      { type: 'video', src: 'assets/videos/1.3.mp4', thumb: 'images/vid-1.3.jpg' },
      { type: 'video', src: 'assets/videos/1.4.mp4', thumb: 'images/vid-1.4.jpg' }
    ]
  },
  games: {
    title: 'FiveM / Game',
    items: [
      { type: 'image', src: 'images/game-1.png' },
      { type: 'image', src: 'images/game-2.png' },
      { type: 'image', src: 'images/game-3.png' },
      { type: 'image', src: 'images/game-4.png' },
      { type: 'image', src: 'images/game-5.png' },
      { type: 'image', src: 'images/game-6.png' },
      { type: 'image', src: 'images/game-7.png' },
      { type: 'image', src: 'images/game-8.png' },
      { type: 'image', src: 'images/game-9.png' },
      { type: 'image', src: 'images/game-10.jpg' },
      { type: 'image', src: 'images/game-11.jpg' },
      { type: 'image', src: 'images/game-12.jpg' },
      { type: 'image', src: 'images/game-13.jpg' },
      { type: 'image', src: 'images/game-14.jpg' },
      { type: 'image', src: 'images/game-15.png' }
    ]
  },
  chars: {
    title: 'Novel Characters',
    items: [
      { type: 'image', src: 'images/char-clan.png' },
      { type: 'image', src: 'images/char-testaros.png' },
      { type: 'image', src: 'images/char-kline.png' },
      { type: 'image', src: 'images/char-raven.png' },
      { type: 'image', src: 'images/char-mikasa.png' },
      { type: 'image', src: 'images/char-lumine.jfif' },
      { type: 'image', src: 'images/char-encrid.png' },
      { type: 'image', src: 'images/char-serios1.jfif' },
      { type: 'image', src: 'images/char-liliane.jfif' },
      { type: 'image', src: 'images/char-serios2.jfif' },
      { type: 'image', src: 'images/char-seraphina.jfif' },
      { type: 'image', src: 'images/char-varencia.png' },
      { type: 'image', src: 'images/char-lucifer.png' },
      { type: 'image', src: 'images/char-สุคุนะ เฟส.jfif' },
      { type: 'image', src: 'images/char-เอลิเซีย.jfif' },
      { type: 'image', src: 'images/char-เรย์เวน1.jfif' },
      { type: 'image', src: 'images/char-เรย์เวน2.jfif' },
      { type: 'image', src: 'images/char-raymond.png' }
    ]
  },
  extra: {
    title: 'City & Scenes',
    items: [
      { type: 'image', src: 'images/work-lightcity.png' },
      { type: 'image', src: 'images/image1.png' },
      { type: 'image', src: 'images/game-7.png' },
      { type: 'image', src: 'images/game-8.png' },
      { type: 'image', src: 'images/game-9.png' }
    ]
  }
};

const albumModal = document.getElementById('albumModal');
const albumTitle = document.getElementById('albumTitle');
const albumBody = document.getElementById('albumBody');
const albumClose = document.getElementById('albumClose');
const albumBackdrop = document.getElementById('albumBackdrop');

let currentItems = [];
let currentIndex = 0;

document.querySelectorAll('[data-album]').forEach((el) => {
  el.addEventListener('click', () => openAlbum(el.dataset.album));
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openAlbum(el.dataset.album);
    }
  });
});

function openAlbum(key) {
  const album = ALBUMS[key];
  if (!album) return;
  currentItems = album.items;
  albumTitle.textContent = album.title;
  albumBody.innerHTML = '';

  album.items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'album-item';
    el.style.animationDelay = (0.04 * i) + 's';
    if (item.type === 'video') {
      el.innerHTML = `
        <img src="${item.thumb || item.src}" alt="Video ${i + 1}" loading="lazy" />
        <div class="play-badge"><i class="fas fa-play"></i></div>
      `;
    } else {
      el.innerHTML = `<img src="${item.src}" alt="Image ${i + 1}" loading="lazy" />`;
    }
    el.addEventListener('click', () => openLightbox(i));
    albumBody.appendChild(el);
  });

  albumModal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeAlbum() {
  albumModal.hidden = true;
  document.body.style.overflow = entered ? '' : 'hidden';
}

albumClose.addEventListener('click', closeAlbum);
albumBackdrop.addEventListener('click', closeAlbum);

