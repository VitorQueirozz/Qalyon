import { samples, metrics, formatMetric } from './assets/experience-data.js';
import { site, contact, services, products, projects, process, media } from './content.mjs';

const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

const heading = (label, title, description = '') => `
  <p class="label">${label}</p><h1>${title}</h1>
  ${description ? `<p class="lead">${description}</p>` : ''}`;
const link = (href, label, primary = false) =>
  `<a class="${primary ? 'button' : 'arrow-link'}" href="${escape(href)}">${label}<span aria-hidden="true">↗</span></a>`;
const quote = (slug = '') =>
  link(slug ? '/contato/?servico=' + encodeURIComponent(slug) : '/contato/', 'Solicitar orçamento', true);
const servicePath = service => `/servicos/${service.slug}/`;
const projectPath = project => `/projetos/${project.slug}/`;
const productPath = product => `/produtos/${product.slug}/`;

const brandImage = (alt, className) =>
  `<img${className ? ' class="' + className + '"' : ''} src="/assets/logo.webp" width="600" height="190" alt="${alt}">`;

const picture = (key, extra = '') => `<img class="photo ${extra}" src="/assets/${key}-640.webp"
  srcset="/assets/${key}-640.webp 640w, /assets/${key}-1280.webp 1280w"
  sizes="(max-width: 720px) 92vw, 46vw" width="640" height="360"
  alt="${escape(media[key])}" loading="lazy" decoding="async">`;

const serviceList = () => `<div class="service-list">${services.map(service => `
  <article><h3>${service.title}</h3>
  <p>${service.summary}</p>${link(servicePath(service), 'Conhecer ' + service.title.toLowerCase())}</article>`).join('')}</div>`;

const projectPreview = project => {
  if (project.service === 'sites-institucionais') {
    return `<div class="project-preview preview-institutional" aria-hidden="true">
      <div class="preview-browser">
        <div class="preview-browser-bar"><i></i><i></i><i></i></div>
        <div class="preview-institutional-body">
          <div><span>ALMEIDA TORRES</span><strong>O Direito em perspectiva.</strong><small>Áreas de atuação ↗</small></div>
          <img src="/assets/almeida-torres.webp" alt="" width="600" height="343" loading="lazy" decoding="async">
        </div>
      </div>
    </div>`;
  }
  if (project.service === 'landing-pages') {
    return `<div class="project-preview preview-landing" aria-hidden="true">
      <div class="preview-browser">
        <div class="preview-browser-bar"><i></i><i></i><i></i></div>
        <div class="preview-landing-body"><span>CASA EM DIA</span><strong>Seu espaço, bem cuidado.</strong>
          <small>Pedir orçamento ↗</small></div>
        <div class="preview-landing-shape"></div>
      </div>
    </div>`;
  }
  if (project.service === 'sistemas-web') {
    return `<div class="project-preview preview-system" aria-hidden="true">
      <div class="preview-browser">
        <div class="preview-browser-bar"><i></i><i></i><i></i></div>
        <div class="preview-system-body"><span>ORDENS DE SERVIÇO</span><strong>Visão da operação</strong>
          <div><i></i> Agendar <b>OS-101</b></div>
          <div><i></i> Em execução <b>OS-102</b></div>
          <div><i></i> Concluído <b>OS-103</b></div>
        </div>
      </div>
    </div>`;
  }
  return `<div class="project-preview preview-portfolio">${picture(project.image)}</div>`;
};

const projectCards = () => `<div class="cards showcase-grid">${projects.map(project => `
  <article class="card showcase-card">
    ${projectPreview(project)}
    <div class="card-copy">
      <p class="showcase-meta"><span>${project.category}</span><span>${project.kind}</span></p>
      <h3>${project.title}</h3><p>${services.find(service => service.slug === project.service).summary}</p>
      <a class="showcase-link" href="${projectPath(project)}" aria-label="Ver demonstração: ${escape(project.title)}">
        Ver demonstração <span aria-hidden="true">↗</span>
      </a>
    </div>
  </article>`).join('')}</div>`;

