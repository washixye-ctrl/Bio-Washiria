// ========== Theme + BG + Music hotkeys ==========
const THEME_LIST = [
  'Carthethyia.mp4',
  'Hiyuki.mp4',
  'Kurumi.mp4',
  'Asta.mp4',
  'Sandrone.mp4'
];
const THEME_CLIPS = {
  Numpad1: THEME_LIST[0], Digit1: THEME_LIST[0],
  Numpad2: THEME_LIST[1], Digit2: THEME_LIST[1],
  Numpad3: THEME_LIST[2], Digit3: THEME_LIST[2],
  Numpad4: THEME_LIST[3], Digit4: THEME_LIST[3],
  Numpad5: THEME_LIST[4], Digit5: THEME_LIST[4]
};
const THEME_CLASSES = ['theme-noir', 'theme-alt', 'theme-capitano', 'theme-aegir', 'theme-alucard', 'theme-secret'];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let bgSwitching = false;
window.__bgClip = 'Carthethyia.mp4';
window.__audioStartAt = 0;

// Background videos are visuals only. Music is played exclusively by #bgMusic.
function forceBackgroundVideoMuted(video) {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
}

// Apply immediately and keep both crossfade layers silent.
document.querySelectorAll('.video-bg video').forEach(forceBackgroundVideoMuted);

function getTrackForClip(clip) {
  // Pair media by basename: assets/videos/Name.mp4 -> assets/audio/Name.mp3
  return 'assets/audio/' + clip.replace(/\.mp4$/i, '.mp3');
}

function getAudioStartForClip() {
  return 0;
}

function getThemeLabel(clip) {
  return 'theme · ' + clip.replace(/\.mp4$/i, '');
}

/** ใช้ตอนเข้าเว็บ · ตั้งพื้นหลังทันทีโดยไม่ fade */
function applyThemeSilent(clip) {
  window.__bgClip = clip;
  window.__audioStartAt = getAudioStartForClip(clip);

  const active = getActiveBg();
  if (active) {
    forceBackgroundVideoMuted(active);
    const src = active.querySelector('source');
    if (src) src.src = 'assets/videos/' + clip;
    active.load();
    try { active.play(); } catch (_) {}
  }

  applyThemeClasses(clip);
  applyMeta(clip);

  const source = music.querySelector('source');
  if (source) {
    source.src = getTrackForClip(clip);
    music.load();
  }
}

function cycleTheme(dir) {
  if (!entered || bgSwitching) return;
  const idx = THEME_LIST.indexOf(window.__bgClip);
  const cur = idx < 0 ? 0 : idx;
  const next = (cur + dir + THEME_LIST.length) % THEME_LIST.length;
  switchBackground(THEME_LIST[next]);
}

function getActiveBg() {
  return document.querySelector('.video-bg .bg-layer.is-active') || document.getElementById('bgVideo');
}
function getInactiveBg() {
  return document.querySelector('.video-bg .bg-layer:not(.is-active)') || document.getElementById('bgVideoB');
}

function fadeVolume(audio, to, ms) {
  return new Promise((resolve) => {
    if (!audio || reduceMotion || ms <= 0) {
      if (audio) audio.volume = to;
      resolve();
      return;
    }
    const from = audio.volume;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / ms);
      const eased = t * (2 - t);
      audio.volume = from + (to - from) * eased;
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    }
    requestAnimationFrame(tick);
  });
}

function applyThemeClasses(clip) {
  document.body.classList.remove(...THEME_CLASSES);
  const themeByClip = {
    'Carthethyia.mp4': 'theme-alt',       // ice blue
    'Hiyuki.mp4': 'theme-aegir',          // sakura pink / blue
    'Kurumi.mp4': 'theme-alucard',        // black / crimson
    'Roxy.mp4': 'theme-noir',             // violet / midnight
    'Sandrone.mp4': 'theme-capitano'      // red / steel blue
  };
  document.body.classList.add(themeByClip[clip] || 'theme-alt');

  // Retrigger bio card entrance animation
  const bioCard = document.querySelector('.section-about .card');
  if (bioCard) {
    bioCard.style.animation = 'none';
    void bioCard.offsetWidth;
    bioCard.style.animation = '';
  }
}

