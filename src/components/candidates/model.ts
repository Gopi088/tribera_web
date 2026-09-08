export const dimensions = [
  { name: 'Architecture thinking', score: 96 },
  { name: 'Systems design', score: 91 },
  { name: 'Code quality', score: 95 },
  { name: 'Communication', score: 89 },
  { name: 'Ops and on-call', score: 74 },
  { name: 'Product sense', score: 68 },
];

export const briefs = [
  {
    name: 'Consumer product',
    weights: [30, 30, 15, 15, 10, 0],
    note: 'His interview scores stay the same. This team puts most weight on architecture and systems design, two of his strengths.',
  },
  {
    name: 'Fintech platform',
    weights: [25, 25, 25, 10, 10, 5],
    note: 'His interview scores stay the same. This team gives architecture, systems design and code quality equal weight.',
  },
  {
    name: 'Infrastructure / SRE',
    weights: [15, 30, 15, 10, 30, 0],
    note: 'His interview scores stay the same. This team puts more weight on on-call experience than Consumer product does, so his overall score changes.',
  },
  {
    name: 'Early-stage product',
    weights: [15, 15, 10, 25, 5, 30],
    note: 'His interview scores stay the same. This team puts more weight on product sense and communication than Consumer product does.',
  },
];

export function weightedScore(weights: number[]) {
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  return total ? dimensions.reduce((sum, dimension, index) => sum + dimension.score * weights[index], 0) / total : 0;
}

export function leadingPriorities(weights: number[]) {
  const highest = Math.max(...weights);
  return weights.map((weight) => highest > 0 && weight === highest);
}

// Relative to this example, not a pass/fail threshold.
const secondLowest = [...dimensions].map((dimension) => dimension.score).sort((a, b) => a - b)[1];
export const weakerEvidence = dimensions.map((dimension) => dimension.score <= secondLowest);
