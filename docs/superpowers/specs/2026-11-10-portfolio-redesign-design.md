# Portfolio redesign — design spec

Date: 2026-11-10
Site: muzzamilrasully.com (this repo, Next.js 15)

## 1. Intent

- **Outcome:** a personal site recruiters read in under a minute and come away seeing a full-stack / backend AI engineer who ships LLM systems to production.
- **Audience:** recruiters and hiring managers for AI Engineer, Forward Deployed Engineer and backend-leaning ML roles.
- **Problems with the current site:** it presents an ML / data scientist (ROC-AUC stat cards, "Open to…" line, Quick Scan box), reads as AI-written, lists wrong experience (old Ginseng "Data Scientist" and Xceedure "Finance Intern"), misses recent projects, and ends with "Hiring for ML, NLP or AI roles?".
- **Success:** current, verified experience and projects; no recruiter-pitch or hiring copy; distinctive editorial look inspired by the reference image; copy passes the no-ai-slop rules; builds cleanly and works on phones and in both themes.

## 2. Decisions

| Topic | Decision |
|-|-|
| Approach | Restyle the existing Next.js 15 + Tailwind + Motion + next-themes app. Keep `/projects/[slug]`. |
| Hero image | No photo. Right side is an animated diagram of the Contract RAG pipeline. |
| Theme | Cream / red / black light theme plus a tuned dark theme (toggle kept). |
| Experience | Sola, Ginseng, Sharpmind, Xceedure. Flatpay omitted. |
| Featured work | Contract Intelligence RAG, Bug-Triage, Sola document processing. |
| Email | Rasully.m1@gmail.com (from verified profile; replaces Muzzamil755@gmail.com). |
| Education | BSc Mathematics 2:1, QMUL, shown in the footer of the Experience section. MSc omitted (unconfirmed for the site; add later if wanted). |
| Copy | Facts only from `/Users/User/Documents/Muzzamil Jobs/AGENTS.md`; written and checked with the no-ai-slop skill. |

## 3. Visual system

- **Light:** background `#F3EEE6`, surface `#FBF8F3`, ink `#141414`, muted `#5E5A54`, accent `#D7261E`, border `rgb(20 20 20 / 0.15)`.
- **Dark:** background `#121110`, surface `#1B1A18`, ink `#F1ECE4`, muted `#A39E96`, accent `#EF3B30`, border `rgb(241 236 228 / 0.14)`.
- Colours defined as CSS variables on `:root` / `.dark`, mapped into Tailwind.
- **Type (next/font/google):** Anton for display headings (uppercase, tight leading); Inter for body; JetBrains Mono for labels, numbers and metrics.
- **Motifs:** small red square before section labels; `01 / 02` numbering; hairline section dividers; pill buttons with an `↗` arrow; two-tone headlines (ink + red word).
- **Motion:** fade-up on scroll via the existing `Reveal`; hero pipeline draws once on load. All motion disabled under `prefers-reduced-motion`.
- **Responsive:** single column under 768px, 16px gutters, no horizontal scroll; pipeline visual stacks under the hero text on mobile.

## 4. Page structure (home)

1. **Navbar** — "Muzzamil Rasully" wordmark; links Work, Experience, Stack, Contact; theme toggle; "Get in touch" pill (mailto). Sticky, collapses to a menu on mobile.
2. **Hero** — label `AI ENGINEER · BACKEND & FULL STACK · LONDON`; headline "I BUILD AI SYSTEMS / THAT SHIP." (second line in red; final wording settled during copy pass); 2–3 sentence factual intro naming Sola and Ginseng; buttons "See my work" (anchor) and "Download CV" (only if a CV PDF is supplied; otherwise hidden); GitHub and LinkedIn icon links. Right: `PipelineVisual`.
3. **About** — short first-person paragraph; four tiles: LLM backends, Agents, Retrieval, Evaluation & CI, each with one concrete line.
4. **Capabilities** ("What I build") — four numbered columns: Backend & APIs (Python, FastAPI, PostgreSQL, Docker, AWS); Agentic systems (LangGraph, LangChain, human-in-the-loop, schema validation); RAG & retrieval (hybrid search, FAISS, BM25, reranking, citations); Front end (React, TypeScript, Next.js).
5. **Featured work** — three cards with a dark visual panel, title, one-line summary, one headline result, stack tags, "Case study →" and GitHub link where public.
6. **Experience** — vertical timeline, 2–3 bullets each, BSc line at the end.
7. **Stack** — grid of tool icons with names.
8. **Contact** — headline "LET'S TALK."; one plain sentence; email, LinkedIn, GitHub. No hiring or availability pitch.
9. **Footer** — name, © year, social icons.

