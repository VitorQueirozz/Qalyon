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
  whatsappBusiness: '5561995079235',
  email: 'qalyontecnologia@gmail.com',
  // A integração de recebimento exige implementação e homologação separadas.
};

export const services = [
  {
    slug: 'sites-institucionais', title: 'Sites institucionais',
    summary: 'Apresente sua empresa, seus serviços e seus canais de contato em um endereço próprio.',
    audience: 'Empresas e escritórios que precisam apresentar a marca, explicar seus serviços e centralizar os canais de atendimento.',
    includes: ['Páginas sobre a empresa, soluções e contato', 'Navegação responsiva e estrutura para busca', 'Publicação no domínio e na hospedagem do cliente'],
    extra: 'O escopo é definido pela quantidade de páginas, pelo conteúdo da empresa e pelos canais de atendimento que precisam estar disponíveis no site.',
    image: 'presence',
  },
  {
    slug: 'portfolio-profissional', title: 'Portfólios profissionais',
    summary: 'Mostre seus melhores trabalhos, explique sua atuação e facilite o contato de quem quer contratar você.',
    audience: 'Profissionais autônomos e estúdios que querem mostrar seu trabalho com exemplos, como arquitetos, designers, fotógrafos e prestadores de serviços especializados.',
    includes: ['Apresentação profissional e especialidades', 'Galeria ou páginas de projetos com contexto e imagens', 'Área para serviços e canais de contato', 'Layout adaptado ao tipo de trabalho e aos dispositivos'],
    extra: 'A proposta considera quantos trabalhos serão apresentados, os materiais disponíveis e como você quer contar a história de cada projeto.',
    image: 'presence',
  },
  {
    slug: 'landing-pages', title: 'Landing pages',
    summary: 'Apresente uma oferta, um serviço ou uma campanha e guie o visitante até uma ação.',
    audience: 'Autônomos e negócios com uma oferta definida que precisam de uma página focada em contato ou orçamento.',
    includes: ['Estrutura de conteúdo para uma oferta específica', 'Seções com benefícios, perguntas e próximos passos', 'CTA para um canal confirmado', 'Versão mobile e publicação no ambiente do cliente'],
    extra: 'O orçamento considera a redação, os materiais fornecidos e as integrações necessárias para a campanha.',
    image: 'presence',
  },
  {
    slug: 'sistemas-web', title: 'Sistemas web sob medida',
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
    category: 'Portfólio profissional',
    summary: 'Uma presença digital para apresentar serviços, projetos e a forma de trabalho de um estúdio independente.',
    image: 'presence', service: 'portfolio-profissional',
    exampleTitle: 'Espaços para viver melhor.',
    exampleText: 'Uma apresentação conceitual de um estúdio de arquitetura, com destaque para projetos residenciais e o processo de projeto.',
    sections: ['Projetos residenciais', 'Projetos comerciais', 'Etapas do projeto'],
  },
  {
    slug: 'landing-page-de-servicos', title: 'Landing page de serviços', kind: 'Demonstração',
    category: 'Landing page',
    summary: 'Uma página de campanha para explicar uma oferta local e orientar o pedido de orçamento.',
    image: 'presence', service: 'landing-pages',
    exampleTitle: 'Cuide do seu espaço com um plano claro.',
    exampleText: 'Uma oferta fictícia de manutenção residencial, organizada por necessidade, visita e proposta.',
    sections: ['Conte o que precisa', 'Combine a visita', 'Receba a proposta'],
  },
  {
    slug: 'painel-de-ordens-de-servico', title: 'Painel de ordens de serviço', kind: 'Demonstração',
    category: 'Sistema web',
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
