export type Series = { n: string; w: number[] };
export const comparisonDimensions = [
  'Core depth',
  'Systems design',
  'Controls and risk',
  'Delivery speed',
  'Documentation',
  'Stakeholder handling',
];
export type IntelligenceSeries = Series & { s: number; note: string };

export function comparison(a: Series, b: Series, relative = false) {
  const gaps = a.w.map((value, i) => Math.abs(value - b.w[i]));
  const top = gaps.indexOf(Math.max(...gaps));
  const max = relative ? Math.max(...a.w, ...b.w, 1) : 100;
  return {
    rows: comparisonDimensions.map((name, i) => ({
      name,
      a: a.w[i],
      b: b.w[i],
      widthA: (a.w[i] / max) * 100,
      widthB: (b.w[i] / max) * 100,
      key: gaps[top] > 0 && i === top,
    })),
    note:
      a === b
        ? 'Same selection on both sides. Choose two different options to compare their priorities.'
        : gaps[top] === 0
          ? 'These selections have identical example weights. Your hiring manager sets the actual priorities.'
          : `${comparisonDimensions[top]} moves from ${Math.min(a.w[top], b.w[top])}% to ${Math.max(a.w[top], b.w[top])}%. Difference: ${gaps[top]} percentage points. Example weights; your hiring manager sets the actual priorities.`,
  };
}

export const intelligenceDimensions = [
  'Core depth',
  'Systems judgment',
  'Ownership',
  'Communication',
  'Delivery',
  'Commercial sense',
];
export function intelligenceChart(series: IntelligenceSeries) {
  const max = Math.max(...series.w, 1);
  return {
    rows: intelligenceDimensions.map((name, i) => ({
      name,
      value: series.w[i],
      width: (series.w[i] / max) * 100,
      key: i === series.w.indexOf(max),
    })),
    note: `${series.note} ${series.s.toLocaleString('en-US')} scored interviews.`,
  };
}
