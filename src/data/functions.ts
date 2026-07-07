export interface JobFunction {
  slug: string;
  title: string;
  shortDescription: string;
  icon?: string;
  image?: string;
}

export const jobFunctions: JobFunction[] = [
  {
    slug: 'engineering',
    title: 'Engineering',
    shortDescription:
      'Software, platform, data, and infrastructure engineering across all seniority levels.',
    icon: 'tabler:code',
  },
  {
    slug: 'product-management',
    title: 'Product Management',
    shortDescription:
      'Product managers, program leads, and strategy roles shaping roadmaps and outcomes.',
    icon: 'tabler:layout-kanban',
  },
  {
    slug: 'data-analytics',
    title: 'Data & Analytics',
    shortDescription:
      'Data scientists, analysts, and ML engineers translating signal into business decisions.',
    icon: 'tabler:chart-bar',
  },
  {
    slug: 'sales-business-development',
    title: 'Sales & Business Development',
    shortDescription:
      'Enterprise sales, pre-sales, and BD roles that drive pipeline and revenue growth.',
    icon: 'tabler:trending-up',
  },
  {
    slug: 'finance-accounting',
    title: 'Finance & Accounting',
    shortDescription:
      'Controllers, FP&A, and finance leadership for growth-stage and enterprise businesses.',
    icon: 'tabler:calculator',
  },
  {
    slug: 'human-resources',
    title: 'Human Resources',
    shortDescription:
      'HR business partners, talent acquisition, and people operations specialists.',
    icon: 'tabler:users',
  },
  {
    slug: 'marketing',
    title: 'Marketing',
    shortDescription:
      'Brand, performance, content, and product marketing roles across B2B and B2C.',
    icon: 'tabler:speakerphone',
  },
  {
    slug: 'operations',
    title: 'Operations',
    shortDescription:
      'Supply chain, logistics, process excellence, and general operations leadership.',
    icon: 'tabler:adjustments-horizontal',
  },
  {
    slug: 'legal-compliance',
    title: 'Legal & Compliance',
    shortDescription:
      'In-house counsel, compliance officers, and legal ops professionals at regulated businesses.',
    icon: 'tabler:gavel',
  },
];

export const findFunctionBySlug = (slug: string): JobFunction | undefined =>
  jobFunctions.find((f) => f.slug === slug);

export const getStaticPathsFunctions = () =>
  jobFunctions.map((fn) => ({
    params: { slug: fn.slug },
    props: { jobFunction: fn },
  }));
