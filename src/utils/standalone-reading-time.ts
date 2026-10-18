import readingTime from 'reading-time';
import { STANDALONE_BLOG_PERMALINKS } from '~/data/standalone-blog';

// The standalone Astro body is what readers see, not its companion Markdown body.
const articles = import.meta.glob('../pages/blog/*.astro', { query: '?raw', import: 'default', eager: true });
export function standaloneReadingTime(permalink: string): string | undefined {
  const slug = permalink.replace(/^\/?blog\//, '');
  const source = articles[`../pages/blog/${slug}.astro`];
  if (!STANDALONE_BLOG_PERMALINKS.has(`blog/${slug}`)) return undefined;
  if (typeof source !== 'string') throw new Error(`Missing standalone article source: ${slug}`);
  const bodies = [...source.matchAll(/<article\b[^>]*\bclass=["'][^"']*\bart\b[^"']*["'][^>]*>([\s\S]*?)<\/article>/g)];
  if (bodies.length !== 1) throw new Error(`Expected one article.art body in ${slug}`);
  const body = bodies[0][1];
  const text = body
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:#\d+|#x[\da-f]+|\w+);/gi, ' ');
  return `${Math.max(1, Math.ceil(readingTime(text).minutes))} min`;
}
