// Portfolio Scripts
const slidesEl = document.getElementById('slides');
const slides = document.querySelectorAll('.slide');
const navBtns = document.querySelectorAll('.nav-btn');
const gotoBtns = document.querySelectorAll('[data-target]');
const indicatorsEl = document.getElementById('indicators');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const openBtns = document.querySelectorAll('.open-btn');
const yearEl = document.getElementById('year');

// Year
if (yearEl) yearEl.textContent = new Date().getFullYear();

// CHANGED: Removed indicator build/scroll logic since it's now standard vertical scroll
if (indicatorsEl) indicatorsEl.innerHTML = '';

// Fixed template literal issue in setActive
function setActive(index) {
  const targetId = `slide-${index}`; // ✅ FIXED: use backticks for template literals
  navBtns.forEach(b => b.classList.toggle('active', b.dataset.target === targetId));
}

// NEW: Intersection Observer to handle active state on vertical scroll
const observerOptions = {
  root: null,
  rootMargin: "-20% 0px -20% 0px",
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = Number(entry.target.dataset.index);
      setActive(index);
    }
  });
}, observerOptions);

// Start observing all sections
slides.forEach(slide => {
  sectionObserver.observe(slide);
});

// Nav and goto buttons
gotoBtns.forEach(btn => btn.addEventListener('click', () => {
  const target = btn.dataset.target;
  const slide = document.getElementById(target);
  if (!slide) return;

  slide.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const index = Number(slide.dataset.index);
  setActive(index);
}));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ') {
    return;
  }
});

// Modal
openBtns.forEach(btn => btn.addEventListener('click', (e) => {
  const card = e.target.closest('.project-card');
  const title = card.dataset.title;
  const desc = card.dataset.desc;
  const imgs = JSON.parse(card.dataset.imgs);

  // ✅ FIXED: wrap HTML in backticks
  modalBody.innerHTML = `
    <h3>${title}</h3>
    <p>${desc}</p>
    ${imgs.map(src => `<img src="${src}" style="width:100%;border-radius:8px;margin:10px 0;">`).join('')}
  `;

  modal.classList.add('open');
}));

closeModal.addEventListener('click', () => modal.classList.remove('open'));

modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('open');
});

// Labs section
const labsGrid = document.getElementById('labsGrid');
if (labsGrid) {
  const LABS = [
    { title: 'Lab Activity 1', desc: 'Web Introduction', link: 'lab1.html', thumb: 'https://via.placeholder.com/300x150?text=Lab+1' },
    { title: 'Lab Activity 2', desc: 'CSS Styling and Layout', link: 'lab2.html', thumb: 'https://via.placeholder.com/300x150?text=Lab+2' },
    { title: 'Lab Activity 3', desc: 'Card Hover Effect', link: 'lab3.html', thumb: 'https://via.placeholder.com/300x150?text=Lab+3' },
    { title: 'Lab Activity 4', desc: 'Dark Mode Toggle', link: 'lab4.html', thumb: 'https://via.placeholder.com/300x150?text=Lab+4' },
    { title: 'Lab Activity 5', desc: 'Form Validation', link: 'lab5.html', thumb: 'https://via.placeholder.com/300x150?text=Lab+5' },
  ];

  labsGrid.innerHTML = LABS.map(lab => `
    <article class="card project-card" data-title="${lab.title}" data-desc="${lab.desc}" data-imgs='["${lab.thumb}"]'>
      <div class="project-thumb" style="background-image:url(${lab.thumb}); background-size:cover;"></div>
      <h4>${lab.title}</h4>
      <div class="muted">${lab.desc}</div>
      <a href="${lab.link}" class="btn" target="_blank">Open Lab</a>
    </article>
  `).join('');
}
