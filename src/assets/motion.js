import { createNeuralScene } from './neural.js';

const root = document.documentElement;
const control = document.querySelector('#motion-toggle');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const canvas = document.querySelector('#neural-canvas');
const scene = canvas ? createNeuralScene(canvas) : null;
let paused = false;
let inView = false;
let frame = 0;
let lastDraw = 0;
let seconds = 0;

try {
  paused = sessionStorage.getItem('qalyon-motion') === 'paused';
} catch {
  // The control still works if browser storage is unavailable.
}

const reveal = new IntersectionObserver(entries => {
  for (const { target, isIntersecting } of entries) {
    if (!isIntersecting) continue;
    target.classList.add('motion-enter');
    reveal.unobserve(target);
  }
}, { threshold: .12 });

for (const element of document.querySelectorAll(
  'main .section > h2, main .section > .lead, .service-list article, .card, .atlas-card, .steps li, .split > *, .contact-panel, .demo, [data-holo], .prose > h2, .prose > p, .close-inner',
)) reveal.observe(element);

const holograms = new IntersectionObserver(entries => {
  for (const { target, isIntersecting } of entries) {
    target.classList.toggle('holo-live', isIntersecting);
  }
});
for (const diagram of document.querySelectorAll('[data-holo]')) holograms.observe(diagram);

function animate(now) {
  if (now - lastDraw >= 32) {
    if (lastDraw) seconds = (seconds + Math.min((now - lastDraw) / 1000, .08)) % 10;
    scene.draw(seconds);
    lastDraw = now;
  }
  frame = requestAnimationFrame(animate);
}

function sync() {
  const still = paused || reduced.matches;
  root.toggleAttribute('data-motion-paused', still);
  control.hidden = reduced.matches;
  control.textContent = paused ? 'Retomar movimento' : 'Pausar movimento';
  if (scene && !still && inView && !document.hidden) {
    if (!frame) frame = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(frame);
    frame = 0;
    lastDraw = 0;
  }
}

control.addEventListener('click', () => {
  paused = !paused;
  try {
    sessionStorage.setItem('qalyon-motion', paused ? 'paused' : 'active');
  } catch {
    // A blocked storage write does not prevent pausing this page.
  }
  sync();
});
reduced.addEventListener('change', sync);
document.addEventListener('visibilitychange', sync);
if (scene) {
  scene.draw(0);
  const visibility = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    sync();
  });
  visibility.observe(canvas);
}
sync();
