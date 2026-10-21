// ========== Stars (from pro) ==========
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const stars = [];
for (let i = 0; i < (window.matchMedia('(max-width: 720px)').matches ? 28 : 55); i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.4 + 0.3,
    opacity: Math.random() * 0.7 + 0.2,
    speed: Math.random() * 0.15 + 0.05,
    twinkle: Math.random() * Math.PI * 2
  });
}

let lastFrame = 0;
function drawStars(timestamp = 0) {
  if (document.hidden) { requestAnimationFrame(drawStars); return; }
  if (timestamp - lastFrame < 33) { requestAnimationFrame(drawStars); return; }
  lastFrame = timestamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    s.twinkle += 0.02;
    const alpha = s.opacity * (0.6 + 0.4 * Math.sin(s.twinkle));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 180, 255, ${alpha})`;
    ctx.fill();
    s.y -= s.speed;
    if (s.y < -5) {
      s.y = canvas.height + 5;
      s.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(drawStars);
}
drawStars();

