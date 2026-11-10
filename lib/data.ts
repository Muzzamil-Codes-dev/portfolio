import type { LucideIcon } from "lucide-react";
import { Bot, FlaskConical, Server, Users } from "lucide-react";

/* All site copy lives here. Every claim is checked against the verified
   profile; keep metric context when editing. */

export const profile = {
  name: "Muzzamil Rasully",
  role: "AI Engineer · Full Stack · London",
  location: "London",
  headline: ["I work with customers", "to get AI into production."] as [string, string],
  intro:
    "I'm an AI engineer in London. At Sola I build and deploy LLM systems for client teams, most recently a document-processing app that cut handling time from 15 to 6 minutes per document. Before that I spent a year at Ginseng running stakeholder discovery, shipping LLM features and evaluation suites, and working in a team of three on an internal assistant for about 200 staff.",
  about:
    "Most of my work sits between a model and the people using it. I talk to the team that will use the system, design the API, decide what gets retrieved, validate what comes back and write the tests that stop a bad prompt change from reaching staging. I have a BSc in Mathematics from Queen Mary University of London.",
  cvHref: undefined as string | undefined,
};

export const socials = {
  email: "Muzzamil755@gmail.com",
  github: "https://github.com/Muzzamil-Codes-dev",
  linkedin: "https://www.linkedin.com/in/muzzamil-rasully-0989191a0/",
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
] as const;

export type Tile = { title: string; body: string; icon: LucideIcon };

export const aboutTiles: Tile[] = [
  {
    title: "LLM backends",
    body: "FastAPI services with PostgreSQL, background queues and retries, deployed on AWS.",
    icon: Server,
  },
  {
    title: "Agents",
    body: "LangGraph pipelines with supervisor checks and human approval before anything is final.",
    icon: Bot,
  },
  {
    title: "Working with clients",
    body: "Discovery with the people who will use the system, plain-language write-ups of trade-offs, and saying so when AI isn't the right fix.",
    icon: Users,
  },
  {
    title: "Evaluation & CI",
    body: "Regression suites in GitHub Actions that block a release when schema validity, classification or critical-regression checks fail.",
    icon: FlaskConical,
  },
];

export type Capability = { n: string; title: string; body: string; tools: string[] };

export const capabilities: Capability[] = [
  {
    n: "01",
    title: "Backend & APIs",
    body: "Typed APIs, queues, databases and deployment, with retries, validation and monitoring.",
    tools: ["Python", "FastAPI", "Pydantic", "PostgreSQL", "Docker", "AWS"],
  },
  {
    n: "02",
    title: "Agentic systems",
    body: "Multi-step agents that plan, call tools and check each other's output, with a person in the loop where mistakes are costly.",
    tools: ["LangGraph", "LangChain", "LangSmith", "MCP", "Claude API", "Grok"],
  },
  {
    n: "03",
    title: "RAG & retrieval",
    body: "Chunking, embeddings, hybrid search and reranking, measured with recall and citation precision.",
    tools: ["FAISS", "BM25", "Embeddings", "Cross-encoders", "SQL"],
  },
  {
    n: "04",
    title: "Front end",
    body: "React and TypeScript interfaces for the systems above, including this site.",
    tools: ["React", "TypeScript", "Next.js", "Tailwind", "Vite"],
  },
];

export type Project = {
  slug: string;
  title: string;
  summary: string;
  result: string;
  tech: string[];
  github?: string;
  badge?: "Private repo" | "Client work" | "Coursework";
};

export const featuredProjects: Project[] = [
  {
    slug: "contract-rag",
    title: "Contract Intelligence RAG",
    summary:
      "Ask a question about a commercial contract and get an answer that quotes the exact clause, or \"insufficient evidence\" when the contract doesn't say.",
    result: "88.2% correct on 5 held-out contracts",
    tech: ["Python", "FastAPI", "LangGraph", "FAISS", "BM25", "SQL"],
    badge: "Private repo",
  },
  {
    slug: "bug-triage",
    title: "Agentic Bug Triage",
    summary:
      "A LangGraph pipeline that turns a messy bug report into a structured triage, reviews its own work and waits for a person to approve it.",
    result: "36 tests · 99% backend coverage",
    tech: ["Python", "LangGraph", "FastAPI", "Pydantic", "React", "SQLite"],
    github: "https://github.com/Muzzamil-Codes-dev/Bug-Triage",
  },
  {
    slug: "nq-retrieval-rag",
    title: "Retrieval & RAG on Natural Questions",
    summary:
      "A retrieval pipeline built up from a TF-IDF baseline through dense, hybrid and cross-encoder reranking, then wired into a FAISS and Flan-T5 RAG pipeline.",
    result: "93.8% Recall@1 vs 54.8% TF-IDF",
    tech: ["Python", "FAISS", "MiniLM", "Cross-encoders", "TF-IDF", "Flan-T5"],
    github: "https://github.com/Muzzamil-Codes-dev/nlp-retrieval-rag-coursework",
    badge: "Coursework",
  },
];