const productPreview = product => product.preview ? `
  <figure class="product-preview">
    <figcaption><span>Fluxo previsto</span><small>Exemplo ilustrativo</small></figcaption>
    <strong>${escape(product.preview.title)}</strong>
    <ol>${product.preview.stages.map(([stage, status], index) => `
      <li${index === 1 ? ' class="product-preview-current"' : ''}>
        <span>${escape(stage)}</span><span>${escape(status)}</span>
      </li>`).join('')}</ol>
  </figure>` : '';

const productCards = () => `<div class="product-list">${products.map(product => `
  <article class="atlas-card">
    <div class="product-copy">
      <p class="label product-status">${product.status}</p>
      <h3>${product.title}<span>by Qalyon</span></h3>
      <p>${product.summary}</p>
      ${link(productPath(product), 'Conhecer ' + product.title)}
    </div>
    ${productPreview(product)}
  </article>`).join('')}</div>`;

const steps = items => `<ol class="steps">${items.map(([title, description]) => `
  <li>
  <h3>${title}</h3><p>${description}</p></li>`).join('')}</ol>`;

const pageIntro = (label, title, description, actions = '') => `
  <section class="wrap page-intro">${heading(label, title, description)}
  ${actions ? `<div class="actions">${actions}</div>` : ''}</section>`;

const sectionTitle = (label, title, description = '') => `
  <p class="label">${label}</p><h2>${title}</h2>${description ? `<p class="lead">${description}</p>` : ''}`;

const close = () => `<section class="close"><div class="wrap close-inner">
  <div><p class="label">Seu próximo projeto</p><h2>O que você quer construir?</h2>
  <p>Conte seu objetivo em poucas linhas. O escopo e o orçamento são definidos depois da primeira conversa.</p></div>
  ${quote()}</div></section>`;

const icon = path => `<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg>`;

const roadmap = [
  {
    title: 'Diagnóstico', summary: 'Objetivos, público e prioridades',
    description: 'Entendemos a operação e o que o projeto precisa resolver. O diagnóstico orienta o orçamento e ajuda a definir quais entregas fazem sentido para o seu momento.',
    deliverable: 'Escopo, proposta e critérios de entrega',
    participation: 'Você apresenta o contexto e valida o escopo.',
    icon: 'M30 20a10 10 0 1 0-20 0 10 10 0 0 0 20 0z M28 28l10 10',
  },
  {
    title: 'Design e arquitetura', summary: 'Navegação, visual e estrutura',
    description: 'Planejamos o caminho de quem usa o site e organizamos conteúdo, páginas e componentes. A estrutura técnica acompanha as necessidades identificadas no diagnóstico.',
    deliverable: 'Mapa de páginas e direção visual',
    participation: 'Você revisa o visual e a navegação.',
    icon: 'M7 11h34v26H7z M7 18h34 M13 14h.1 M17 14h.1 M12 24h10v8H12z M27 25h8 M27 30h8',
  },
  {
    title: 'Código e segurança', summary: 'Implementação, proteção e testes',
    description: 'Construímos a interface, integramos os recursos contratados e testamos os fluxos principais. Os cuidados de segurança são definidos conforme a exposição e os dados do projeto.',
    deliverable: 'Versão navegável e validação dos fluxos',
    participation: 'Você experimenta a prévia antes de aprovar a publicação.',
    icon: 'm17 14-10 10 10 10 m14-20 10 10-10 10 M27 10 21 38',
  },
  {
    title: 'Publicação e escala', summary: 'Site no ar e próximos passos',
    description: 'Publicamos no domínio combinado, conferimos os acessos e orientamos a entrega. Com o site em uso, os dados ajudam a identificar quais melhorias merecem prioridade.',
    deliverable: 'Publicação, acessos e orientações de evolução',
    participation: 'Você aprova a entrega e recebe as orientações de uso.',
    icon: 'M10 23v16h28V23 M24 32V8 m-9 9 9-9 9 9',
  },
];