## 5. Content (verified facts only)

### Featured projects

- **Contract Intelligence RAG** (private repo, "available on request"). Q&A over 25 CUAD commercial contracts. Hybrid dense (bge-base, FAISS) + BM25 retrieval, strict JSON schema whose citation field is limited to retrieved clause IDs, deterministic quote and number validation, one retry then abstain, portfolio questions answered by SQL over an extracted register; LangGraph behind FastAPI. Results on 5 held-out contracts: 88.2% correct (45/51), citation precision 1.000, Recall@5 0.935.
- **Bug-Triage** (public: github.com/Muzzamil-Codes-dev/Bug-Triage). LangGraph pipeline that extracts a report, plans, runs parallel workers, synthesises a triage, self-evaluates and revises, then pauses for human approval; FastAPI with typed Pydantic models; React + Vite UI; SQLite checkpointing and LLM-response cache (repeat triage 13s → 0.5s); 36 tests, 99% backend line coverage. Private version: Claude API, E2B sandbox reproduction, confidence-gated escalation, dead letter queue, OpenTelemetry; 88% severity accuracy on 25 labelled cases. Presented as one project.
- **Sola document processing** (client work, no code link). Python/FastAPI app with PostgreSQL, retrieval and schema-validated LLM extraction for a six-person ops team handling 1,200 documents a month; 15 → 6 minutes per document (60%); background queue with retries; failed validation routed to human review; deployed to a Linux server on AWS.

### Experience

- **AI Consultant — Sola** (Aug 2026 – Present): the Sola app above; LangGraph/LangChain agent systems with supervisor validation.
- **AI Engineer — Ginseng** (Aug 2025 – Aug 2026): 300-case evaluation suite that blocked 14 critical regressions (5 hallucinations) and cut production incidents by 40%; GitHub Actions eval gates; Action Sync internal assistant for ~200 staff, built in a team of three (Jira via MCP, meeting agent, document summaries).
- **Founder — Sharpmind** (Jul 2026 – Present): LLM agent for enquiries and scheduling automating ~70% of routine tasks; response time 2–3 hours → under 10 minutes.
- **Data Science Intern — Xceedure Business Solutions** (Mar 2025 – Aug 2025): Python/SQL cleaning of 30,000+ records, reporting inaccuracies down 15%; scikit-learn/XGBoost models; Power BI reporting.

Rules: no invented metrics; keep metric context; team work not presented as sole ownership; no Anthropic/OpenAI attribution at Ginseng.

## 6. Code structure

- `lib/data.ts` — rewritten: `profile`, `navLinks`, `socials`, `capabilities`, `aboutTiles`, `featuredProjects`, `experience`, `stack`, `education`. All copy lives here.
- `lib/caseStudies.ts` — rewritten for the three featured slugs: problem, approach/architecture, key decisions, results, stack, links.
- `app/globals.css` + `tailwind.config.ts` — tokens from §3.
- `app/layout.tsx` — fonts, metadata (title "Muzzamil Rasully — AI Engineer", description), ThemeProvider.
- `app/page.tsx` — composes the sections.
- Components: `Navbar`, `Hero`, `PipelineVisual` (inline SVG, theme-aware), `About`, `Capabilities`, `FeaturedWork`, `ProjectCard`, `Experience`, `Stack`, `Contact`, `Footer`, `ThemeToggle`, `ThemeProvider`, `Reveal`, `SectionLabel`.
- Deleted: `QuickScan`, `FocusCard`, `MoreProjects`, `TechStack` (replaced by `Stack`), `Skills` (replaced by `Capabilities`).
- `app/projects/[slug]/page.tsx` — restyled; unknown slug → `notFound()`; private/client work labelled.
- No new dependencies beyond what is installed.

## 7. Verification

- `npm run build` and `npm run lint` pass.
- In the browser pane: home and each case study in light and dark, at 1280px and 375px; no horizontal scroll; theme toggle persists; all anchors and external links resolve; reduced-motion disables animation.
- Copy pass: grep for banned words and for "hiring", "open to", "freelance"; every claim traced to AGENTS.md.

## 8. Open items

- CV PDF for the download button (hidden until supplied).
- Whether to show the MSc AI (expected Aug 2027).
- Hosting: existing setup assumed; nothing in this spec changes deployment.
