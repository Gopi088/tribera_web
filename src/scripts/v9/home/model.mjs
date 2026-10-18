export const skills = [
  {
    k: 'A',
    n: 'System building & ownership',
    sn: 'Systems built',
    w: 14,
    s: 5,
    ev: 'Built and ran the production detection platform end to end, and owned it in production.',
  },
  {
    k: 'B',
    n: 'Detection & prevention design',
    sn: 'Detection',
    w: 14,
    s: 5,
    ev: 'Walked through a detection he shipped: the logic, the false-positive tuning and the rollout.',
  },
  {
    k: 'C',
    n: 'AI / LLM security basics',
    sn: 'LLM security',
    w: 12,
    s: 2,
    ev: 'Named the risks, including prompt injection and data leakage, but could not point to a control he had tested in production.',
  },
  {
    k: 'D',
    n: 'ML / LLM pipeline fundamentals',
    sn: 'ML pipeline',
    w: 12,
    s: 5,
    ev: 'Clear on the full pipeline, from training data to eval to deployment, because he has built one.',
  },
  {
    k: 'E',
    n: 'Python automation & tooling',
    sn: 'Python',
    w: 10,
    s: 4,
    ev: 'Automates his own tooling well; a couple of the scripts were still manual glue.',
  },
  {
    k: 'F',
    n: 'Secure data access',
    sn: 'Data access',
    w: 8,
    s: 2,
    ev: 'Understands the principle, but had not implemented fine-grained access controls himself.',
  },
  {
    k: 'G',
    n: 'Cloud deployment & runtime',
    sn: 'Cloud runtime',
    w: 8,
    s: 4,
    ev: 'Deploys and operates on cloud confidently; lighter on cost and multi-region trade-offs.',
  },
  {
    k: 'H',
    n: 'Incident handling & ownership',
    sn: 'Incidents',
    w: 10,
    s: 3,
    ev: 'Has handled incidents, but spoke more as a contributor than as the owner on call.',
  },
  {
    k: 'I',
    n: 'Authenticity',
    sn: 'Authenticity',
    w: 12,
    s: 4,
    ev: 'Answers matched the CV; flagged the two gaps before I asked.',
  },
];
export const presets = {
  brief: skills.map((d) => d.w),
  detect: [16, 20, 12, 8, 8, 6, 6, 8, 16],
  llm: [6, 6, 24, 10, 8, 20, 8, 6, 12],
  own: [16, 16, 8, 16, 12, 6, 10, 10, 6],
};
export const notes = {
  brief: 'As briefed, his production detection work carries him to a Select. AI security is where we’d probe next.',
  detect:
    'With detection weighted highest, his production work carries the verdict. We’d still probe AI security in your round.',
  llm: 'With LLM security weighted highest, he drops to Grey. He named the risks but couldn’t point to a control he had tested in production.',
  own: 'With ownership weighted highest, he stays a Select. He built, shipped and ran the detection platform himself.',
};
export function scoreBrief(weights) {
  if (weights.length !== skills.length || weights.some((w) => !Number.isFinite(w) || w < 0 || w > 40))
    throw new Error('Invalid brief weights');
  const total = weights.reduce((a, w) => a + w, 0);
  const score = total ? Math.round((weights.reduce((a, w, i) => a + w * skills[i].s, 0) / total) * 10) : 0;
  return {
    score,
    total,
    label: score >= 34 ? 'Select' : score >= 26 ? 'Grey' : 'Reject',
    band: score >= 34 ? 'b-sel' : score >= 26 ? 'b-grey' : 'b-rej',
  };
}
// Allocate integer percentages by largest remainder so every nonempty brief totals 100.
export function normalizedShares(weights) {
  const { total } = scoreBrief(weights);
  const shares = weights.map((weight) => (total ? Math.floor((weight / total) * 100) : 0));
  if (total) {
    const order = weights
      .map((weight, i) => ({ i, fraction: (weight / total) * 100 - shares[i] }))
      .sort((a, b) => b.fraction - a.fraction || a.i - b.i);
    const remaining = 100 - shares.reduce((sum, value) => sum + value, 0);
    order.slice(0, remaining).forEach(({ i }) => shares[i]++);
  }
  return shares;
}
export const candidateScores = [29, 24, 40, 31, 43, 22, 37, 27];
export function clearCount(bar) {
  return candidateScores.filter((score) => score >= bar).length;
}
export const stages = [
  {
    count: 126,
    label: 'Sourced & screened',
    text: '126 people, shaded by how far each got. The two in red were hired.',
  },
  { count: 40, label: 'HR interviews', text: '40 reached a first-round interview. 86 never did.' },
  { count: 14, label: 'Technical interviews', text: '14 reached a technical interview.' },
  { count: 5, label: 'Sent to the team', text: '5 reached the team, including the two in red who were hired.' },
  { count: 2, label: 'They hired two', text: 'Two hired from five interviews. The other 121 never reached the team.' },
];
