// ========== Cursor spotlight ==========
(function initSpotlight() {
  const spot = document.getElementById('spotlight');
  if (!spot) return;
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let sx = mx;
  let sy = my;
  let raf = 0;
  let active = false;

  function paint() {
    // smooth follow (lerp)
    sx += (mx - sx) * 0.14;
    sy += (my - sy) * 0.14;
    root.style.setProperty('--spot-x', sx.toFixed(1) + 'px');
    root.style.setProperty('--spot-y', sy.toFixed(1) + 'px');
    const dx = Math.abs(mx - sx) + Math.abs(my - sy);
    if (dx > 0.4) {
      raf = requestAnimationFrame(paint);
    } else {
      raf = 0;
    }
  }

  function onMove(e) {
    mx = e.clientX;
    my = e.clientY;
    if (!active) {
      active = true;
      spot.classList.add('is-on');
    }
    if (!raf) raf = requestAnimationFrame(paint);
  }

  function onLeave() {
    active = false;
    spot.classList.remove('is-on', 'is-hot');
  }

  // brighter when hovering interactive targets
  document.addEventListener('mouseover', (e) => {
    const hot = e.target.closest(
      'a, button, .card-flip, .project-card, .char-preview, .album-item, .social-btn, .nav-link, .tag'
    );
    spot.classList.toggle('is-hot', !!hot);
  });

  window.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('mouseleave', onLeave);
})();


