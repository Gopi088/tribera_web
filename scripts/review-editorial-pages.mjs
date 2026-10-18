import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';

const dir = process.env.AUDIT_OUT || '/tmp/tribera-site-style/site-wide';
const reviewDir = process.env.REVIEW_OUT || '/tmp/tribera-site-style/claude-site-wide';
const manifest = JSON.parse(await readFile('/tmp/tribera-site-style/baseline/manifest.json', 'utf8'));
await mkdir(reviewDir, { recursive: true });
const routes = process.env.REVIEW_ROUTES?.split(',') || [...new Set(manifest.map((record) => record.route))];
const records = [];
for (let offset = 0; offset < routes.length; offset += 5) {
  if (offset / 5 < Number(process.env.REVIEW_START || 0)) continue;
  if (offset / 5 >= Number(process.env.REVIEW_END || Infinity)) break;
  const group = routes.slice(offset, offset + 5);
  const name = `packet-${String(offset / 5 + 1).padStart(2, '0')}`;
  const evidence = group
    .map((route) => {
      const slug = route.replace(/^\/+|\/+$/g, '').replaceAll('/', '__') || 'home';
      return `${route}: ${dir}/${slug}-1520.png ; ${dir}/${slug}-390.png ; ${dir}/${slug}-copy.txt`;
    })
    .join('\n');
  const prompt = `Read-only critical review of EVERY listed public route, both visuals and copy. Read all listed desktop/mobile screenshots and copy files. You can read several files per turn. Reference: /tmp/tribera-site-style/baseline/home-1520.png.\n${evidence}\nUse the approved hiring style: Fraunces editorial headings, Inter Tight body, mono labels, white/warm paper/charcoal, restrained red CTAs, left section headings and intentionally centered final CTAs, aligned columns. Preserve testimonials and legal substance. Flag claims needing owner evidence separately from design/code blockers. Images are full-page; if text is too small use the accompanying copy. Be honest about visual resolution limits. Return a row for EACH route with visual verdict and copy verdict, then concise concrete findings by severity. Identify unreadable text, overflow, inconsistent cards, obsolete promises, dead-looking controls, confusing copy. Do not claim routes outside this packet are reviewed. Do not edit files. Complete within 24 turns.`;
  const reviewPrompt =
    process.env.REVIEW_FOLLOWUP === '1'
      ? prompt +
        '\nThis is the corrected follow-up. Read docs/reviews/site-style/correction-disposition.md first. Check that the fixes actually work visually; distinguish intentionally disabled upload buttons and collapsed native FAQs from bugs. Taxonomy cards do not list every tag. Give a decisive pass/remaining actionable issue per route, and separate owner-evidence release questions. Do not repeat speculative defects as confirmed.'
      : prompt;
  await writeFile(`${reviewDir}/${name}-scope.txt`, reviewPrompt);
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
        '/tmp',
        '--tools',
        'Read',
        '--allowedTools',
        'Read',
        '--max-turns',
        '24',
        '--',
        reviewPrompt,
      ],
      { env: process.env, stdio: ['ignore', 'pipe', 'pipe'] }
    );
    let output = '';
    child.stdout.on('data', (data) => (output += data));
    child.stderr.on('data', (data) => (output += data));
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
  await writeFile(`${reviewDir}/${name}.txt`, result.output);
  const completed =
    result.code === 0 && result.output.trim().length > 100 && !result.output.includes('Reached max turns');
  records.push({ name, routes: group, completed, exitCode: result.code, report: `${reviewDir}/${name}.txt` });
  await writeFile(`${reviewDir}/manifest.json`, JSON.stringify(records, null, 2));
  console.log(`${name}: ${completed ? 'review returned' : 'review incomplete'}`);
}
