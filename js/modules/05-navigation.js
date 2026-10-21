// ========== Navbar · sticky + active indicator + scroll progress ==========
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const navIndicator = document.getElementById('navIndicator');
const scrollProgress = document.getElementById('scrollProgress');
let currentSectionId = 'about';

function moveNavIndicator(activeLink) {
  if (!navIndicator || !activeLink) return;
  const parent = activeLink.parentElement;
  const parentRect = parent.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();
  const left = linkRect.left - parentRect.left;
  navIndicator.style.width = linkRect.width + 'px';
  navIndicator.style.transform = `translateX(${left}px)`;
}

function setActiveSection(id) {
  if (!id) return;
  if (id === currentSectionId) {
    const active = document.querySelector(`.nav-link[data-section="${currentSectionId}"]`);
    if (active) moveNavIndicator(active);
    return;
  }
  currentSectionId = id;
  navLinks.forEach((link) => {
    const on = link.dataset.section === id;
    link.classList.toggle('active', on);
    if (on) moveNavIndicator(link);
  });
}

function updateScrollUI() {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docH > 0 ? Math.min(100, (scrollY / docH) * 100) : 0;
  if (scrollProgress) scrollProgress.style.width = pct + '%';

  if (navbar) {
    navbar.classList.toggle('is-scrolled', scrollY > 24);
  }

  const probe = scrollY + window.innerHeight * 0.35;
  let activeId = currentSectionId;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (probe >= top && probe < bottom) {
      activeId = section.id;
    }
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.75 && rect.bottom > 80;
    section.classList.toggle('is-inview', inView);
  });
  setActiveSection(activeId);
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('resize', () => {
  const active = document.querySelector('.nav-link.active');
  if (active) moveNavIndicator(active);
  updateScrollUI();
});

requestAnimationFrame(() => {
  const first = document.querySelector('.nav-link.active') || navLinks[0];
  if (first) moveNavIndicator(first);
  updateScrollUI();
  sections.forEach((s) => s.classList.add('is-inview'));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const id = link.dataset.section;
    setActiveSection(id);
  });
});

