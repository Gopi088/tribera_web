export interface Industry {
  slug: string;
  title: string;
  shortDescription: string;
  icon?: string;
  image?: string;
}

export const industries: Industry[] = [
  {
    slug: 'technology',
    title: 'Technology',
    shortDescription:
      'Engineering, product, and platform roles at SaaS companies, ISVs, and tech-first enterprises.',
    icon: 'tabler:cpu',
  },
  {
    slug: 'banking-financial-services',
    title: 'Banking & Financial Services',
    shortDescription:
      'Talent for banks, NBFCs, asset managers, and fintech innovators across front, middle, and back office.',
    icon: 'tabler:building-bank',
  },
  {
    slug: 'global-capability-centres',
    title: 'Global Capability Centres',
    shortDescription:
      'Specialized hiring for GCCs scaling engineering, analytics, and operations hubs in India.',
    icon: 'tabler:building-skyscraper',
  },
  {
    slug: 'healthcare-life-sciences',
    title: 'Healthcare & Life Sciences',
    shortDescription:
      'Roles across medtech, pharma, diagnostics, and digital health with deep domain fit.',
    icon: 'tabler:heart-rate-monitor',
  },
  {
    slug: 'retail-consumer',
    title: 'Retail & Consumer',
    shortDescription:
      'Commercial, supply chain, and digital roles for retail brands and D2C businesses.',
    icon: 'tabler:shopping-bag',
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    shortDescription:
      'Plant, operations, quality, and engineering talent for discrete and process manufacturing.',
    icon: 'tabler:settings-2',
  },
  {
    slug: 'energy-infrastructure',
    title: 'Energy & Infrastructure',
    shortDescription:
      'Leadership and technical roles across renewables, utilities, and large-scale infrastructure projects.',
    icon: 'tabler:bolt',
  },
  {
    slug: 'professional-services',
    title: 'Professional Services',
    shortDescription:
      'Consulting, advisory, and delivery roles at management consulting and IT services firms.',
    icon: 'tabler:briefcase',
  },
];

export const findIndustryBySlug = (slug: string): Industry | undefined =>
  industries.find((i) => i.slug === slug);

export const getStaticPathsIndustries = () =>
  industries.map((industry) => ({
    params: { slug: industry.slug },
    props: { industry },
  }));
