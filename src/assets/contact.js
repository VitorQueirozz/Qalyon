const form = document.querySelector('#quote-form');
const service = form.querySelector('#service');
const requested = new URLSearchParams(location.search).get('servico');

if ([...service.options].some(option => option.value === requested)) {
  service.value = requested;
}

form.addEventListener('submit', event => event.preventDefault());
