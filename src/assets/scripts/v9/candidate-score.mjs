// Weights are relative, not percentages. Normalize once; round only the verdict score.
export function candidateScore(dimensions, weights) {
  const safe = weights.map((value) => Math.max(0, Math.min(50, Number(value) || 0)));
  const total = safe.reduce((sum, value) => sum + value, 0);
  const exact = total ? (dimensions.reduce((sum, dimension, i) => sum + dimension.s * safe[i], 0) / total) * 10 : 0;
  const score = Math.round(exact);
  // Largest remainders keep the displayed integer shares summing to exactly 100.
  const shares = safe.map((value) => (total ? Math.floor((value / total) * 100) : 0));
  if (total) {
    const order = safe
      .map((value, i) => ({ i, fraction: (value / total) * 100 - shares[i] }))
      .sort((a, b) => b.fraction - a.fraction);
    const remaining = 100 - shares.reduce((sum, value) => sum + value, 0);
    order.slice(0, remaining).forEach(({ i }) => shares[i]++);
  }
  return {
    score,
    exact,
    shares,
    total: total ? 100 : 0,
    band: score >= 34 ? 'Select' : score >= 26 ? 'Grey' : 'Reject',
  };
}