export type ExperienceItem = { role: string; company: string; dates: string; bullets: string[] };

export const experience: ExperienceItem[] = [
  {
    role: "AI Consultant",
    company: "Sola",
    dates: "Aug 2026 – Present",
    bullets: [
      "Built and deployed a FastAPI document-processing app with retrieval and schema-validated LLM extraction for a six-person operations team. Average handling time fell from 15 to 6 minutes per document across about 1,200 documents a month.",
      "Moved ingestion onto a background queue so failed jobs retry without blocking users, and sent outputs that fail validation to human review.",
      "Work in a small cross-functional team with little supervision, and flag when AI isn't the right fix for a problem.",
      "Building agent systems in LangGraph and LangChain, with a supervisor agent checking specialist output against a schema before release.",
    ],
  },
  {
    role: "Founder",
    company: "Sharpmind",
    dates: "Jul 2026 – Present",
    bullets: [
      "Built and deployed an LLM agent for lead enquiries, scheduling and admin. It automates about 70% of routine tasks and cut response times from 2–3 hours to under 10 minutes.",
      "Tuned prompts and guardrails across 100+ live conversations with A/B tests, cutting manual intervention by a further 60% or so.",
      "Ran discovery with students and parents and tracked engagement from first response to retention, using it to decide what to improve next.",
      "Grew the tutoring agency to 25+ students and teach maths, science and computer science in small groups.",
    ],
  },
  {
    role: "AI Engineer",
    company: "Ginseng",
    dates: "Aug 2025 – Aug 2026",
    bullets: [
      "Built a 300-case evaluation suite for classification, extraction and summarisation. It blocked 14 critical regressions from reaching staging, 5 of them hallucinations, and production incidents fell by 40%. GitHub Actions gates blocked releases that failed schema or classification checks.",
      "Worked in a team of three on Action Sync, an internal assistant used by about 200 staff. It creates Jira tickets over MCP, joins meetings to take notes and summarises uploaded documents.",
      "Ran stakeholder discovery with clients and wrote up system behaviour, limitations and trade-offs in plain language.",
      "Presented a reusable metric and data-definition standard to directors across six client portfolios, and all six adopted it. Led the 10-person initiative behind it.",
    ],
  },
  {
    role: "Sales Manager",
    company: "Flatpay",
    dates: "Dec 2025 – Feb 2026",
    bullets: [
      "Sold payment technology directly to business owners, learning how each business ran and explaining technical products and commercial trade-offs in plain language.",
    ],
  },
  {
    role: "Data Science Intern",
    company: "Xceedure Business Solutions",
    dates: "Mar 2025 – Aug 2025",
    bullets: [
      "Cleaned and validated 30,000+ operational records in Python and SQL, reducing reporting inaccuracies by 15%.",
      "Built scikit-learn, XGBoost and LightGBM models with feature engineering and cross-validation, and reported findings in Power BI.",
    ],
  },
];

export const education = {
  degree: "BSc Mathematics, 2:1",
  school: "Queen Mary University of London",
  dates: "2022 – 2026",
};

export type StackGroup = "Languages" | "Backend" | "AI" | "Data & Cloud" | "Front end";

export const stack: { name: string; group: StackGroup }[] = [
  { name: "Python", group: "Languages" },
  { name: "TypeScript", group: "Languages" },
  { name: "SQL", group: "Languages" },
  { name: "Java", group: "Languages" },
  { name: "C++", group: "Languages" },
  { name: "FastAPI", group: "Backend" },
  { name: "Pydantic", group: "Backend" },
  { name: "PostgreSQL", group: "Backend" },
  { name: "SQLite", group: "Backend" },
  { name: "Docker", group: "Backend" },
  { name: "GitHub Actions", group: "Backend" },
  { name: "LangGraph", group: "AI" },
  { name: "LangChain", group: "AI" },
  { name: "LangSmith", group: "AI" },
  { name: "Claude API", group: "AI" },
  { name: "OpenAI API", group: "AI" },
  { name: "Grok", group: "AI" },
  { name: "PyTorch", group: "AI" },
  { name: "FAISS", group: "AI" },
  { name: "AWS", group: "Data & Cloud" },
  { name: "Databricks", group: "Data & Cloud" },
  { name: "pandas", group: "Data & Cloud" },
  { name: "scikit-learn", group: "Data & Cloud" },
  { name: "React", group: "Front end" },
  { name: "Next.js", group: "Front end" },
  { name: "Tailwind CSS", group: "Front end" },
  { name: "Vite", group: "Front end" },
];
