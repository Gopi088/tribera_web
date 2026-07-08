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

export interface Industry {
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

export const industries: Industry[] = [
  {
    slug: `banking-financial-services`,
    title: `Banking & Financial Services`,
    subtitle: `Three vetted candidates in 36 hours — for roles where the wrong hire costs more than a quarter.`,
    badge: `Financial Services`,
    icon: `tabler:building-bank`,
    overview:
      `BFSI hiring demands more than a matched resume. Regulatory literacy, risk awareness, and domain depth are non-negotiable — and impossible to verify from a CV alone. Tribera advisors have operated inside banks, NBFCs, asset managers, and fintech businesses. They know what a strong credit analyst actually looks like in an interview, what a payments product manager needs to navigate, and which engineering candidates genuinely understand financial infrastructure. AI handles the screening volume. Advisors handle the judgment. You get three candidates you can actually hire.`,
    hiringChallenges: [
      {
        title: `Compliance-fit is invisible on paper`,
        desc: `Risk appetite, regulatory awareness, and audit mindset cannot be inferred from job titles. Tribera advisors probe for these directly.`,
      },
      {
        title: `Technical talent without domain context`,
        desc: `Engineering candidates in BFSI need fintech-specific depth — core banking integrations, payment rails, data residency. Generic tech interviews miss this entirely.`,
      },
      {
        title: `Long interview cycles damaging offer acceptance`,
        desc: `Top BFSI talent holds multiple offers simultaneously. Slow pipelines lose them. Tribera's 36-hour shortlist is designed for this reality.`,
      },
      {
        title: `Seniority inflation across resumes`,
        desc: `AVP and VP titles vary wildly across institutions. Our advisors calibrate candidates against real accountability — not designations.`,
      },
    ],
    rolesWeHire: [
      { title: `Engineering & Technology`, level: `Mid to Senior` },
      { title: `Risk & Compliance`, level: `Analyst to VP` },
      { title: `Product Management`, level: `PM to Group PM` },
      { title: `Data & Analytics`, level: `Analyst to Head of Data` },
      { title: `Investment & Wealth Management`, level: `Associate to Director` },
      { title: `Operations & Process`, level: `Lead to COO` },
      { title: `Fintech & Payments`, level: `IC to Platform Lead` },
      { title: `Finance & FP&A`, level: `Manager to CFO` },
    ],
    whyTribera: [
      {
        title: `Domain advisors, not generalist recruiters`,
        desc: `Every interview is conducted by a Tribera advisor with hands-on BFSI experience — someone who can challenge a candidate on trade lifecycle, credit modelling, or core banking architecture without briefing notes.`,
      },
      {
        title: `AI that understands regulatory context`,
        desc: `Our signal models are trained on BFSI-specific competency patterns — flagging risk gaps and compliance blindspots before a human hour is spent.`,
      },
      {
        title: `1:3 selection guarantee`,
        desc: `Interview three Tribera candidates and expect to hire at least one. We absorb the pipeline risk. You absorb none.`,
      },
      {
        title: `Speed that matches offer velocity`,
        desc: `From role brief to three hire-ready candidates in 36 hours. Built for markets where strong candidates disappear within a week.`,
      },
    ],
    faqs: [
      {
        q: `Do your advisors have actual BFSI backgrounds?`,
        a: `Yes. Every industry interview at Tribera is conducted by an advisor who has operated in that space — not someone who has recruited for it. For BFSI roles, that means people who have managed credit portfolios, built payment infrastructure, or led risk functions.`,
      },
      {
        q: `Can you hire for both business and technology roles?`,
        a: `Absolutely. We cover the full spectrum — from core banking engineers and data platform leads to risk officers, investment analysts, and CFOs.`,
      },
      {
        q: `How do you handle confidential or sensitive mandates?`,
        a: `All mandates are handled with strict confidentiality protocols. Candidate outreach is conducted discreetly, and role details are shared only with qualified, shortlisted candidates under NDA where required.`,
      },
      {
        q: `What is your typical time-to-offer for BFSI roles?`,
        a: `First shortlist within 36 hours of role confirmation. Most clients close within two to three weeks of receiving the shortlist — significantly faster than the four-to-six week average for BFSI roles in India.`,
      },
    ],
    ctaHeadline: `Ready to hire for Banking & Financial Services?`,
    ctaSubtext:
      `Tell us the role. Three advisor-interviewed, AI-validated candidates in your inbox within 36 hours.`,
  },
  {
    slug: `enterprise-technology`,
    title: `Enterprise Technology`,
    subtitle: `Engineering and product talent that ships — not just candidates who clear a screen.`,
    badge: `Enterprise Technology`,
    icon: `tabler:cpu`,
    overview:
      `Enterprise technology companies face a paradox: the market is flooded with candidates, yet finding someone with genuine depth — the kind that compounds over time — is harder than ever. Tribera's AI eliminates noise at scale, validating GitHub activity, architecture judgement, and system design thinking before a single human hour is spent. Advisors with technology backgrounds conduct the shortlist interviews. The result is three candidates your engineering managers will actually want to talk to.`,
    hiringChallenges: [
      {
        title: `Resume embellishment at scale`,
        desc: `Enterprise technology hiring is saturated with inflated profiles. Our AI cross-validates what candidates claim against what they have actually built — GitHub, Stack Overflow, project depth.`,
      },
      {
        title: `Technical screening consuming engineering bandwidth`,
        desc: `Engineering managers are the most expensive people in the room to run interviews. Tribera absorbs the discovery and first-pass evaluation entirely.`,
      },
      {
        title: `Seniority misalignment`,
        desc: `A Staff Engineer at one company is a mid-level contributor at another. Our advisors calibrate against real scope of impact, not titles.`,
      },
      {
        title: `Attrition driven by wrong culture signals`,
        desc: `Our behavioural scoring captures communication style, autonomy preference, and team integration likelihood — reducing 90-day attrition significantly.`,
      },
    ],
    rolesWeHire: [
      { title: `Software Engineering`, level: `Mid to Principal` },
      { title: `Platform & Infrastructure`, level: `SRE to VP Infra` },
      { title: `Product Management`, level: `PM to CPO` },
      { title: `Data Engineering & ML`, level: `Engineer to Director` },
      { title: `Engineering Management`, level: `EM to CTO` },
      { title: `Solution Architecture`, level: `Architect to Chief Architect` },
      { title: `QA & Reliability`, level: `SDET to Head of Quality` },
      { title: `Security Engineering`, level: `AppSec to CISO` },
    ],
    whyTribera: [
      {
        title: `AI validates before advisors interview`,
        desc: `Every candidate is screened across 100+ signals — technical depth, project validity, system design thinking — before a Tribera advisor spends a minute with them.`,
      },
      {
        title: `Engineering advisors, not recruiters`,
        desc: `Shortlist interviews are run by advisors who have shipped products and led engineering teams. They ask the questions your hiring managers would ask.`,
      },
      {
        title: `Compounding intelligence`,
        desc: `Every hire sharpens our model for your specific engineering culture. By hire five, we know your bar better than most internal TA teams.`,
      },
      {
        title: `36-hour first shortlist`,
        desc: `Role brief to three interview-ready candidates in 36 hours. No week-long sourcing cycles before you see a single name.`,
      },
    ],
    faqs: [
      {
        q: `Can you hire for niche technology stacks?`,
        a: `Yes. We have sourced for Rust, Go, Elixir, and proprietary enterprise stacks. Our AI searches beyond job boards — reaching passive talent on GitHub, open source projects, and specialised communities.`,
      },
      {
        q: `How do you assess architecture and system design?`,
        a: `Our technology advisors conduct scenario-based architecture discussions — real tradeoffs, not trivia. Candidates are scored on depth of reasoning, not correct answers.`,
      },
      {
        q: `Do you work with startups or only large enterprises?`,
        a: `Both. We calibrate the role brief and candidate bar to your specific context — a Series B startup and a 10,000-person enterprise need fundamentally different candidates for the same job title.`,
      },
      {
        q: `What if the first shortlist doesn't result in a hire?`,
        a: `Our 1:3 guarantee means we replace and continue until you hire. We treat a missed shortlist as our problem to fix, not a billing milestone.`,
      },
    ],
    ctaHeadline: `Ready to hire engineering talent that ships?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `product-saas`,
    title: `Product & SaaS`,
    subtitle: `Product thinkers. Not just product managers.`,
    badge: `Product & SaaS`,
    icon: `tabler:layout-kanban`,
    overview:
      `Hiring for product roles in a SaaS business is deceptively hard. Every candidate has the vocabulary. Very few have the judgment. Tribera advisors have built and shipped products — they can tell the difference between someone who attended roadmap reviews and someone who defined product strategy under real commercial pressure. Add AI validation of signal depth and a 1:3 selection guarantee, and you stop interviewing to discover — you start interviewing to decide.`,
    hiringChallenges: [
      {
        title: `Product vocabulary ≠ product thinking`,
        desc: `Every candidate talks about metrics, user research, and roadmap trade-offs. Our advisors probe for the judgment behind the language.`,
      },
      {
        title: `Customer-centricity that doesn't scale`,
        desc: `SaaS businesses need PMs who can balance customer voice with business model constraints. Generic behavioural interviews don't surface this.`,
      },
      {
        title: `Engineering collaboration depth`,
        desc: `The best SaaS PMs are technical enough to challenge architecture decisions without overstepping. Tribera assesses this specifically.`,
      },
      {
        title: `Growth-stage vs scale-stage mismatch`,
        desc: `A PM who excels in a scrappy Series A environment may fail in a structured Series C. We calibrate for your current operating context.`,
      },
    ],
    rolesWeHire: [
      { title: `Product Management`, level: `APM to CPO` },
      { title: `Growth & Monetisation`, level: `Growth PM to VP Growth` },
      { title: `Platform Product`, level: `PM to Group PM` },
      { title: `Product Analytics`, level: `Analyst to Director` },
      { title: `Product Design`, level: `Designer to Head of Design` },
      { title: `Customer Success`, level: `CSM to VP CS` },
      { title: `Revenue Operations`, level: `Ops Lead to CRO` },
      { title: `Technical Product`, level: `TPM to VP Engineering` },
    ],
    whyTribera: [
      {
        title: `Advisors who have shipped product`,
        desc: `Product interviews at Tribera are run by advisors who have defined roadmaps, argued with engineering leads, and presented to boards. They know what good looks like.`,
      },
      {
        title: `Scenario-based evaluation, not behavioural theatre`,
        desc: `We give candidates real product problems from your context — not generic case studies. The response quality tells us everything.`,
      },
      {
        title: `Signal beyond the resume`,
        desc: `We validate product thinking through public writing, conference talks, community contributions, and advisory roles — not just previous employer brands.`,
      },
      {
        title: `1:3 guarantee, no exceptions`,
        desc: `Interview three Tribera candidates. Hire at least one. If not, we rebuild the shortlist and continue — at no additional cost.`,
      },
    ],
    faqs: [
      {
        q: `Can you hire for B2B and B2C product roles?`,
        a: `Yes. We calibrate the evaluation framework to the specific product context — B2B SaaS, consumer apps, developer tools, and marketplace products all require different judgment profiles.`,
      },
      {
        q: `How do you assess strategic vs execution product managers?`,
        a: `Our advisors probe specifically for this split during the interview — distinguishing candidates who define strategy from those who execute it. Most mandates require both, and we surface which dimension is stronger.`,
      },
      {
        q: `Do you hire for design leadership as well?`,
        a: `Yes. We hire product designers, UX leads, and design directors — with the same advisor-interview and AI-validation framework applied to design portfolio depth and system thinking.`,
      },
    ],
    ctaHeadline: `Ready to hire product talent that ships?`,
    ctaSubtext: `From role brief to three interview-ready candidates in 36 hours.`,
  },
  {
    slug: `ai-data`,
    title: `AI & Data`,
    subtitle: `Signal over noise — for the people who build AI and data systems.`,
    badge: `AI & Data`,
    icon: `tabler:brain`,
    overview:
      `AI and data hiring is the most credentialing-inflated segment in the market. The proliferation of certifications, Kaggle rankings, and LLM wrapper projects makes it nearly impossible to distinguish genuine depth from well-presented surface knowledge. Tribera's AI validation cross-references research contributions, open source activity, and real production system experience before a single advisory interview begins. The result is a shortlist of three candidates who have actually built at the depth you require.`,
    hiringChallenges: [
      {
        title: `Credential inflation is severe`,
        desc: `Everyone has a deep learning certification. Our AI validates production ML system experience, not course completions.`,
      },
      {
        title: `Research vs applied depth mismatch`,
        desc: `Academic ML talent often struggles in applied engineering contexts. We assess for both dimensions and surface which profile your role actually requires.`,
      },
      {
        title: `Rapidly evolving tooling landscape`,
        desc: `Data stack choices made 18 months ago are already obsolete. Our advisors probe architectural judgment — the ability to choose tools wisely — not just familiarity with the current stack.`,
      },
      {
        title: `Data quality and governance blindspots`,
        desc: `Strong data engineers often have weak data governance instincts. We surface this explicitly in every shortlist evaluation.`,
      },
    ],
    rolesWeHire: [
      { title: `Machine Learning Engineering`, level: `MLE to Principal MLE` },
      { title: `AI Research & Applied Science`, level: `Researcher to Director` },
      { title: `Data Engineering`, level: `DE to Principal DE` },
      { title: `Data Science`, level: `DS to Head of Data Science` },
      { title: `Analytics Engineering`, level: `AE to Analytics Lead` },
      { title: `LLM / GenAI Engineering`, level: `Engineer to AI Platform Lead` },
      { title: `Data Platform & Infrastructure`, level: `Platform Eng to VP Data` },
      { title: `Head of AI / CDO`, level: `Director to C-Suite` },
    ],
    whyTribera: [
      {
        title: `Technical depth validation before advisory interviews`,
        desc: `AI cross-validates open source contributions, research publications, GitHub activity, and production system evidence before any human time is committed.`,
      },
      {
        title: `Applied AI advisors, not generalist interviewers`,
        desc: `Shortlist interviews are run by advisors who have built ML systems in production, managed data platform migrations, and led AI teams at scale.`,
      },
      {
        title: `Stack-agnostic evaluation framework`,
        desc: `We assess fundamental ML and data engineering judgment — not familiarity with your current tooling. Strong candidates adapt. We find the ones who do.`,
      },
      {
        title: `Speed to shortlist that matches a hot market`,
        desc: `AI and data talent disappears fast. 36 hours from role brief to three vetted candidates keeps you competitive against offers already in flight.`,
      },
    ],
    faqs: [
      {
        q: `Can you hire LLM and GenAI specialists specifically?`,
        a: `Yes. We have advisors with direct LLM application development and fine-tuning experience. We distinguish candidates with genuine applied AI depth from those who have built GPT wrappers.`,
      },
      {
        q: `How do you assess candidates at the researcher vs engineer boundary?`,
        a: `We probe for both dimensions explicitly — research rigour (experimental design, statistical validity) and engineering discipline (system reliability, latency, cost) — and surface which is dominant.`,
      },
      {
        q: `Do you cover data governance and platform engineering roles?`,
        a: `Yes. Data governance, data quality, metadata management, and platform engineering are distinct competency profiles. We hire across all of them.`,
      },
    ],
    ctaHeadline: `Ready to hire AI and data talent with real depth?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `cybersecurity`,
    title: `Cybersecurity`,
    subtitle: `The people who protect what matters — validated before they reach your interview room.`,
    badge: `Cybersecurity`,
    icon: `tabler:shield-lock`,
    overview:
      `Security hiring has two failure modes: hiring someone with certifications but no operational depth, or running a process so slow that strong candidates accept elsewhere. Tribera eliminates both. Our AI validates real incident response experience, architecture depth, and threat modelling capability. Advisory interviews probe the decision-making that can't be certified. The shortlist you receive is three candidates who are genuinely ready — not three candidates who passed a keyword screen.`,
    hiringChallenges: [
      {
        title: `Certification ≠ operational capability`,
        desc: `CISSP, CISM, and CEH are table stakes. Tribera evaluates real incident response history, threat modelling depth, and architecture decision quality.`,
      },
      {
        title: `GRC vs technical security misalignment`,
        desc: `Organisations frequently conflate governance, risk, and compliance roles with hands-on security engineering. We separate these sharply in every mandate.`,
      },
      {
        title: `Security talent with no industry context`,
        desc: `A BFSI security hire requires different depth than a SaaS AppSec hire. Our advisors evaluate candidates against your specific threat model and compliance landscape.`,
      },
      {
        title: `Confidentiality requirements in sourcing`,
        desc: `Security roles often cannot be publicly advertised. Tribera's passive-talent network and discreet outreach protocols are built for this.`,
      },
    ],
    rolesWeHire: [
      { title: `Application Security`, level: `AppSec Engineer to Head of AppSec` },
      { title: `SOC & Incident Response`, level: `Analyst to SOC Director` },
      { title: `Cloud Security`, level: `Engineer to Cloud Security Lead` },
      { title: `GRC & Compliance`, level: `Analyst to CISO` },
      { title: `Penetration Testing`, level: `Pentester to Red Team Lead` },
      { title: `Security Architecture`, level: `Architect to Chief Security Architect` },
      { title: `DevSecOps`, level: `Engineer to VP Security Engineering` },
      { title: `CISO & Security Leadership`, level: `Director to C-Suite` },
    ],
    whyTribera: [
      {
        title: `Security advisors with practitioner backgrounds`,
        desc: `Shortlist interviews are conducted by advisors who have led SOC teams, architected zero-trust environments, and managed real incidents — not generalists with a security checklist.`,
      },
      {
        title: `Discreet sourcing for sensitive mandates`,
        desc: `Security leadership roles are often confidential. Our outreach is conducted through trusted passive-talent relationships, not public job postings.`,
      },
      {
        title: `Threat-model calibration per engagement`,
        desc: `We calibrate what "strong" looks like against your specific threat surface — regulated financial infrastructure, consumer data at scale, and SaaS API security each require different depth.`,
      },
      {
        title: `1:3 guarantee with real accountability`,
        desc: `Interview three candidates. Hire at least one. We stand behind the shortlist quality with a formal guarantee.`,
      },
    ],
    faqs: [
      {
        q: `Can you hire for both technical and leadership security roles simultaneously?`,
        a: `Yes. We run parallel tracks for IC security engineering roles and CISO-level leadership searches. The evaluation framework is distinct for each.`,
      },
      {
        q: `How do you handle confidential searches for security leadership?`,
        a: `We conduct all outreach through direct, discreet relationships — no job boards, no aggregators. Candidate identity is protected until both parties consent to share details.`,
      },
    ],
    ctaHeadline: `Ready to build your security team?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated security candidates in 36 hours.`,
  },
  {
    slug: `healthcare-life-sciences`,
    title: `Healthcare & Life Sciences`,
    subtitle: `Talent that understands the stakes — clinical, regulatory, and commercial.`,
    badge: `Healthcare & Life Sciences`,
    icon: `tabler:heart-rate-monitor`,
    overview:
      `Healthcare and life sciences hiring sits at the intersection of deep scientific knowledge, regulatory complexity, and commercial pressure. Finding candidates who hold all three is rare — and verifying them through a traditional hiring process is slow and unreliable. Tribera advisors have operated inside pharma, MedTech, diagnostics, and digital health businesses. They run interviews that probe regulatory awareness, clinical domain understanding, and commercial acuity simultaneously — delivering shortlists that would take internal teams weeks to assemble.`,
    hiringChallenges: [
      {
        title: `Regulatory literacy is non-negotiable`,
        desc: `From CDSCO to FDA and ISO 13485, the regulatory landscape varies by product category and geography. Our advisors probe for real familiarity — not just label awareness.`,
      },
      {
        title: `Scientific depth vs commercial translation`,
        desc: `The strongest healthcare hires combine domain credibility with commercial instinct. We surface both dimensions explicitly in every shortlist.`,
      },
      {
        title: `Long validation cycles creating offer risk`,
        desc: `Healthcare leadership candidates often require extended due diligence. Tribera's process compresses discovery without compromising depth.`,
      },
      {
        title: `Digital health talent straddling two worlds`,
        desc: `Digital health roles require candidates who are literate in both clinical workflow and technology architecture. Generic interviews miss this intersection entirely.`,
      },
    ],
    rolesWeHire: [
      { title: `Medical Affairs & Clinical`, level: `MSL to CMO` },
      { title: `Regulatory Affairs`, level: `RA Specialist to VP RA` },
      { title: `R&D & Scientific Leadership`, level: `Scientist to CSO` },
      { title: `Commercial & Market Access`, level: `Manager to CCO` },
      { title: `Quality & Compliance`, level: `QA Lead to VP Quality` },
      { title: `Digital Health & Health Tech`, level: `PM to CTO` },
      { title: `Supply Chain & Manufacturing`, level: `Lead to COO` },
      { title: `Pharmacovigilance`, level: `PV Analyst to Global Head` },
    ],
    whyTribera: [
      {
        title: `Domain advisors with healthcare backgrounds`,
        desc: `Every shortlist interview for a healthcare or life sciences role is run by an advisor who has held clinical, regulatory, or commercial roles in the sector.`,
      },
      {
        title: `Regulatory landscape calibration`,
        desc: `We map candidate knowledge to your specific regulatory context — Indian CDSCO requirements, international ISO certifications, or FDA submissions — and score accordingly.`,
      },
      {
        title: `Passive talent access in a small world`,
        desc: `Senior healthcare talent rarely responds to job boards. Tribera's direct relationships and trusted network access the candidates who are not actively looking.`,
      },
      {
        title: `1:3 guarantee with replacement commitment`,
        desc: `If three interviews don't produce a hire, we replace and continue — at no additional cost — until you close the role.`,
      },
    ],
    faqs: [
      {
        q: `Do you hire for both MedTech and pharmaceutical mandates?`,
        a: `Yes. These require distinct competency profiles — device development vs drug development, CE marking vs CDSCO submissions — and we calibrate our advisory interviews accordingly.`,
      },
      {
        q: `Can you hire clinical and non-clinical roles in parallel?`,
        a: `Yes. We run parallel tracks with distinct advisor teams for clinical functions (medical affairs, clinical operations, PV) and non-clinical functions (commercial, supply chain, digital health technology).`,
      },
    ],
    ctaHeadline: `Ready to hire for Healthcare & Life Sciences?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `pharmaceutical`,
    title: `Pharmaceutical`,
    subtitle: `Precision hiring for an industry where accuracy is everything.`,
    badge: `Pharmaceutical`,
    icon: `tabler:pill`,
    overview:
      `Pharmaceutical companies are expanding R&D pipelines, scaling manufacturing operations, and building commercial capabilities simultaneously. Each track demands a different depth of expertise — and a hiring process that can accurately distinguish it. Tribera advisors have pharma-specific domain experience. They probe for the regulatory depth, scientific rigour, and commercial judgement that separates a truly strong pharma hire from a credentialed generalist.`,
    hiringChallenges: [
      {
        title: `GMP and regulatory compliance depth is hard to verify`,
        desc: `Manufacturing and quality candidates often list GMP compliance experience. Our advisors probe for real process understanding — deviation management, CAPA design, audit experience.`,
      },
      {
        title: `Drug development lifecycle knowledge varies enormously`,
        desc: `A Phase 1 trial manager and a Phase 3 NDA submission specialist are different roles requiring very different experience. We calibrate the brief and the evaluation to your exact lifecycle stage.`,
      },
      {
        title: `Commercial teams without scientific fluency`,
        desc: `The strongest pharma commercial hires can walk the science conversation with KOLs. Our advisors assess scientific literacy even for commercial mandates.`,
      },
    ],
    rolesWeHire: [
      { title: `Regulatory Affairs`, level: `RA Executive to Global Head` },
      { title: `Clinical Development`, level: `CRA to VP Clinical` },
      { title: `Medical Affairs & MSL`, level: `MSL to CMO` },
      { title: `R&D & Drug Discovery`, level: `Scientist to CSO` },
      { title: `Quality Assurance & QC`, level: `QA Lead to VP Quality` },
      { title: `Manufacturing & Operations`, level: `Production Lead to COO` },
      { title: `Commercial & Sales`, level: `Territory Manager to CCO` },
      { title: `Pharmacovigilance`, level: `Drug Safety Analyst to Global Head PV` },
    ],
    whyTribera: [
      {
        title: `Pharma advisors with industry tenure`,
        desc: `Interviews are conducted by advisors who have held regulatory, clinical, commercial, or manufacturing roles inside pharmaceutical organisations.`,
      },
      {
        title: `Lifecycle-calibrated evaluation`,
        desc: `We tailor the interview framework to your exact pipeline stage — early discovery, clinical development, regulatory submission, or post-market surveillance.`,
      },
      {
        title: `36-hour shortlist speed`,
        desc: `From brief to three hire-ready candidates in 36 hours. Designed for mandates where pipeline delays compound into commercial loss.`,
      },
      {
        title: `1:3 hiring guarantee`,
        desc: `Interview three candidates and expect to make at least one offer. We stand behind the shortlist with a formal replacement commitment.`,
      },
    ],
    faqs: [
      {
        q: `Do you cover both innovator and generic pharma?`,
        a: `Yes. Innovator companies require different depth profiles to generics — particularly in regulatory strategy and clinical development. We calibrate our advisory framework to your specific business model.`,
      },
      {
        q: `Can you source globally or only in India?`,
        a: `We source primarily across India and the Indian diaspora network internationally. For global mandates in regulated markets, we coordinate with trusted regional partners.`,
      },
    ],
    ctaHeadline: `Ready to hire for Pharmaceutical?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `manufacturing`,
    title: `Manufacturing`,
    subtitle: `Operations, engineering, and quality leaders who run plants — not just describe them.`,
    badge: `Manufacturing`,
    icon: `tabler:settings-2`,
    overview:
      `Manufacturing hiring has a credibility problem. Plant experience is easy to claim and hard to verify in a standard interview. Tribera advisors have run manufacturing operations, led quality teams, and owned production P&Ls. They ask the questions that separate genuine operational depth from well-rehearsed answers — and the AI validation layer cross-references industry certifications, project scale, and productivity outcomes before any advisory time is committed.`,
    hiringChallenges: [
      {
        title: `Operational depth vs title inflation`,
        desc: `Plant Manager and General Manager titles vary enormously in scope. We calibrate every candidate against real headcount, throughput, and P&L accountability.`,
      },
      {
        title: `Process knowledge without manufacturing systems depth`,
        desc: `Strong candidates understand both the physical process and the ERP and MES systems that run it. We assess both layers.`,
      },
      {
        title: `Lean and Six Sigma credentials without implementation evidence`,
        desc: `Certifications are common. Real transformation evidence is rare. Our advisors probe for actual DMAIC projects, cost-saving outcomes, and sustained OEE improvement.`,
      },
      {
        title: `Safety culture fit`,
        desc: `EHS mindset and safety-first leadership are non-negotiable in manufacturing. We assess for this specifically — it doesn't surface in a standard competency interview.`,
      },
    ],
    rolesWeHire: [
      { title: `Plant & Operations Management`, level: `Plant Head to COO` },
      { title: `Quality Assurance & QC`, level: `QC Engineer to VP Quality` },
      { title: `Supply Chain & Procurement`, level: `Buyer to Chief Supply Chain Officer` },
      { title: `Manufacturing Engineering`, level: `Process Engineer to Director` },
      { title: `EHS & Safety`, level: `Safety Officer to Head of EHS` },
      { title: `Maintenance & Reliability`, level: `Maintenance Lead to VP Asset Management` },
      { title: `Production Planning & Control`, level: `Planner to Head of PPC` },
      { title: `Technology & Automation`, level: `Automation Engineer to CTO` },
    ],
    whyTribera: [
      {
        title: `Manufacturing practitioners as advisors`,
        desc: `Advisory interviews are run by people who have managed plant operations, led Lean transformations, and owned manufacturing P&Ls — not generalist interviewers.`,
      },
      {
        title: `Outcome-based evaluation`,
        desc: `We probe for specific outcomes — OEE improvement percentages, scrap reduction achievements, downtime statistics — not just process familiarity.`,
      },
      {
        title: `Plant-context calibration`,
        desc: `Discrete, process, automotive, FMCG, and pharmaceutical manufacturing each require different competency profiles. We tailor the brief accordingly.`,
      },
      {
        title: `1:3 guarantee with real accountability`,
        desc: `Three candidates. At least one hire. We rebuild and continue until you close — at no additional cost.`,
      },
    ],
    faqs: [
      {
        q: `Do you hire for Industry 4.0 and smart manufacturing roles?`,
        a: `Yes. Digital manufacturing, IIoT implementation, MES integration, and automation engineering are distinct roles we hire for regularly, with advisors who hold both manufacturing and technology depth.`,
      },
      {
        q: `Can you source talent for remote or tier-2 plant locations?`,
        a: `Yes. Our network includes manufacturing professionals who have operated in tier-2 and tier-3 locations across India. Relocation willingness and location-specific experience are factored into the brief.`,
      },
    ],
    ctaHeadline: `Ready to hire for Manufacturing?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `industrial-engineering`,
    title: `Industrial & Engineering`,
    subtitle: `Technical depth for the projects that build the physical world.`,
    badge: `Industrial & Engineering`,
    icon: `tabler:tool`,
    overview:
      `Industrial and engineering projects demand candidates who combine deep technical knowledge with the ability to deliver under real constraints — budget, timeline, regulation, and physics. Tribera advisors have managed large engineering projects, led multi-discipline teams, and navigated client delivery environments. They probe for the depth of experience that portfolio documents and certifications cannot convey — and the AI layer validates project scale, technical scope, and delivery outcomes before the first advisory conversation begins.`,
    hiringChallenges: [
      {
        title: `Project scale misrepresentation`,
        desc: `Engineering candidates routinely inflate project scope and leadership contribution. Our AI cross-references employer data, project timelines, and team sizes before advisory interviews.`,
      },
      {
        title: `Multi-discipline coordination experience`,
        desc: `Senior engineering roles require coordination across civil, mechanical, electrical, and instrumentation disciplines. We assess for this explicitly.`,
      },
      {
        title: `Client-facing delivery depth`,
        desc: `Engineering services candidates need commercial awareness alongside technical competence. Our advisors probe for both.`,
      },
    ],
    rolesWeHire: [
      { title: `Project & Programme Management`, level: `PM to Head of Projects` },
      { title: `Civil & Structural Engineering`, level: `Engineer to Principal` },
      { title: `Mechanical Engineering`, level: `Design Engineer to Chief Engineer` },
      { title: `Electrical & Instrumentation`, level: `E&I Engineer to Director` },
      { title: `HSE Leadership`, level: `Safety Lead to Group HSE Head` },
      { title: `Procurement & Contracts`, level: `Contracts Manager to VP Procurement` },
      { title: `Operations & Maintenance`, level: `O&M Lead to VP Operations` },
      { title: `Consulting & Advisory`, level: `Senior Consultant to Partner` },
    ],
    whyTribera: [
      {
        title: `Engineering practitioners as interviewers`,
        desc: `Advisory interviews are conducted by people who have managed multimillion-dollar projects and led large engineering teams — not generalist recruiters reading from a competency framework.`,
      },
      {
        title: `Delivery-outcome calibration`,
        desc: `We ask for specific delivery outcomes — commissioning milestones hit, cost variance managed, change order volume controlled. Generalities don't pass our interview.`,
      },
      {
        title: `36-hour shortlists for project-critical mandates`,
        desc: `Engineering projects don't wait. From role brief to three vetted candidates in 36 hours.`,
      },
      {
        title: `1:3 selection guarantee`,
        desc: `Interview three. Hire one. We rebuild and continue until you do.`,
      },
    ],
    faqs: [
      {
        q: `Do you hire for EPC project roles specifically?`,
        a: `Yes. EPC project delivery — including project controls, commissioning, procurement, and multi-discipline engineering leadership — is a core hiring area for us.`,
      },
    ],
    ctaHeadline: `Ready to hire for Industrial & Engineering?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `global-capability-centers`,
    title: `Global Capability Centers`,
    subtitle: `Built for GCCs scaling in India — where speed, calibre, and cultural alignment all matter.`,
    badge: `GCC`,
    icon: `tabler:building-skyscraper`,
    overview:
      `India's GCC ecosystem is scaling at a pace that most hiring models can't keep up with. Tribera was built partly in response to this reality. Our advisory team includes people who have led GCC capability builds — they understand the matrix reporting structures, the parent-company calibration requirements, and the cultural alignment nuance that separates a hire who thrives in a GCC from one who churns within six months. The result is a shortlist designed not just for the role, but for the specific GCC context.`,
    hiringChallenges: [
      {
        title: `Matrix structure alignment is invisible in interviews`,
        desc: `GCC roles require candidates who can navigate parent-company relationships, dotted-line accountability, and global stakeholder management. Standard interviews don't surface this.`,
      },
      {
        title: `Calibration with global standards in an Indian market`,
        desc: `Parent companies often have specific benchmarks from their home markets. Tribera helps bridge the calibration gap — translating global role expectations into India-market realities.`,
      },
      {
        title: `Centre of Excellence build-out capability`,
        desc: `Many GCC mandates require people who can build a function from scratch — not just run an established team. We assess for this explicitly.`,
      },
      {
        title: `Retention in a competitive Bengaluru / Hyderabad / Pune market`,
        desc: `GCC talent in India's tech hubs is aggressively courted. Our 12-month retention scoring and joining-probability modelling reduce the risk of a hire who accepts and reverses.`,
      },
    ],
    rolesWeHire: [
      { title: `Engineering & Technology Leadership`, level: `Tech Lead to VP Engineering` },
      { title: `COE & Capability Build Leadership`, level: `Centre Head to Managing Director` },
      { title: `Data & Analytics`, level: `Engineer to Head of Data` },
      { title: `Finance & FP&A`, level: `Analyst to CFO India` },
      { title: `Operations & Shared Services`, level: `Lead to COO` },
      { title: `HR & Talent`, level: `HRBP to Chief People Officer India` },
      { title: `Legal & Compliance`, level: `Counsel to General Counsel India` },
      { title: `Product & Programme Management`, level: `PM to Group PM` },
    ],
    whyTribera: [
      {
        title: `GCC-specific advisory context`,
        desc: `Interviews are conducted by advisors who have built and led GCC teams — they understand the nuances of parent-company calibration, Indian market dynamics, and retention risk.`,
      },
      {
        title: `Retention scoring built into every shortlist`,
        desc: `Our AI models joining probability and 12-month retention likelihood — specifically calibrated for GCC employment contexts in India's competitive tech talent markets.`,
      },
      {
        title: `Speed at GCC scale`,
        desc: `GCCs hire in volume. Tribera's 36-hour shortlist model is designed to run in parallel across multiple simultaneous mandates without quality degradation.`,
      },
      {
        title: `1:3 guarantee across every mandate`,
        desc: `The guarantee applies to every role — regardless of seniority, function, or volume. Interview three, hire one, or we continue at no additional cost.`,
      },
    ],
    faqs: [
      {
        q: `Do you work with first-time GCC setups or only established ones?`,
        a: `Both. For first-time setups, we focus on foundational leadership hires — people who can build culture, establish processes, and translate parent-company expectations into Indian market reality. For established GCCs, we focus on scale and specialisation.`,
      },
      {
        q: `Can you hire across Bengaluru, Hyderabad, Pune, and Chennai simultaneously?`,
        a: `Yes. We have active talent networks and advisory presence across all four major GCC hubs. Multi-city parallel hiring is a core capability.`,
      },
      {
        q: `Do you have experience with US, European, and APAC parent companies?`,
        a: `Yes. We regularly calibrate GCC mandates against US, UK, European, Australian, and Singapore parent-company standards. The cultural translation and calibration work is part of every engagement.`,
      },
    ],
    ctaHeadline: `Ready to scale your GCC?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours — built for GCC speed.`,
  },
  {
    slug: `consumer-digital-commerce`,
    title: `Consumer & Digital Commerce`,
    subtitle: `For businesses where speed, taste, and commercial instinct all have to coexist.`,
    badge: `Consumer & Digital Commerce`,
    icon: `tabler:shopping-bag`,
    overview:
      `Consumer and digital commerce businesses move fast, operate at margin pressure, and need people who can balance brand instinct with data fluency. The candidates who excel here are rare — they understand consumer behaviour at depth, can read a P&L, and know when to trust intuition and when to let the data override it. Tribera advisors have built consumer brands, led D2C growth, and run large retail operations. They know who the genuinely strong candidates are — and how to find the ones who aren't actively looking.`,
    hiringChallenges: [
      {
        title: `Brand intuition vs data rigour — most candidates hold only one`,
        desc: `The strongest consumer hires hold both. Our advisors probe for the intersection — candidates who can feel a trend and validate it with numbers.`,
      },
      {
        title: `Omnichannel operational complexity`,
        desc: `Modern consumer businesses run across D2C, marketplaces, and physical retail simultaneously. We assess for multi-channel operational experience explicitly.`,
      },
      {
        title: `Category management depth`,
        desc: `Category leadership requires both commercial acumen and consumer insight. Generic product or commercial interviews miss the category-specific nuance.`,
      },
      {
        title: `Startup-to-scale transition readiness`,
        desc: `Consumer businesses scaling from startup to enterprise need people who can build systems without losing customer empathy. We calibrate for this transition specifically.`,
      },
    ],
    rolesWeHire: [
      { title: `Category Management`, level: `Category Lead to CMO` },
      { title: `Digital & Performance Marketing`, level: `Manager to VP Growth` },
      { title: `Brand Management`, level: `Brand Manager to Chief Brand Officer` },
      { title: `E-commerce & D2C Operations`, level: `Lead to Head of D2C` },
      { title: `Supply Chain & Logistics`, level: `Lead to Chief Supply Chain Officer` },
      { title: `Customer Experience`, level: `CX Lead to VP Customer` },
      { title: `Retail Operations`, level: `Area Manager to Head of Retail` },
      { title: `Commercial & Sales`, level: `Key Account Lead to CCO` },
    ],
    whyTribera: [
      {
        title: `Consumer advisors with brand and commercial experience`,
        desc: `Advisory interviews are run by people who have managed P&Ls, led brand teams, and built growth functions in consumer and D2C businesses.`,
      },
      {
        title: `Data-brand balance assessment`,
        desc: `We probe explicitly for the combination of commercial instinct and data literacy that defines the best consumer talent.`,
      },
      {
        title: `Passive talent access in a relationship-driven market`,
        desc: `The best consumer talent rarely applies to jobs. Tribera's direct relationships and trusted network reach candidates who are not in the active market.`,
      },
      {
        title: `1:3 guarantee, full stop`,
        desc: `Three candidates. At least one hire. We rebuild and continue until you close.`,
      },
    ],
    faqs: [
      {
        q: `Do you hire for traditional retail and D2C simultaneously?`,
        a: `Yes. These require distinct candidate profiles — traditional retail rewards category management depth and distributor relationship skills; D2C rewards growth marketing fluency and digital operations agility. We calibrate separately.`,
      },
      {
        q: `Can you hire for quick commerce and marketplace-first businesses?`,
        a: `Yes. Quick commerce, marketplace-led D2C, and hybrid omnichannel models all have distinct operational needs. We have advisors who have operated across each.`,
      },
    ],
    ctaHeadline: `Ready to hire for Consumer & Digital Commerce?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours.`,
  },
  {
    slug: `private-equity-portfolio`,
    title: `Private Equity Portfolio Companies`,
    subtitle: `Value creation timelines are real. Your hiring process needs to be faster than they are.`,
    badge: `Private Equity`,
    icon: `tabler:chart-line`,
    overview:
      `PE-backed companies have a different hiring calculus. Every key hire either accelerates or compresses the value creation timeline. Mistakes are expensive not just in salary cost but in board credibility, team momentum, and exit readiness. Tribera advisors understand how PE-portfolio businesses operate — the governance structures, the 100-day plan pressure, the performance accountability that comes with institutional ownership. Every shortlist is calibrated not just for role fit but for the specific PE context the candidate will be walking into.`,
    hiringChallenges: [
      {
        title: `PE-context literacy is non-negotiable`,
        desc: `Candidates need to understand board accountability, investor reporting, and value creation pressure from day one. Our advisors assess PE-context readiness specifically.`,
      },
      {
        title: `Speed of mandate is driven by value creation milestones`,
        desc: `A 100-day plan doesn't wait for a 12-week search. Tribera's 36-hour shortlist is built for PE-timeline urgency.`,
      },
      {
        title: `Leadership team chemistry at transformation speed`,
        desc: `PE portfolio hires often join leadership teams mid-transformation. Cultural and interpersonal alignment is as important as functional competence.`,
      },
      {
        title: `Exit-readiness calibration`,
        desc: `Candidates need the ability to build processes that will hold up to due diligence — not just run operations today. We probe for this forward-looking capability.`,
      },
    ],
    rolesWeHire: [
      { title: `CEO & MD`, level: `Turnaround to Scale leadership` },
      { title: `CFO & Finance Leadership`, level: `Controller to CFO` },
      { title: `COO & Operations Leadership`, level: `VP Ops to COO` },
      { title: `CTO & Technology Leadership`, level: `VP Tech to CTO` },
      { title: `Commercial & Revenue Leadership`, level: `VP Sales to CRO / CCO` },
      { title: `Human Resources Leadership`, level: `CHRO to Chief People Officer` },
      { title: `Strategy & M&A`, level: `Strategy Lead to Chief Strategy Officer` },
      { title: `Transformation & PMO`, level: `Programme Director to COO` },
    ],
    whyTribera: [
      {
        title: `Advisors with PE and portfolio company experience`,
        desc: `Interviews are conducted by advisors who have held C-suite and senior leadership roles inside PE-backed businesses. They understand the context the candidate is walking into.`,
      },
      {
        title: `Value creation calibration at every level`,
        desc: `We brief every advisory interview around the specific value creation thesis of the portfolio — not a generic role description. Candidates are assessed against the actual transformation agenda.`,
      },
      {
        title: `Speed that respects PE timelines`,
        desc: `36-hour first shortlist. Designed for investment theses that don't have room for a twelve-week executive search.`,
      },
      {
        title: `1:3 guarantee with C-suite accountability`,
        desc: `The guarantee applies to senior leadership mandates too. Interview three, hire one — or we rebuild and continue.`,
      },
    ],
    faqs: [
      {
        q: `Do you work directly with the PE fund or with the portfolio company?`,
        a: `Both structures work. We onboard mandates through either the fund's talent team or the portfolio company's leadership — typically whoever is driving the hiring process on the ground.`,
      },
      {
        q: `How do you manage confidentiality for CEO and CFO searches?`,
        a: `All senior leadership searches are conducted under strict NDA. Candidate identity and role context are protected through every stage of the process.`,
      },
      {
        q: `Can you work across multiple portfolio companies simultaneously?`,
        a: `Yes. We structure multi-portfolio engagements with dedicated advisory teams per company to avoid conflict and maintain quality across each mandate.`,
      },
    ],
    ctaHeadline: `Ready to hire for your portfolio company?`,
    ctaSubtext: `Three advisor-interviewed, AI-validated candidates in 36 hours — built for PE timelines.`,
  },
];

export const findIndustryBySlug = (slug: string): Industry | undefined =>
  industries.find((i) => i.slug === slug);

export const getStaticPathsIndustries = () =>
  industries.map((industry) => ({
    params: { slug: industry.slug },
    props: { industry },
  }));
