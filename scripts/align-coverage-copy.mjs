import { readFile, writeFile } from 'node:fs/promises';

// These data files contain one JSON object per route; retain the specialised examples.
for (const file of ['src/data/function-pages.ts', 'src/data/industry-pages.ts']) {
  const source = await readFile(file, 'utf8');
  const next = source
    .split('\n')
    .map((line) => {
      if (!line.trimStart().startsWith('{"slug":')) return line;
      const trailingComma = line.trimEnd().endsWith(',');
      const data = JSON.parse(line.trim().replace(/,$/, ''));
      data.description = data.description.replace(
        /Three people, all hireable, inside 36 hours\./g,
        'An expert-reviewed shortlist, assessed against your role.'
      );
      data.heroPs = data.heroPs.map((text) =>
        text.startsWith('Three people, all hireable, inside 36 hours')
          ? 'Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist.'
          : text
      );
      data.closeDek =
        'Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins.';
      data.qqs = data.qqs.map((question) => ({
        ...question,
        q: question.q.replace('What was the first thing you wrong?', 'What was the first thing you got wrong?'),
        thinT: 'A thin answer',
        forT: 'Evidence to listen for',
      }));
      data.faqs = data.faqs.map((faq) =>
        /realistic time to offer/.test(faq.q)
          ? {
              ...faq,
              a: "We confirm shortlist timing when we agree the brief. Time to offer depends on the role, candidate availability and your team's interviews.",
            }
          : faq
      );
      if (data.slug === 'product-saas') data.heroH1 = 'Hire <em>product thinkers, not just product managers.</em>';
      return '  ' + JSON.stringify(data) + (trailingComma ? ',' : '');
    })
    .join('\n');
  await writeFile(file, next);
}