const flowSection = `
<section class="holo-section tinted"><div class="wrap section">
  ${sectionTitle('Como trabalhamos', 'Do diagnóstico ao site no ar.', 'Explore as etapas para ver o que entregamos e onde você participa.')}
  <div class="roadmap holo-benefits" data-holo data-roadmap>
    <div class="roadmap-track" role="group" aria-label="Escolher etapa do projeto">
      ${roadmap.map((step, index) => `<button type="button" disabled aria-controls="roadmap-${index}" aria-pressed="${index === 0}">
        <span class="holo-icon">${icon(step.icon)}</span><span><strong>${step.title}</strong><small>${step.summary}</small></span>
        <span class="roadmap-arrow" aria-hidden="true">↗</span></button>`).join('')}
    </div>
    <div class="roadmap-panels">
      ${roadmap.map((step, index) => `<article class="glass roadmap-detail" id="roadmap-${index}"${index ? ' hidden' : ''}>
        <span class="holo-icon">${icon(step.icon)}</span>
        <h3>${step.title}</h3><p>${step.description}</p>
        <dl><div><dt>O que você recebe</dt><dd>${step.deliverable}</dd></div>
        <div><dt>Sua participação</dt><dd>${step.participation}</dd></div></dl>
      </article>`).join('')}
      <noscript><p>Próximas etapas: design e arquitetura, código e segurança, publicação e escala.</p></noscript>
    </div>
  </div>
</div></section>`;

const initialSample = samples[0];
const metricsSection = `
<section class="wrap section holo-section">
  ${sectionTitle('Indicadores de software', 'Dados que ajudam a decidir.', 'Veja como um painel pode acompanhar o volume de uso e a saúde de um sistema ao longo do tempo.')}
  <div class="glass metrics-panel" data-metrics>
    <div class="metrics-header">
      <div><p class="label">Dados simulados</p><h3>Visão da operação</h3></div>
      <div class="metric-periods" role="group" aria-label="Período da simulação">
        ${samples.map((sample, i) => `<button type="button" disabled aria-pressed="${i === 0}">${sample.period}</button>`).join('')}
      </div>
    </div>
    <p class="metrics-note">Exemplo de painel. Os valores são fictícios e não medem o desempenho da Qalyon ou do Atlas.</p>
    <dl class="metrics-grid">
      ${metrics(initialSample).map(item => `<div><dt>${item.label}</dt><dd><span data-counter>${formatMetric(item)}</span></dd></div>`).join('')}
    </dl>
    <figure class="metrics-chart">
      <figcaption>Eventos por intervalo <span data-chart-period>· ${initialSample.period}</span></figcaption>
      <ol class="chart-columns" data-chart aria-label="Eventos em cada intervalo">
        ${initialSample.events.map((value, index) => `<li><span>${value}</span><meter min="0" max="${Math.max(...initialSample.events)}" value="${value}" aria-hidden="true"></meter><small>Dia ${index + 1}</small></li>`).join('')}
      </ol>
    </figure>
    <p class="sr-only" data-metrics-status role="status"></p>
  </div>
</section>`;

const benefitsSection = `
<section class="wrap section holo-section">
  ${sectionTitle('Presença digital', 'O que seu site facilita na prática.', 'Dê ao cliente um lugar para conhecer seu trabalho e decidir como falar com você.')}
  <div class="holo-benefits" data-holo>
    <div class="holo-hub"><span class="holo-icon">${icon('M6 10h36v28H6z M6 17h36 M12 13h.1 M16 13h.1 M22 23h13 M22 29h10 M12 23h5v9h-5z')}</span><p>Seu site</p></div>
    <ul class="holo-branches">
      <li><span class="holo-icon">${icon('M30 20a10 10 0 1 0-20 0 10 10 0 0 0 20 0z M28 28l10 10')}</span><div><h3>Ser encontrado</h3><p>Tenha um endereço próprio para compartilhar nas redes e facilitar a descoberta pelos buscadores.</p></div></li>
      <li><span class="holo-icon">${icon('M8 12h32v25H8z M17 12V8h14v4 M8 23h32 M21 23v4h6v-4')}</span><div><h3>Mostrar seu trabalho</h3><p>Reúna serviços, exemplos e respostas às dúvidas que surgem antes da contratação.</p></div></li>
      <li><span class="holo-icon">${icon('M7 10h34v24H20l-9 6v-6H7z M14 19h20 M14 25h15')}</span><div><h3>Facilitar o contato</h3><p>Deixe claro como pedir um orçamento, agendar uma conversa ou chamar no seu canal de atendimento.</p></div></li>
    </ul>
  </div>
</section>`;

