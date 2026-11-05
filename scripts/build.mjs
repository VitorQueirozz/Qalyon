import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { site } from '../src/content.mjs';
import { pages, layout } from '../src/views.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const isPreview = process.env.QALYON_PUBLIC_BUILD !== '1';
const origin = isPreview ? site.previewOrigin : process.env.QALYON_SITE_ORIGIN;
if (!origin || !/^https:\/\/[a-z0-9.-]+$/i.test(origin)) {
  throw new Error('Configure QALYON_SITE_ORIGIN com a origem HTTPS confirmada, sem barra final.');
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, 'src/assets'), join(dist, 'assets'), { recursive: true });

for (const page of pages) {
  const dir = join(dist, page.path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), layout(page, origin, isPreview));
}

await writeFile(join(dist, 'privacidade.html'), layout({
  path: '/privacidade/',
  title: 'Privacidade — Endereço atualizado',
  description: 'O aviso de privacidade da Qalyon tem um novo endereço.',
  body: '<section class="wrap page-intro"><h1>Aviso de privacidade</h1><p><a class="arrow-link" href="/privacidade/">Acessar o aviso atualizado ↗</a></p></section>',
}, origin, true));

const sitemap = pages.map(page => `  <url><loc>${origin + page.path}</loc></url>`).join('\n');
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap}\n</urlset>\n`);
await writeFile(join(dist, 'robots.txt'), isPreview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(join(dist, '_headers'), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'self' https://chatgpt.com https://*.chatgpt.com
${isPreview ? '  X-Robots-Tag: noindex, nofollow\n' : ''}
/assets/*
  Cache-Control: public, max-age=86400
`);
console.log(`${pages.length} páginas geradas (${isPreview ? 'prévia' : 'produção'}).`);
