import type { LucideIcon } from "lucide-react";
import {
  Atom,
  BarChart3,
  BrainCircuit,
  CandlestickChart,
  Clapperboard,
  Home,
  Layers,
  LineChart,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Navigation + socials                                                */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const socials = {
  // Shown publicly to recruiters; the Contact button + tiles + footer all use a
  // mailto: link so a click opens the visitor's default mail app (Outlook,
  // Gmail-as-handler, Apple Mail, etc.).
  email: "Muzzamil755@gmail.com",
  github: "https://github.com/Muzzamil-Codes-dev",
  // NOTE: confirm this is your real LinkedIn profile URL before sharing.
  linkedin: "https://www.linkedin.com/in/muzzamil-rasully",
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

// Used by the hero focus card ("currently focused on").
export const focusAreas = [
  "Applied ML",
  "Retrieval systems (RAG)",
  "Model evaluation",
  "MLOps & deployment",
  "Data analytics",
] as const;

// Headline metrics for the hero card — each tied to real, defensible work.
export const mlStats = [
  { value: "10+", label: "ML / DL models trained" },
  { value: "3", label: "end-to-end AI systems" },
  { value: "0.82", label: "ROC-AUC · churn classifier" },
] as const;

export const openToRoles =
  "Open to ML Engineer, AI Engineer, NLP Engineer, RAG/LLM Engineer and ML-focused Data Scientist roles.";

/* ------------------------------------------------------------------ */
/* Recruiter snapshot                                                  */
/* ------------------------------------------------------------------ */

export const quickScan = {
  openTo: [
    "ML Engineer",
    "AI Engineer",
    "NLP Engineer",
    "ML-focused Data Scientist",
  ],
  bestProof: [
    "NLP Retrieval & RAG",
    "FinBERT stock ML pipeline",
    "0.82 ROC-AUC churn model",
    "CNN from scratch",
  ],
  coreStack: [
    "Python",
    "PyTorch",
    "scikit-learn",
    "Transformers",
    "LangChain",
    "FAISS",
    "FastAPI",
    "Docker",
    "SQL",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Tech stack strip                                                    */
/* ------------------------------------------------------------------ */

export const techStrip = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "Hugging Face",
  "scikit-learn",
  "LangChain",
  "RAG",
  "FastAPI",
  "Docker",
  "MLflow",
  "SQL",
  "Git",
] as const;

/* ------------------------------------------------------------------ */
/* About cards                                                         */
/* ------------------------------------------------------------------ */

export type AboutCard = { title: string; body: string; icon: LucideIcon };

export const aboutCards: AboutCard[] = [
  {
    title: "Applied modelling",
    body: "Designing, training, and evaluating models — from gradient boosting to neural networks — with a focus on what's robust and honest.",
    icon: BrainCircuit,
  },
  {
    title: "Retrieval & language tools",
    body: "Search and question-answering systems that return grounded, explainable answers over real documents.",
    icon: Layers,
  },
  {
    title: "Data & insight",
    body: "A strong analytics foundation in Python, SQL, and BI, so results answer the right questions and reach stakeholders.",
    icon: BarChart3,
  },
];

/* ------------------------------------------------------------------ */
/* Experience timeline                                                 */
/* ------------------------------------------------------------------ */

export type ExperienceItem = {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Data Scientist",
    company: "Ginseng",
    dates: "Aug 2024 – Aug 2025",
    bullets: [
      "Engineered Python ML workflows using scikit-learn, XGBoost and LightGBM across 100,000+ record datasets, delivering classification, regression and clustering outputs across 6+ concurrent client workstreams.",
      "Reduced analytical turnaround time by 30% by integrating LLM APIs and LangChain-assisted document processing, increasing the volume of recurring client deliverables without additional headcount.",
      "Converted exploratory analysis into model evaluation reports using precision, recall, F1 and AUC, giving senior stakeholders clearer evidence for operational and strategic decisions.",
      "Led a 10-person cross-functional data standardisation initiative, creating a unified reporting framework adopted across client portfolios.",
    ],
  },
  {
    role: "Finance Intern",
    company: "Xceedure Business Solutions",
    dates: "Jun 2024 – Aug 2024",
    bullets: [
      "Improved financial reporting accuracy by 15–20% by validating, cleansing and reconciling 30,000+ records across Excel and SQL datasets, strengthening finance data integrity before reports were issued to senior stakeholders.",
      "Reduced weekly reporting preparation time from several hours to under 10 minutes by developing automated Power BI dashboards and structured Excel reporting templates for financial and operational KPI tracking.",
      "Automated a recurring monthly finance reporting process using VBA macros, saving approximately 3 hours per cycle while reducing manual input errors and improving consistency across reporting outputs.",
      "Strengthened spreadsheet controls using pivot tables, XLOOKUP/VLOOKUP, SUMIFS, IF statements, data validation and formula checks, improving the traceability and auditability of financial analysis.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Projects — featured (top proof) + more (supporting)                 */
/* ------------------------------------------------------------------ */

export type Highlight = { label?: string; text: string };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  highlights: Highlight[];
  tech: string[];
  icon: LucideIcon;
  github?: string;
  demo?: string;
  caseStudy?: boolean;
  /** Repo isn't public — show "Repo available on request", never a negative badge. */
  privateRepo?: boolean;
};

export const featuredProjects: Project[] = [
  {
    slug: "nlp-retrieval-rag",
    title: "NLP Retrieval & RAG",
    summary:
      "Builds a question-answering system over documents using retrieval, re-ranking and generated answers.",
    highlights: [
      { label: "Built", text: "TF-IDF, dense and hybrid retrieval baselines" },
      { label: "Added", text: "FAISS search, cross-encoder re-ranking and Flan-T5 answer generation" },
      { label: "Proof", text: "GitHub and case study" },
    ],
    tech: ["Python", "FAISS", "Transformers", "Flan-T5", "NLP", "RAG"],
    icon: Search,
    github: "https://github.com/Muzzamil-Codes-dev/nlp-retrieval-rag-coursework",
    caseStudy: true,
  },
  {
    slug: "finsight-ai",
    title: "FinSight AI",
    summary:
      "Tests whether short-term stock movement can be predicted using market data, sentiment and document context.",
    highlights: [
      { label: "Built", text: "leakage-safe financial ML pipeline with technical indicators and FinBERT sentiment" },
      { label: "Finding", text: "short-horizon prediction was only slightly above baseline, showing honest evaluation" },
      { label: "Proof", text: "reproducible pipeline, dashboard, Docker and case study" },
    ],
    tech: ["Python", "PyTorch", "FinBERT", "Transformers", "RAG", "scikit-learn"],
    icon: LineChart,
    caseStudy: true,
    privateRepo: true,
  },
  {
    slug: "telco-churn",
    title: "Telco Churn Predictor",
    summary:
      "Predicts customer churn and explains the drivers behind each prediction.",
    highlights: [
      { label: "Built", text: "two-stage ML pipeline with GBM risk scoring and XGBoost classification" },
      { label: "Result", text: "0.82 ROC-AUC on the IBM Telco dataset" },
      { label: "Explainability", text: "SHAP used to surface churn drivers" },
    ],
    tech: ["Python", "XGBoost", "scikit-learn", "pandas", "SHAP"],
    icon: Users,
    github: "https://github.com/Muzzamil-Codes-dev/telco-churn-predictor",
    caseStudy: true,
  },
];

export const moreProjects: Project[] = [
  {
    slug: "streammind-ai",
    title: "StreamMind AI",
    summary:
      "GenAI search and recommendation platform for a streaming catalogue.",
    highlights: [
      { label: "Built", text: "hybrid BM25 + semantic retrieval and a grounded RAG chatbot" },
      { label: "Added", text: "neural re-ranking and a feedback-loop experiment" },
    ],
    tech: ["Python", "PyTorch", "RAG", "FastAPI", "Docker", "MLflow"],
    icon: Clapperboard,
    caseStudy: true,
    privateRepo: true,
  },
  {
    slug: "cnn-from-scratch",
    title: "CNN From Scratch",
    summary: "A convolutional neural network implemented in pure NumPy.",
    highlights: [
      { label: "Built", text: "hand-coded forward and backward passes — no frameworks" },
      { label: "Covers", text: "conv, pooling and dense layers for image classification" },
    ],
    tech: ["Python", "NumPy", "Computer Vision"],
    icon: BrainCircuit,
    github: "https://github.com/Muzzamil-Codes-dev/CNN-From-Scratch",
    caseStudy: true,
  },
  {
    slug: "stockscope",
    title: "StockScope",
    summary:
      "Full-stack stock-research platform with analytics-backed, explainable summaries.",
    highlights: [
      { label: "Built", text: "live search with earnings, valuation and risk breakdowns" },
      { label: "Added", text: "volatility-based forecasts and LLM-generated summaries" },
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "LLM", "Recharts"],
    icon: CandlestickChart,
    caseStudy: true,
    privateRepo: true,
  },
  {
    slug: "house-price",
    title: "House Price Prediction",
    summary: "Regression models that estimate property prices and price drivers.",
    highlights: [
      { label: "Built", text: "feature engineering and cross-validated model comparison" },
      { label: "Result", text: "ranked the strongest drivers of valuation" },
    ],
    tech: ["scikit-learn", "pandas", "Matplotlib", "Python"],
    icon: Home,
    github: "https://github.com/Muzzamil-Codes-dev/house-price-prediction",
    caseStudy: true,
  },
  {
    slug: "credit-risk",
    title: "Credit Risk Prediction",
    summary: "Classifies borrower default risk with careful imbalance handling.",
    highlights: [
      { label: "Built", text: "feature engineering on applicant and loan data" },
      { label: "Result", text: "interpretable risk metrics under class imbalance" },
    ],
    tech: ["scikit-learn", "pandas", "Python"],
    icon: ShieldCheck,
    github: "https://github.com/Muzzamil-Codes-dev/credit-risk-prediction",
    caseStudy: true,
  },
  {
    slug: "computational-physics",
    title: "Computational Physics (C++)",
    summary: "Numerical-methods toolkit in modern C++ with an N-body simulation.",
    highlights: [
      { label: "Built", text: "integration, interpolation and root-finding routines" },
      { label: "Added", text: "RK4 N-body simulation of the TRAPPIST-1 system" },
    ],
    tech: ["C++", "Numerical Methods", "Simulation"],
    icon: Atom,
    github: "https://github.com/Muzzamil-Codes-dev/computational-physics-cpp",
  },
];

/* ------------------------------------------------------------------ */
/* Skills — four simple, functional groups                             */
/* ------------------------------------------------------------------ */

export type SkillGroup = { title: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "ML / Modelling",
    skills: ["Python", "PyTorch", "scikit-learn", "XGBoost", "Model evaluation"],
  },
  {
    title: "NLP / RAG",
    skills: ["Transformers", "LangChain", "FAISS", "Flan-T5", "FinBERT", "Embeddings"],
  },
  {
    title: "Deployment",
    skills: ["FastAPI", "Streamlit", "Docker", "MLflow", "GitHub"],
  },
  {
    title: "Data foundation",
    skills: ["SQL", "Pandas", "Power BI", "Excel"],
  },
];