const home = `
<section class="hero-stage">
<div class="neural-scene" aria-hidden="true">
  <canvas id="neural-canvas" width="960" height="540"></canvas>
</div>
<div class="wrap home-hero">
  <div class="hero-main">
  ${brandImage('Qalyon Tecnologia', 'hero-brand')}
  ${heading('Software house brasileira', site.slogan,
    'A Qalyon cria seus próprios SaaS e desenvolve sites, landing pages, portfólios profissionais e sistemas web sob medida.')}
  <div class="actions">${quote()}${link('/servicos/', 'Explorar serviços')}</div></div>
  <aside class="hero-index" aria-label="Frentes da Qalyon">
    <p class="label"><span class="dot"></span> Qalyon / duas frentes</p>
    <a href="/produtos/"><span><strong>Produtos próprios</strong><small>Atlas, nosso primeiro SaaS</small></span><span aria-hidden="true">↗</span></a>
    <a href="/servicos/"><span><strong>Serviços digitais</strong><small>Da presença digital à operação</small></span><span aria-hidden="true">↗</span></a>
  </aside>
  <button type="button" class="motion-toggle" id="motion-toggle" hidden>Pausar movimento</button>
</div>
</section>
<section class="band"><div class="wrap band-inner"><span>Estratégia, design e código</span><span>Projetos avulsos</span><span>Propostas sob consulta</span></div></section>
<section class="wrap section">${sectionTitle('Serviços digitais', 'O projeto certo para o seu objetivo.',
  'Desenvolvimento para profissionais autônomos, pequenos negócios e equipes com necessidades próprias.')}
  ${serviceList()}</section>
<section class="tinted showcase-section"><div class="wrap section">
  <div class="showcase-heading"><div>${sectionTitle('Mostruário', 'Veja como uma ideia ganha forma.',
  'Demonstrações autorais para explorar soluções, conteúdo e navegação em diferentes contextos.')}</div>
  ${link('/projetos/', 'Explorar o mostruário')}</div>
  ${projectCards()}</div></section>
<section class="wrap section">${sectionTitle('Produtos próprios', 'Do orçamento ao pagamento, em um só fluxo.')}${productCards()}</section>
${flowSection}
${metricsSection}
${benefitsSection}
${close()}`;

const servicesPage = `
${pageIntro('Serviços digitais', 'Desenvolvimento sob medida para o seu negócio.',
  'Apresente sua empresa com um site institucional, mostre seus trabalhos com um portfólio, divulgue uma oferta com uma landing page ou organize sua operação com um sistema web.', quote())}
<section class="wrap section compact">${sectionTitle('Catálogo', 'Escolha pelo que você precisa resolver.')}${serviceList()}</section>
<section class="tinted"><div class="wrap section split"><div>${sectionTitle('Condições comerciais', 'Um projeto por vez, com escopo claro.')}</div>
<div class="body-copy"><p>Os serviços são contratados como projetos avulsos, com preço sob consulta. A proposta descreve escopo, entregas, prazos e condições de pagamento.</p>
<p>O domínio e a hospedagem são de titularidade do cliente. A configuração e a publicação são alinhadas no escopo. Novas demandas podem receber orçamento próprio.</p>
${quote()}</div></div></section>`;

