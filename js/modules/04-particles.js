// ========== Particles (from profile idea) ==========
const particlesEl = document.getElementById('particles');
function spawnParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + '%';
  p.style.bottom = '-10px';
  p.style.animationDuration = (8 + Math.random() * 10) + 's';
  p.style.opacity = 0.3 + Math.random() * 0.5;
  particlesEl.appendChild(p);
  setTimeout(() => p.remove(), 18000);
}
setInterval(() => { if (!document.hidden) spawnParticle(); }, 1800);
for (let i = 0; i < 4; i++) setTimeout(spawnParticle, i * 700);

