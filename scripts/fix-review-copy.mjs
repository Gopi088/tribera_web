import { readFile, writeFile } from 'node:fs/promises';

const file = 'src/data/function-pages.ts';
const fixes = [
  ['attзolution', 'attribution'],
  ['dashthat lies', 'dashboard that lies'],
  ['no that the lake', 'no mention that the lake'],
  ['ring {the} risk back', 'bring the risk back under control'],
  ['P&L is a shared', 'P&L is shared'],
  ['the cost of the platform came to be', 'the operating cost that followed'],
  ['rooms that opened without theirs', 'rooms they are not in'],
  ['the instinctz', 'the instincts'],
  ['the classic incapacstrength answer', 'a rehearsed answer without evidence'],
  ['dashboards they died to remove', 'dashboards they decided to remove'],
  ['scarcity chart', 'responsibility chart'],
  ['and the burden for the business line explain that', 'and a clear explanation of the burden on the business'],
  [
    "a rehearsed answer without evidence that kills the evidence and alerts the attacker that they've been seen.",
    'an automatic response with no explanation of what it would preserve or destroy.',
  ],
  ['the time they stood the funding question was real', 'how they responded when funding was at risk'],
];
const source = await readFile(file, 'utf8');
const next = source
  .split('\n')
  .map((line) => {
    if (!line.trimStart().startsWith('{"slug":')) return line;
    const comma = line.trimEnd().endsWith(',');
    for (const [from, to] of fixes) line = line.replaceAll(from, to);
    const data = JSON.parse(line.trim().replace(/,$/, ''));
    if (data.slug === 'infrastructure-sre') {
      data.faqs[0].a =
        "We agree coding requirements in the brief. Where the role needs automation, we assess the candidate's own code and the operational problem it solved.";
      data.faqs[1].a =
        'By incident, not by credential. We ask about the worst incident, the first action, the first mistake and the change that stuck afterwards. The conversation should sound like an incident review.';
      data.faqs[2].a =
        'We assess what the person needs to improve, not just the target on the slide. We look for evidence that they improved reliability without exhausting the team.';
    }
    if (data.slug === 'finance-risk')
      data.faqs[2].a =
        'We ask about risks they raised, safeguards they built and decisions they challenged when the numbers changed. The evidence is in what they did, not just the policy they describe.';
    if (data.slug === 'security') {
      data.qqs[0].thin =
        'Disconnect everything, without explaining containment, evidence preservation or the order of actions.';
      data.faqs[0].a =
        'Certifications establish a baseline, not evidence of incident experience. We make that distinction clear and ask what the candidate would do in the first twenty minutes of a realistic incident.';
      data.faqs[1].a =
        'Breach experience is one kind of evidence, not the whole assessment. We examine risk decisions, preparation and response judgment against the requirements of the role.';
      data.faqs[2].a =
        'Outreach is direct, person to person, with identity protected until both sides consent. We agree the confidentiality requirements before the search begins.';
    }
    if (data.slug === 'leadership') {
      data.faqs[0].q = 'How do you assess leaders when the brief is still taking shape?';
      data.faqs[0].a =
        'We clarify the decisions the leader will own and the stakeholders they need to work with. Those priorities shape the assessment before interviews begin.';
    }
    const weights = data.bars.map((bar) => parseFloat(bar.v));
    const total = weights.reduce((sum, value) => sum + value, 0);
    if (total !== 100) {
      // Preserve relative priorities; distribute rounding remainders to total exactly 100.
      const exact = weights.map((value) => (value / total) * 100);
      const rounded = exact.map(Math.floor);
      const order = exact
        .map((value, index) => ({ index, remainder: value - rounded[index] }))
        .sort((a, b) => b.remainder - a.remainder);
      const remaining = 100 - rounded.reduce((sum, value) => sum + value, 0);
      order.slice(0, remaining).forEach(({ index }) => rounded[index]++);
      data.bars.forEach((bar, index) => {
        bar.v = `${rounded[index]}%`;
        bar.w = String(Math.round((rounded[index] / Math.max(...rounded)) * 100));
      });
      data.barsFt =
        'These example priorities total 100%. Your hiring manager sets the weights for the role before interviews begin.';
    }
    if (data.slug === 'data-analytics')
      data.barsFt =
        'Core depth and systems design carry the most weight in this example. Your hiring manager sets the priorities for the actual role.';
    return '  ' + JSON.stringify(data) + (comma ? ',' : '');
  })
  .join('\n');
await writeFile(file, next);