const servicePage = service => `
${pageIntro('Serviços digitais', service.title, service.summary, quote(service.slug))}
<section class="wrap section compact split">
  <div class="body-copy"><h2>Para quem serve</h2><p>${service.audience}</p><h2>O que pode incluir</h2>
  <ul class="feature-list">${service.includes.map(item => `<li>${item}</li>`).join('')}</ul>
  <p>${service.extra}</p>
  ${service.slug === 'sites-institucionais' ? '<p id="portfolio-profissional">Seu objetivo principal é apresentar trabalhos e especialidades? ' + link('/servicos/portfolio-profissional/', 'Conhecer portfólios profissionais') + '</p>' : ''}
  ${service.slug === 'portfolio-profissional' ? link('/projetos/portfolio-de-arquitetura/', 'Ver exemplo de portfólio') : ''}
  </div>${picture(service.image)}</section>
<section class="tinted"><div class="wrap section split">
  <div>${sectionTitle('Orçamento', 'Vamos entender o que você precisa.')}</div>
  <div class="body-copy"><p>Conte seu objetivo e o tipo de projeto. A contratação é avulsa e o preço é sob consulta. O domínio e a hospedagem ficam em sua titularidade.</p>${quote(service.slug)}
  ${link('/servicos/', 'Voltar para serviços')}</div></div></section>`;

const productsPage = `
${pageIntro('Produtos próprios', 'Produtos criados pela Qalyon.',
  'Desenvolvemos SaaS próprios para organizar processos e facilitar o trabalho de quem presta serviços.')}
<section class="wrap section compact">${sectionTitle('Primeiro SaaS da Qalyon', 'Do orçamento ao pagamento.')}${productCards()}</section>`;

const productPage = product => `
${pageIntro('Produto próprio / ' + product.status, product.title + ' by Qalyon', product.summary)}
<section class="wrap section compact split"><div>${sectionTitle('Contexto', 'Cada serviço tem uma sequência.')}<p class="lead">${product.problem}</p></div>
  ${productPreview(product)}</section>
<section class="tinted"><div class="wrap section">${sectionTitle('Em desenvolvimento', 'Fluxo previsto do Atlas.')}${steps(product.flow)}</div></section>
<section class="wrap section compact">${link('/produtos/', 'Voltar para produtos')}</section>`;

const projectsPage = `
${pageIntro('Mostruário Qalyon', 'Projetos e demonstrações.',
  'Explore exemplos autorais de sites, campanhas e sistemas. Cada demonstração apresenta um cenário fictício e escolhas de projeto.')}
<section class="wrap section compact">${sectionTitle('Seleção de projetos', 'Veja os exemplos em contexto.')}${projectCards()}</section>
${close()}`;

const projectPage = project => `
${pageIntro('Mostruário / ' + project.kind, project.title, project.summary)}
<section class="wrap section compact"><div class="demo">
  <p class="label">${project.kind === 'Demonstração' ? 'Amostra visual / cenário fictício' : 'Apresentação do projeto'}</p><div class="split">
  <div><h2>${project.exampleTitle}</h2><p>${project.exampleText}</p></div>${projectPreview(project)}</div>
  <ol class="demo-items">${project.sections.map(item => `<li>${item}</li>`).join('')}</ol></div>
  <div class="actions">${project.demoUrl ? link(project.demoUrl, 'Abrir site demonstrativo (prévia privada)') : ''}${link('/projetos/', 'Voltar ao mostruário')}${quote(project.service)}</div></section>`;

const aboutPage = `
${pageIntro('Sobre a Qalyon', 'Tecnologia com propósito e precisão.',
  'Somos uma software house que desenvolve produtos próprios e soluções digitais sob medida.')}
<section class="wrap section compact split"><div class="body-copy">
  ${sectionTitle('Nossa atuação', 'Duas frentes de desenvolvimento.')}
  <p>Nos produtos próprios, identificamos processos que podem ser organizados por software. O Atlas é o primeiro SaaS da Qalyon e está em desenvolvimento.</p>
  <p>Nos serviços digitais, construímos sites, landing pages, portfólios profissionais e sistemas web conforme as necessidades do projeto. A atuação comercial inicial prioriza profissionais autônomos e pequenos negócios.</p>
  <p>Começamos por entender o problema. A partir daí, definimos o escopo, construímos com etapas de revisão e combinamos como será a entrega.</p></div>
  ${picture('loop')}</section>
<section class="tinted"><div class="wrap section">${sectionTitle('Forma de trabalho', 'Clareza em cada etapa.')}${steps(process)}</div></section>
${close()}`;

