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