function applyMeta(clip) {
  const title = document.getElementById('playerTitle');
  const sub = document.getElementById('playerSub');
  const name = clip.replace(/\.mp4$/i, '');
  if (title) title.textContent = name;
  if (sub) sub.textContent = 'Original soundtrack · ' + name;
}

function showToast(msg) {
  let el = document.querySelector('.theme-toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'theme-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 1800);
}

async function switchBackground(clip) {
  if (bgSwitching) return;
  if (window.__bgClip === clip) return;
  bgSwitching = true;
  document.body.classList.add('is-theme-fading');

  const incoming = getInactiveBg();
  const outgoing = getActiveBg();
  const audio = music; // WASHI uses #bgMusic
  const wasPlaying = audio && !audio.paused;
  const targetVol = typeof audio.dataset.userVol !== 'undefined'
    ? parseFloat(audio.dataset.userVol)
    : (audio.volume || 0.42);

  window.__bgClip = clip;
  window.__audioStartAt = getAudioStartForClip(clip);

  if (incoming) {
    forceBackgroundVideoMuted(incoming);
    const src = incoming.querySelector('source');
    if (src) src.src = 'assets/videos/' + clip;
    incoming.load();
    try { await incoming.play(); } catch (_) {}
  }

  const fadeMs = reduceMotion ? 0 : 700;
  if (audio && wasPlaying) {
    fadeVolume(audio, 0, fadeMs * 0.65);
  }

  await new Promise((r) => setTimeout(r, reduceMotion ? 0 : 120));

  if (incoming) incoming.classList.add('is-active');
  if (outgoing) outgoing.classList.remove('is-active');

  applyThemeClasses(clip);
  applyMeta(clip);

  await new Promise((r) => setTimeout(r, fadeMs));

  if (outgoing) {
    try { outgoing.pause(); } catch (_) {}
  }

  if (audio) {
    const source = audio.querySelector('source');
    if (source) source.src = getTrackForClip(clip);
    audio.load();
    const startPlay = () => {
      if (window.__audioStartAt) audio.currentTime = window.__audioStartAt;
      audio.volume = 0;
      if (wasPlaying || entered) {
        unlockAudio();
        audio.play().then(() => {
          setPlaying(true);
          fadeVolume(audio, targetVol, reduceMotion ? 0 : 550);
        }).catch(() => setPlaying(false));
      } else {
        audio.volume = targetVol;
      }
    };
    if (audio.readyState >= 2) startPlay();
    else audio.addEventListener('canplay', startPlay, { once: true });
  }

  document.body.classList.remove('is-theme-fading');
  bgSwitching = false;
  showToast(getThemeLabel(clip));
}

// Hotkeys · 1–5 / Numpad 1–5 เลือกธีม · [ ] หรือ T สลับ · 6 secret
document.addEventListener('keydown', (event) => {
  const tag = event.target && event.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || event.target.isContentEditable) return;
  if (!entered && event.code !== 'Enter' && event.code !== 'Space') return;

  // cycle theme
  if (event.code === 'BracketRight' || event.code === 'KeyT') {
    event.preventDefault();
    cycleTheme(1);
    return;
  }
  if (event.code === 'BracketLeft') {
    event.preventDefault();
    cycleTheme(-1);
    return;
  }

  if (event.code === 'Numpad6' || event.code === 'Digit6') {
    event.preventDefault();
    const on = document.body.classList.toggle('theme-secret');
    showToast(on ? 'secret · on' : 'secret · off');
    return;
  }

  const clip = THEME_CLIPS[event.code];
  if (!clip) return;
  event.preventDefault();
  switchBackground(clip);
});

// default theme on load
applyThemeClasses('Carthethyia.mp4');
applyMeta('Carthethyia.mp4');