const whatsapp = contact.whatsappBusiness;
if (whatsapp !== null && !/^55[1-9]\d{9,10}$/.test(whatsapp)) {
  throw new Error('Informe o número oficial brasileiro em formato internacional.');
}
const whatsappUrl = whatsapp ? 'https://wa.me/' + whatsapp : '';
const emailUrl = 'mailto:' + contact.email;

const contactPage = `
<section class="quote-intro"><div class="wrap page-intro">
  ${heading('Contato comercial', 'Solicitar orçamento.',
    'Conte o que você quer colocar no ar, melhorar ou automatizar. Usamos essas informações para entender o projeto e preparar uma proposta de acordo com o escopo.')}
</div></section>
<section class="wrap section compact quote-layout">
  <aside class="quote-sidebar" aria-label="Canais e próximos passos">
    <div class="quote-channel glass">
      <span class="holo-icon">${icon('M7 10h34v24H20l-9 6v-6H7z M14 19h20 M14 25h15')}</span>
      <h2>Prefere conversar?</h2>
      <p>Comece pelo WhatsApp e conte sua ideia no seu ritmo.</p>
      ${whatsappUrl ? link(whatsappUrl, 'Conversar no WhatsApp', true) : '<p class="quote-channel-status">O WhatsApp será liberado após a configuração do número comercial.</p>'}
      ${link(emailUrl, 'Enviar e-mail')}
    </div>
    <div class="quote-next">
      <h2>Como o orçamento é preparado</h2>
      <dl>
        <div><dt>Entendemos seu objetivo</dt><dd>O briefing ajuda a identificar o que você precisa e o que já tem em mãos.</dd></div>
        <div><dt>Alinhamos escopo e prazos</dt><dd>Se faltar algum detalhe, conversamos para definir prioridades.</dd></div>
        <div><dt>Apresentamos a proposta</dt><dd>Você recebe as entregas previstas, os prazos e o investimento para avaliar.</dd></div>
      </dl>
    </div>
  </aside>
  <div class="contact-panel quote-panel glass">
    <div class="quote-panel-heading">
      <div><p class="label">Briefing inicial</p><h2>Conte sobre seu projeto</h2></div>
      <span class="quote-tag">Orçamento sob medida</span>
    </div>
    <p id="form-status">Preencha os campos obrigatórios. Se ainda estiver definindo o projeto, deixe os detalhes opcionais em branco.</p>
    <form id="quote-form" data-whatsapp-url="${whatsappUrl}" data-email-url="${emailUrl}" aria-describedby="form-status">
      <fieldset>
        <legend>Seus dados</legend>
        <div class="quote-fields">
          <div><label for="name">Nome</label><input id="name" name="name" autocomplete="name" maxlength="100" required></div>
          <div><label for="reply">E-mail ou WhatsApp com DDD</label><input id="reply" name="reply" maxlength="120" placeholder="Seu melhor contato" required></div>
          <div class="quote-wide"><label for="business">Empresa ou marca <small>Opcional</small></label><input id="business" name="business" autocomplete="organization" maxlength="100"></div>
        </div>
      </fieldset>
      <fieldset>
        <legend>O que você precisa</legend>
        <div class="quote-fields">
          <div><label for="service">Serviço de interesse</label><select id="service" name="service" required>
            <option value="">Selecione uma opção</option>
            ${services.map(service => `<option value="${service.slug}">${service.title}</option>`).join('')}
            <option value="a-definir">Ainda preciso definir</option>
          </select></div>
          <div><label for="stage">Momento do projeto <small>Opcional</small></label><select id="stage" name="stage">
            <option value="">Selecione, se souber</option>
            <option>Começar do zero</option><option>Melhorar algo existente</option><option>Substituir uma solução</option>
          </select></div>
          <div class="quote-wide"><label for="goal">O que você quer alcançar?</label><textarea id="goal" name="goal" minlength="10" maxlength="800" rows="4" placeholder="Ex.: Quero apresentar meus serviços e receber pedidos de orçamento." aria-describedby="goal-help" required></textarea><small class="quote-help" id="goal-help">Conte seu objetivo e o que gostaria de incluir no projeto.</small></div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Prazos e referências</legend>
        <div class="quote-fields">
          <div><label for="deadline">Prazo desejado <small>Opcional</small></label><select id="deadline" name="deadline">
            <option value="">Sem prazo definido</option><option>Em até 30 dias</option><option>Entre 1 e 2 meses</option><option>Mais de 2 meses</option>
          </select></div>
          <div><label for="reference">Site atual ou referência <small>Opcional</small></label><input id="reference" name="reference" type="url" maxlength="220" placeholder="https://"></div>
        </div>
      </fieldset>
      <div class="quote-submit">
        <p>Confira o briefing antes de compartilhar. <a href="/privacidade/">Aviso de privacidade</a></p>
        <button class="button" id="quote-review" type="submit" disabled>Revisar briefing <span aria-hidden="true">↗</span></button>
      </div>
      <noscript><p>Ative o JavaScript para montar o resumo do briefing.</p></noscript>
    </form>
    <dialog class="quote-dialog" id="quote-dialog" aria-labelledby="quote-dialog-title">
      <h2 id="quote-dialog-title">Confira seu briefing</h2>
      <p>${whatsappUrl ? 'Copie o resumo ou abra o WhatsApp ou seu aplicativo de e-mail com a mensagem preenchida. Revise e envie pelo canal escolhido.' : 'O resumo fica no seu navegador. Você pode copiá-lo para compartilhar quando quiser.'}</p>
      <label for="quote-summary">Resumo do projeto</label>
      <textarea id="quote-summary" rows="9" readonly></textarea>
      <div class="quote-dialog-actions">
        ${whatsappUrl ? '<a class="button" id="quote-send">Abrir briefing no WhatsApp</a>' : ''}
        <a class="button quote-secondary" id="quote-email">Abrir briefing no e-mail</a>
        <button class="button quote-secondary" id="quote-copy" type="button">Copiar briefing</button>
        <button class="button quote-secondary" id="quote-close" type="button">Voltar ao formulário</button>
      </div>
      <p class="quote-copy-status" id="quote-copy-status" role="status"></p>
    </dialog>
  </div>
</section>`;

