import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, extname } from 'path';

const distDir = '/home/gopal/tribera_web_v3/dist';

const mimeMap = {
  '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
};

function getMime(p) { return mimeMap[extname(p).toLowerCase()] || 'application/octet-stream'; }
function toDataUri(fp) { return `data:${getMime(fp)};base64,${readFileSync(fp).toString('base64')}`; }

function build(htmlPath, outPath) {
  let html = readFileSync(join(distDir, htmlPath), 'utf-8');

  // 1. Inline CSS: match ANY <link> with stylesheet regardless of attribute order
  html = html.replace(/<link[^>]*?href=["']([^"']+)["'][^>]*?\/?>/gi, (match, href) => {
    if (!match.includes('stylesheet')) return match; // not a stylesheet
    const clean = href.replace(/^\//, '');
    const fp = join(distDir, clean);
    if (existsSync(fp)) {
      const content = readFileSync(fp, 'utf-8');
      return `<style>${content}</style>`;
    }
    console.log(`  MISSING CSS: ${href}`);
    return match;
  });

  // 2. Inline JS files (absolute paths)
  html = html.replace(/<script\s+([^>]*?)src=["']\/([^"']+)["']([^>]*?)><\/script>/gi, (match, before, src, after) => {
    const fp = join(distDir, src);
    if (existsSync(fp)) {
      const content = readFileSync(fp, 'utf-8');
      return `<script${before}${after}>\n${content}\n</script>`;
    }
    console.log(`  MISSING JS: /${src}`);
    return match;
  });

  // 3. Inline all images in <img> tags (absolute paths)
  html = html.replace(/<img\s+([^>]*?)src=["']\/([^"']+)["']([^>]*?)>/gi, (match, before, src, after) => {
    const fp = join(distDir, src);
    if (existsSync(fp)) return `<img ${before}src="${toDataUri(fp)}"${after}>`;
    return match;
  });

  // 4. Inline srcset images
  html = html.replace(/srcset=["']\/([^"']+)["']/gi, (match, srcset) => {
    const urls = srcset.split(',').map(part => {
      const p = part.trim().split(/\s+/);
      const fp = join(distDir, p[0]);
      if (existsSync(fp)) return `${toDataUri(fp)} ${p.slice(1).join(' ')}`.trim();
      return part.trim();
    });
    return `srcset="${urls.join(', ')}"`;
  });

  // 5. Inline favicons
  html = html.replace(/<link[^>]*?href=["']\/([^"']+\.(?:ico|png|svg))["'][^>]*?\/?>/gi, (match, src) => {
    const fp = join(distDir, src);
    if (existsSync(fp)) return match.replace(`/${src}`, toDataUri(fp));
    return match;
  });

  // 6. Convert remaining absolute paths to relative for navigation links
  //    (don't touch data URIs or http/https)
  html = html.replace(/(href|src)=["']\/(?!\/)([^"']+)["']/gi, (match, attr, path) => {
    // Skip if already handled or is a special path
    if (path.startsWith('_astro/') || path.startsWith('data:')) return match;
    // Navigation links - make them empty anchors or remove leading /
    return `${attr}="#${path.replace(/[^a-zA-Z0-9]/g, '-')}"`;
  });

  // 7. Apple touch icon
  html = html.replace(/<link[^>]*?href=["']\/([^"']+\.png)["'][^>]*?\/?>/gi, (match, src) => {
    const fp = join(distDir, src);
    if (existsSync(fp)) return match.replace(`/${src}`, toDataUri(fp));
    return match;
  });

  writeFileSync(outPath, html, 'utf-8');
  const size = (Buffer.byteLength(html) / 1024).toFixed(0);
  const styleCount = (html.match(/<style[>]/g) || []).length;
  console.log(`✓ ${outPath.split('/').pop()} (${size}KB, ${styleCount} style blocks)`);
}

console.log('Building self-contained previews...');
build('functions/index.html', '/home/gopal/tribera_web_v3/functions-preview.html');
build('industries/index.html', '/home/gopal/tribera_web_v3/industries-preview.html');
console.log('Done!');
