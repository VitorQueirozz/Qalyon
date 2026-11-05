const form = document.querySelector('#quote-form');
const service = form.elements.service;
const requested = new URLSearchParams(location.search).get('servico');
const dialog = document.querySelector('#quote-dialog');
const summary = document.querySelector('#quote-summary');
const status = document.querySelector('#quote-copy-status');
const send = document.querySelector('#quote-send');
const email = document.querySelector('#quote-email');
const review = document.querySelector('#quote-review');

if ([...service.options].some(option => option.value === requested)) {
  service.value = requested;
}

const fields = [
  ['name', 'Nome'],
  ['reply', 'Contato'],
  ['business', 'Empresa ou marca'],
  ['service', 'Serviço'],
  ['stage', 'Momento do projeto'],
  ['goal', 'Objetivo'],
  ['deadline', 'Prazo desejado'],
  ['budget', 'Orçamento previsto'],
  ['reference', 'Site ou referência'],
];

function validate() {
  const name = form.elements.name;
  const reply = form.elements.reply;
  const goal = form.elements.goal;
  const contact = reply.value.trim();
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const phone = /^\+?[\d\s().-]+$/.test(contact) && /^\d{10,15}$/.test(contact.replace(/\D/g, ''));
  name.setCustomValidity(name.value.trim() ? '' : 'Informe seu nome.');
  reply.setCustomValidity(email || phone ? '' : 'Informe um e-mail válido ou um telefone com DDD.');
  goal.setCustomValidity(goal.value.trim().length >= 10 ? '' : 'Descreva seu objetivo em pelo menos 10 caracteres.');
  return form.reportValidity();
}

form.addEventListener('input', ({ target }) => target.setCustomValidity(''));
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!validate()) return;

  const rows = fields.flatMap(([key, label]) => {
    const input = form.elements[key];
    if (!input.value.trim()) return [];
    const value = input instanceof HTMLSelectElement ? input.selectedOptions[0].text : input.value.trim();
    return [label + ': ' + value];
  });
  summary.value = ['Olá, Qalyon! Gostaria de um orçamento.', '', ...rows].join('\n');
  status.textContent = '';
  if (send) {
    const url = new URL(form.dataset.whatsappUrl);
    url.searchParams.set('text', summary.value);
    send.href = url.href;
  }
  const subject = encodeURIComponent('Solicitação de orçamento — Qalyon');
  const body = encodeURIComponent(summary.value.replace(/\n/g, '\r\n'));
  email.href = form.dataset.emailUrl + '?subject=' + subject + '&body=' + body;
  dialog.showModal();
});

document.querySelector('#quote-close').addEventListener('click', () => dialog.close());
document.querySelector('#quote-copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(summary.value);
    status.textContent = 'Briefing copiado.';
  } catch {
    summary.focus();
    summary.select();
    status.textContent = 'Use a opção de copiar do seu dispositivo para copiar o texto selecionado.';
  }
});
review.disabled = false;
