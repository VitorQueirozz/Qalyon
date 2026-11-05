import { samples, metrics, formatMetric } from './experience-data.js';

const roadmap = document.querySelector('[data-roadmap]');
const track = roadmap.querySelector('.roadmap-track');
const nodes = [...track.querySelectorAll('button')];
const details = nodes.map(node => document.getElementById(node.getAttribute('aria-controls')));

function selectStep(index) {
  nodes.forEach((node, i) => {
    node.setAttribute('aria-pressed', String(i === index));
    details[i].hidden = i !== index;
  });
}

nodes.forEach((node, index) => {
  node.disabled = false;
  node.addEventListener('click', () => selectStep(index));
});

const dashboard = document.querySelector('[data-metrics]');
const periods = dashboard.querySelector('.metric-periods');
const periodButtons = [...periods.querySelectorAll('button')];
const counters = [...dashboard.querySelectorAll('[data-counter]')];
const chart = dashboard.querySelector('[data-chart]');
const chartPeriod = dashboard.querySelector('[data-chart-period]');
const status = dashboard.querySelector('[data-metrics-status]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let selected = 0;
let frame = 0;

const motionAllowed = () => !reduced.matches && !document.documentElement.hasAttribute('data-motion-paused') && !document.hidden;

function renderChart(sample) {
  const max = Math.max(...sample.events);
  const bars = sample.events.map((value, index) => {
    const item = document.createElement('li');
    const label = document.createElement('small');
    label.textContent = sample.unit + ' ' + (index + 1);
    const count = document.createElement('span');
    count.textContent = formatMetric({ value, suffix: '', decimals: 0 });
    const meter = document.createElement('meter');
    meter.min = 0;
    meter.max = max;
    meter.value = value;
    meter.setAttribute('aria-label', label.textContent);
    meter.setAttribute('aria-hidden', 'true');
    item.append(count, meter, label);
    return item;
  });
  chart.replaceChildren(...bars);
  chartPeriod.textContent = '· ' + sample.period;
}

function countUp(items, animate) {
  cancelAnimationFrame(frame);
  const start = performance.now();
  function draw(now) {
    const progress = animate && motionAllowed() ? Math.min((now - start) / 760, 1) : 1;
    const eased = 1 - (1 - progress) ** 3;
    items.forEach((item, index) => {
      counters[index].textContent = formatMetric(item, item.value * eased);
    });
    if (progress < 1) frame = requestAnimationFrame(draw);
  }
  draw(start);
}

function selectPeriod(index, announce = false) {
  selected = index;
  const sample = samples[index];
  const items = metrics(sample);
  periodButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  renderChart(sample);
  countUp(items, announce);
  if (announce) {
    status.textContent = sample.period + '. ' + items.map(item => item.label + ': ' + formatMetric(item)).join('. ');
  }
}

periodButtons.forEach((button, index) => {
  button.disabled = false;
  button.addEventListener('click', () => {
    if (index !== selected) selectPeriod(index, true);
  });
});
const observer = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting) return;
  observer.disconnect();
  countUp(metrics(samples[selected]), true);
}, { threshold: .25 });
observer.observe(dashboard);
