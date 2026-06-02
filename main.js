// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target))
    mobileMenu.classList.remove('open');
});
function closeMobile() { mobileMenu.classList.remove('open'); }

// Photo filter tabs
const tabs = document.querySelectorAll('.tab');
const items = document.querySelectorAll('.photo-item');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    items.forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      item.classList.toggle('hidden', !match);
    });
  });
});

// Contact form
function handleForm(e) {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.textContent = '✓ Message received! I\'ll get back to you soon.';
  e.target.reset();
}

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.about-photo-wrap, .about-text, .photo-item, .video-item, .service-card, .contact-left, .cform'
);
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const all = Array.from(revealEls);
      const siblings = all.filter(el =>
        el.parentElement === entry.target.parentElement
      );
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 80);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => io.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  });
});
