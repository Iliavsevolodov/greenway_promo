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

  const heroCardText = document.querySelector('.hero-card p');
  if (heroCardText) {
    heroCardText.textContent = 'Не нужно искать толпу людей. Даже если приглашать одного человека в месяц и помогать ему повторять это действие, сеть покупателей может постепенно расти.';
  }

  const strategySection = document.querySelector('#strategy');
  if (strategySection) {
    const eyebrow = strategySection.querySelector('.eyebrow');
    const title = strategySection.querySelector('.section-heading h2');
    const text = strategySection.querySelector('.section-heading p');

    if (eyebrow) eyebrow.textContent = '1 человек в месяц';
    if (title) title.textContent = 'Рост начинается не с толпы, а с одного нового человека.';
    if (text) {
      text.textContent = 'Смысл простой: ты приглашaешь хотя бы одного человека в месяц, показываешь ему магазин и помогаешь сделать то же самое. Так создаётся повторяемое действие, из которого постепенно растёт сеть покупателей и товарооборот.';
    }

    const stepLabels = strategySection.querySelectorAll('.step span');
    const labels = ['Ты', '+1 в месяц', 'повтор', 'сеть'];
    stepLabels.forEach((label, index) => {
      if (labels[index]) label.textContent = labels[index];
    });

    const networkBadge = strategySection.querySelector('.network-badge');
    const networkTitle = strategySection.querySelector('.network-copy h3');
    const networkText = strategySection.querySelector('.network-copy p');

    if (networkBadge) networkBadge.textContent = 'как растёт сеть покупателей';
    if (networkTitle) networkTitle.textContent = 'Один человек в месяц может запустить цепочку повторения';
    if (networkText) {
      networkText.textContent = 'Ты показываешь магазин одному человеку. Потом помогаешь ему повторить этот же шаг. Когда действие повторяется из месяца в месяц, сеть покупателей начинает расти по уровням.';
    }
  }

  const calcSection = document.querySelector('.calculator-section');
  if (calcSection) {
    const title = calcSection.querySelector('h2');
    const text = calcSection.querySelector('p:not(.eyebrow):not(.calc-note)');
    if (title) title.textContent = 'Посмотри, как растёт сеть, если приглашать 1 человека в месяц';
    if (text) {
      text.textContent = 'Калькулятор показывает принцип роста: каждый новый человек может повторить действие и пригласить ещё одного. Это не обещание дохода, а понятная демонстрация логики сети.';
    }
  }

  document.querySelectorAll('.final-card h2').forEach(title => {
    title.textContent = title.textContent
      .replace('модель «1 человек в месяц» работает', 'модель “1 человек в месяц” работает')
      .replace('стратегия 1+1 работает', 'модель “1 человек в месяц” работает');
  });
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
