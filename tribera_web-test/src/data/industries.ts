export const industriesData = {
  "dimensions": [
    "Core depth",
    "Systems design",
    "Controls and risk",
    "Delivery speed",
    "Documentation",
    "Stakeholder handling"
  ],
  "sectors": [
    {
      "slug": "banking-financial-services",
      "name": "Banking & financial services",
      "tagline": "Three vetted people for roles where the wrong hire costs more than a quarter.",
      "weights": {
        "Core depth": 20,
        "Systems design": 14,
        "Controls and risk": 30,
        "Delivery speed": 10,
        "Documentation": 18,
        "Stakeholder handling": 8
      }
    },
    {
      "slug": "enterprise-technology",
      "name": "Enterprise technology",
      "tagline": "Engineering and product people who have actually put something into production and lived with it afterwards.",
      "weights": {
        "Core depth": 26,
        "Systems design": 26,
        "Controls and risk": 10,
        "Delivery speed": 20,
        "Documentation": 10,
        "Stakeholder handling": 8
      },
      "misses": [
        {
          "title": "Shipped, or adjacent to shipped",
          "label": "A CV cannot tell them apart",
          "body": "Everyone on a delivery team appears on the delivery. The person who made the call and the person who attended the meeting write the same bullet point.",
          "tell": "Where it shows up: what they had to give up to ship on the date they shipped."
        },
        {
          "title": "Scale that was inherited",
          "label": "Numbers travel without their owners",
          "body": "Two million requests a day is a property of the system, not of the engineer. Plenty of people have worked near large systems without ever having changed one under load.",
          "tell": "Where it shows up: what broke first, and what they were watching when it did."
        },
        {
          "title": "Architecture opinions with no scar tissue",
          "label": "Everyone can name the pattern",
          "body": "Reading about event-driven design and having run a double-write migration for six months are different things that interview identically.",
          "tell": "Where it shows up: the migration that took longer than planned, and the month it went wrong."
        }
      ],
      "questions": [
        {
          "q": "Tell me about something you shipped that you would build differently now.",
          "thin": "“We would probably pick a different framework.”",
          "listeningFor": "What they underestimated, and whether the regret is technical or organisational. Strong answers name a decision, not a tool."
        },
        {
          "q": "Walk me through a migration that took longer than planned.",
          "thin": "“Scope crept and we had upstream dependencies.”",
          "listeningFor": "The double-write period — how long they ran both systems and what they used to decide it was safe to cut over. Anyone who has done one talks about this unprompted."
        },
        {
          "q": "Who disagreed with your architecture, and what happened?",
          "thin": "“We aligned on a hybrid approach.”",
          "listeningFor": "Whether they can state the other person's case properly. If they cannot put it fairly, they never understood it, and the compromise was just fatigue."
        }
      ],
      "roles": [
        {
          "family": "Backend & platform",
          "levels": "Mid to principal"
        },
        {
          "family": "Infrastructure & SRE",
          "levels": "Engineer to head"
        },
        {
          "family": "Frontend & mobile",
          "levels": "Mid to lead"
        },
        {
          "family": "Engineering management",
          "levels": "EM to director"
        },
        {
          "family": "Product management",
          "levels": "PM to group PM"
        },
        {
          "family": "QA & release",
          "levels": "Lead to head of quality"
        },
        {
          "family": "Cloud & platform",
          "levels": "Architect to principal"
        },
        {
          "family": "Solutions & presales",
          "levels": "Lead to director"
        }
      ],
      "bench": [
        "Backend and platform, 11 yrs",
        "SRE and infrastructure, 13 yrs",
        "Engineering leadership, 14 yrs",
        "Release and quality, 11 yrs"
      ],
      "faq": [
        {
          "q": "Do you cover platform as well as product engineering?",
          "a": "Both, and we weight them differently. A platform hire gets systems design and operational ownership weighted higher; a product engineer gets shipping cadence and stakeholder handling. Same six dimensions, different shape."
        }
      ]
    },
    {
      "slug": "product-saas",
      "name": "Product & SaaS",
      "tagline": "The difference shows in what they killed, what they refused, and what they were wrong about.",
      "weights": {
        "Core depth": 22,
        "Systems design": 18,
        "Controls and risk": 6,
        "Delivery speed": 20,
        "Documentation": 8,
        "Stakeholder handling": 26
      },
      "misses": [
        {
          "title": "Judgment, versus process fluency",
          "label": "Frameworks are easy to learn",
          "body": "RICE, JTBD and a tidy roadmap can all be recited by someone who has never made an unpopular call. The vocabulary is not the skill.",
          "tell": "Where it shows up: the feature they argued against that shipped anyway, and what happened next."
        },
        {
          "title": "Ownership of outcomes, not launches",
          "label": "Everyone launched something",
          "body": "A launch is a date. An outcome is what the number did ninety days later, and whether anyone went back to look.",
          "tell": "Where it shows up: what they measured after, and what they did when it disappointed."
        },
        {
          "title": "The ability to say no",
          "label": "Roadmaps are full of yes",
          "body": "Product judgment shows in refusal far more than in prioritisation. Anyone can rank a backlog; few can tell a large customer no and keep them.",
          "tell": "Where it shows up: what they said to the customer, in the words they used."
        }
      ],
      "questions": [
        {
          "q": "Tell me about a feature you argued against that shipped anyway.",
          "thin": "“I raised my concerns, and the team decided to move forward.”",
          "listeningFor": "What happened afterwards — and whether they are willing to say they turned out to be wrong. A product person who has never been wrong in public has not been in enough rooms."
        },
        {
          "q": "What did you kill, and how did you know it was time?",
          "thin": "“We sunset a feature with low usage.”",
          "listeningFor": "The number they looked at, the number they deliberately ignored, and who they had to convince. Killing things is a political act before it is an analytical one."
        },
        {
          "q": "Describe something customers asked for that you did not build.",
          "thin": "“We prioritised based on impact and effort.”",
          "listeningFor": "What they actually said to the customer. The refusal is where product taste lives; the roadmap is just its output."
        }
      ],
      "roles": [
        {
          "family": "Product management",
          "levels": "PM to CPO"
        },
        {
          "family": "Product design",
          "levels": "Designer to head of design"
        },
        {
          "family": "Growth & lifecycle",
          "levels": "Manager to head"
        },
        {
          "family": "Product marketing",
          "levels": "PMM to director"
        },
        {
          "family": "Product analytics",
          "levels": "Analyst to lead"
        },
        {
          "family": "Customer success",
          "levels": "Manager to VP"
        },
        {
          "family": "Sales & partnerships",
          "levels": "AE to VP"
        },
        {
          "family": "Revenue operations",
          "levels": "Manager to director"
        }
      ],
      "bench": [
        "Product leadership, 12 yrs",
        "Product design, 10 yrs",
        "Growth and lifecycle, 11 yrs",
        "B2B SaaS product, 13 yrs"
      ],
      "faq": [
        {
          "q": "Can you assess product sense, or only experience?",
          "a": "Product sense is the hardest thing on this list to test and the easiest to fake, which is why we test it with hindsight rather than hypotheticals. Not “how would you prioritise this” — “what did you get wrong, and when did you know”."
        }
      ]
    },
    {
      "slug": "ai-data",
      "name": "AI & data",
      "tagline": "Building the model is the easy half. The people worth hiring are the ones who watched it afterwards.",
      "weights": {
        "Core depth": 30,
        "Systems design": 26,
        "Controls and risk": 10,
        "Delivery speed": 16,
        "Documentation": 10,
        "Stakeholder handling": 8
      },
      "misses": [
        {
          "title": "Notebooks versus production",
          "label": "Both look like machine learning",
          "body": "A strong offline result and a system serving real traffic are different disciplines. Many excellent modellers have never owned anything that woke them up at night.",
          "tell": "Where it shows up: what the model did in production that it never did in evaluation."
        },
        {
          "title": "Data quality, discovered late",
          "label": "Everyone says data is messy",
          "body": "The useful question is not whether they have seen bad data. It is how they found out, and how long it had been wrong before anyone noticed.",
          "tell": "Where it shows up: the detection, not the fix."
        },
        {
          "title": "Knowing when not to ship",
          "label": "Model metrics are not a decision",
          "body": "An F1 score is not a business threshold. People who have shipped ML into a real process can tell you the number the business cared about and who set it.",
          "tell": "Where it shows up: a model they decided was not worth shipping."
        }
      ],
      "questions": [
        {
          "q": "What did the model do in production that it never did in evaluation?",
          "thin": "“We saw some drift and retrained on fresher data.”",
          "listeningFor": "What they were monitoring before it happened, and whether the threshold was set in advance or discovered through a complaint. The monitoring is the answer; the retrain is housekeeping."
        },
        {
          "q": "Tell me about a data quality problem you found late.",
          "thin": "“We had an upstream schema change that broke a pipeline.”",
          "listeningFor": "How they found it, and what they changed so that class of problem surfaced sooner next time. Anyone can fix a break; few close the detection gap."
        },
        {
          "q": "When did you decide a model was not worth shipping?",
          "thin": "“The metrics were not strong enough.”",
          "listeningFor": "The business threshold and who set it. People who have only worked offline quote model metrics; people who have shipped quote the number someone else cared about."
        }
      ],
      "roles": [
        {
          "family": "Machine learning engineering",
          "levels": "Mid to principal"
        },
        {
          "family": "Data engineering",
          "levels": "Engineer to head"
        },
        {
          "family": "Data science",
          "levels": "Scientist to lead"
        },
        {
          "family": "MLOps & platform",
          "levels": "Engineer to lead"
        },
        {
          "family": "Analytics engineering",
          "levels": "Analyst to head"
        },
        {
          "family": "Applied research",
          "levels": "Researcher to director"
        },
        {
          "family": "LLM & agent engineering",
          "levels": "Engineer to principal"
        },
        {
          "family": "AI product management",
          "levels": "PM to head"
        }
      ],
      "bench": [
        "ML engineering, 9 yrs",
        "Data platform and pipelines, 12 yrs",
        "Applied science, 11 yrs",
        "Analytics leadership, 13 yrs"
      ],
      "faq": [
        {
          "q": "How do you assess research versus applied roles?",
          "a": "Differently, and we say which at intake. Research weighting leans on depth and written reasoning; applied leans on production ownership and measurement. Hiring one against the other's bar is the most common mistake we see in this space."
        }
      ]
    },
    {
      "slug": "cybersecurity",
      "name": "Cybersecurity",
      "tagline": "Certificates are a floor. What matters is what they did in the first twenty minutes.",
      "weights": {
        "Core depth": 24,
        "Systems design": 16,
        "Controls and risk": 32,
        "Delivery speed": 12,
        "Documentation": 10,
        "Stakeholder handling": 6
      },
      "misses": [
        {
          "title": "Certifications versus incidents",
          "label": "One is much easier to acquire",
          "body": "A wall of acronyms tells you someone can pass an exam. It tells you nothing about how they behave at two in the morning with an unclear blast radius.",
          "tell": "Where it shows up: the last bridge call they were actually on."
        },
        {
          "title": "Risk decisions, not risk registers",
          "label": "Everyone maintains a register",
          "body": "Security work is a budget problem before it is a technical one. The real signal is what they chose to leave unprotected and how they defended that.",
          "tell": "Where it shows up: what they left unpatched, and who signed the risk off."
        },
        {
          "title": "Removing controls, not only adding them",
          "label": "Adding is always safe",
          "body": "Anyone can propose more controls. Knowing which ones no longer earn their operational cost requires having actually run them.",
          "tell": "Where it shows up: a control they took away, and what it had been protecting against."
        }
      ],
      "questions": [
        {
          "q": "Walk me through the last incident you were on the bridge for.",
          "thin": "“We followed the incident response playbook and contained it.”",
          "listeningFor": "What time they got the call, what they did in the first twenty minutes, and what they got wrong. This is the question certifications do not survive."
        },
        {
          "q": "What did you have to leave unpatched, and how did you decide?",
          "thin": "“We prioritised remediation by CVSS score.”",
          "listeningFor": "The compensating control and the name of the person who accepted the residual risk. Security maturity is visible in how comfortably they discuss what they chose not to fix."
        },
        {
          "q": "Tell me about a control you removed.",
          "thin": "“We streamlined some legacy processes.”",
          "listeningFor": "What it was protecting against and why that changed. People who have only ever added controls have never had to operate them at 3am."
        }
      ],
      "roles": [
        {
          "family": "Security engineering",
          "levels": "Mid to principal"
        },
        {
          "family": "Detection & response",
          "levels": "Analyst to head"
        },
        {
          "family": "Application security",
          "levels": "Engineer to lead"
        },
        {
          "family": "GRC & assurance",
          "levels": "Analyst to head"
        },
        {
          "family": "Cloud & infrastructure security",
          "levels": "Engineer to architect"
        },
        {
          "family": "Security leadership",
          "levels": "Manager to CISO"
        },
        {
          "family": "Identity & access management",
          "levels": "Analyst to head"
        },
        {
          "family": "Threat intelligence",
          "levels": "Analyst to director"
        }
      ],
      "bench": [
        "Detection and response, 14 yrs",
        "Application security, 12 yrs",
        "Cloud security architecture, 13 yrs",
        "GRC and audit, 15 yrs"
      ],
      "faq": [
        {
          "q": "Do you cover both technical and governance roles?",
          "a": "Yes, and they are almost opposite shapes. A detection engineer is weighted on incident behaviour and systems depth; a GRC lead on documentation, stakeholder handling and regulatory judgment. Running one against the other's rubric is how good people get rejected."
        }
      ]
    },
    {
      "slug": "healthcare-life-sciences",
      "name": "Healthcare & life sciences",
      "tagline": "Clinical, regulatory and commercial, and the ability to hold all three when they disagree.",
      "weights": {
        "Core depth": 18,
        "Systems design": 12,
        "Controls and risk": 30,
        "Delivery speed": 10,
        "Documentation": 22,
        "Stakeholder handling": 8
      },
      "misses": [
        {
          "title": "Regulatory judgment, not recall",
          "label": "Guidance is public",
          "body": "Anyone can quote the guidance. The people worth hiring are the ones who have had to act where the guidance genuinely did not say.",
          "tell": "Where it shows up: a decision made in an ambiguity, and what they recommended before escalating."
        },
        {
          "title": "Documentation as a discipline",
          "label": "Everyone claims to be rigorous",
          "body": "In this sector the record is the work. What was written down, when, and by whom is the difference between a finding and a citation.",
          "tell": "Where it shows up: a deviation they handled, and how quickly it was documented."
        },
        {
          "title": "The patient, at speed",
          "label": "Timelines and evidence disagree often",
          "body": "Commercial pressure is real and constant. The question is what they were prepared to lose to hold a position.",
          "tell": "Where it shows up: what happened when the clinical evidence and the launch date pulled apart."
        }
      ],
      "questions": [
        {
          "q": "Describe a time the clinical evidence and the timeline disagreed.",
          "thin": "“We escalated it to the steering committee for a decision.”",
          "listeningFor": "What they recommended before the escalation. Judgment lives in the position taken, not in the process followed to take it upward."
        },
        {
          "q": "What went into a submission that you were uncomfortable with?",
          "thin": "“Everything we submitted was compliant with the applicable guidance.”",
          "listeningFor": "Whether they can name one genuine ambiguity. Nobody who has actually worked in this space believes the guidance covers everything."
        },
        {
          "q": "Tell me about a protocol deviation you handled.",
          "thin": "“It was documented and reported in line with our SOP.”",
          "listeningFor": "What the impact assessment concluded and who they told first. The sequence of those two things says a great deal about how they operate."
        }
      ],
      "roles": [
        {
          "family": "Clinical operations",
          "levels": "CRA to director"
        },
        {
          "family": "Regulatory affairs",
          "levels": "Associate to head"
        },
        {
          "family": "Quality & compliance",
          "levels": "Specialist to head of QA"
        },
        {
          "family": "Medical affairs",
          "levels": "MSL to director"
        },
        {
          "family": "Health economics",
          "levels": "Analyst to lead"
        },
        {
          "family": "Commercial & market access",
          "levels": "Manager to head"
        },
        {
          "family": "Biostatistics & data",
          "levels": "Statistician to head"
        },
        {
          "family": "Patient services & access",
          "levels": "Manager to director"
        }
      ],
      "bench": [
        "Clinical operations, 14 yrs",
        "Regulatory affairs, 15 yrs",
        "Quality and compliance, 13 yrs",
        "Medical and commercial, 12 yrs"
      ],
      "faq": [
        {
          "q": "Do you hire for regulated roles outside India?",
          "a": "Yes. We run mandates for teams hiring into India and for India-based teams hiring into other jurisdictions. Where the regulatory regime differs, the interviewer differs — we do not assess EU MDR experience with someone who has only worked to CDSCO."
        }
      ]
    },
    {
      "slug": "pharmaceutical",
      "name": "Pharmaceutical",
      "tagline": "Precision is the whole job, and precision under uncertainty is the part that cannot be taught quickly.",
      "weights": {
        "Core depth": 16,
        "Systems design": 10,
        "Controls and risk": 34,
        "Delivery speed": 8,
        "Documentation": 24,
        "Stakeholder handling": 8
      },
      "misses": [
        {
          "title": "Behaviour in the interval",
          "label": "Before the cause was known",
          "body": "Every investigation eventually finds a cause. What separates people is what they did in the days before anyone knew what they were looking at.",
          "tell": "Where it shows up: a result they could not explain, and what they did that week."
        },
        {
          "title": "Comfort with an inconclusive close",
          "label": "Phase one closes a lot of investigations",
          "body": "Some people are entirely comfortable with that and some are not. The uncomfortable ones are usually the ones who have seen it come back.",
          "tell": "Where it shows up: an OOS investigation that closed early, and whether they were happy with it."
        },
        {
          "title": "Pushback with something at stake",
          "label": "Everyone says they raised concerns",
          "body": "Raising a concern in an email is not the same as holding a position that costs you something. The second one is rarer and much more useful.",
          "tell": "Where it shows up: a timeline they pushed back on, and what it cost them."
        }
      ],
      "questions": [
        {
          "q": "Tell me about a result you could not explain.",
          "thin": "“We investigated and traced it to an assay issue.”",
          "listeningFor": "What they did in the interval before the cause was known — stopped, flagged, or carried on. The interval is the answer; the root cause is just the ending."
        },
        {
          "q": "Describe an out-of-specification investigation you led.",
          "thin": "“We followed the two-phase process and it closed at phase one.”",
          "listeningFor": "Whether they were comfortable with that close, and why. Most people who have run several are not entirely comfortable, and can tell you precisely why not."
        },
        {
          "q": "When did you push back on a timeline?",
          "thin": "“I raised it with the programme lead and we adjusted.”",
          "listeningFor": "What they were prepared to lose. A pushback with nothing at stake is a note in a meeting, not a position."
        }
      ],
      "roles": [
        {
          "family": "Quality assurance",
          "levels": "Specialist to head"
        },
        {
          "family": "Manufacturing & MSAT",
          "levels": "Engineer to lead"
        },
        {
          "family": "Regulatory CMC",
          "levels": "Associate to director"
        },
        {
          "family": "Analytical development",
          "levels": "Scientist to head"
        },
        {
          "family": "Supply chain & serialisation",
          "levels": "Manager to head"
        },
        {
          "family": "Process engineering",
          "levels": "Engineer to principal"
        },
        {
          "family": "Clinical development",
          "levels": "CRA to director"
        },
        {
          "family": "Pharmacovigilance",
          "levels": "Associate to head"
        }
      ],
      "bench": [
        "Quality assurance and audit, 15 yrs",
        "Manufacturing and MSAT, 13 yrs",
        "Regulatory CMC, 14 yrs",
        "Analytical development, 12 yrs"
      ],
      "faq": [
        {
          "q": "How do you handle mandates that need site-specific experience?",
          "a": "We say so at intake if the pool is genuinely thin, rather than sending three people who are close. Sterile fill-finish and oral solids are not interchangeable, and pretending otherwise wastes a month of your time and ours."
        }
      ]
    },
    {
      "slug": "manufacturing",
      "name": "Manufacturing",
      "tagline": "Operations, engineering and quality leaders who have run plants rather than reported on them.",
      "weights": {
        "Core depth": 22,
        "Systems design": 14,
        "Controls and risk": 22,
        "Delivery speed": 18,
        "Documentation": 14,
        "Stakeholder handling": 10
      },
      "misses": [
        {
          "title": "Floor time versus plan time",
          "label": "Both appear as operations experience",
          "body": "Someone who has stood on a line at three in the morning talks about it differently from someone who has managed the schedule for one. The CV cannot separate them.",
          "tell": "Where it shows up: what they changed that the plan did not call for."
        },
        {
          "title": "Escapes, not just RCAs",
          "label": "Everyone has run a root cause analysis",
          "body": "The interesting question is how far a defect travelled before it was caught, and what the containment actually cost.",
          "tell": "Where it shows up: a quality escape that reached a customer."
        },
        {
          "title": "Recovering a shutdown",
          "label": "Nothing runs to schedule",
          "body": "Planned maintenance always overruns somewhere. The skill is what they chose to cut to bring it back, and who they had to tell.",
          "tell": "Where it shows up: what overran, and what they dropped to recover."
        }
      ],
      "questions": [
        {
          "q": "What did you change on the line that the plan did not call for?",
          "thin": "“We optimised process flow to improve throughput.”",
          "listeningFor": "Who on the floor told them it was wrong, and whether they listened the first time they were told. Most plant improvements start as someone being ignored."
        },
        {
          "q": "Tell me about a quality escape.",
          "thin": "“We completed a root cause analysis and implemented corrective actions.”",
          "listeningFor": "How far it travelled before it was caught and what containment cost. Everyone runs an RCA; not everyone has had to make the call to a customer."
        },
        {
          "q": "Describe a shutdown you ran.",
          "thin": "“We planned it thoroughly and executed to schedule.”",
          "listeningFor": "What overran and what they cut to recover. Nothing of that size runs to plan, and the recovery decisions are the whole skill."
        }
      ],
      "roles": [
        {
          "family": "Plant & production",
          "levels": "Manager to plant head"
        },
        {
          "family": "Quality & EHS",
          "levels": "Lead to head"
        },
        {
          "family": "Maintenance & reliability",
          "levels": "Engineer to manager"
        },
        {
          "family": "Industrial engineering",
          "levels": "Engineer to lead"
        },
        {
          "family": "Supply chain & planning",
          "levels": "Manager to head"
        },
        {
          "family": "Operations leadership",
          "levels": "Head to COO"
        },
        {
          "family": "Automation & controls",
          "levels": "Engineer to manager"
        },
        {
          "family": "Procurement & vendor management",
          "levels": "Manager to head"
        }
      ],
      "bench": [
        "Plant operations, 14 yrs",
        "Quality and EHS, 13 yrs",
        "Maintenance and reliability, 12 yrs",
        "Supply chain, 14 yrs"
      ],
      "faq": [
        {
          "q": "Do you cover discrete and process manufacturing?",
          "a": "Both, with different interviewers. The failure modes are not alike — a batch process person and a discrete assembly person will each struggle with the other's questions, and neither struggle tells you anything useful."
        }
      ]
    },
    {
      "slug": "industrial-engineering",
      "name": "Industrial & engineering",
      "tagline": "Technical depth for work that gets built once and has to be right.",
      "weights": {
        "Core depth": 24,
        "Systems design": 18,
        "Controls and risk": 18,
        "Delivery speed": 18,
        "Documentation": 14,
        "Stakeholder handling": 8
      },
      "misses": [
        {
          "title": "Accountability versus involvement",
          "label": "Project teams are large",
          "body": "Everyone on a capital project can describe the capital project. Far fewer signed something and carried it.",
          "tell": "Where it shows up: what they signed off that they were not entirely sure about."
        },
        {
          "title": "The decision behind the delay",
          "label": "Overruns are always explained late",
          "body": "External factors are real and are also the easiest available answer. The decision that caused the slip almost always happened months earlier.",
          "tell": "Where it shows up: what they would do differently in month two, not month nine."
        },
        {
          "title": "Change during construction",
          "label": "Drawings change; costs move",
          "body": "A revision is a document. The interesting part is the commercial conversation that followed and who absorbed it.",
          "tell": "Where it shows up: a design change mid-build, and how that conversation went."
        }
      ],
      "questions": [
        {
          "q": "Tell me about a project that overran.",
          "thin": "“There were external dependencies and some weather impact.”",
          "listeningFor": "The decision they made in month two that they would make differently. Overruns are almost always caused earlier than they are noticed."
        },
        {
          "q": "What did you sign off that you were not entirely sure about?",
          "thin": "“Everything went through the formal approval process.”",
          "listeningFor": "Whether they can name one. Engineers who have carried real accountability all have an answer, and usually remember it clearly."
        },
        {
          "q": "Describe a design change during construction.",
          "thin": "“We issued a revision and updated the drawings.”",
          "listeningFor": "What it cost, who ended up paying for it, and how that conversation went. The technical change is rarely the hard part."
        }
      ],
      "roles": [
        {
          "family": "Project & construction management",
          "levels": "Manager to director"
        },
        {
          "family": "Design engineering",
          "levels": "Engineer to principal"
        },
        {
          "family": "Commissioning & startup",
          "levels": "Engineer to lead"
        },
        {
          "family": "EHS & compliance",
          "levels": "Lead to head"
        },
        {
          "family": "Procurement & contracts",
          "levels": "Manager to head"
        },
        {
          "family": "Engineering leadership",
          "levels": "Head to VP"
        },
        {
          "family": "Controls & instrumentation",
          "levels": "Engineer to lead"
        },
        {
          "family": "Operations & maintenance",
          "levels": "Manager to head"
        }
      ],
      "bench": [
        "Project and construction, 15 yrs",
        "Design engineering, 13 yrs",
        "Commissioning, 12 yrs",
        "Contracts and procurement, 14 yrs"
      ],
      "faq": [
        {
          "q": "Can you hire for site-based and EPC roles?",
          "a": "Yes. Site postings need a different conversation about mobility and family circumstances, which we have early rather than at offer stage — it is the most common reason otherwise-good processes collapse in week four."
        }
      ]
    },
    {
      "slug": "global-capability-centres",
      "name": "Global capability centres",
      "tagline": "Built for GCCs scaling in India, where the difference between a delivery centre and a capability centre is decision rights.",
      "weights": {
        "Core depth": 22,
        "Systems design": 18,
        "Controls and risk": 12,
        "Delivery speed": 20,
        "Documentation": 10,
        "Stakeholder handling": 18
      },
      "misses": [
        {
          "title": "Decision rights, not headcount",
          "label": "Both look like seniority",
          "body": "Someone can run a team of forty and never have owned a decision the parent did not pre-approve. The title is identical either way.",
          "tell": "Where it shows up: a decision that was genuinely theirs."
        },
        {
          "title": "Working the gap, not surviving it",
          "label": "Everyone mentions overlap hours",
          "body": "Timezone problems are usually ownership problems wearing a clock. The people worth hiring moved the work rather than adding calls.",
          "tell": "Where it shows up: a handover that kept failing, and what they changed."
        },
        {
          "title": "Influence without authority",
          "label": "Matrix reporting hides a lot",
          "body": "In a GCC most of the important work happens across a line the org chart does not show. Stakeholder handling is weighted heavily here for that reason.",
          "tell": "Where it shows up: something the parent got wrong about this market, and what changed."
        }
      ],
      "questions": [
        {
          "q": "Who owned that decision — here or the parent?",
          "thin": "“It was a collaborative decision across both teams.”",
          "listeningFor": "Whether they can name one decision that was genuinely theirs. GCC seniority is almost entirely a question about decision rights."
        },
        {
          "q": "Tell me about something the parent organisation got wrong about your market.",
          "thin": "“There were some cultural differences to work through.”",
          "listeningFor": "What they did about it and whether anything actually changed. This is the clearest line between a delivery centre and a capability centre."
        },
        {
          "q": "How did you handle a handover that kept failing?",
          "thin": "“We improved documentation and increased overlap hours.”",
          "listeningFor": "Whether they moved the work or moved the people. Adding calls is what you do when you cannot move ownership."
        }
      ],
      "roles": [
        {
          "family": "Engineering & platform",
          "levels": "Mid to director"
        },
        {
          "family": "Data & analytics",
          "levels": "Analyst to head"
        },
        {
          "family": "Product & design",
          "levels": "PM to head of product"
        },
        {
          "family": "Finance & shared services",
          "levels": "Manager to head"
        },
        {
          "family": "GCC leadership",
          "levels": "Head to site leader"
        },
        {
          "family": "Transformation & PMO",
          "levels": "Manager to director"
        },
        {
          "family": "HR & talent",
          "levels": "Manager to head"
        },
        {
          "family": "Legal & risk",
          "levels": "Manager to head"
        }
      ],
      "bench": [
        "GCC build-out and leadership, 18 yrs",
        "Engineering leadership, 14 yrs",
        "Finance and shared services, 15 yrs",
        "Transformation, 13 yrs"
      ],
      "faq": [
        {
          "q": "Do you help with early-stage GCC build-outs?",
          "a": "Yes, and the first ten hires are a different exercise from the next hundred. Early build-out weights decision rights and ambiguity tolerance far above domain depth, because the people you hire first will define what the centre is allowed to own."
        }
      ]
    },
    {
      "slug": "consumer-digital-commerce",
      "name": "Consumer & digital commerce",
      "tagline": "Where speed, judgment and commercial instinct all have to survive in the same person.",
      "weights": {
        "Core depth": 30,
        "Systems design": 24,
        "Controls and risk": 8,
        "Delivery speed": 22,
        "Documentation": 6,
        "Stakeholder handling": 10
      },
      "misses": [
        {
          "title": "Taste that can be defended",
          "label": "Portfolios all look good",
          "body": "Anyone can show you something attractive. Far fewer can tell you why it is right for that customer at that moment without reaching for a conversion number.",
          "tell": "Where it shows up: something they shipped and why, in craft terms as well as commercial ones."
        },
        {
          "title": "Failure they can be specific about",
          "label": "Everyone learned a lot",
          "body": "The useful signal is the assumption that turned out to be wrong and how quickly they found out.",
          "tell": "Where it shows up: a launch that did not work."
        },
        {
          "title": "The speed trade, made consciously",
          "label": "Fast is the default here",
          "body": "Everyone in this sector ships quickly. The question is whether they know what it cost and whether they would take the same trade again.",
          "tell": "Where it shows up: a time speed cost them quality."
        }
      ],
      "questions": [
        {
          "q": "Show me something you shipped that you are proud of, and tell me why.",
          "thin": "“It drove a significant lift in conversion.”",
          "listeningFor": "Whether they can talk about the craft as well as the number. Taste that can only be defended with a metric is not taste, it is a report."
        },
        {
          "q": "What did you launch that failed?",
          "thin": "“We learned a lot from it and applied it later.”",
          "listeningFor": "The specific assumption that was wrong and how quickly they knew. Vagueness here usually means they were not close enough to it."
        },
        {
          "q": "Tell me about a time speed cost you quality.",
          "thin": "“We shipped fast and iterated after.”",
          "listeningFor": "What broke, who noticed first, and whether they would take the same trade again. The last part is the one that separates judgment from habit."
        }
      ],
      "roles": [
        {
          "family": "Product & growth",
          "levels": "PM to head"
        },
        {
          "family": "Engineering",
          "levels": "Mid to principal"
        },
        {
          "family": "Design & brand",
          "levels": "Designer to head"
        },
        {
          "family": "Category & merchandising",
          "levels": "Manager to head"
        },
        {
          "family": "Performance marketing",
          "levels": "Manager to director"
        },
        {
          "family": "Supply chain & fulfilment",
          "levels": "Manager to head"
        },
        {
          "family": "Consumer insights & research",
          "levels": "Analyst to head"
        },
        {
          "family": "Loyalty & CRM",
          "levels": "Manager to head"
        }
      ],
      "bench": [
        "Consumer product, 11 yrs",
        "Commerce engineering, 12 yrs",
        "Brand and design, 10 yrs",
        "Category and merchandising, 13 yrs"
      ],
      "faq": [
        {
          "q": "Do you hire for D2C as well as marketplace businesses?",
          "a": "Yes, and we weight them differently. Marketplace roles lean on systems thinking and supply liquidity; D2C leans on brand judgment and margin discipline. People are rarely equally strong at both and we would rather say which is which."
        }
      ]
    },
    {
      "slug": "private-equity-portfolio",
      "name": "Private equity portfolio",
      "tagline": "Value-creation timelines are real and short. Hiring has to move faster than they do.",
      "weights": {
        "Core depth": 20,
        "Systems design": 14,
        "Controls and risk": 10,
        "Delivery speed": 32,
        "Documentation": 8,
        "Stakeholder handling": 16
      },
      "misses": [
        {
          "title": "The first ninety days",
          "label": "Everyone says they listened",
          "body": "Ninety days is a quarter of the thesis. Someone who spent it understanding the business has spent a meaningful part of the hold period not acting.",
          "tell": "Where it shows up: something specific and dated that they changed early."
        },
        {
          "title": "Deciding without enough",
          "label": "Information never arrives in time",
          "body": "Portfolio operating roles are a sequence of decisions made on partial information. Speed is either a developed skill or it is recklessness, and the two interview similarly.",
          "tell": "Where it shows up: a decision made early, and what they would have needed to be sure."
        },
        {
          "title": "Disagreeing with the sponsor",
          "label": "Alignment is the usual answer",
          "body": "Operators who have never pushed back on a board have not been properly tested. The useful signal is what they protected and how it went.",
          "tell": "Where it shows up: something the sponsor wanted that they resisted."
        }
      ],
      "questions": [
        {
          "q": "What did you change in your first ninety days?",
          "thin": "“I spent the time understanding the business and building relationships.”",
          "listeningFor": "Something specific and dated. Ninety days is a quarter of the thesis, and a full quarter of listening is a decision in itself."
        },
        {
          "q": "Tell me about a decision you made without enough information.",
          "thin": "“I gathered what input I could and made a judgment call.”",
          "listeningFor": "What they would have needed to be certain, and why they did not wait for it. That gap is where speed either becomes a skill or becomes luck."
        },
        {
          "q": "What did the sponsor want that you pushed back on?",
          "thin": "“We aligned on priorities pretty quickly.”",
          "listeningFor": "The thing they protected. Operators who have never disagreed with a board have not been in a hard enough room yet."
        }
      ],
      "roles": [
        {
          "family": "Portfolio leadership",
          "levels": "Head to CEO"
        },
        {
          "family": "Finance & FP&A",
          "levels": "Controller to CFO"
        },
        {
          "family": "Commercial & revenue",
          "levels": "Head to CRO"
        },
        {
          "family": "Operations & transformation",
          "levels": "Director to COO"
        },
        {
          "family": "Technology leadership",
          "levels": "Head to CTO"
        },
        {
          "family": "Value creation & PMO",
          "levels": "Manager to director"
        },
        {
          "family": "Investor relations & fundraising",
          "levels": "Associate to director"
        },
        {
          "family": "M&A and integration",
          "levels": "Manager to director"
        }
      ],
      "bench": [
        "Portfolio operating leadership, 18 yrs",
        "Finance transformation, 15 yrs",
        "Commercial leadership, 14 yrs",
        "Operations and PMO, 13 yrs"
      ],
      "faq": [
        {
          "q": "How fast can you actually move on a portfolio mandate?",
          "a": "First three names inside 36 hours of a confirmed brief, and we hold that in this sector specifically because the hold period does not pause while a search runs. What we will not do is send three people faster by lowering the bar — that is the failure mode this whole model exists to avoid."
        }
      ]
    }
  ]
}
