# Qalyon Institucional v2.2.0

Site em português do Brasil, gerado em HTML estático com Node.js e sem dependências de instalação. O aplicativo Atlas tem ciclo de desenvolvimento separado. O catálogo institucional apresenta apenas a página pública do produto e seu estágio.

## Estrutura

| Caminho | Função |
| --- | --- |
| `src/content.mjs` | Configuração central, menu, contato, serviços, produtos, mostruário e fluxo de trabalho |
| `src/views.mjs` | Layout, componentes de página, cartões, metadados e rotas |
| `src/assets/tokens.css` | Tokens oficiais da paleta Precision v1.0.0 |
| `src/assets/styles.css` | Tipografia e estilos dos componentes |
| `src/assets/contact.js` | Pré-seleção do serviço e bloqueio de submissão na prévia |
| `scripts/build.mjs` | Geração de HTML, sitemap, robots e configuração de cabeçalhos |
| `scripts/check.mjs` | Verificação das páginas geradas e relatório de tamanhos |
| `dist/` | Saída estática de publicação, regenerada a cada build |

## Rodar e editar

Use Node.js 20 ou superior. Na raiz, rode:

```sh
npm run build
npm run check
python3 -m http.server 8000 --directory dist
```

Abra `http://localhost:8000/`. Refaça o build após editar conteúdo ou estilos. Em Sites, rode `sites-preview start <caminho-absoluto-do-projeto>` quando disponível.

- **Serviço, SaaS ou projeto.** Adicione um objeto na coleção correspondente de `src/content.mjs`, com slug único e estável. As páginas de índice e detalhes são geradas a partir dessas coleções. Para um novo SaaS com estrutura diferente do Atlas, adapte o componente de produto em `src/views.mjs`. Para cases reais, use o tipo e os textos correspondentes e publique somente evidências autorizadas.
- **Segmentos, editorial ou campanhas.** Adicione coleção e componente próprios quando houver conteúdo. Registre a rota em `pages`. A navegação principal é editada separadamente em `site.navigation`.
- **Imagens.** Salve as variantes WebP de 640 e 1280 px em `src/assets/` e registre o texto alternativo em `media`. O loop arquitetônico aparece na página Sobre. O topo da home combina texto e links com uma rede neural desenhada em Canvas ao fundo. Os dispositivos e os módulos ilustram serviços e amostras.
- **Identidade.** Logotipo oficial raster Precision v1.5.0 reaproveitado com o lettering original. A vetorização oficial permanece pendente. Inter Display usa o eixo óptico de display da fonte Inter variável. Inter e PT Mono são hospedadas localmente com licenças incluídas. O slogan corresponde à versão aprovada v1.0.0.

## Prévia e publicação

O build padrão gera `noindex,nofollow` e bloqueia rastreio em `robots.txt`. O controle de acesso é aplicado em Sites, separado do controle de indexação. Para a prévia, mantenha a política privada e publique o conteúdo de `dist/` no projeto existente. O endereço antigo `/privacidade.html` oferece um link para a rota atual.

Para preparar os arquivos de produção após a aprovação de lançamento, configure `QALYON_PUBLIC_BUILD=1` e `QALYON_SITE_ORIGIN` com a origem HTTPS do domínio oficial, sem barra final. Rode o build e o check com as mesmas variáveis. O build gera canônicas, URLs sociais e sitemap no domínio confirmado. Esse comando prepara somente os arquivos, sem alterar o acesso em Sites, DNS ou domínio. Verifique HTTPS, rotas, redirects e cabeçalhos no host final antes de abrir ao público. A política em `_headers` depende do suporte do provedor. A política CSP em HTML é uma camada adicional.

## Dependências de lançamento

1. Confirmar o número oficial de WhatsApp Business e preencher `contact.whatsappBusiness` em formato internacional. Verificar o destino antes de habilitar o link.
2. Escolher o serviço ou backend que receberá os quatro campos. Implementar validação no servidor, limitação de abuso e spam, acesso restrito, mensagens de erro e confirmação baseada em resposta real. Rever CSP para liberar somente o destino necessário e testar a entrega de ponta a ponta. A prévia mantém o envio bloqueado e não persiste valores.
3. Atualizar o aviso de privacidade conforme o fluxo real, com identificação do responsável, canal de privacidade, finalidade, acesso e retenção.
4. Confirmar domínio, política de acesso e ambiente de produção. Medir Core Web Vitals de campo quando o domínio tiver tráfego suficiente. A URL do Atlas só deve ser inserida quando houver um destino que corresponda ao recurso oferecido.
5. Substituir o raster apenas quando houver versão vetorial oficial aprovada.

## Verificação

Build e checagem das 14 rotas, dos títulos, referências locais, imagens, labels e indexação. Revisão no Chrome desktop e em molduras de 320 e 390 px. Fluxo de navegação Serviço → Solicitar orçamento → serviço pré-selecionado → Privacidade. Bloqueio de envio confirmado no navegador.

O tamanho em gzip local de HTML e CSS é medido por `npm run check`. Essa medida representa compressão de arquivos em laboratório e não o tempo de carregamento nem os Core Web Vitals de usuários. A home carrega um script curto para controlar a rede neural e as animações. O formulário carrega seu próprio script de pré-seleção. O envio de leads depende de integração real.


## Movimento no site

`src/assets/neural.js` desenha os hemisférios, conexões e pulsos luminosos em Canvas 2D. `src/assets/motion.js` controla as entradas na rolagem, o ciclo de desenho e a pausa. A home interrompe o desenho quando sai do campo de visão ou a aba fica oculta. A preferência por movimento reduzido exibe um quadro estático. A pausa escolhida pelo visitante vale nas páginas da mesma sessão.
