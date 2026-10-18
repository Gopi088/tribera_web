import type { Series } from '~/utils/chart-model';
export { comparison, intelligenceChart } from '~/utils/chart-model';
import { functionPages } from './function-pages';
import { industryPages } from './industry-pages';

const series = (pages: typeof functionPages | typeof industryPages): Record<string, Series> =>
  Object.fromEntries(
    pages.map((page) => [page.slug, { n: page.heroEyebrow, w: page.bars.map((bar) => parseFloat(bar.v)) }])
  );
export const functionSeries = series(functionPages);
export const industrySeries = series(industryPages);

// Existing published figures, unchanged. Their provenance remains an owner-review item.
export const intelligenceSeries: Record<string, Series & { s: number; note: string }> = {
  backend: {
    n: 'Backend & platform',
    w: [11, 19, 14, 26, 17, 13],
    s: 4820,
    note: 'Communication is the scarcest skill here. Technical depth is plentiful; the ability to explain a constraint is not.',
  },
  data: {
    n: 'Data & analytics',
    w: [14, 16, 12, 22, 21, 15],
    s: 3110,
    note: 'Delivery failures cluster here \u2014 strong modelling, weak evidence of anything reaching production.',
  },
  ml: {
    n: 'AI & machine learning',
    w: [9, 24, 15, 19, 24, 9],
    s: 1890,
    note: 'Systems judgment and delivery are the two scarce skills, and they tend to be scarce in the same people.',
  },
  security: {
    n: 'Cybersecurity',
    w: [12, 15, 31, 18, 14, 10],
    s: 1440,
    note: 'Ownership is the scarcest by a distance. Certificates are plentiful; a defensible account of an incident is not.',
  },
  sre: {
    n: 'Infrastructure & SRE',
    w: [10, 21, 22, 20, 18, 9],
    s: 1670,
    note: 'Judgment and ownership are the scarce pair, which is what on-call work would predict.',
  },
  product: {
    n: 'Product & design',
    w: [16, 14, 11, 21, 15, 23],
    s: 1520,
    note: 'Commercial sense is the scarcest, and the hardest to build once someone has joined.',
  },
  risk: {
    n: 'Risk & compliance',
    w: [13, 12, 18, 24, 14, 19],
    s: 1980,
    note: 'Communication is the constraint. Technical knowledge is rarely what is missing in this function.',
  },
  leadership: {
    n: 'Leadership & GCC',
    w: [8, 17, 19, 23, 13, 20],
    s: 960,
    note: 'Nothing is abundant and nothing dominates, which is why leadership hiring resists a single filter.',
  },
};
