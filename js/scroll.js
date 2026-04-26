/* ─── SCROLL PROGRESS BAR ─── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    const pct      = total > 0 ? (scrolled / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ─── ACTIVE NAV LINK ON SCROLL ─── */
function initNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-drawer a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ─── SCROLL FADE-UP ─── */
function initFadeUp() {
  const els = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ─── MOBILE HAMBURGER ─── */
function initHamburger() {
  const btn    = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('nav-drawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    drawer.classList.toggle('open', open);
  });

  // close on link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      drawer.classList.remove('open');
    });
  });
}

/* ─── SMOOTH ANCHOR OFFSET ─── */
function initAnchorOffset() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavSpy();
  initFadeUp();
  initHamburger();
  initAnchorOffset();
});
