export const JOB_CATALOG = {
  'ai-ml-engineer': { title: 'AI/ML Engineer', department: 'Engineering' },
  'backend-engineer': { title: 'Backend Engineer', department: 'Engineering' },
  'growth-intern': { title: 'Growth Intern', department: 'Business Development' },
  'senior-delivery-partner': { title: 'Senior Delivery Partner', department: 'Talent Advisory' },
  'software-intern': { title: 'Software Intern', department: 'Engineering' },
  'talent-advisor': { title: 'Talent Advisor', department: 'Talent Advisory' },
  'talent-associate': { title: 'Talent Associate', department: 'Talent Advisory' },
};

export const findJobBySlug = (slug) => JOB_CATALOG[String(slug || '').trim()] || null;
