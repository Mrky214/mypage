// ── Custom cursor ─────────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '6px';
    cursor.style.height = '6px';
    ring.style.width    = '52px';
    ring.style.height   = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    ring.style.width    = '36px';
    ring.style.height   = '36px';
  });
});

// ── Nav scroll effect ─────────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Scroll reveal ─────────────────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ── Smooth active nav links ───────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
});

// ════════════════════════════════════════════════════════════════════════════════
// RESUME MODAL — slides up from the bottom
// ════════════════════════════════════════════════════════════════════════════════
const resumeBtn   = document.getElementById('resumeBtn');
const resumeModal = document.getElementById('resumeModal');
const resumeClose = document.getElementById('resumeClose');
const resumeTabs  = document.querySelectorAll('.resume-tab');
const resumePanes = document.querySelectorAll('.resume-pane');

function openResume() {
  resumeModal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeResume() {
  resumeModal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

resumeBtn.addEventListener('click', e => { e.preventDefault(); openResume(); });
resumeClose.addEventListener('click', closeResume);

// Close when clicking the dark backdrop (not the sheet itself)
resumeModal.addEventListener('click', e => {
  if (e.target === resumeModal) closeResume();
});

// Tab switching
resumeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    resumeTabs.forEach(t => t.classList.remove('active'));
    resumePanes.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ════════════════════════════════════════════════════════════════════════════════
// PROJECT DATA
// Add your real screenshots by replacing the placeholder src values.
// screenshots: array of { src, alt } objects
// ════════════════════════════════════════════════════════════════════════════════
const projects = {
  marinerec: {
    num:   '01 — Featured',
    title: 'MarineRec',
    short: 'Maritime Records Management System',
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'XAMPP'],
    liveLink: 'https://vcmers.free.nf/',
    screenshots: [
      { src: 'screenshots/marinerec-1.png', alt: 'Dashboard view' },
      { src: 'screenshots/marinerec-2.png', alt: 'Medical records list' },
      { src: 'screenshots/marinerec-3.png', alt: 'Upload record screen' },
    ],
    overview: 'MarineRec is a real-time web application designed for maritime students to securely store, organize, and access their medical records. It provides a centralized health record management system with cloud storage integration, enabling quick document retrieval and streamlined administration for maritime institutions.',
    features: [
      'Secure user authentication & role-based access',
      'Cloud document storage & quick retrieval',
      'Student dashboard with health record overview',
      'Admin panel for record management',
      'Real-time status updates on record submissions',
      'Responsive design for mobile access',
    ],
  },
  budgetbuddy: {
    num:   '02',
    title: 'Budget Buddy',
    short: 'Minimalist Personal Finance Tracker',
    stack: ['Vanilla JS', 'Chart.js', 'LocalStorage'],
    liveLink: '#',
    screenshots: [
      { src: 'screenshots/budgetbuddy-1.png', alt: 'Expense dashboard' },
      { src: 'screenshots/budgetbuddy-2.png', alt: 'Spending chart' },
    ],
    overview: 'Budget Buddy is a lightweight, browser-based finance tracker that requires no backend. All data lives in LocalStorage, giving users full privacy while still offering powerful visualizations of spending patterns and budget goal tracking.',
    features: [
      'Log income and expense entries',
      'Interactive Chart.js spending breakdowns',
      'Monthly budget goal setting',
      'Category-based filtering',
      'Zero-dependency, runs fully offline',
      'Data export as JSON',
    ],
  },
  devfolio: {
    num:   '03',
    title: 'Dev Folio UI Kit',
    short: 'Open-Source Developer Portfolio Component Library',
    stack: ['HTML/CSS', 'CSS Variables', 'Open Source'],
    liveLink: '#',
    screenshots: [
      { src: 'screenshots/devfolio-1.png', alt: 'Component preview' },
      { src: 'screenshots/devfolio-2.png', alt: 'Card components' },
    ],
    overview: 'Dev Folio UI Kit is a collection of 20+ hand-crafted, themeable components specifically designed for building developer portfolio websites. Available open-source on GitHub, it leverages CSS Custom Properties for easy theming with zero JavaScript dependencies.',
    features: [
      '20+ ready-to-use components',
      'CSS Custom Property theming system',
      'Dark & light mode support',
      'Fully responsive out of the box',
      'Copy-paste friendly code snippets',
      'MIT licensed & open source',
    ],
  },
};

// ── Project Modal Logic ───────────────────────────────────────────────────────
const projectModal      = document.getElementById('projectModal');
const projectModalClose = document.getElementById('projectModalClose');

let activeSlide = 0;

function buildScreenshots(shots) {
  const container = document.getElementById('pmScreenshots');
  const dotsEl    = document.getElementById('pmDots');
  container.innerHTML = '';
  dotsEl.innerHTML    = '';

  if (!shots || shots.length === 0) {
    container.innerHTML = '<div class="pm-no-screenshots">No screenshots available yet.</div>';
    return;
  }

  shots.forEach((shot, i) => {
    const slide = document.createElement('div');
    slide.className = 'pm-slide' + (i === 0 ? ' active' : '');
    slide.innerHTML = `<img src="${shot.src}" alt="${shot.alt}" onerror="this.parentElement.classList.add('pm-slide-placeholder')">
      <div class="pm-slide-placeholder-text">${shot.alt}</div>`;
    container.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'pm-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Screenshot ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsEl.appendChild(dot);
  });

  activeSlide = 0;
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.pm-slide');
  const dots   = document.querySelectorAll('.pm-dot');
  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i)   => d.classList.toggle('active', i === index));
  activeSlide = index;
}

