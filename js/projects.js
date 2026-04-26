/* ─── PROJECT CARD TOGGLE ─── */
function toggleCard(btn) {
  const card = btn.closest('.project-card');
  const isOpen = card.classList.contains('open');

  // close all open cards
  document.querySelectorAll('.project-card.open').forEach(c => {
    c.classList.remove('open');
    c.querySelector('.project-head').setAttribute('aria-expanded', 'false');
  });

  // open this one if it was closed
  if (!isOpen) {
    card.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.focus();
  }
}

/* ─── CATEGORY FILTER ─── */
function initFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;

      cards.forEach(card => {
        const cardCat = card.dataset.category || '';
        const match   = cat === 'todos' || cardCat.includes(cat);

        if (match) {
          card.classList.remove('hidden');
          card.classList.remove('visible');
          requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('visible')));
        } else {
          card.classList.add('hidden');
          // close if open
          card.classList.remove('open');
          const head = card.querySelector('.project-head');
          if (head) head.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });
}

/* ─── ATTACH LISTENERS ─── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-head').forEach(btn => {
    btn.addEventListener('click', () => toggleCard(btn));
  });

  initFilter();
});
