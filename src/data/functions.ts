export interface HiringChallenge {
  title: string;
  desc: string;
}

export interface RoleItem {
  title: string;
  level: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface JobFunction {
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  badge: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
  hiringChallenges: HiringChallenge[];
  rolesWeHire: RoleItem[];
  whyTribera: { title: string; desc: string }[];
  faqs: FAQ[];
  ctaHeadline: string;
  ctaSubtext: string;
}

export const jobFunctions: JobFunction[] = [
  {
    slug: `engineering`,
    title: `Engineering`,
    subtitle: `Three hire-ready engineers in 36 hours — validated on what they built, not what they claimed.`,
    badge: `Engineering`,
    icon: `tabler:code`,
    seoTitle: `Engineering Hiring — tribera`,
    seoDescription: `AI-validated, advisor-interviewed engineering candidates. 1:3 selection guarantee. First shortlist in 36 hours.`,
    overview:
      `Engineering hiring is the highest-stakes function in most technology organisations — and the most time-consuming to get right. Tribera’s AI validates what candidates have actually built before a single advisory interview begins. GitHub activity, open source depth, architecture patterns, and project complexity are cross-referenced against every claim in the profile. A Tribera technology advisor then runs a structured technical interview — scenario-based, not trivia. What reaches you is three engineering candidates your managers will want to interview, not three who cleared a keyword screen.`,
    hiringChallenges: [
      {
        title: `Resume embellishment is systemic`,
        desc: `Engineering candidates routinely inflate seniority, project scope, and technology ownership. Our AI cross-validates every claim against public technical activity and employer timelines.`,
      },
      {
        title: `Engineering bandwidth consumed by screening`,
        desc: `Your senior engineers are the most expensive people to spend on first-pass interviews. Tribera absorbs the entire discovery and pre-qualification layer.`,
      },
      {
        title: `System design depth is hard to assess quickly`,
        desc: `Our advisors conduct scenario-based architecture discussions — real tradeoffs, production constraints, failure modes — not trivia questions with textbook answers.`,
      },
      {
        title: `Culture and autonomy mismatch driving early attrition`,
        desc: `Technical competence without team-fit leads to 90-day exits. Our behavioural scoring surfaces communication style, autonomy preference, and collaboration instinct alongside technical depth.`,
      },
    ],
    rolesWeHire: [
      { title: `Software Engineering`, level: `Mid to Principal Engineer` },
      { title: `Frontend Engineering`, level: `Engineer to Tech Lead` },
      { title: `Backend Engineering`, level: `Engineer to Staff Engineer` },
      { title: `Full-Stack Engineering`, level: `Engineer to Principal` },
      { title: `Mobile Engineering`, level: `iOS / Android Engineer to Lead` },
      { title: `Engineering Management`, level: `EM to VP Engineering` },
      { title: `QA & Test Engineering`, level: `SDET to Head of Quality` },
      { title: `Solution Architecture`, level: `Architect to Enterprise Architect` },
    ],
    whyTribera: [
      {
        title: `AI validates before advisors interview`,
        desc: `Every engineering candidate is screened across 100+ signals — code quality, project validity, system design patterns, and open source depth — before a Tribera advisor commits a single minute.`,
      },
      {
        title: `Technology advisors, not generalist interviewers`,
        desc: `Shortlist interviews are conducted by advisors who have shipped software, led engineering teams, and made real architecture decisions. They ask what your hiring managers would ask.`,
      },
      {
        title: `Compounding calibration`,
        desc: `Every hire sharpens our model for your specific engineering culture and technical bar. By the fifth hire, our shortlists are better than most internal TA teams can produce.`,
      },
      {
        title: `36-hour shortlist, 1:3 guarantee`,
        desc: `Role brief to three interview-ready candidates in 36 hours. Interview three. Hire at least one — guaranteed.`,
      },
    ],
    faqs: [
      {
        q: `Can you assess niche technology stacks?`,
        a: `Yes. We have sourced and evaluated engineers in Rust, Go, Elixir, Scala, and proprietary enterprise technology stacks. Our AI reaches passive talent beyond job boards — GitHub, open source communities, and specialised forums.`,
      },
      {
        q: `How do you handle senior IC vs management track evaluation?`,
        a: `These are distinct profiles and we evaluate them separately. Staff and principal engineers are assessed on technical depth and architectural impact. Engineering managers are assessed on team development, process design, and cross-functional leadership.`,
      },
      {
        q: `What is your approach to AI-assisted or LLM-heavy engineering roles?`,
        a: `We have advisors with production AI system experience. For LLM-adjacent engineering roles, we assess prompt engineering depth, evaluation framework design, and production reliability — not just API integration familiarity.`,
      },
    ],
    ctaHeadline: `Ready to hire engineers who actually build?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `ai-machine-learning`,
    title: `AI & Machine Learning`,
    subtitle: `Separating genuine ML depth from the credential wave — at a speed the market demands.`,
    badge: `AI & ML`,
    icon: `tabler:brain`,
    seoTitle: `AI & Machine Learning Hiring — tribera`,
    seoDescription: `AI-validated, advisor-interviewed ML and AI candidates. 1:3 selection guarantee. First shortlist in 36 hours.`,
    overview:
      `The AI hiring market is the most noise-to-signal-distorted segment in technology today. Bootcamp certifications, Kaggle rankings, and GPT wrapper projects have made it genuinely difficult to distinguish candidates with real production ML depth from those with polished presentation. Tribera’s AI validation layer cross-references research contributions, production system evidence, and genuine model deployment history before advisory interviews begin. The result is a shortlist of three candidates who have built at the depth you require — not three who have certified for it.`,
    hiringChallenges: [
      {
        title: `Credential inflation is at its worst in AI/ML`,
        desc: `Every candidate has a deep learning certification. Our AI validates production ML system experience — model latency, retraining pipelines, monitoring frameworks — not course completions.`,
      },
      {
        title: `Research depth vs applied engineering mismatch`,
        desc: `Academic ML talent often struggles with production constraints. We assess both dimensions and surface which profile your role actually requires — researcher or applied engineer.`,
      },
      {
        title: `LLM hype obscuring genuine GenAI depth`,
        desc: `We distinguish candidates who have built real RAG pipelines, fine-tuned models, and designed evaluation frameworks from those who have built ChatGPT wrappers.`,
      },
      {
        title: `MLOps maturity gap in most candidate pools`,
        desc: `Strong model builders with weak MLOps instincts create operational debt. We surface this gap explicitly in every shortlist evaluation.`,
      },
    ],
    rolesWeHire: [
      { title: `Machine Learning Engineering`, level: `MLE to Principal MLE` },
      { title: `Applied AI / Research Science`, level: `Researcher to Director of AI` },
      { title: `LLM & GenAI Engineering`, level: `Engineer to AI Platform Lead` },
      { title: `MLOps & AI Platform`, level: `MLOps Engineer to Head of AI Platform` },
      { title: `Computer Vision Engineering`, level: `CV Engineer to Lead` },
      { title: `NLP Engineering`, level: `NLP Engineer to Principal` },
      { title: `AI Product Management`, level: `AI PM to Head of AI Product` },
      { title: `Head of AI / VP AI`, level: `Director to C-Suite` },
    ],
    whyTribera: [
      {
        title: `AI validation of AI talent`,
        desc: `Our signal models are specifically calibrated for ML/AI roles — validating open source contributions, research publications, production system evidence, and model deployment history before any advisory time.`,
      },
      {
        title: `Applied AI advisors who have built in production`,
        desc: `Shortlist interviews are run by advisors with real production ML experience — people who have managed model retraining at scale, built evaluation frameworks, and shipped LLM-powered products.`,
      },
      {
        title: `Distinction between researcher and engineer profiles`,
        desc: `We probe for both dimensions and surface which is dominant — ensuring the candidate you interview matches the profile your role actually needs.`,
      },
      {
        title: `36-hour shortlist in a market where talent disappears fast`,
        desc: `Strong AI/ML talent holds multiple offers simultaneously. 36 hours from brief to shortlist keeps you ahead of competing offer timelines.`,
      },
    ],
    faqs: [
      {
        q: `Can you hire for both research and applied ML roles simultaneously?`,
        a: `Yes. These require distinct evaluation frameworks — research rigour for scientist roles, production engineering discipline for applied MLE roles. We run both tracks in parallel with appropriate advisors for each.`,
      },
      {
        q: `How do you assess GenAI and LLM depth specifically?`,
        a: `We probe for RAG architecture design, fine-tuning methodology, evaluation framework construction, prompt engineering discipline, and production reliability — distinguishing genuine applied AI depth from API integration experience.`,
      },
      {
        q: `Do you cover AI leadership as well as individual contributor roles?`,
        a: `Yes. From individual MLE roles to Head of AI and VP AI positions, we apply the same advisor-interview and AI-validation framework — with the leadership evaluation component calibrated for the organisational scope of the role.`,
      },
    ],
    ctaHeadline: `Ready to hire AI and ML talent with real depth?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `platform-infrastructure`,
    title: `Platform & Infrastructure`,
    subtitle: `The people who keep everything running — validated on reliability, not just credentials.`,
    badge: `Platform & Infrastructure`,
    icon: `tabler:server`,
    seoTitle: `Platform & Infrastructure Hiring — tribera`,
    seoDescription: `AI-validated, advisor-interviewed platform and infrastructure candidates. 1:3 selection guarantee. First shortlist in 36 hours.`,
    overview:
      `Platform and infrastructure roles are among the most difficult to assess correctly. The gap between someone who has operated systems at scale and someone who has read about it is enormous — and nearly invisible in a standard interview. Tribera advisors have built and run cloud infrastructure, designed reliability frameworks, and led platform engineering teams through real incidents. They probe for operational judgment — the kind that only comes from running production systems under real pressure.`,
    hiringChallenges: [
      {
        title: `Cloud certification ≠ cloud operational depth`,
        desc: `AWS Solutions Architect and GCP Professional certifications are common. Genuine multi-region, high-availability system design experience is rare. Our AI and advisors distinguish the two.`,
      },
      {
        title: `Incident response experience is hard to fake — but easy to claim`,
        desc: `We probe for specific incident timelines, root cause analysis quality, and post-incident process change — separating real SRE depth from textbook reliability knowledge.`,
      },
      {
        title: `Infrastructure-as-code maturity varies enormously`,
        desc: `Terraform, Pulumi, and CDK experience ranges from PoC familiarity to production-grade, state-managed infrastructure at scale. Our advisors calibrate to your actual complexity.`,
      },
      {
        title: `Developer experience orientation is often absent`,
        desc: `Platform engineering roles require empathy for the developer experience — not just systems reliability. We assess for this explicitly.`,
      },
    ],
    rolesWeHire: [
      { title: `Site Reliability Engineering`, level: `SRE to Principal SRE` },
      { title: `Platform Engineering`, level: `Platform Engineer to Head of Platform` },
      { title: `Cloud Engineering`, level: `Cloud Engineer to Cloud Architect` },
      { title: `DevOps Engineering`, level: `DevOps Engineer to DevOps Lead` },
      { title: `Infrastructure Architecture`, level: `Architect to Chief Architect` },
      { title: `Networking & Security Infrastructure`, level: `Network Engineer to VP Infra` },
      { title: `Database & Storage Engineering`, level: `DBA to Principal Database Engineer` },
      { title: `VP Engineering / Head of Infrastructure`, level: `Director to C-Suite` },
    ],
    whyTribera: [
      {
        title: `Platform practitioners as interviewers`,
        desc: `Advisory interviews are run by advisors who have operated cloud infrastructure at scale, designed SLO frameworks, and led platform teams through real incidents.`,
      },
      {
        title: `Operational judgment assessment`,
        desc: `We probe for real incident scenarios, architecture trade-off decisions, and reliability design choices — not certification knowledge.`,
      },
      {
        title: `Stack-agnostic evaluation`,
        desc: `We assess fundamental platform engineering judgment — not familiarity with your current tooling. Strong candidates adapt. We find the ones who do.`,
      },
      {
        title: `36-hour shortlist, 1:3 guarantee`,
        desc: `Three vetted candidates in 36 hours. Interview three, hire one — or we rebuild and continue.`,
      },
    ],
    faqs: [
      {
        q: `How do you distinguish SRE from DevOps candidates?`,
        a: `These are genuinely distinct profiles. SRE candidates are assessed on SLO design, error budget management, and reliability engineering discipline. DevOps candidates are assessed on CI/CD pipeline design, automation depth, and deployment velocity.`,
      },
      {
        q: `Can you hire for Kubernetes and container orchestration depth specifically?`,
        a: `Yes. We have advisors who have operated large Kubernetes clusters in production — assessing candidates on scheduling complexity, resource management, networking, and stateful workload management.`,
      },
    ],
    ctaHeadline: `Ready to hire platform and infrastructure talent?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `product`,
    title: `Product`,
    subtitle: `Product thinkers. Not just product managers who have learned the vocabulary.`,
    badge: `Product`,
    icon: `tabler:layout-kanban`,
    seoTitle: `Product Hiring — tribera`,
    seoDescription: `AI-validated, advisor-interviewed product managers and product leaders. 1:3 selection guarantee. First shortlist in 36 hours.`,
    overview:
      `Product management is the function where vocabulary is most systematically mistaken for capability. Every candidate talks about discovery, metrics, and trade-offs. Very few have exercised real product judgment under commercial pressure. Tribera advisors have built and shipped products — they can distinguish the PM who shaped strategy from the one who attended the roadmap review. Add AI validation of written output, community contributions, and product thinking evidence, and the shortlist you receive is genuinely different from anything a keyword search produces.`,
    hiringChallenges: [
      {
        title: `Product vocabulary masquerades as product thinking`,
        desc: `Discovery, OKRs, and roadmap frameworks are table stakes — not differentiators. Our advisors probe for the judgment behind the language.`,
      },
      {
        title: `Feature factory PMs vs product strategy PMs`,
        desc: `Most candidates can execute a roadmap. Far fewer can define one. We assess for both dimensions and surface which is stronger.`,
      },
      {
        title: `Engineering collaboration depth`,
        desc: `The best PMs are technically literate enough to challenge architecture decisions without overstepping. Tribera assesses this specifically.`,
      },
      {
        title: `Stage-calibration mismatch`,
        desc: `A PM who excels in a scrappy pre-PMF environment may fail in a structured scale-up. We calibrate the candidate against your specific operating context.`,
      },
    ],
    rolesWeHire: [
      { title: `Product Management`, level: `APM to Group PM` },
      { title: `Senior / Staff Product Manager`, level: `Senior PM to Staff PM` },
      { title: `Platform Product Management`, level: `PM to Director` },
      { title: `Growth Product Management`, level: `Growth PM to VP Growth` },
      { title: `Technical Product Management`, level: `TPM to Director of TPM` },
      { title: `Product Design Leadership`, level: `Lead Designer to Head of Design` },
      { title: `Head of Product`, level: `Head to VP Product` },
      { title: `Chief Product Officer`, level: `VP to CPO` },
    ],
    whyTribera: [
      {
        title: `Product advisors who have shipped`,
        desc: `Every product interview at Tribera is conducted by an advisor who has defined roadmaps, argued with engineering leads, presented to boards, and lived with the outcomes.`,
      },
      {
        title: `Real product problems, not case study theatre`,
        desc: `We give candidates scenarios from your actual product context — not generic PM interview frameworks. The quality of response tells us everything.`,
      },
      {
        title: `Signal beyond job titles`,
        desc: `We validate product thinking through writing, conference talks, open-source contributions, community engagement, and advisory roles — not just previous employer brands.`,
      },
      {
        title: `1:3 guarantee, no exceptions`,
        desc: `Interview three Tribera candidates. Hire at least one. If not, we rebuild the shortlist and continue — at no additional cost.`,
      },
    ],
    faqs: [
      {
        q: `How do you distinguish strategic PMs from execution PMs?`,
        a: `We probe specifically for this during advisory interviews — distinguishing candidates who define strategy from those who execute it well. Most roles need both, and we surface which dimension is stronger in each candidate.`,
      },
      {
        q: `Do you hire for AI product management specifically?`,
        a: `Yes. AI PM roles require a distinct profile — comfort with probabilistic system behaviour, evaluation framework design, and user trust considerations that don’t arise in deterministic software. We assess for this specifically.`,
      },
      {
        q: `Can you hire for B2B and B2C product roles simultaneously?`,
        a: `Yes. These require different judgment profiles — enterprise contract cycles and stakeholder alignment for B2B; conversion, retention, and experience design for B2C. We calibrate the evaluation accordingly.`,
      },
    ],
    ctaHeadline: `Ready to hire product talent that ships?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `data`,
    title: `Data`,
    subtitle: `The people who turn signal into decisions — validated on what they have actually built.`,
    badge: `Data`,
    icon: `tabler:chart-bar`,
    seoTitle: `Data Hiring — tribera`,
    seoDescription: `AI-validated, advisor-interviewed data engineers, scientists, and analysts. 1:3 selection guarantee. First shortlist in 36 hours.`,
    overview:
      `Data hiring sits at the intersection of engineering rigour and analytical judgment — and most hiring processes assess only one of the two. Tribera evaluates both. Our AI validates production data system experience — pipeline reliability, data quality frameworks, storage architecture — before advisory interviews probe for analytical depth and business impact. The result is a shortlist of three candidates who can build the system and use it to drive decisions.`,
    hiringChallenges: [
      {
        title: `Data engineering depth vs data science depth conflated`,
        desc: `These are distinct skill profiles. We separate them sharply in every brief and evaluation — avoiding the common mistake of interviewing a data scientist for a data engineering role.`,
      },
      {
        title: `Analytics engineering as a discipline is under-assessed`,
        desc: `dbt, data modelling, and semantic layer design are increasingly critical — but few hiring processes evaluate them rigorously. Our advisors do.`,
      },
      {
        title: `Business impact evidence vs technical credential inflation`,
        desc: `Many data candidates can describe their techniques. Fewer can demonstrate business outcomes they personally drove. We probe for the latter.`,
      },
      {
        title: `Data governance and quality instinct`,
        desc: `Strong data engineers often have weak governance instincts. We surface data quality ownership, lineage awareness, and metadata management depth in every advisory interview.`,
      },
    ],
    rolesWeHire: [
      { title: `Data Engineering`, level: `DE to Principal Data Engineer` },
      { title: `Data Science`, level: `DS to Head of Data Science` },
      { title: `Analytics Engineering`, level: `Analytics Engineer to Analytics Lead` },
      { title: `Business Intelligence & Reporting`, level: `BI Analyst to BI Lead` },
      { title: `Data Architecture`, level: `Data Architect to Chief Data Architect` },
      { title: `Data Platform & Infrastructure`, level: `Platform Engineer to VP Data Platform` },
      { title: `Data Product Management`, level: `Data PM to Director of Data Products` },
      { title: `Chief Data Officer`, level: `Head of Data to CDO` },
    ],
    whyTribera: [
      {
        title: `Data practitioners as advisors`,
        desc: `Advisory interviews are run by people who have built data pipelines at scale, managed data platform migrations, and led analytics teams to measurable business outcomes.`,
      },
      {
        title: `Engineering rigour and analytical depth — both assessed`,
        desc: `We probe for both system design quality and analytical reasoning in every shortlist interview — surface-level assessment of either dimension is a shortlist failure.`,
      },
      {
        title: `Modern data stack fluency`,
        desc: `Our advisors assess data stack architectural judgment — not just tool familiarity. Strong candidates choose the right tool for the context. We find the ones who do.`,
      },
      {
        title: `36-hour shortlist, 1:3 guarantee`,
        desc: `Three hire-ready candidates in 36 hours. Interview three, hire one — or we rebuild and continue.`,
      },
    ],
    faqs: [
      {
        q: `Do you differentiate between data engineering and analytics engineering roles?`,
        a: `Yes, sharply. Data engineering candidates are assessed on pipeline reliability, orchestration design, and storage architecture. Analytics engineering candidates are assessed on data modelling, dbt depth, and semantic layer design.`,
      },
      {
        q: `Can you hire for real-time and streaming data roles?`,
        a: `Yes. Kafka, Flink, Spark Streaming, and real-time OLAP system experience are assessed by advisors who have operated streaming data infrastructure in production.`,
      },
    ],
    ctaHeadline: `Ready to hire data talent that drives decisions?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `cybersecurity-function`,
    title: `Cybersecurity`,
    subtitle: `Security talent that has operated under real threat conditions — not just certified for them.`,
    badge: `Cybersecurity`,
    icon: `tabler:shield-check`,
    seoTitle: `Cybersecurity Hiring — tribera`,
    seoDescription: `AI-validated, advisor-interviewed cybersecurity candidates. 1:3 selection guarantee. First shortlist in 36 hours.`,
    overview:
      `Security hiring has two failure modes: hiring a credentialed candidate without operational depth, or running a process too slow to catch the candidate before a competing offer lands. Tribera eliminates both. AI validates real incident response history, architecture depth, and operational security capability before advisory interviews probe the judgment behind the certifications. The shortlist you receive is three candidates ready to operate — not three who have studied for it.`,
    hiringChallenges: [
      {
        title: `Certification ≠ operational security capability`,
        desc: `CISSP, CEH, and CISM are table stakes. We evaluate actual incident response history, threat modelling depth, and security architecture decision quality.`,
      },
      {
        title: `GRC vs technical security — frequently conflated`,
        desc: `Governance, risk, and compliance experience is not the same as hands-on security engineering depth. We separate these profiles sharply in every mandate.`,
      },
      {
        title: `Threat model calibration by industry context`,
        desc: `BFSI security depth differs fundamentally from SaaS AppSec requirements. Our advisors calibrate every evaluation against your specific threat surface.`,
      },
      {
        title: `Confidentiality constraints in security leadership searches`,
        desc: `CISO and senior security leadership roles often cannot be publicly advertised. Tribera’s passive-talent network and discreet outreach protocols are built for this constraint.`,
      },
    ],
    rolesWeHire: [
      { title: `Application Security`, level: `AppSec Engineer to Head of AppSec` },
      { title: `SOC & Incident Response`, level: `Analyst to SOC Director` },
      { title: `Cloud Security Engineering`, level: `Engineer to Cloud Security Lead` },
      { title: `DevSecOps`, level: `Engineer to VP Security Engineering` },
      { title: `Penetration Testing & Red Team`, level: `Pentester to Red Team Lead` },
      { title: `GRC & Compliance`, level: `GRC Analyst to CISO` },
      { title: `Security Architecture`, level: `Architect to Chief Security Architect` },
      { title: `CISO & Security Leadership`, level: `Director to C-Suite` },
    ],
    whyTribera: [
      {
        title: `Security practitioners as advisors`,
        desc: `Advisory interviews are conducted by people who have led SOC teams, architected zero-trust environments, and managed real security incidents — not generalists with a security checklist.`,
      },
      {
        title: `Discreet sourcing for sensitive mandates`,
        desc: `Security leadership roles are often confidential. Our passive-talent network and direct outreach protocols reach candidates who will never appear on a job board.`,
      },
      {
        title: `Threat-surface calibration per engagement`,
        desc: `We calibrate the evaluation against your specific threat model — regulated financial infrastructure, consumer data at scale, or SaaS API security each require different depth profiles.`,
      },
      {
        title: `1:3 guarantee with formal accountability`,
        desc: `Interview three candidates. Hire at least one. We rebuild and continue until you close.`,
      },
    ],
    faqs: [
      {
        q: `Can you hire for both technical security and CISO-level leadership simultaneously?`,
        a: `Yes. We run parallel tracks with distinct evaluation frameworks — IC security engineering roles assessed on operational depth, and CISO searches assessed on organisational leadership, board communication, and risk governance.`,
      },
      {
        q: `How do you handle confidential CISO searches?`,
        a: `All outreach is conducted through direct, discreet relationships — no job boards or aggregators. Candidate identity is protected until both parties consent to share details.`,
      },
    ],
    ctaHeadline: `Ready to build your security team?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated security candidates in 36 hours.`,
  },
  {
    slug: `technology-leadership`,
    title: `Technology Leadership`,
    subtitle: `CTO, VP Engineering, and Head of Technology searches — for when the right hire changes everything.`,
    badge: `Technology Leadership`,
    icon: `tabler:crown`,
    seoTitle: `Technology Leadership Hiring — tribera`,
    seoDescription: `AI-validated, advisor-interviewed CTO, VP Engineering, and technology leadership candidates. 1:3 selection guarantee. First shortlist in 36 hours.`,
    overview:
      `Technology leadership hiring is the highest-stakes search in most organisations. The wrong CTO or VP Engineering doesn’t just fail to deliver — they consume leadership bandwidth, erode team trust, and create technical debt that outlasts their tenure. Tribera’s approach to technology leadership is different: advisory interviews conducted by people who have held equivalent roles, AI validation of real technical impact and organisational influence, and a 1:3 guarantee that holds even at the C-suite level.`,
    hiringChallenges: [
      {
        title: `Technology leadership presence ≠ technology leadership capability`,
        desc: `Many candidates have the gravitas of a technology leader without the track record. Our advisors probe for specific organisational impact, team development evidence, and business outcome accountability.`,
      },
      {
        title: `Builder vs operator distinction`,
        desc: `Some CTOs build systems. Others scale them. Very few do both. We surface which profile each candidate holds — and whether it matches your current stage.`,
      },
      {
        title: `Board and commercial fluency`,
        desc: `Senior technology leaders must be credible to board members, commercial counterparts, and engineering teams simultaneously. Our advisors assess across all three dimensions.`,
      },
      {
        title: `Cultural authority and trust-building speed`,
        desc: `Technology leaders inherit existing teams. The ability to build trust quickly, diagnose team dynamics, and establish credibility without disruption is rare and hard to assess. We assess for it directly.`,
      },
    ],
    rolesWeHire: [
      { title: `Chief Technology Officer`, level: `Early-stage to Enterprise` },
      { title: `VP Engineering`, level: `Growth-stage to Enterprise` },
      { title: `Head of Engineering`, level: `Business Unit to Group` },
      { title: `Chief Architect / Principal Architect`, level: `Company-wide` },
      { title: `Head of Platform`, level: `Director to VP` },
      { title: `Head of Data & AI`, level: `Director to Chief AI Officer` },
      { title: `Engineering Director`, level: `Multi-team to Org-wide` },
      { title: `Chief Product & Technology Officer`, level: `CPTO` },
    ],
    whyTribera: [
      {
        title: `Technology leadership advisors with equivalent experience`,
        desc: `CTO and VP Engineering candidates are interviewed by advisors who have held equivalent roles — people who have built organisations, managed board relationships, and made real architecture decisions at scale.`,
      },
      {
        title: `Organisational impact validation`,
        desc: `We validate team-building evidence, architecture decisions made, and business outcomes delivered — not just technology brand association or leadership vocabulary.`,
      },
      {
        title: `Stage-calibration at every level`,
        desc: `A Series A CTO and a Series C VP Engineering require fundamentally different profiles. We calibrate the brief, the advisory interview, and the shortlist to your exact organisational stage.`,
      },
      {
        title: `1:3 guarantee at the C-suite`,
        desc: `The guarantee applies to technology leadership mandates too. Interview three, hire one — or we rebuild and continue.`,
      },
    ],
    faqs: [
      {
        q: `How do you assess CTO candidates at different company stages?`,
        a: `Early-stage CTOs are assessed on technical founding instinct, architecture decision-making under resource constraints, and team culture building. Enterprise CTOs are assessed on organisational design, stakeholder management, technology strategy, and board communication.`,
      },
      {
        q: `Can you run confidential CTO searches?`,
        a: `Yes. All technology leadership searches are conducted under strict confidentiality protocols. Candidate identity and role context are protected through every stage of the process.`,
      },
      {
        q: `What is your approach to assessing a candidate's ability to inherit an existing team?`,
        a: `We probe specifically for this — asking candidates to describe how they have joined, assessed, and built trust with existing engineering teams. The quality of reasoning about team dynamics tells us more than technical depth alone.`,
      },
    ],
    ctaHeadline: `Ready to hire technology leadership?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours — even at the C-suite.`,
  },
  {
    slug: `business-strategy`,
    title: `Business & Strategy`,
    subtitle: `Commercial leaders who can build the argument and deliver the outcome.`,
    badge: `Business & Strategy`,
    icon: `tabler:trending-up`,
    seoTitle: `Business & Strategy Hiring — tribera`,
    seoDescription: `AI-validated, advisor-interviewed business and strategy candidates. 1:3 selection guarantee. First shortlist in 36 hours.`,
    overview:
      `Business and strategy roles are among the hardest to evaluate correctly. Consulting pedigree is overweighted, commercial outcome ownership is underweighted, and the ability to operate in an ambiguous, resource-constrained environment is almost never assessed. Tribera advisors have held P&L accountability, led commercial strategy, and navigated board-level decision-making. They probe for the depth behind the framework — separating consultants who describe strategy from operators who execute it.`,
    hiringChallenges: [
      {
        title: `Consulting pedigree masking execution deficit`,
        desc: `MBB and Tier 1 consulting experience is valuable — but it often signals hypothesis-generation strength, not delivery capability. We probe for both and surface which is dominant.`,
      },
      {
        title: `Strategy depth without commercial P&L accountability`,
        desc: `The strongest strategy hires have owned outcomes — revenue targets, margin improvement, market expansion. We assess for P&L accountability explicitly.`,
      },
      {
        title: `M&A and integration experience claims hard to validate`,
        desc: `Many candidates claim deal experience. Few have managed post-merger integration under real complexity. Our advisors probe for the specific decisions, trade-offs, and outcomes.`,
      },
      {
        title: `Board and investor communication fluency`,
        desc: `Senior strategy roles require credibility with board members and investors. We assess communication depth at that level — not just internal stakeholder management.`,
      },
    ],
    rolesWeHire: [
      { title: `Strategy & Corporate Development`, level: `Lead to Chief Strategy Officer` },
      { title: `Business Development`, level: `BD Lead to VP BD` },
      { title: `General Management & P&L`, level: `GM to MD / CEO` },
      { title: `M&A & Integration`, level: `Associate to VP M&A` },
      { title: `Finance & FP&A Leadership`, level: `Manager to CFO` },
      { title: `Commercial Excellence`, level: `Lead to Chief Commercial Officer` },
      { title: `Market Expansion & GTM`, level: `Lead to VP Growth` },
      { title: `Chief of Staff`, level: `CoS to SVP Strategy` },
    ],
    whyTribera: [
      {
        title: `Commercial operators as advisors`,
        desc: `Advisory interviews are run by advisors who have held P&L accountability, managed board relationships, and led commercial strategy functions — not generalist interviewers.`,
      },
      {
        title: `Outcome-based evaluation`,
        desc: `We probe for specific outcomes — revenue moved, margin improved, markets entered, deals closed. Frameworks without outcomes don’t pass our interview.`,
      },
      {
        title: `Consulting-to-operator transition assessment`,
        desc: `Many mandates require candidates who have made the transition from advisory to delivery. We assess for this specifically — it’s one of the most common points of hiring failure we see.`,
      },
      {
        title: `1:3 guarantee across business and strategy roles`,
        desc: `Three candidates. At least one hire. We rebuild and continue until you close.`,
      },
    ],
    faqs: [
      {
        q: `Do you hire for both corporate strategy and business unit strategy roles?`,
        a: `Yes. Corporate strategy candidates are assessed on portfolio thinking, M&A literacy, and board-level communication. Business unit strategy candidates are assessed on P&L management, commercial execution, and cross-functional leadership.`,
      },
      {
        q: `Can you hire Chief of Staff roles at the CEO and CXO level?`,
        a: `Yes. Chief of Staff is a distinct competency profile — combining strategic synthesis, operational execution, and principal-level trust. We assess for all three dimensions.`,
      },
    ],
    ctaHeadline: `Ready to hire business and strategy talent?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `sales`,
    title: `Sales`,
    subtitle: `Revenue professionals who close — validated on pipeline, not on personality.`,
    badge: `Sales`,
    icon: `tabler:speakerphone`,
    seoTitle: `Sales Hiring — tribera`,
    seoDescription: `AI-validated, advisor-interviewed sales candidates. 1:3 selection guarantee. First shortlist in 36 hours.`,
    overview:
      `Sales hiring fails most often because interviewers are sold by the candidate’s interview performance rather than their actual revenue track record. Tribera advisors probe behind the numbers — deal cycle length, average contract value, competitive win rates, territory size, and the specific commercial decisions that drove outcomes. AI validates employment tenure, revenue claims, and LinkedIn activity against the narrative. What you receive is three sales candidates with verified track records — not three who interview well.`,
    hiringChallenges: [
      {
        title: `Revenue numbers are the easiest thing to inflate`,
        desc: `Quota attainment, deal size, and territory numbers are routinely misrepresented. Our AI cross-references employment history, company size context, and role scope before advisory interviews.`,
      },
      {
        title: `Hunter vs farmer profile mismatch`,
        desc: `Most sales mandates need a specific profile. We assess for new business development depth separately from account management and expansion — and surface which profile each candidate holds.`,
      },
      {
        title: `Enterprise vs SMB sales motion calibration`,
        desc: `Enterprise and SMB sales require fundamentally different skills — deal cycle management, stakeholder complexity, and commercial negotiation all differ. We calibrate the evaluation to your specific sales motion.`,
      },
      {
        title: `Charisma mistaken for commercial rigour`,
        desc: `Strong sales presenters sometimes mask weak commercial process discipline. Our advisors probe for pipeline management, forecasting accuracy, and CRM hygiene as rigour indicators.`,
      },
    ],
    rolesWeHire: [
      { title: `Enterprise Account Executive`, level: `AE to Senior AE` },
      { title: `Business Development Representative`, level: `BDR to Senior BDR` },
      { title: `Sales Leadership`, level: `Sales Manager to VP Sales` },
      { title: `Pre-Sales & Solution Consulting`, level: `SC to Head of Pre-Sales` },
      { title: `Revenue Operations`, level: `RevOps Analyst to Head of RevOps` },
      { title: `Customer Success`, level: `CSM to VP Customer Success` },
      { title: `Partnerships & Alliances`, level: `Partner Manager to VP Partnerships` },
      { title: `Chief Revenue Officer`, level: `VP Sales to CRO` },
    ],
    whyTribera: [
      {
        title: `Revenue practitioners as advisors`,
        desc: `Advisory interviews are conducted by advisors who have carried quota, managed sales teams, and built revenue functions. They ask the questions that separate genuine commercial depth from interview performance.`,
      },
      {
        title: `Revenue claim validation`,
        desc: `AI cross-references revenue claims, tenure data, and company scale context before any advisory interview. Inflated numbers surface before they reach your shortlist.`,
      },
      {
        title: `Sales motion calibration`,
        desc: `We calibrate the evaluation to your specific sales motion — enterprise SaaS, channel-led, transactional, or hybrid — ensuring the candidate profile matches your go-to-market reality.`,
      },
      {
        title: `1:3 guarantee, full accountability`,
        desc: `Three candidates. At least one hire. We rebuild and continue until you close.`,
      },
    ],
    faqs: [
      {
        q: `How do you verify revenue and quota claims?`,
        a: `AI cross-references employment history, company size and revenue data, and role context to pressure-test quota claims before advisory interviews. Advisory interviews then probe deal specifics — ACV, sales cycle, competition, and close mechanisms.`,
      },
      {
        q: `Can you hire for both enterprise and SMB sales simultaneously?`,
        a: `Yes. These require distinct profiles and we run them as separate mandates with calibrated evaluation frameworks — not the same interview applied to both.`,
      },
    ],
    ctaHeadline: `Ready to hire revenue professionals who close?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `talent-advisory`,
    title: `Talent Advisory`,
    subtitle: `HR and talent leaders who build the systems that make hiring work — not just fill the roles.`,
    badge: `Talent Advisory`,
    icon: `tabler:users`,
    seoTitle: `Talent Advisory & HR Hiring — tribera`,
    seoDescription: `AI-validated, advisor-interviewed HR and talent candidates. 1:3 selection guarantee. First shortlist in 36 hours.`,
    overview:
      `Talent and HR hiring is frequently circular — the people making the hire often don’t know what great looks like at the next level. Tribera provides an external perspective built on deep HR and talent practitioner experience. Our advisors have built TA functions, led HR transformations, and implemented people strategy at scale. They evaluate HR candidates on the outcomes they have actually driven — not the frameworks they can describe.`,
    hiringChallenges: [
      {
        title: `HR vocabulary is universal — outcomes are not`,
        desc: `Every HR candidate talks about business partnership, talent strategy, and OD. Our advisors probe for specific organisational outcomes delivered — not the language used to describe them.`,
      },
      {
        title: `TA function builder vs TA function operator`,
        desc: `Building a TA function from scratch and running a mature one require different capabilities. We assess for both dimensions and surface which profile each candidate holds.`,
      },
      {
        title: `HRBP depth varies enormously`,
        desc: `Strategic HRBP and administrative HR are not the same role. We calibrate the mandate and evaluation to the actual business partnership depth required.`,
      },
      {
        title: `People analytics fluency is increasingly non-negotiable`,
        desc: `Senior HR and talent roles now require comfort with data — workforce planning models, attrition analytics, and hiring funnel metrics. We assess for this specifically.`,
      },
    ],
    rolesWeHire: [
      { title: `Talent Acquisition Leadership`, level: `TA Lead to Head of TA` },
      { title: `HR Business Partnership`, level: `HRBP to VP HRBP` },
      { title: `People Operations`, level: `People Ops Lead to Head of People Ops` },
      { title: `Learning & Development`, level: `L&D Lead to Head of L&D` },
      { title: `Compensation & Benefits`, level: `C&B Analyst to Head of Total Rewards` },
      { title: `OD & Culture`, level: `OD Consultant to Head of OD` },
      { title: `People Analytics`, level: `Analyst to Head of People Analytics` },
      { title: `Chief People Officer`, level: `VP People to CPO` },
    ],
    whyTribera: [
      {
        title: `HR practitioners who have built functions`,
        desc: `Advisory interviews are run by advisors who have led TA transformations, built people strategy from scratch, and managed HR organisations through scale and change.`,
      },
      {
        title: `Outcome-based evaluation of HR impact`,
        desc: `We probe for specific outcomes — cost-per-hire reduction, time-to-fill improvement, retention rate movement, culture survey shifts. Language without outcomes doesn’t pass our interview.`,
      },
      {
        title: `Business partnership depth assessment`,
        desc: `For HRBP and senior HR roles, we assess commercial fluency, business partnership credibility, and board-level communication capability — not just HR process knowledge.`,
      },
      {
        title: `1:3 guarantee across people functions`,
        desc: `Three candidates. At least one hire. We rebuild and continue until you close.`,
      },
    ],
    faqs: [
      {
        q: `Do you hire for both generalist HR and specialist HR roles?`,
        a: `Yes. Generalist HR leadership roles and specialist functions (TA, L&D, C&B, OD, people analytics) are evaluated with distinct frameworks by advisors with the appropriate depth.`,
      },
      {
        q: `Can you hire Chief People Officers and CHRO-level roles?`,
        a: `Yes. CPO and CHRO searches are conducted with the same advisor-interview and AI-validation framework — with the advisory interview calibrated for organisational leadership, board relationship, and people strategy at scale.`,
      },
    ],
    ctaHeadline: `Ready to hire talent and HR leadership?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `operations`,
    title: `Operations`,
    subtitle: `The people who turn strategy into delivery — validated on outcomes, not process familiarity.`,
    badge: `Operations`,
    icon: `tabler:adjustments-horizontal`,
    seoTitle: `Operations Hiring — tribera`,
    seoDescription: `AI-validated, advisor-interviewed operations candidates. 1:3 selection guarantee. First shortlist in 36 hours.`,
    overview:
      `Operations hiring suffers from a consistent failure mode: candidates who are fluent in the language of process improvement but light on evidence of actual delivery transformation. Tribera advisors have run operations at scale — managed supply chains, redesigned fulfilment networks, and led shared services transformations. They probe for real outcomes — cost reduction percentages, throughput improvements, error rate reduction — and the specific decisions that produced them.`,
    hiringChallenges: [
      {
        title: `Process framework fluency without delivery evidence`,
        desc: `Lean, Six Sigma, and Agile certifications are common. Documented improvement outcomes are rare. Our advisors probe for specific delivery results — not methodology familiarity.`,
      },
      {
        title: `Supply chain complexity underestimated`,
        desc: `Candidates often oversimplify multi-node supply chain experience. We assess for the specific complexity managed — supplier base size, SKU count, geographic span, disruption management.`,
      },
      {
        title: `Technology adoption leadership for operations roles`,
        desc: `Modern operations leadership requires comfort with ERP, WMS, TMS, and analytics tools. We assess for technology adoption leadership alongside process excellence.`,
      },
      {
        title: `Scale transition readiness`,
        desc: `Operations leaders who excel at one scale often struggle at the next. We assess for scale transition experience explicitly — candidates who have grown with a business from 100 to 1,000 employees, or from regional to national.`,
      },
    ],
    rolesWeHire: [
      { title: `Operations Management`, level: `Operations Lead to COO` },
      { title: `Supply Chain Management`, level: `Supply Chain Lead to Chief Supply Chain Officer` },
      { title: `Logistics & Fulfilment`, level: `Operations Manager to VP Logistics` },
      { title: `Process Excellence & Lean`, level: `Lean Lead to Head of Process Excellence` },
      { title: `Shared Services Leadership`, level: `SSC Lead to VP Shared Services` },
      { title: `Procurement & Vendor Management`, level: `Procurement Lead to CPO` },
      { title: `Business Operations`, level: `BizOps Lead to Head of Business Operations` },
      { title: `Chief Operating Officer`, level: `VP Operations to COO` },
    ],
    whyTribera: [
      {
        title: `Operations practitioners as advisors`,
        desc: `Advisory interviews are run by people who have managed large operations, led supply chain transformations, and delivered measurable efficiency improvements at scale.`,
      },
      {
        title: `Outcome-based evaluation`,
        desc: `We probe for specific outcomes — cost reduction achieved, throughput improved, error rates reduced, supplier lead times compressed. Process descriptions without outcomes don’t pass our interview.`,
      },
      {
        title: `Scale-calibrated assessment`,
        desc: `We calibrate the evaluation against your specific operational complexity — startup operations, mid-market logistics networks, and enterprise shared services each require different depth profiles.`,
      },
      {
        title: `1:3 guarantee across operations roles`,
        desc: `Three candidates. At least one hire. We rebuild and continue until you close.`,
      },
    ],
    faqs: [
      {
        q: `Do you hire for both physical operations and business operations roles?`,
        a: `Yes. Physical operations (supply chain, logistics, manufacturing) and business operations (RevOps, BizOps, shared services) are distinct profiles evaluated by advisors with the appropriate domain depth.`,
      },
      {
        q: `Can you hire COO-level roles?`,
        a: `Yes. COO searches are conducted with the same advisor-interview and AI-validation framework — calibrated for organisational leadership, cross-functional management, and board-level accountability.`,
      },
    ],
    ctaHeadline: `Ready to hire operations leaders who deliver?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `executive-search`,
    title: `Executive Search`,
    subtitle: `C-suite and board-level mandates where the wrong hire is measured in years, not months.`,
    badge: `Executive Search`,
    icon: `tabler:award`,
    seoTitle: `Executive Search — tribera`,
    seoDescription: `AI-validated, advisor-interviewed C-suite and board-level candidates. 1:3 selection guarantee. First shortlist in 36 hours.`,
    overview:
      `Executive search is the category where process quality matters most and is least often delivered. Traditional search firms are slow, opaque, and driven by placement incentives rather than hiring outcomes. Tribera’s executive search framework inverts this: AI validates organisational impact and leadership track record before advisory interviews conducted by people who have held equivalent roles. Every engagement is accountable to a 1:3 guarantee — even at the CEO and board level.`,
    hiringChallenges: [
      {
        title: `Leadership presence mistaken for leadership capability`,
        desc: `Executive candidates project confidence by design. Our advisors probe for specific organisational decisions, team outcomes, and business results — separating leadership gravitas from leadership evidence.`,
      },
      {
        title: `Board-level relationship management assessment`,
        desc: `C-suite leaders must manage board expectations, investor communication, and leadership team accountability simultaneously. We assess for all three dimensions.`,
      },
      {
        title: `Founder-to-professional-CEO transition readiness`,
        desc: `Many executive mandates require candidates who can operate within an investor-governed structure after careers as founders or autonomous operators. We assess for this transition specifically.`,
      },
      {
        title: `Confidentiality and market disruption risk`,
        desc: `CEO and CFO searches create market disruption if made public. Tribera’s discreet outreach network eliminates this risk entirely.`,
      },
    ],
    rolesWeHire: [
      { title: `Chief Executive Officer`, level: `Growth-stage to Enterprise` },
      { title: `Chief Financial Officer`, level: `Series B to Public Company` },
      { title: `Chief Operating Officer`, level: `Scale to Enterprise` },
      { title: `Chief Technology Officer`, level: `Early-stage to Enterprise` },
      { title: `Chief Marketing Officer`, level: `Scale to Enterprise` },
      { title: `Chief People Officer`, level: `Series C to Enterprise` },
      { title: `Chief Revenue Officer`, level: `Growth-stage to Enterprise` },
      { title: `Board Director & Independent Director`, level: `All stages` },
    ],
    whyTribera: [
      {
        title: `C-suite advisors interviewing C-suite candidates`,
        desc: `Executive candidates are interviewed by advisors who have held equivalent or senior roles. The conversation operates at the level the role demands.`,
      },
      {
        title: `Organisational impact validation`,
        desc: `AI validates leadership track record — company growth trajectories, team build-out evidence, board relationship history — before any advisory conversation begins.`,
      },
      {
        title: `Confidential outreach by design`,
        desc: `All executive searches are conducted through direct, trusted relationships. No job boards, no aggregators, no market disruption.`,
      },
      {
        title: `1:3 guarantee at the C-suite level`,
        desc: `The guarantee applies to CEO, CFO, and board-level mandates. Interview three. Hire at least one — or we rebuild and continue.`,
      },
    ],
    faqs: [
      {
        q: `How do you assess CEO candidates for different company stages?`,
        a: `We calibrate the evaluation framework to the specific company context — pre-PMF startup, growth-stage scale-up, PE-backed transformation, or enterprise leadership. Each stage requires a different leadership profile, and we assess accordingly.`,
      },
      {
        q: `Can you run board director searches?`,
        a: `Yes. Independent director and board advisor searches are conducted with the same framework — with the evaluation calibrated for governance depth, industry credibility, and board contribution quality.`,
      },
      {
        q: `How do you manage confidentiality for CEO and CFO searches?`,
        a: `All outreach is conducted through direct, personal relationships. Role context and company identity are shared only with pre-qualified candidates who have confirmed interest and signed NDA where required.`,
      },
    ],
    ctaHeadline: `Ready to hire executive leadership?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated C-suite candidates — even in 36 hours.`,
  },
];

export const findFunctionBySlug = (slug: string): JobFunction | undefined =>
  jobFunctions.find((f) => f.slug === slug);

export const getStaticPathsFunctions = () =>
  jobFunctions.map((fn) => ({
    params: { slug: fn.slug },
    props: { jobFunction: fn },
  }));
