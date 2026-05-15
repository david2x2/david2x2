/* ============================================
   POOL BAR — Luxury Edition · main.js
   ============================================ */

// ===== Nav scroll state =====
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ===== Mobile menu =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== Year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Reveal on scroll =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Filter chips (shop / tables) =====
document.querySelectorAll('[data-filter-group]').forEach(group => {
  const chips = group.querySelectorAll('.filter-chip');
  const targetSelector = group.dataset.filterTarget;
  if (!targetSelector) return;
  const items = document.querySelectorAll(targetSelector);
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      items.forEach(item => {
        const tags = (item.dataset.tags || '').split(' ');
        const show = filter === 'all' || tags.includes(filter);
        item.style.display = show ? '' : 'none';
        if (show) {
          item.style.opacity = '0';
          item.style.transform = 'translateY(8px)';
          requestAnimationFrame(() => {
            item.style.transition = 'all .4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        }
      });
    });
  });
});

// ===== Contact form (mock) =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = 'נשלח בהצלחה ✓';
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
      contactForm.reset();
      btn.innerHTML = orig;
      btn.style.pointerEvents = '';
    }, 2400);
  });
}

// ===== Play button (placeholder, no-op) =====
document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.style.transform = 'translate(-50%, -50%) scale(0.92)';
    setTimeout(() => { btn.style.transform = ''; }, 200);
  });
});

// ===== Smooth anchor scroll =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length <= 1) return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
