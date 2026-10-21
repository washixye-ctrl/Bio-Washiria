// ========== Card light reflection ==========
(function initCardReflection() {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const selector = '.card, .project-card, .char-preview, .album-item';

  function onMove(e) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty('--rx', x.toFixed(2) + '%');
    el.style.setProperty('--ry', y.toFixed(2) + '%');
  }

  function bind(el) {
    if (el.dataset.reflectBound) return;
    el.dataset.reflectBound = '1';
    el.addEventListener('mousemove', onMove, { passive: true });
  }

  document.querySelectorAll(selector).forEach(bind);

  // album items created dynamically
  const body = document.getElementById('albumBody');
  if (body) {
    const obs = new MutationObserver(() => {
      body.querySelectorAll('.album-item').forEach(bind);
    });
    obs.observe(body, { childList: true });
  }
})();