function openProjectModal(key) {
  const p = projects[key];
  if (!p) return;

  document.getElementById('pmNum').textContent   = p.num;
  document.getElementById('pmTitle').textContent = p.title;
  document.getElementById('pmShort').textContent = p.short;
  document.getElementById('pmOverview').textContent = p.overview;

  // Stack tags
  const stackEl = document.getElementById('pmStack');
  stackEl.innerHTML = p.stack.map(t => `<span class="stack-tag">${t}</span>`).join('');

  // Features list
  const featEl = document.getElementById('pmFeatures');
  featEl.innerHTML = p.features.map(f => `<li>${f}</li>`).join('');

  // Live link removed per request

  buildScreenshots(p.screenshots);

  projectModal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeProjectModal() {
  projectModal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

projectModalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', e => {
  if (e.target === projectModal) closeProjectModal();
});

// Bind project cards
document.querySelectorAll('.project-showcase-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const key = btn.closest('.project-card').dataset.project;
    openProjectModal(key);
  });
});

// Also clicking anywhere on the card opens it
document.querySelectorAll('.project-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    openProjectModal(card.dataset.project);
  });
});

// Keyboard: Escape closes any open modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeResume();
    closeProjectModal();
  }
  // Arrow keys to navigate screenshots
  if (projectModal.classList.contains('open')) {
    const slides = document.querySelectorAll('.pm-slide');
    if (e.key === 'ArrowRight' && activeSlide < slides.length - 1) goToSlide(activeSlide + 1);
    if (e.key === 'ArrowLeft'  && activeSlide > 0)                  goToSlide(activeSlide - 1);
  }
});

// ════════════════════════════════════════════════════════════════════════════════
// CONTACT MESSAGE MODAL  —  uses EmailJS (free tier, no backend needed)
// ════════════════════════════════════════════════════════════════════════════════
// HOW TO SET UP (one-time, free):
//  1. Sign up at https://www.emailjs.com
//  2. Add an Email Service (Gmail) → note your SERVICE_ID
//  3. Create an Email Template → note your TEMPLATE_ID
//     Template variables used: {{from_name}}, {{from_email}}, {{message}}
//  4. Go to Account → API Keys → copy your PUBLIC_KEY
//  5. Replace the three placeholders below with your real values.
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← replace
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← replace
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← replace

const contactModal      = document.getElementById('contactModal');
const contactModalClose = document.getElementById('contactModalClose');
const contactEmailBtn   = document.getElementById('contactEmailBtn');
const contactForm       = document.getElementById('contactForm');
const cmStatus          = document.getElementById('cmStatus');
const cmSubmit          = document.getElementById('cmSubmit');

function openContactModal() {
  contactModal.classList.add('open');
  document.body.classList.add('modal-open');
}
function closeContactModal() {
  contactModal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

contactEmailBtn.addEventListener('click', openContactModal);
contactModalClose.addEventListener('click', closeContactModal);
contactModal.addEventListener('click', e => {
  if (e.target === contactModal) closeContactModal();
});

// Form submission via EmailJS
contactForm.addEventListener('submit', async e => {
  e.preventDefault();
  const name    = document.getElementById('cmName').value.trim();
  const email   = document.getElementById('cmEmail').value.trim();
  const message = document.getElementById('cmMessage').value.trim();

  if (!name || !email || !message) {
    showCmStatus('Please fill in all fields.', 'error');
    return;
  }

  // Show loading state
  cmSubmit.querySelector('.cm-submit-text').hidden = true;
  cmSubmit.querySelector('.cm-submit-loading').hidden = false;
  cmSubmit.disabled = true;

  try {
    // Dynamically load EmailJS SDK if not already present
    if (!window.emailjs) {
      await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js');
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name:  name,
      from_email: email,
      message:    message,
      to_email:   'ballescaian24@gmail.com',
    });

    showCmStatus('Message sent! I\'ll get back to you soon. 🎉', 'success');
    contactForm.reset();
  } catch (err) {
    console.error('EmailJS error:', err);
    showCmStatus('Something went wrong. Please try emailing me directly.', 'error');
  } finally {
    cmSubmit.querySelector('.cm-submit-text').hidden = false;
    cmSubmit.querySelector('.cm-submit-loading').hidden = true;
    cmSubmit.disabled = false;
  }
});

function showCmStatus(msg, type) {
  cmStatus.textContent = msg;
  cmStatus.className = 'cm-status cm-status--' + type;
  // Auto-clear success after 5s
  if (type === 'success') setTimeout(() => { cmStatus.textContent = ''; cmStatus.className = 'cm-status'; }, 5000);
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

// Also close contact modal on Escape (add to existing keydown listener)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeContactModal();
}, true);