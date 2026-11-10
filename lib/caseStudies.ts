/* Case-study content for /projects/[slug]. Facts come from the verified
   profile and the project repositories; keep each metric's context. */
import { featuredProjects } from "@/lib/data";

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  badge?: "Private repo" | "Client work" | "Coursework";
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
      "Routing is deterministic and based on the number of contract IDs. One ID means a single-contract question, two means a comparison, none means a portfolio question.",
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
    stack: ["Python", "LangGraph", "FastAPI", "Pydantic", "SQLite", "React", "Vite", "pytest", "uv", "OpenAI API", "Claude API (private)", "E2B (private)", "OpenTelemetry (private)", "Docker (private)"],
  },
  {
    slug: "nq-retrieval-rag",
    title: "Retrieval & RAG on Natural Questions",
    tagline:
      "A question-answering pipeline built one measured step at a time, from a TF-IDF baseline to hybrid retrieval with cross-encoder reranking.",
    badge: "Coursework",
    github: "https://github.com/Muzzamil-Codes-dev/nlp-retrieval-rag-coursework",
    problem:
      "Retrieval quality sets the ceiling for any RAG system: if the right passage isn't retrieved, the generator can't answer. This university project (ECS665U, Queen Mary) measures each retrieval improvement on its own against the Natural Questions dataset before plugging the best setup into a full RAG pipeline.",
    architecture: [
      "Baseline: TF-IDF over unigrams and bigrams with stop-word removal and L2-normalised vectors.",
      "Dense retrieval with the all-MiniLM-L6-v2 bi-encoder, compared against the larger all-mpnet-base-v2.",
      "Hybrid retrieval combining sparse and dense rankings with reciprocal rank fusion and a tuned weighted score fusion.",
      "A cross-encoder reranks the top candidates, which buys precision at a manageable cost.",
      "The best setup feeds a FAISS IndexFlatIP vector store and Flan-T5-small answer generation, evaluated with Exact Match and token F1.",
      "Embeddings, indexes and query expansions are cached to disk, so a re-run skips the expensive encoding steps.",
    ],
    decisions: [
      {
        title: "Tune on dev, submit test once",
        body: "Every improvement was tuned on the development set, and the held-out test set was only used for the final submission.",
      },
      {
        title: "Report the experiment that failed",
        body: "LLM query expansion with Flan-T5 didn't help, and the write-up reports that result instead of leaving it out.",
      },
      {
        title: "Error analysis before more tuning",
        body: "Failure cases got a qualitative review as part of the final evaluation, alongside the metric scores.",
      },
    ],
    results: [
      { label: "Recall@1", value: "93.80%", context: "hybrid retrieval with cross-encoder reranking, 871 queries" },
      { label: "TF-IDF baseline", value: "54.76%", context: "Recall@1 on the same 871 queries" },
    ],
    stack: ["Python", "Sentence-Transformers", "MiniLM", "FAISS", "TF-IDF", "Reciprocal rank fusion", "Cross-encoders", "Flan-T5", "scikit-learn"],
  },
];

export const caseStudies: Record<string, CaseStudy> = Object.fromEntries(studies.map((s) => [s.slug, s]));

export const caseStudySlugs: string[] = featuredProjects.map((p) => p.slug);