const privacyPage = `
${pageIntro('Privacidade', 'Aviso de privacidade da prévia.',
  'Este aviso descreve como funciona a versão restrita do site institucional da Qalyon.')}
<section class="wrap section compact prose body-copy">
  <h2>Campos de orçamento</h2><p>O briefing é montado no navegador. O site não guarda os valores digitados. Se você abrir o briefing no WhatsApp, o texto será encaminhado ao serviço para preencher a conversa. Se escolher o e-mail, seu aplicativo abrirá um rascunho com o resumo. Você decide quando enviar a mensagem.</p>
  <h2>Cookies e infraestrutura</h2><p>A aplicação não instala cookies próprios de rastreamento e não inclui pixels de publicidade ou ferramentas de análise de comportamento. A plataforma de hospedagem e de acesso pode tratar dados técnicos para autenticação, funcionamento e segurança.</p>
  <h2>Atendimento comercial</h2><p>Antes de ativar o recebimento de solicitações, este aviso será atualizado com a identificação do responsável pelo tratamento, canal de privacidade e detalhes sobre uso, retenção e acesso aos dados recebidos.</p>
  ${link('/contato/', 'Voltar para contato')}</section>`;

export const pages = [
  { path: '/', title: 'Qalyon — Software house, sites, sistemas e SaaS', description: 'Conheça a Qalyon, software house que cria SaaS próprios e desenvolve sites, landing pages, portfólios profissionais e sistemas web sob medida.', body: home },
  { path: '/servicos/', title: 'Serviços digitais — Qalyon', description: 'Sites institucionais, landing pages, portfólios profissionais e sistemas web. Entenda as soluções e solicite um orçamento.', body: servicesPage },
  ...services.map(service => ({ path: servicePath(service), title: service.title + ' — Qalyon', description: service.summary, body: servicePage(service) })),
  { path: '/produtos/', title: 'Produtos próprios — Qalyon', description: 'Conheça os produtos próprios da Qalyon, incluindo o Atlas, primeiro SaaS da empresa, em desenvolvimento.', body: productsPage },
  ...products.map(product => ({ path: productPath(product), title: product.title + ' by Qalyon — Em desenvolvimento', description: product.summary, body: productPage(product) })),
  { path: '/projetos/', title: 'Projetos e demonstrações — Qalyon', description: 'Explore o mostruário autoral da Qalyon, com exemplos de portfólio profissional, landing page e sistema web.', body: projectsPage },
  ...projects.map(project => ({ path: projectPath(project), title: project.title + ' — Demonstração Qalyon', description: project.summary, body: projectPage(project) })),
  { path: '/sobre/', title: 'Sobre a Qalyon — Software house', description: 'Entenda como a Qalyon cria produtos SaaS e desenvolve soluções digitais sob medida.', body: aboutPage },
  { path: '/contato/', title: 'Solicitar orçamento — Qalyon', description: 'Prepare um briefing para seu projeto digital ou consulte o canal de atendimento da Qalyon.', body: contactPage, script: '/assets/contact.js' },
  { path: '/privacidade/', title: 'Aviso de privacidade — Qalyon', description: 'Entenda o tratamento de dados adotado na versão restrita do site da Qalyon.', body: privacyPage },
];

