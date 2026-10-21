// ========== Audio visualizer ==========
const vizEl = document.getElementById('viz');
const VIZ_BARS = 14;
let audioCtx = null;
let analyser = null;
let mediaSourceNode = null;
let freqData = null;
let vizRaf = 0;
let vizBars = [];

if (vizEl) {
  for (let i = 0; i < VIZ_BARS; i++) {
    const bar = document.createElement('span');
    bar.className = 'viz-bar';
    vizEl.appendChild(bar);
    vizBars.push(bar);
  }
}

/**
 * Create the Web Audio graph once.
 * IMPORTANT:
 * - Must be called during a user gesture (click/keydown) or AudioContext stays suspended.
 * - On file:// protocol Chrome blocks MediaElementSource with CORS → outputs zeroes (silence).
 *   In that case we skip the graph entirely so the <audio> element plays normally.
 */
const isFileProtocol = location.protocol === 'file:';

function ensureAudioGraph() {
  if (!music) return;
  // file:// → never call createMediaElementSource (it mutes the element permanently)
  if (isFileProtocol) return;
  // already built
  if (analyser && audioCtx) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return;
  }
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    audioCtx = new AC();
    // createMediaElementSource takes over the <audio> output —
    // we MUST connect it all the way to destination or there is no sound
    mediaSourceNode = audioCtx.createMediaElementSource(music);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.72;
    mediaSourceNode.connect(analyser);
    analyser.connect(audioCtx.destination);
    freqData = new Uint8Array(analyser.frequencyBinCount);
    // resume immediately while we still have user activation
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  } catch (err) {
    console.warn('visualizer unavailable', err);
    analyser = null;
    mediaSourceNode = null;
  }
}

function startViz() {
  if (vizRaf) return;

  // Real analyser available (http/https) → use frequency data
  if (analyser && !isFileProtocol) {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    const tick = () => {
      if (!isPlaying || !analyser) {
        vizRaf = 0;
        return;
      }
      analyser.getByteFrequencyData(freqData);
      const n = vizBars.length;
      const bins = freqData.length;
      for (let i = 0; i < n; i++) {
        const idx = Math.min(bins - 1, 1 + Math.floor(i * (bins - 2) / n));
        const v = freqData[idx] / 255;
        const center = 1 - Math.abs(i - (n - 1) / 2) / ((n - 1) / 2);
        const h = Math.max(0.12, Math.min(1, v * 0.85 + center * 0.12)) * 100;
        vizBars[i].style.height = h.toFixed(1) + '%';
      }
      vizRaf = requestAnimationFrame(tick);
    };
    vizRaf = requestAnimationFrame(tick);
    return;
  }

  // file:// fallback: fake gentle pulse so the bars still look alive
  const tickFake = () => {
    if (!isPlaying) {
      vizRaf = 0;
      return;
    }
    const t = performance.now() / 280;
    const n = vizBars.length;
    for (let i = 0; i < n; i++) {
      const center = 1 - Math.abs(i - (n - 1) / 2) / ((n - 1) / 2);
      const wave = 0.35 + 0.45 * Math.sin(t + i * 0.55) * Math.sin(t * 0.7 + i * 0.3);
      const h = Math.max(0.12, Math.min(1, wave * 0.7 + center * 0.25)) * 100;
      vizBars[i].style.height = h.toFixed(1) + '%';
    }
    vizRaf = requestAnimationFrame(tickFake);
  };
  vizRaf = requestAnimationFrame(tickFake);
}

function stopViz() {
  if (vizRaf) {
    cancelAnimationFrame(vizRaf);
    vizRaf = 0;
  }
  vizBars.forEach((bar, i) => {
    const base = 12 + (i % 3) * 4;
    bar.style.height = base + '%';
  });
}