export const site = {
  name: 'Qalyon',
  slogan: 'Ideias que se transformam em tecnologia.',
  previewOrigin: 'https://qalyon-precision.cloudybrioche.chatgpt.site',
  navigation: [
    ['/servicos/', 'Serviços'], ['/produtos/', 'Produtos'], ['/projetos/', 'Projetos'],
    ['/sobre/', 'Sobre'], ['/contato/', 'Contato'],
  ],
};

export const contact = {
  whatsappBusiness: null, // Número oficial confirmado, no formato internacional, sem pontuação.
  // A integração de recebimento exige implementação e homologação separadas.
};

export const services = [
  {
    slug: 'sites-institucionais', title: 'Sites institucionais', number: '01',
    summary: 'Apresente sua empresa, seus serviços e seus canais de contato em um endereço próprio.',
    audience: 'Profissionais e negócios que precisam explicar o que fazem, mostrar seu trabalho e facilitar o primeiro contato.',
    includes: ['Páginas sobre a empresa, soluções e contato', 'Navegação responsiva e estrutura para busca', 'Portfólio profissional, quando fizer parte do escopo', 'Publicação no domínio e na hospedagem do cliente'],
    extra: 'Um portfólio profissional pode ser a parte principal do site ou uma seção dele. A proposta considera a quantidade de projetos, o material disponível e como você quer apresentar cada trabalho.',
    image: 'presence',
  },
  {
    slug: 'landing-pages', title: 'Landing pages', number: '02',
    summary: 'Apresente uma oferta, um serviço ou uma campanha e guie o visitante até uma ação.',
    audience: 'Autônomos e negócios com uma oferta definida que precisam de uma página focada em contato ou orçamento.',
    includes: ['Estrutura de conteúdo para uma oferta específica', 'Seções com benefícios, perguntas e próximos passos', 'CTA para um canal confirmado', 'Versão mobile e publicação no ambiente do cliente'],
    extra: 'O orçamento considera a redação, os materiais fornecidos e as integrações necessárias para a campanha.',
    image: 'presence',
  },
  {
    slug: 'sistemas-web', title: 'Sistemas web sob medida', number: '03',
    summary: 'Organize processos e reúna dados da operação em um sistema adaptado ao seu negócio.',
    audience: 'Equipes que precisam reduzir retrabalho, substituir controles dispersos ou conectar ferramentas.',
    includes: ['Mapeamento de etapas, usuários e permissões', 'Painéis, cadastros ou fluxos operacionais conforme o escopo', 'Integrações avaliadas caso a caso', 'Testes, publicação e orientação de entrega'],
    extra: 'Para dimensionar o projeto, entendemos o fluxo atual, os dados envolvidos e as dependências. A proposta define as entregas e os critérios de aceite.',
    image: 'systems',
  },
];

export const products = [{
  slug: 'atlas', title: 'Atlas', status: 'Em desenvolvimento',
  summary: 'Um SaaS para organizar atendimentos e serviços, do primeiro orçamento ao registro do pagamento.',
  problem: 'Quando contatos, orçamentos, agenda e execução ficam espalhados em mensagens e planilhas, acompanhar o andamento de cada serviço exige trabalho manual. O Atlas está sendo desenvolvido para reunir essas etapas em um só fluxo.',
  flow: [
    ['Cadastrar o cliente', 'Reunir os dados necessários para identificar e atender o cliente.'],
    ['Preparar o orçamento', 'Registrar a proposta e acompanhar sua aprovação.'],
    ['Agendar o serviço', 'Definir a data e organizar os compromissos.'],
    ['Executar a ordem de serviço', 'Acompanhar o que foi combinado e registrar a execução.'],
    ['Registrar o pagamento', 'Anotar o recebimento relacionado ao serviço.'],
  ],
}];

export const projects = [
  {
    slug: 'portfolio-de-arquitetura', title: 'Portfólio de arquitetura', kind: 'Demonstração',
    summary: 'Uma presença digital para apresentar serviços, projetos e a forma de trabalho de um estúdio independente.',
    image: 'presence', service: 'sites-institucionais',
    exampleTitle: 'Espaços para viver melhor.',
    exampleText: 'Uma apresentação conceitual de um estúdio de arquitetura, com destaque para projetos residenciais e o processo de projeto.',
    sections: ['Projetos residenciais', 'Projetos comerciais', 'Etapas do projeto'],
  },
  {
    slug: 'landing-page-de-servicos', title: 'Landing page de serviços', kind: 'Demonstração',
    summary: 'Uma página de campanha para explicar uma oferta local e orientar o pedido de orçamento.',
    image: 'presence', service: 'landing-pages',
    exampleTitle: 'Cuide do seu espaço com um plano claro.',
    exampleText: 'Uma oferta fictícia de manutenção residencial, organizada por necessidade, visita e proposta.',
    sections: ['Conte o que precisa', 'Combine a visita', 'Receba a proposta'],
  },
  {
    slug: 'painel-de-ordens-de-servico', title: 'Painel de ordens de serviço', kind: 'Demonstração',
    summary: 'Uma interface conceitual para visualizar etapas de atendimento em uma pequena operação.',
    image: 'systems', service: 'sistemas-web',
    exampleTitle: 'Acompanhe cada atendimento.',
    exampleText: 'Amostra de organização de tarefas por etapa, com registros fictícios e estrutura adaptada para telas pequenas.',
    sections: ['Aguardando agendamento', 'Em execução', 'Concluído'],
  },
];

export const process = [
  ['Entender', 'Conversamos sobre o objetivo, o público e o problema a resolver.'],
  ['Definir', 'A proposta reúne escopo, entregas, investimento e prazos para aprovação.'],
  ['Construir', 'Desenvolvemos, apresentamos as etapas combinadas e testamos a solução.'],
  ['Entregar', 'Após a homologação, publicamos no ambiente do cliente e orientamos a entrega.'],
];

export const media = {
  presence: 'Notebook e smartphone com composição visual de um portfólio de arquitetura.',
  systems: 'Módulos de grafite interligados por faixas verde-lima.',
  loop: 'Estrutura arquitetônica aberta em grafite, com superfície interna verde-lima.',
};
