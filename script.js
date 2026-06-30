const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach(item => observer.observe(item));

const burger = document.querySelector('.burger');
const nav = document.querySelector('#siteNav');
const navLinks = document.querySelectorAll('#siteNav a');

function closeMenu() {
  if (!burger || !nav) return;
  burger.classList.remove('is-active');
  nav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Открыть меню');
}

function openMenu() {
  if (!burger || !nav) return;
  burger.classList.add('is-active');
  nav.classList.add('is-open');
  document.body.classList.add('menu-open');
  burger.setAttribute('aria-expanded', 'true');
  burger.setAttribute('aria-label', 'Закрыть меню');
}

if (burger && nav) {
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.contains('is-active');
    isOpen ? closeMenu() : openMenu();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

const levelsInput = document.querySelector('#levels');
const levelsValue = document.querySelector('#levelsValue');
const lastLevel = document.querySelector('#lastLevel');
const totalNetwork = document.querySelector('#totalNetwork');

function formatNumber(value) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

function updateCalculator() {
  const levels = Number(levelsInput.value);
  const last = Math.pow(2, levels - 1);
  const total = Math.pow(2, levels) - 1;

  levelsValue.textContent = levels;
  lastLevel.textContent = formatNumber(last);
  totalNetwork.textContent = formatNumber(total);
}

if (levelsInput) {
  levelsInput.addEventListener('input', updateCalculator);
  updateCalculator();
}
