import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { format, resolveConfig } from 'prettier';

const captureDir = process.env.REVIEW_CAPTURE_DIR || '/tmp/tribera-release-review';
const out = process.env.REVIEW_OUT || 'docs/reviews/release-closure';
const manifest = JSON.parse(await readFile(`${captureDir}/manifest.json`, 'utf8'));
const routes = process.env.REVIEW_ROUTES?.split(',') || [...new Set(manifest.map((entry) => entry.route))];
const images = await readdir(captureDir);
const baseline = process.env.REVIEW_BASELINE_DIR || '/tmp/tribera-release-priority';
await mkdir(out, { recursive: true });
const records = [];
for (let offset = 0; offset < routes.length; offset += 5) {
  const group = routes.slice(offset, offset + 5);
  const name = `${process.env.REVIEW_PREFIX || 'packet'}-${String(offset / 5 + 1).padStart(2, '0')}`;
  const evidence = group
    .map((route) => {
      const slug = route.replace(/^\/+|\/+$/g, '').replaceAll('/', '__') || 'home';
      const entries = manifest.filter((entry) => entry.route === route);
      if (entries.length !== 2 || entries.some((entry) => entry.error)) throw new Error(`Incomplete capture: ${route}`);
      const crops = images.filter((file) => file.startsWith(`${slug}-`) && file.includes('-section-'));
      return `${route}\nDesktop: ${captureDir}/${slug}-1520.png\nMobile: ${captureDir}/${slug}-390.png\nCopy: ${captureDir}/${slug}-copy.txt\nOptional readable section crops: ${crops.map((file) => `${captureDir}/${file}`).join(', ')}`;
    })
    .join('\n\n');
  const prompt = `Read-only final release review of ALL ${group.length} routes listed below. Use the Read tool to inspect BOTH screenshots and the copy file for EVERY route. Use section crops when full-page text is too small. Hiring reference: ${baseline}/home-1520.png and ${baseline}/home-390.png.\n${evidence}\n\nCritically review visual consistency and copy. Approved style: Fraunces headings, Inter Tight body, mono labels, white/warm paper/charcoal, restrained red accents, left-aligned section headings except intentional centered hero/final CTA, consistent gutters/cards/nav. Do not demand identical layouts for different content. Preserve testimonials/legal substance. Review the current screenshots rather than assuming earlier fixes passed. Previous review context: docs/reviews/site-style/correction-disposition.md and docs/reviews/release-closure/disposition.md.\nReturn a compact row per route: visual verdict, copy verdict. Then list only confirmed actionable findings, ordered by severity, with route, exact text/element, screenshot evidence and concrete recommendation. Separate owner-evidence questions (statistics, SLA, permissions, legal facts) from code/design defects. Do not invent a defect from cropped/downscaled images or claim backend delivery was verified. Do not edit any files. Distinguish optional polish from release blockers. Explicitly state if any route/image could not be reviewed. Keep the report under 700 words. Complete within 36 turns.`;
  await writeFile(`${out}/${name}-scope.txt`, prompt);
  console.log(`Reviewing ${name}: ${group.join(', ')}`);
  const result = await new Promise((resolve) => {
    const child = spawn(
      'claude',
      [
        '--print',
        '--model',
        process.env.REVIEW_MODEL || 'sonnet',
        '--effort',
        'medium',
        '--output-format',
        'text',
        '--add-dir',
        captureDir,
        '--add-dir',
        baseline,
        '--tools',
        'Read',
        '--allowedTools',
        'Read',
        '--max-turns',
        '36',
        '--',
        prompt,
      ],
      { stdio: ['ignore', 'pipe', 'pipe'] }
    );
    let output = '';
    child.stdout.on('data', (data) => {
      output += data;
    });
    child.stderr.on('data', (data) => {
      output += data;
    });
    const timeout = setTimeout(() => child.kill('SIGTERM'), 600000);
    child.on('error', (error) => {
      clearTimeout(timeout);
      resolve({ code: 1, output: error.message });
    });
    child.on('close', (code) => {
      clearTimeout(timeout);
      resolve({ code, output });
    });
  });
  await writeFile(`${out}/${name}.txt`, result.output);
  const completed =
    result.code === 0 &&
    result.output.length > 100 &&
    !/Reached max turns|Credit balance|not logged in/i.test(result.output);
  records.push({ name, routes: group, completed, exitCode: result.code });
  await writeFile(
    `${out}/${process.env.REVIEW_PREFIX || 'packet'}-manifest.json`,
    await format(JSON.stringify(records), { ...(await resolveConfig(`${out}/manifest.json`)), parser: 'json' })
  );
  console.log(`${name}: ${completed ? 'report received' : 'incomplete'}`);
  if (!completed) throw new Error(`Claude review incomplete: ${name}`);
}
