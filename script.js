function applyOnePersonMonthCopy() {
  const phraseReplacements = [
    ['стратегия 1+1', 'модель «1 человек в месяц»'],
    ['Стратегия 1+1', 'Модель «1 человек в месяц»'],
    ['стратегию 1+1', 'модель «1 человек в месяц»'],
    ['стратегии 1+1', 'модели «1 человек в месяц»'],
    ['моделью 1+1', 'моделью «1 человек в месяц»'],
    ['модели 1+1', 'модели «1 человек в месяц»'],
    ['по модели 1+1', 'по модели «1 человек в месяц»'],
    ['1+1', '1 человек в месяц']
  ];

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (['SCRIPT', 'STYLE', 'SVG', 'SYMBOL', 'PATH', 'USE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach(node => {
    let text = node.nodeValue;
    phraseReplacements.forEach(([from, to]) => {
      text = text.split(from).join(to);
    });
    node.nodeValue = text;
  });

  const navStrategyLinks = document.querySelectorAll('a[href="#strategy"]');
  navStrategyLinks.forEach(link => {
    if (link.textContent.includes('1 человек в месяц')) {
      link.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.nodeValue = '1 в месяц';
      });
    }
  });

  const bigNumber = document.querySelector('.big-number');
  if (bigNumber) bigNumber.textContent = '1/мес';

  const heroCardText = document.querySelector('.pulse-card p, .hero-card p');
  if (heroCardText) {
    heroCardText.textContent = 'Не нужно искать толпу людей. Даже если приглашать одного человека в месяц и помогать ему повторять это действие, сеть покупателей может постепенно расти.';
  }
}

applyOnePersonMonthCopy();

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
  if (!levelsInput || !levelsValue || !lastLevel || !totalNetwork) return;

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

function animateCount(el) {
  const end = Number(el.dataset.count || 0);
  const duration = Number(el.dataset.duration || 1400);
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(end * eased);
    el.textContent = formatNumber(value);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll('.count-number');
const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach(counter => counterObserver.observe(counter));
