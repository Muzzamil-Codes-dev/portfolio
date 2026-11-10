import type { LucideIcon } from "lucide-react";
import { Bot, FlaskConical, Search, Server } from "lucide-react";

/* All site copy lives here. Every claim is checked against the verified
   profile; keep metric context when editing. */

export const profile = {
  name: "Muzzamil Rasully",
  role: "AI Engineer · Backend & Full Stack · London",
  location: "London",
  headline: ["I build the backend", "behind AI products."] as [string, string],
  intro:
    "I'm an AI engineer in London. At Sola I build document-processing systems for clients. Before that I spent a year at Ginseng shipping LLM features and evaluation suites, and worked in a team of three on an internal assistant used by about 200 staff. I work mostly in Python and FastAPI, with React when a project needs a front end.",
  about:
    "Most of my work sits between a model and the people using it. I design the API, decide what gets retrieved, validate what comes back, and write the tests that stop a bad prompt change from reaching staging. I have a BSc in Mathematics from Queen Mary University of London.",
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
    title: "Retrieval",
    body: "Hybrid search over contracts and documents, with answers that cite the clause they came from.",
    icon: Search,
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
  badge?: "Private repo" | "Client work";
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
    slug: "sola-document-processing",
    title: "Document processing at Sola",
    summary:
      "A FastAPI service that pulls structured data out of documents for a six-person operations team handling 1,200 documents a month.",
    result: "15 → 6 min per document",
    tech: ["Python", "FastAPI", "PostgreSQL", "RAG", "AWS"],
    badge: "Client work",
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
      "Grew the tutoring agency to 25+ students and teach maths, science and computer science in small groups.",
    ],
  },
  {
    role: "AI Engineer",
    company: "Ginseng",
    dates: "Aug 2025 – Aug 2026",
    bullets: [
      "Built a 300-case evaluation suite for classification, extraction and summarisation. It blocked 14 critical regressions from reaching staging, 5 of them hallucinations, and production incidents fell by 40%.",
      "Ran unit, schema and agent-evaluation tests in GitHub Actions, with gates that stopped a release when schema validity or classification checks failed.",
      "Worked in a team of three on Action Sync, an internal assistant used by about 200 staff. It creates Jira tickets over MCP, joins meetings to take notes and summarises uploaded documents.",
      "Built RAG and data pipelines over 100,000+ records on AWS, cutting manual processing time by 30%.",
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
