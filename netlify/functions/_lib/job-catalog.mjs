export const JOB_CATALOG = {
  'ai-ml-engineer': { status: 'open', title: 'AI/ML Engineer', department: 'Engineering' },
  'backend-engineer': { status: 'open', title: 'Backend Engineer', department: 'Engineering' },
  'growth-intern': { status: 'open', title: 'Growth Intern', department: 'Business Development' },
  'senior-delivery-partner': { status: 'open', title: 'Senior Delivery Partner', department: 'Talent Advisory' },
  'software-intern': { status: 'open', title: 'Software Intern', department: 'Engineering' },
  'talent-advisor': { status: 'open', title: 'Talent Advisor', department: 'Talent Advisory' },
  'talent-associate': { status: 'open', title: 'Talent Associate', department: 'Talent Advisory' },
};

export const findJobBySlug = (slug) => JOB_CATALOG[String(slug || '').trim()] || null;
