import { readFile, writeFile, readdir } from 'node:fs/promises';

// Mechanical, opt-in migration. Keep all route-specific content and scripts.
const groups = {
  services: ['src/pages/services.astro', 'src/pages/intelligence.astro'],
  coverage: [
    'src/pages/industries/index.astro',
    'src/pages/industries/[slug].astro',
    'src/pages/functions/index.astro',
    'src/pages/functions/[slug].astro',
  ],
  careers: ['src/pages/careers.astro', 'src/pages/careers/[slug].astro'],
  company: ['src/pages/about.astro', 'src/pages/contact.astro'],
  blog: (await readdir('src/pages/blog'))
    .filter((name) => name.endsWith('.astro'))
    .map((name) => `src/pages/blog/${name}`),
};
const files = groups[process.argv[2]];
if (!files) throw new Error('Specify services, coverage, careers, company or blog');
for (const file of files) {
  let source = await readFile(file, 'utf8');
  const standalone = /<!doctype html>/i.test(source);
  if (standalone && !source.includes('<SiteHeader />')) {
    const navStart = source.indexOf('<nav class="nav"');
    const navEnd = source.indexOf('</nav>', navStart) + '</nav>'.length;
    if (navStart < 0 || navEnd < navStart) throw new Error(`Missing navigation boundary: ${file}`);
    source = source.slice(0, navStart) + '<SiteHeader />' + source.slice(navEnd);
    source = source.replace(/^---\n/, "---\nimport SiteHeader from '~/components/widgets/Header.astro';\n");
    // Header owns this script; the old second instance is redundant.
    source = source.replace(/\n\s*<StandaloneNavScripts\s*\/>/g, '');
  }
  if (!source.includes('<EditorialPage')) {
    const start = source.indexOf('<header class="');
    const end = standalone ? source.indexOf('<footer class="ft"', start) : source.lastIndexOf('</Layout>');
    if (start < 0 || end < start) throw new Error(`Missing content boundary: ${file}`);
    source =
      source.slice(0, start) +
      `<EditorialPage${standalone ? ' as="main"' : ''}>\n` +
      source.slice(start, end) +
      '</EditorialPage>\n' +
      source.slice(end);
    source = source.replace(/^---\n/, "---\nimport EditorialPage from '~/components/v58/EditorialPage.astro';\n");
  }
  if (standalone && !source.includes('<SiteFooter />')) {
    const start = source.indexOf('<footer class="ft"');
    const end = source.indexOf('</footer>', start) + '</footer>'.length;
    if (start < 0 || end < start) throw new Error(`Missing footer boundary: ${file}`);
    source = source.slice(0, start) + '<SiteFooter />' + source.slice(end);
    source = source.replace(/^---\n/, "---\nimport SiteFooter from '~/components/widgets/Footer.astro';\n");
  }
  await writeFile(file, source);
  console.log(file);
}
