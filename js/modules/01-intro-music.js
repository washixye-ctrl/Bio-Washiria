	// ========== Intro + Music ==========
const intro = document.getElementById('intro');
const site = document.getElementById('site');
const music = document.getElementById('bgMusic');
const player = document.getElementById('player');
const musicBtn = document.getElementById('musicBtn');
const playerFill = document.getElementById('playerFill');
const playerTime = document.getElementById('playerTime');
const playerDur = document.getElementById('playerDur');
const playerBar = document.getElementById('playerBar');

music.volume = 0.24;
let isPlaying = false;
let entered = false;

// Default theme pairs Carthethyia.mp4 with Carthethyia.mp3.
(function initDefaultTrack() {
  const source = music.querySelector('source');
  if (source) {
    source.src = 'assets/audio/Carthethyia.mp3';
    music.load();
  }
  window.__audioStartAt = 0;
  // seek after metadata is ready
  const seekToStart = () => {
    if (window.__audioStartAt && isFinite(music.duration)) {
      music.currentTime = Math.min(window.__audioStartAt, Math.max(0, music.duration - 1));
    }
  };
  if (music.readyState >= 1) seekToStart();
  else music.addEventListener('loadedmetadata', seekToStart, { once: true });
})();

function fmt(sec) {
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ':' + String(s).padStart(2, '0');
}

function updateProgress() {
  if (!music.duration) return;
  const pct = (music.currentTime / music.duration) * 100;
  playerFill.style.width = pct + '%';
  playerTime.textContent = fmt(music.currentTime);
  playerDur.textContent = fmt(music.duration);
}

music.addEventListener('timeupdate', updateProgress);
music.addEventListener('loadedmetadata', updateProgress);

function setPlaying(on) {
  isPlaying = on;
  musicBtn.innerHTML = on
    ? '<i class="fas fa-pause"></i>'
    : '<i class="fas fa-play"></i>';
  if (player) player.classList.toggle('is-playing', on);
  if (on) {
    ensureAudioGraph();
    startViz();
  } else {
    stopViz();
  }
}

/** Unlock / resume AudioContext during a real user gesture so sound can come out */
function unlockAudio() {
  ensureAudioGraph();
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
}

function playMusic() {
  unlockAudio();
  return music.play()
    .then(() => setPlaying(true))
    .catch(() => setPlaying(false));
}

