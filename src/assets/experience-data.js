export const samples = [
  { period: '7 dias', unit: 'Dia', response: 142, uptime: 99.92, events: [72, 88, 76, 102, 94, 114, 126] },
  { period: '30 dias', unit: 'Bloco de 6 dias', response: 156, uptime: 99.85, events: [420, 510, 548, 484, 660] },
  { period: '90 dias', unit: 'Bloco de 15 dias', response: 168, uptime: 99.78, events: [1070, 1320, 1480, 1510, 1680, 1830] },
];

export const metrics = sample => [
  { label: 'Resposta média', value: sample.response, suffix: ' ms', decimals: 0 },
  { label: 'Disponibilidade', value: sample.uptime, suffix: '%', decimals: 2 },
  { label: 'Eventos processados', value: sample.events.reduce((sum, count) => sum + count, 0), suffix: '', decimals: 0 },
];

const numberFormats = [0, 2].map(digits =>
  new Intl.NumberFormat('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits })
);
export const formatMetric = (item, value = item.value) =>
  numberFormats[item.decimals === 2 ? 1 : 0].format(value) + item.suffix;
