import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { APIRoute } from 'astro';

export const prerender = true;

const families = [
  ['Figtree', 'figtree', [400, 500, 600, 700, 800]],
  ['Inter Tight', 'inter-tight', [400, 500, 600]],
  ['JetBrains Mono', 'jetbrains-mono', [400, 500, 700]],
  ['Fraunces', 'fraunces', [400, 500, 600]],
] as const;

function face(family: string, file: string, weight: string | number, style = 'normal') {
  // Supporting Figtree weights and the below-fold signature are not critical.
  const critical = family !== 'Caveat' && (family !== 'Figtree' || weight === 800);
  const source = critical
    ? `data:font/woff2;base64,${readFileSync(resolve('public/fonts', `${file}.woff2`)).toString('base64')}`
    : `/fonts/${file}.woff2`;
  return `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};font-display:block;src:url(${source}) format('woff2')}`;
}

// A shared render-blocking resource makes font bytes available with their CSS,
// without hiding content in JavaScript or swapping faces after first paint.
const css =
  families
    .flatMap(([family, file, weights]) => weights.map((weight) => face(family, `${file}-${weight}`, weight)))
    .join('\n') +
  '\n' +
  face('Fraunces', 'fraunces-italic-latin', '400 900', 'italic') +
  '\n' +
  face('Caveat', 'caveat-700', 700);

export const GET: APIRoute = () =>
  new Response(css, {
    headers: { 'Content-Type': 'text/css; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
