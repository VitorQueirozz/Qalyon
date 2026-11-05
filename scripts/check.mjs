import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { pages } from '../src/views.mjs';
import { site } from '../src/content.mjs';

const preview = process.env.QALYON_PUBLIC_BUILD !== '1';
const titles = new Set();
for (const page of pages) {
  const file = join('dist', page.path, 'index.html');
  const html = await readFile(file, 'utf8');
  assert.equal([...html.matchAll(/<h1>/g)].length, 1, file);
  assert.ok(html.includes('lang="pt-BR"'), file);
  assert.equal(html.includes('content="noindex,nofollow"'), preview, file);
  assert.equal(html.includes('rel="canonical"'), !preview, file);
  assert.ok(!titles.has(page.title), 'Título duplicado');
  titles.add(page.title);
  const references = [...html.matchAll(/(?:href|src)="(\/[^"]*)"|srcset="([^"]*)"/g)]
    .flatMap(([, path, srcset]) => path ? [path] : srcset.split(',').map(item => item.trim().split(' ')[0]));
  for (const reference of references) {
    const path = new URL(reference, site.previewOrigin).pathname;
    await access(join('dist', path, path.endsWith('/') ? 'index.html' : ''));
  }
  for (const [image] of html.matchAll(/<img\b[^>]*>/gs)) {
    assert.match(image, /\balt="[^"]*"/);
    assert.match(image, /\bwidth="\d+"/);
    assert.match(image, /\bheight="\d+"/);
  }
  for (const [, id] of html.matchAll(/<label for="([^"]+)"/g)) assert.ok(html.includes('id="' + id + '"'));
}
const home = await readFile('dist/index.html', 'utf8');
assert.ok(home.includes(site.slogan));
assert.doesNotMatch(home, /hero-\d|loop-\d/);
assert.doesNotMatch(home.match(/<section class="hero-stage">[\s\S]*?<\/section>/)[0], /<img\b/);
assert.match(home, /<canvas id="neural-canvas"/);
assert.doesNotMatch(home, /<video\b|\.mp4/);
await access(join('dist', 'assets', 'neural.js'));
const form = await readFile('dist/contato/index.html', 'utf8');
assert.match(form, /form-action 'none'/);
assert.match(form, /id="quote-review" type="submit" disabled/);
for (const id of ['name', 'reply', 'service', 'goal', 'deadline', 'reference']) {
  assert.ok(form.includes('<label for="' + id + '">'), 'Campo sem rótulo: ' + id);
}

console.log(`${pages.length} rotas validadas: metadados, links, imagens, campos e modo de indexação.`);
for (const file of ['index.html', 'assets/tokens.css', 'assets/styles.css', 'assets/contact.js']) {
  const data = await readFile(join('dist', file));
  console.log(`${file}: ${data.length} bytes, ${gzipSync(data).length} bytes em gzip local`);
}