function enterSite() {
  if (entered) return;
  entered = true;

  // ซ่อน intro แล้วเปิดหน้าโหลด
  intro.classList.add('hide');
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  const loaderPct = document.getElementById('loaderPct');
  const loaderStatus = document.getElementById('loaderStatus');

  // สุ่มพื้นหลัง + ธีมตอนกดเข้า
  const randomClip = THEME_LIST[Math.floor(Math.random() * THEME_LIST.length)];
  applyThemeSilent(randomClip);

  // unlock audio ภายใน user gesture (เล่นจริงตอนโหลดครบ 100%)
  unlockAudio();
  // เตรียม element ไว้ล่วงหน้า บางเบราว์เซอร์อนุญาต play ทีหลังได้หลัง unlock
  try {
    const p = music.play();
    if (p && typeof p.then === 'function') {
      p.then(() => { music.pause(); music.currentTime = window.__audioStartAt || 0; }).catch(() => {});
    }
  } catch (_) {}

  const isMobile = window.matchMedia('(max-width: 720px)').matches;
  const sideL = document.getElementById('loaderSideL');
  const sideR = document.getElementById('loaderSideR');
  const themeTag = document.getElementById('loaderThemeTag');
  const stepEls = document.querySelectorAll('.loader-step');

  if (loader) {
    loader.hidden = false;
    loader.classList.remove('is-glitch', 'is-flash', 'is-done');

    // particles
    const particlesEl = document.getElementById('loaderParticles');
    if (particlesEl) {
      particlesEl.innerHTML = '';
      const count = isMobile ? 10 : 20;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'loader-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.bottom = (-5 - Math.random() * 20) + '%';
        p.style.animationDuration = (5 + Math.random() * 7) + 's';
        p.style.animationDelay = (Math.random() * 2.5) + 's';
        p.style.opacity = 0.25 + Math.random() * 0.55;
        const size = (isMobile ? 1.5 : 2) + Math.random() * (isMobile ? 2 : 3);
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        particlesEl.appendChild(p);
      }
    }

    // floating hex codes
    const hexEl = document.getElementById('loaderHex');
    if (hexEl) {
      hexEl.innerHTML = '';
      const hexCount = isMobile ? 6 : 14;
      const words = ['0xWASHI', 'BOOT', 'SYNC', 'LOAD', 'Washi', '0xA7', '0xFF', 'INIT', 'CORE', 'MEM'];
      for (let i = 0; i < hexCount; i++) {
        const s = document.createElement('span');
        s.textContent = words[i % words.length] + ' ' + Math.floor(Math.random() * 0xff).toString(16).toUpperCase().padStart(2, '0');
        s.style.left = (5 + Math.random() * 90) + '%';
        s.style.bottom = (-10 - Math.random() * 30) + '%';
        s.style.animationDuration = (7 + Math.random() * 8) + 's';
        s.style.animationDelay = (Math.random() * 3) + 's';
        hexEl.appendChild(s);
      }
    }

    // show theme name mid-load
    if (themeTag) {
      themeTag.textContent = '';
      themeTag.classList.remove('is-show');
    }

    requestAnimationFrame(() => loader.classList.add('is-active'));
  }

  const statuses = [
    'กำลังเข้าสู่ระบบ...',
    'ซิงค์ธีม...',
    'โหลดเนื้อหา...',
    'เกือบเสร็จแล้ว...',
    'พร้อมแล้ว'
  ];
  const sideMsgs = ['INIT', 'SYNC', 'LOAD', 'LINK', 'DONE'];
  let pct = 0;
  let statusIdx = 0;
  let glitchOn = false;
  let themeShown = false;
  const duration = 3200; // ms · longer for extra flair
  const start = performance.now();
  const lineFill = document.querySelector('.loader-line-fill');

  function tickLoader(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    pct = Math.round(eased * 100);

    if (loaderFill) loaderFill.style.width = pct + '%';
    if (loaderPct) loaderPct.textContent = pct + '%';
    if (lineFill) lineFill.style.width = pct + '%';

    // side hex counter
    if (sideL) sideL.textContent = '0x' + pct.toString(16).toUpperCase().padStart(2, '0');

    // step dots
    const stepIdx = Math.min(stepEls.length - 1, Math.floor(t * stepEls.length));
    stepEls.forEach((el, i) => {
      el.classList.toggle('is-on', i === stepIdx && t < 1);
      el.classList.toggle('is-done', i < stepIdx || t >= 1);
    });

    const nextStatus = Math.min(statuses.length - 1, Math.floor(t * statuses.length));
    if (nextStatus !== statusIdx && loaderStatus) {
      statusIdx = nextStatus;
      loaderStatus.style.opacity = '0';
      if (sideR) sideR.textContent = sideMsgs[statusIdx] || 'SYNC';
      setTimeout(() => {
        loaderStatus.textContent = statuses[statusIdx];
        loaderStatus.style.opacity = '1';
      }, 120);
    }

    // reveal theme tag around 55%
    if (!themeShown && t > 0.55 && themeTag) {
      themeShown = true;
      themeTag.textContent = getThemeLabel(window.__bgClip || 'Carthethyia.mp4');
      themeTag.classList.add('is-show');
    }

    // glitch letters near the end
    if (loader && t > 0.82 && t < 0.95) {
      if (!glitchOn) {
        glitchOn = true;
        loader.classList.add('is-glitch');
      }
    } else if (glitchOn && loader) {
      glitchOn = false;
      loader.classList.remove('is-glitch');
    }

    if (t < 1) {
      requestAnimationFrame(tickLoader);
    } else {
      if (loader) loader.classList.remove('is-glitch');
      finishEnter();
    }
  }
  requestAnimationFrame(tickLoader);

  function finishEnter() {
    // เล่นเพลงเมื่อโหลดครบ 100%
    if (window.__audioStartAt && isFinite(music.duration)) {
      music.currentTime = Math.min(window.__audioStartAt, Math.max(0, music.duration - 1));
    }
    playMusic();

    // brief flash then fade out
    if (loader) {
      loader.classList.add('is-flash');
      setTimeout(() => {
        loader.classList.remove('is-flash');
        loader.classList.add('is-done');
        loader.classList.remove('is-active');
      }, 180);
    }

    setTimeout(() => {
      site.classList.add('show');
      document.body.classList.remove('locked');
      player.hidden = false;

      const nav = document.getElementById('navbar');
      const glow = document.getElementById('navGlow');
      if (nav) {
        nav.hidden = false;
        requestAnimationFrame(() => nav.classList.add('is-visible'));
      }
      if (glow) {
        glow.hidden = false;
        requestAnimationFrame(() => glow.classList.add('is-visible'));
      }
    }, 220);

    setTimeout(() => {
      intro.style.display = 'none';
      if (loader) {
        loader.hidden = true;
        loader.classList.remove('is-done', 'is-flash');
      }
      const active = document.querySelector('.nav-link.active');
      if (active && typeof moveNavIndicator === 'function') moveNavIndicator(active);
    }, 750);
  }
}

intro.addEventListener('click', enterSite);
intro.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    enterSite();
  }
});

musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (isPlaying) {
    music.pause();
    setPlaying(false);
  } else {
    playMusic();
  }
});

/* กดแถบที่พับอยู่เพื่อเล่นเพลง */
player.addEventListener('click', (e) => {
  if (isPlaying) return;
  if (e.target.closest('.player-btn')) return;
  playMusic();
});

playerBar.addEventListener('click', (e) => {
  if (!music.duration) return;
  const rect = playerBar.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  music.currentTime = Math.max(0, Math.min(1, ratio)) * music.duration;
});