export function layout(page, origin, isPreview) {
  const active = path => page.path.startsWith(path) ? ' aria-current="' + (page.path === path ? 'page' : 'location') + '"' : '';
  const logo = `<a class="brand" href="/" aria-label="Qalyon, início">${brandImage('')}</a>`;
  const socialImage = origin + '/assets/social.png';
  return `<!doctype html>
<html lang="pt-BR" data-theme="dark">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#0E1317">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'none'; form-action 'none'">
  <meta name="robots" content="${isPreview ? 'noindex,nofollow' : 'index,follow'}">
  <title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}">
  ${isPreview ? '' : `<link rel="canonical" href="${origin + page.path}">`}
  <meta property="og:type" content="website"><meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="Qalyon"><meta property="og:title" content="${escape(page.title)}">
  <meta property="og:description" content="${escape(page.description)}"><meta property="og:url" content="${origin + page.path}">
  <meta property="og:image" content="${socialImage}"><meta property="og:image:alt" content="Logotipo Qalyon Tecnologia">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/assets/favicon.png"><link rel="stylesheet" href="/assets/tokens.css">
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="module" src="/assets/motion.js"></script>
  ${page.path === '/' ? '<script type="module" src="/assets/experience.js"></script>' : ''}
  ${page.script ? `<script src="${page.script}" defer></script>` : ''}
</head>
<body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="header"><div class="wrap header-inner">${logo}
<nav aria-label="Navegação principal">${site.navigation.map(([path, label]) =>
  `<a href="${path}"${active(path)}>${label}</a>`).join('')}</nav>
<a class="button header-cta" href="/contato/">Solicitar orçamento <span aria-hidden="true">↗</span></a></div></header>
<main id="conteudo" tabindex="-1">${page.body}</main>
<footer class="footer"><div class="wrap footer-inner">
  <div class="footer-brand">${logo}<p>${site.slogan}</p></div>
${page.path === '/' ? '' : '<button type="button" class="motion-toggle footer-motion" id="motion-toggle" hidden>Pausar movimento</button>'}
<a href="/privacidade/"${active('/privacidade/')}>Privacidade</a><span>© ${new Date().getUTCFullYear()} Qalyon</span></div></footer>
</body></html>`;
}
