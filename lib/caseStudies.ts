/* Case-study content for /projects/[slug]. Facts come from the verified
   profile and the project repositories; keep each metric's context. */
import { featuredProjects } from "@/lib/data";

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  badge?: "Private repo" | "Client work";
  github?: string;
  problem: string;
  architecture: string[];
  decisions: { title: string; body: string }[];
  results: { label: string; value: string; context: string }[];
  stack: string[];
};

const studies: CaseStudy[] = [
  {
    slug: "contract-rag",
    title: "Contract Intelligence RAG",
    tagline:
      "Question answering over commercial contracts that cites the exact clause, and says so when the contract has no answer.",
    badge: "Private repo",
    problem:
      "Supplier, maintenance and service agreements hide the answers people need (notice periods, renewal terms, liability caps) in dense clauses. A wrong answer costs more than no answer, so the system has to quote its evidence and refuse when the evidence isn't there. I built it over 25 real contracts from the CUAD dataset.",
    architecture: [
      "Ingestion runs offline: PyMuPDF extracts text, headers and footers are stripped, and a clause tree is built from the numbering so every clause has a stable ID such as C019:9.1.",
      "Routing comes from the request, not a model. One contract ID means a single-contract question, two means a comparison, none means a portfolio question.",
      "Retrieval fuses dense search (bge-base-en-v1.5 on an exact FAISS index) with BM25, using a tokeniser that keeps values like 14.2, £500,000 and thirty (30) intact.",
      "Generation uses a strict JSON schema whose citation field is an enum of the retrieved clause IDs, so the model can't cite a clause it wasn't shown.",
      "Deterministic checks then confirm that every claim is cited, every quote appears verbatim in its clause and every number in the answer appears in a quote. A failure gets one retry with the list of problems, then the service abstains and returns the three closest clauses.",
      "Portfolio questions such as \"which contracts renew automatically?\" are mapped to a fixed query template and answered with SQL over an extracted contract register, never by top-k retrieval.",
      "LangGraph handles routing behind a FastAPI /ask endpoint. Every response carries the git SHA, config hash, index version and model IDs, and logs never contain question or clause text.",
    ],
    decisions: [
      {
        title: "No retrieval-score threshold",
        body: "Fused scores didn't separate answerable from unanswerable questions, so abstention is driven by validation failures instead of a score cutoff.",
      },
      {
        title: "SQL for portfolio questions",
        body: "Top-k retrieval can't answer \"which of 25 contracts…\" reliably. A register extracted once, with a source clause and quote per value, can.",
      },
      {
        title: "Test split run once",
        body: "Five contracts were held out and frozen. Development happened on the other 20, and the test numbers come from a single run.",
      },
    ],
    results: [
      { label: "Correct answers", value: "88.2%", context: "45 of 51 questions on 5 held-out contracts (LLM grader)" },
      { label: "Citation precision", value: "1.000", context: "strict, on the held-out contracts" },
      { label: "Recall@5", value: "0.935", context: "within-contract retrieval on the held-out contracts" },
      { label: "Dev set", value: "77 / 90", context: "correct on the 20 development contracts" },
    ],
    stack: ["Python", "FastAPI", "LangGraph", "FAISS", "BM25", "bge-base-en-v1.5", "PyMuPDF", "SQL", "Docker"],
  },
  {
    slug: "bug-triage",
    title: "Agentic Bug Triage",
    tagline:
      "A multi-agent pipeline that turns an unstructured bug report into a reviewed, structured triage, with a person approving the result.",
    github: "https://github.com/Muzzamil-Codes-dev/Bug-Triage",
    problem:
      "Bug reports arrive as free text with missing details, and triaging them by hand is slow and inconsistent. I wanted an agent that does the first pass properly, checks its own work and stops for a human before anything is final.",
    architecture: [
      "A LangGraph pipeline extracts a structured report, plans the investigation, runs parallel workers and synthesises a triage.",
      "An evaluation step scores the triage for groundedness, completeness, consistency, severity policy and actionability, and revises it up to five times per round.",
      "The graph then pauses with interrupt() so a person can approve, reject or ask for a revision.",
      "SQLite checkpointing means a paused run survives a server restart. An LLM-response cache keyed on a hash of model, schema and prompt brings a repeat triage from about 13 s to 0.5 s.",
      "FastAPI exposes POST and GET /bug-triage and POST /bug-review with typed Pydantic models and explicit 404, 409 and 422 errors. A React and Vite UI sits on top.",
      "A private version adds the Claude API, issue reproduction in an E2B sandbox, confidence-gated escalation to a human, a dead letter queue and OpenTelemetry tracing.",
    ],
    decisions: [
      {
        title: "Human approval inside the graph",
        body: "Using interrupt() with checkpoints keeps the review step part of the workflow, so approval doesn't depend on the client holding state.",
      },
      {
        title: "Tests without a live model",
        body: "The test suite uses a fake LLM and in-memory checkpoints, so it runs fast and deterministically in CI.",
      },
    ],
    results: [
      { label: "Tests", value: "36", context: "passing pytest suite with a fake LLM" },
      { label: "Coverage", value: "99%", context: "line coverage of the backend (API, graph, models)" },
      { label: "Severity accuracy", value: "88%", context: "25 labelled cases, private version; not a large benchmark" },
      { label: "Repeat triage", value: "13 s → 0.5 s", context: "with the LLM-response cache" },
    ],
    stack: ["Python", "LangGraph", "FastAPI", "Pydantic", "SQLite", "React", "Vite", "pytest", "uv", "Claude API", "E2B", "OpenTelemetry", "Docker"],
  },
  {
    slug: "sola-document-processing",
    title: "Document processing at Sola",
    tagline: "Schema-validated LLM extraction for an operations team handling 1,200 documents a month.",
    badge: "Client work",
    problem:
      "A six-person operations team was processing about 1,200 documents a month by hand, at around 15 minutes each. They needed structured data out of those documents without trusting an LLM blindly.",
    architecture: [
      "A Python and FastAPI application with PostgreSQL, retrieval and LLM extraction against a schema.",
      "Document ingestion runs on a background queue, separate from user-facing requests, so failed jobs can retry without blocking anyone.",
      "Outputs that fail schema validation go to a human review queue instead of downstream systems.",
      "Failures are tracked through deployment monitoring. The app runs on a Linux server on AWS.",
    ],
    decisions: [
      {
        title: "Validation before trust",
        body: "Every extraction is checked against the schema, and anything that fails goes to a person. The team only receives output that passed.",
      },
      {
        title: "Queue between ingestion and users",
        body: "Slow or failing documents no longer hold up the people using the app.",
      },
    ],
    results: [
      { label: "Time per document", value: "15 → 6 min", context: "average, a 60% reduction" },
      { label: "Volume", value: "1,200 / month", context: "documents handled by the six-person team" },
      { label: "Time saved", value: "~180 h / month", context: "estimate from the averages above, about 30 hours per person" },
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "RAG", "LLM structured outputs", "AWS", "Linux"],
  },
];

export const caseStudies: Record<string, CaseStudy> = Object.fromEntries(studies.map((s) => [s.slug, s]));

export const caseStudySlugs: string[] = featuredProjects.map((p) => p.slug);
