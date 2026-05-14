/* ============================================
   POOL BAR - Main JS
   ============================================ */

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => preloader.classList.add('hidden'), 400);
  }
});

// Nav scroll
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });
}

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObserver.observe(el));

// Particles
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 8}s`;
    p.style.animationDuration = `${6 + Math.random() * 6}s`;
    p.style.width = p.style.height = `${2 + Math.random() * 4}px`;
    container.appendChild(p);
  }
}
createParticles();

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.counter || el.textContent, 10);
  if (!target || isNaN(target)) return;
  const text = el.textContent;
  const suffix = text.replace(/[\d,]/g, '');
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

// Tilt effect on cards
document.querySelectorAll('.card, .product-card, .club-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Cursor glow (subtle)
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed; width: 400px; height: 400px;
  border-radius: 50%; pointer-events: none;
  background: radial-gradient(circle, rgba(57, 255, 20, 0.08), transparent 60%);
  transform: translate(-50%, -50%); z-index: 1;
  opacity: 0; transition: opacity 0.3s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
  cursorGlow.style.opacity = '1';
});
document.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0'; });

// Filter chips (shop page)
document.querySelectorAll('[data-filter-group]').forEach(group => {
  const chips = group.querySelectorAll('.chip');
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
          item.style.animation = 'none';
          requestAnimationFrame(() => item.style.animation = 'fadeIn 0.5s ease');
        }
      });
    });
  });
});

// Contact form (mock)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'נשלח! ✓';
    btn.style.background = 'var(--neon-green-soft)';
    setTimeout(() => {
      contactForm.reset();
      btn.textContent = orig;
      btn.style.background = '';
    }, 2200);
  });
}

// Gallery lightbox
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const title = item.querySelector('h4')?.textContent || '';
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.92);
      z-index: 9999; display: flex; align-items: center; justify-content: center;
      backdrop-filter: blur(10px); animation: fadeIn 0.3s ease;
      cursor: pointer;
    `;
    const visual = item.querySelector('.gallery-item-visual').cloneNode(true);
    const wrap = document.createElement('div');
    wrap.style.cssText = `
      width: 90%; max-width: 900px; aspect-ratio: 4/3;
      border-radius: 20px; overflow: hidden; position: relative;
      border: 1px solid rgba(57,255,20,0.4);
      box-shadow: 0 0 80px rgba(57,255,20,0.3);
    `;
    visual.style.cssText = 'position: absolute; inset: 0;';
    const titleEl = document.createElement('div');
    titleEl.textContent = title;
    titleEl.style.cssText = `
      position: absolute; bottom: 1.5rem; right: 1.5rem;
      color: var(--neon-green); font-family: var(--font-display);
      font-size: 1.4rem; font-weight: 700; text-shadow: 0 0 12px rgba(57,255,20,0.5);
    `;
    wrap.appendChild(visual);
    wrap.appendChild(titleEl);
    lightbox.appendChild(wrap);
    document.body.appendChild(lightbox);
    lightbox.addEventListener('click', () => lightbox.remove());
  });
});

// Fade-in keyframe
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;
document.head.appendChild(styleSheet);
