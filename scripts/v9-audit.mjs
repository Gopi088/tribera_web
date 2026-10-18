import fs from 'node:fs';
import path from 'node:path';

export const normalize = (route) =>
  route
    .replace(/\/index\.html$/, '/')
    .replace(/\.html$/, '')
    .replace(/\/$/, '') || '/';
export function csv(text) {
  const rows = [];
  let row = [],
    value = '',
    quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') {
        value += '"';
        i++;
      } else quoted = !quoted;
    } else if (!quoted && (c === ',' || c === '\n')) {
      row.push(value.replace(/\r$/, ''));
      value = '';
      if (c === '\n') {
        rows.push(row);
        row = [];
      }
    } else value += c;
  }
  if (quoted) throw new Error('Unterminated CSV quote');
  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }
  const header = rows.shift();
  return rows.filter((r) => r.some(Boolean)).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i]])));
}
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#(?:x([\da-f]+)|(\d+));/gi, (_, hex, dec) => String.fromCodePoint(parseInt(hex || dec, hex ? 16 : 10)));
export function inspectHtml(html) {
  const refs = [],
    ids = new Set();
  const clean = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/(<(?:script|style)\b[^>]*>)[\s\S]*?<\/(?:script|style)>/gi, '$1');
  for (const tag of clean.matchAll(/<([\w:-]+)\b([^>]*)>/g)) {
    const attrs = Object.fromEntries(
      [...tag[2].matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map((m) => [
        m[1].toLowerCase(),
        decode(m[2] ?? m[3] ?? m[4]),
      ])
    );
    if (attrs.id) ids.add(attrs.id);
    if (tag[1] === 'a' && attrs.name) ids.add(attrs.name);
    for (const attr of ['href', 'src', 'poster', 'xlink:href'])
      if (attrs[attr]) refs.push({ href: attrs[attr], kind: attr });
    if (attrs.srcset && !attrs.srcset.startsWith('data:'))
      for (const entry of attrs.srcset.split(',')) refs.push({ href: entry.trim().split(/\s+/)[0], kind: 'srcset' });
  }
  return { refs, ids };
}
export function inventory(root) {
  if (!fs.existsSync(path.join(root, 'index.html'))) throw new Error(`Missing build homepage: ${root}`);
  return new Map(
    fs
      .readdirSync(root, { recursive: true })
      .filter((p) => p.endsWith('.html'))
      .map((p) => [normalize('/' + p), { file: p, ...inspectHtml(fs.readFileSync(path.join(root, p), 'utf8')) }])
  );
}
export function checkReference(root, pages, from, href, extraOrigin) {
  let url;
  try {
    url = new URL(href, new URL(from, 'https://tribera.ai'));
  } catch {
    return `Invalid URL ${href}`;
  }
  if (!['https:', 'http:'].includes(url.protocol)) return null;
  if (!['tribera.ai', 'www.tribera.ai'].includes(url.hostname) && url.origin !== extraOrigin) return null;
  let pathname, fragment;
  try {
    pathname = decodeURIComponent(url.pathname);
    fragment = decodeURIComponent(url.hash.slice(1));
  } catch {
    return `Invalid URL encoding ${href}`;
  }
  const page = pages.get(normalize(pathname));
  const target = path.resolve(root, '.' + pathname);
  if (!target.startsWith(path.resolve(root) + path.sep) && target !== path.resolve(root))
    return `Escaping path ${href}`;
  if (!page && !(fs.existsSync(target) && fs.statSync(target).isFile())) return `Missing target ${href}`;
  if (page && fragment && !fragment.startsWith(':~:text=') && !page.ids.has(fragment))
    return `Missing fragment ${href}`;
  return null;
}
export function audit(root, routeMap) {
  const pages = inventory(root),
    errors = [],
    rows = csv(fs.readFileSync(routeMap, 'utf8'));
  if (!rows.length) errors.push('Empty route map');
  const mapped = new Set();
  for (const row of rows) {
    if (
      !row.route?.startsWith('/') ||
      !row.target_route?.startsWith('/') ||
      !['yes', 'no'].includes(row.baseline_present) ||
      !row.planned_action ||
      !row.status
    )
      errors.push(`Invalid route row ${JSON.stringify(row)}`);
    if (mapped.has(row.route)) errors.push(`Duplicate route ${row.route}`);
    mapped.add(row.route);
    if (row.baseline_present === 'yes' && !pages.has(normalize(row.route)))
      errors.push(`Baseline route absent: ${row.route}`);
  }
  for (const row of rows) if (!mapped.has(row.target_route)) errors.push(`Untracked route target: ${row.target_route}`);
  for (const [route] of pages)
    if (!mapped.has(route) && !route.startsWith('/__v9/')) errors.push(`Untracked built route: ${route}`);
  let references = 0;
  for (const [route, page] of pages)
    for (const ref of page.refs) {
      references++;
      const error = checkReference(root, pages, route + (route === '/' ? '' : '/'), ref.href);
      if (error) errors.push(`${page.file}: ${error}`);
    }
  if (!references) errors.push('Empty reference coverage');
  return {
    expectedRoutes: rows.length,
    baselineRoutes: rows.filter((r) => r.baseline_present === 'yes').length,
    futureRoutes: rows.filter((r) => r.baseline_present === 'no').length,
    executedPages: pages.size,
    references,
    errors,
  };
}
