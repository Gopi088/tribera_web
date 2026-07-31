export const CAREER_DIMENSIONS = [
  'Judgment',
  'Craft',
  'Ownership',
  'Communication',
  'Speed',
  'Commercial sense',
] as const;

export type CareerRole = {
  slug: string;
  title: string;
  dept: string;
  type: string;
  loc: string;
  mode: string;
  exp: string;
  feat: boolean;
  blurb: string;
  w: number[];
  own: string[];
  why: string;
  scored: string[];
  bring: string[];
  nice: string[];
  prompt: string;
};

export const CAREER_ROLES: CareerRole[] = [
  {
    slug: 'backend-engineer',
    title: 'Backend Engineer',
    dept: 'Engineering',
    type: 'Full-time',
    loc: 'Bengaluru',
    mode: 'Onsite',
    exp: '3–6 years',
    feat: true,
    blurb:
      'Great hiring products feel simple on the surface. That simplicity is earned in the backend.',
    w: [26, 30, 16, 10, 14, 4],
    own: [
      'Build the APIs and services behind the hiring workflows',
      'Keep the system fast, dependable, and easy to reason about',
      'Work with product and the AI team on evaluation logic, scoring and data flow',
      'Own what you ship, including the parts that break',
    ],
    why: 'Simple products only stay simple when the systems underneath are rigorous. Everything a hiring manager sees on our platform is a decision somebody made in the backend first.',
    scored: [
      'A tradeoff you made and can still defend. Not the framework choice — the one that cost you something.',
      'Whether what you built is still easy to reason about a year later. We will ask about something you would build differently now.',
      'What you did the night it broke and it was yours. The interval before anyone knew is the interesting part.',
      'Explaining a technical constraint to somebody who is not technical, without making them feel stupid.',
      'Shipping without leaving a mess for the next person. Both halves count.',
      'Knowing which of two correct solutions costs less to run, and saying so unprompted.',
    ],
    bring: [
      'Backend experience in production systems people actually depend on',
      'Working knowledge of APIs, databases and service architecture',
      'Clear judgment on design, debugging and tradeoffs',
      'Python, Go or something adjacent',
      'Comfort sitting close to the product problem, not only the technical one',
      'The ability to keep complexity under control as the system grows',
    ],
    nice: [
      'PostgreSQL, Redis, queues or workflow orchestration',
      'Cloud infrastructure, observability and deployment pipelines',
      'Anything AI-adjacent in production',
      'Distributed systems, async workflows, event-driven services',
    ],
    prompt:
      'The paragraph matters more. Tell us about something you built that you would build differently now — that is the first question anyway, so you may as well start there.',
  },
  {
    slug: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    dept: 'Engineering',
    type: 'Full-time',
    loc: 'Bengaluru',
    mode: 'Onsite',
    exp: '2–5 years',
    feat: true,
    blurb:
      'Practical AI systems that make hiring decisions clearer, more structured, and easier to trust.',
    w: [30, 26, 14, 10, 16, 4],
    own: [
      'Build AI and ML workflows that improve candidate evaluation and decision support',
      'Work across model behavior, offline evaluation, and product integration',
      'Partner with backend and product teams to keep the system explainable, reliable, and useful in practice',
      'Track quality, failure modes, and signal quality over time',
    ],
    why: 'Tribera\u2019s value comes from better judgment, not more automation for its own sake. This role makes that real in the product.',
    scored: [
      'A modelling choice you made and can still defend — especially the one that did not work.',
      'Whether your system is still legible a year later: what it does, why, and what it would take to change it.',
      'What you did when the model misbehaved in production and it was yours. The interval before anyone knew is the interesting part.',
      'Explaining a statistical result to somebody who is not technical — including why it might be wrong.',
      'Shipping an experiment to production without leaving a mess for the next person. Both halves count.',
      'Knowing when a simpler model is the right answer, and saying so unprompted.',
    ],
    bring: [
      'Applied ML experience in real products',
      'Comfort with NLP, ranking, retrieval, or decision-support systems',
      'Strong Python fundamentals and experience working with ML tooling in production',
      'Familiarity with model evaluation, experimentation, and prompt or workflow iteration',
      'Strong instincts around measurement, iteration, and practical outcomes',
      'The ability to keep complexity under control and make system behavior legible',
    ],
    nice: [
      'Experience with LLM-based systems, retrieval workflows, or model orchestration',
      'Voice or speech model experience',
      'Familiarity with LLM tooling and prompt evaluation',
      'Background in search, ranking, or classification systems',
    ],
    prompt:
      'The paragraph matters more. Tell us about something you built that you would build differently now — that is the first question anyway, so you may as well start there.',
  },
  {
    slug: 'software-intern',
    title: 'Software Intern',
    dept: 'Engineering',
    type: 'Internship',
    loc: 'Bengaluru',
    mode: 'Onsite',
    exp: 'Student or recent graduate',
    feat: false,
    blurb:
      'This is not a shadowing internship. You will do real work, ship real output, and learn in context.',
    w: [20, 22, 22, 16, 16, 4],
    own: [
      'Contribute to feature work, fixes, and internal tooling',
      'Learn how product, backend, and AI systems fit together in practice',
      'Write clean code, take feedback well, and ship with review',
      'Build confidence through real production exposure',
    ],
    why: 'Interns at Tribera leave with real context, real skills, and work that actually mattered.',
    scored: [
      'A choice you made in a project and can still defend — including the one that went wrong.',
      'Whether the code you wrote is easy for someone else to pick up. We will ask about something you would build differently now.',
      'What you did when something you shipped was yours. The interval before anyone knew is the interesting part.',
      'Explaining what you built to somebody who did not build it with you, without losing them.',
      'Finishing something properly rather than finishing something early. Both halves count.',
      'Knowing the difference between solving a problem and solving the problem in front of you.',
    ],
    bring: [
      'Strong interest in software engineering and product building',
      'Willingness to learn quickly and ask clear questions',
      'Solid programming fundamentals in Python, JavaScript, or a similar language',
      'Basic understanding of APIs, backend logic, or web application structure',
      'Ownership, curiosity, and follow-through',
    ],
    nice: [
      'Project or internship experience with web or backend systems',
      'Exposure to Git, debugging workflows, and shipping code with review',
      'Interest in AI-assisted products',
    ],
    prompt:
      'The paragraph matters more. Tell us about something you built — a project, a script, anything — that you would build differently now. That is the first question anyway, so you may as well start there.',
  },
  {
    slug: 'talent-advisor',
    title: 'Talent Advisor',
    dept: 'Talent Advisory',
    type: 'Full-time',
    loc: 'Indiranagar, Bengaluru',
    mode: 'Onsite',
    exp: '4+ years',
    feat: true,
    blurb:
      'The resume tells you what someone did. It rarely tells you what they can do. We are building the team that knows the difference.',
    w: [28, 16, 16, 26, 8, 6],
    own: [
      'Read capability, not credentials — and act on it',
      'Partner with clients to define what great actually looks like',
      'Build quality-first pipelines, not volume-driven ones',
      'Own every role from brief to signed offer',
    ],
    why: 'Signal over noise. Outcomes over activity. This role is where that difference gets made, one search at a time.',
    scored: [
      'A candidate call you made against the obvious read — and how it held up. We will ask about the one you got wrong.',
      'Whether your assessment still holds a year later. We will ask about a candidate you were wrong about and what you missed.',
      'What you did when a search you owned stalled, and it was yours. The interval before anyone knew is the interesting part.',
      'Telling a client something they do not want to hear about their own process, and staying useful.',
      'Moving a search forward without lowering the bar. Both halves count.',
      'Knowing when a role should not be filled at all — and saying so before the search starts.',
    ],
    bring: [
      'Deep experience in agency or high-growth startup hiring',
      'Instinct for depth — not surface-level profile matching',
      'Comfort owning client relationships end to end',
      'Thinking that challenges briefs, not just executes them',
      'The confidence to say no when the brief is wrong',
    ],
    nice: [
      'Experience hiring for engineering, AI, or product roles',
      'Familiarity with structured interviewing and scorecards',
      'A network of senior talent you can actually pick up the phone to',
    ],
    prompt:
      'The paragraph matters more. Tell us about a candidate you were wrong about, and what changed your read — that is the first question anyway, so you may as well start there.',
  },
  {
    slug: 'senior-delivery-partner',
    title: 'Senior Delivery Partner',
    dept: 'Talent Advisory',
    type: 'Full-time',
    loc: 'Indiranagar, Bengaluru',
    mode: 'Onsite',
    exp: '7+ years',
    feat: false,
    blurb:
      'Activity is easy to measure. Outcomes are harder. We are accountable for who joins, not for how many profiles were shared.',
    w: [24, 12, 24, 20, 10, 10],
    own: [
      'Full delivery accountability across multiple clients',
      'The entire funnel — brief to day one — owned end to end',
      'The scorecard discipline on every role, even when clients push back',
      'Build the process that makes closure repeatable, not accidental',
    ],
    why: 'We do not count profiles shared. We count people who joined. This role owns that number.',
    scored: [
      'A delivery decision where the pressure said one thing and the data said another — and which one you followed.',
      'Whether your delivery process would survive a new client with the same team. We will ask about the last one that did not.',
      'What you did when a client programme started sliding, and it was yours. The interval before anyone knew is the interesting part.',
      'Explaining a miss to a client before they found it themselves.',
      'Keeping multiple roles moving without letting any one of them degrade. Both halves count.',
      'Knowing when a fee, a scope, or a client is wrong for us — and acting on it.',
    ],
    bring: [
      'Proven leadership in recruitment delivery or program management',
      'A track record built on closures, not pipeline volume',
      'Fluency in funnel metrics — conversion, drop-off, efficiency',
      'Structured thinking and high personal ownership',
      'The spine to tell a client the bar is wrong',
    ],
    nice: [
      'Experience building or managing a delivery team',
      'Background in technical or engineering hiring',
      'Familiarity with MSP, RPO, or large account environments',
    ],
    prompt:
      'The paragraph matters more. Tell us about an outcome you owned that nearly did not happen, and what you did about it — that is the first question anyway, so you may as well start there.',
  },
  {
    slug: 'talent-associate',
    title: 'Talent Associate',
    dept: 'Talent Advisory',
    type: 'Full-time',
    loc: 'Indiranagar, Bengaluru',
    mode: 'Onsite',
    exp: 'Entry level',
    feat: false,
    blurb:
      'Every expert was once a beginner who refused to stay one. You will not file resumes. You will learn to read people.',
    w: [18, 14, 20, 30, 12, 6],
    own: [
      'Identify real capability — not just keyword matching',
      'Have honest, direct conversations with candidates',
      'Understand what structured, quality hiring looks like',
      'Own roles end to end with real accountability',
    ],
    why: 'This is not a role where you file resumes. It is where you learn to see potential.',
    scored: [
      'A first impression you later revised — and what changed your read.',
      'Whether the notes and shortlists you produce are useful to someone else without explanation.',
      'What you did when something you owned went wrong, and it was yours.',
      'Having a direct conversation with a candidate or client without softening it into mush.',
      'Learning fast and acting on feedback the same week. Both halves count.',
      'Understanding that a livelihood sits behind every resume you read, and behaving like it.',
    ],
    bring: [
      'Curiosity that drives understanding, not assumption',
      'Clarity in how you think and communicate',
      'Hunger to learn over the comfort of the familiar',
      'Honesty — with candidates, clients, and yourself',
      'Comfort being measured against a published bar',
    ],
    nice: [
      'Any exposure to hiring, recruiting, or people roles',
      'Strong writing — emails, notes, summaries',
      'Interest in how AI is changing the way people get hired',
    ],
    prompt:
      'The paragraph matters more. Tell us about a time you were wrong about someone, and what changed your read — that is the first question anyway, so you may as well start there.',
  },
  {
    slug: 'growth-intern',
    title: 'Growth Intern',
    dept: 'Business Development',
    type: 'Internship',
    loc: 'Bengaluru',
    mode: 'Onsite',
    exp: 'Internship',
    feat: false,
    blurb:
      'Not every conversation closes a deal. The best ones open a door. That is the whole job, and it matters.',
    w: [16, 10, 18, 28, 12, 16],
    own: [
      'Identify the right person and find your way to them — the approach is yours',
      'Build personalised outreach based on company context and hiring patterns',
      'Book qualified intro meetings for the founding team',
      'Follow up with intent — most responses come after the third touch',
      'Maintain a clean, structured outreach tracker at all times',
    ],
    why: 'Signal over noise. Outcomes over activity. Every door you open is a conversation that was not happening before.',
    scored: [
      'A prospect you chose to pursue against the obvious logic — and what happened.',
      'Whether your outreach would still read well to a stranger a month later. We will ask about one you would write differently now.',
      'What you did when a thread went quiet and it was yours. The follow-up nobody sent is the interesting part.',
      'Getting a busy person to reply to two sentences. That is the craft.',
      'Iterating on what you send without breaking the standard. Both halves count.',
      'Knowing the difference between a meeting booked and a meeting worth having.',
    ],
    bring: [
      'Clear writing — clarity over vocabulary',
      'Comfort reaching out to new people every day',
      'Persistence — silence is data, not rejection',
      'Curiosity about startups, hiring, or B2B SaaS',
      'The habit of thinking before sending — personalisation is the work',
    ],
    nice: [
      'Any sales, outreach, or startup experience',
      'Comfort with spreadsheets and clean process',
      'Writing samples — emails, posts, essays',
    ],
    prompt:
      'The paragraph matters more. Tell us about a door you opened that had no right to open — that is the first question anyway, so you may as well start there.',
  },
];
