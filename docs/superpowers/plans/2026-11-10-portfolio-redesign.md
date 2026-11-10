# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle muzzamilrasully.com into a cream/red/black editorial site (plus dark mode) presenting Muzzamil as a full-stack / backend AI engineer, with verified experience and projects.

**Architecture:** Keep the Next.js 15 App Router app. All copy lives in `lib/data.ts` and `lib/caseStudies.ts`; one component per home section composes `app/page.tsx`; `/projects/[slug]` renders case studies statically. Theme tokens are CSS variables mapped into Tailwind.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind 3, motion, next-themes, lucide-react, react-icons, next/font/google.

**Spec:** `docs/superpowers/specs/2026-11-10-portfolio-redesign-design.md`

## Global Constraints

- No new npm dependencies. Tests are Node scripts using only built-ins (`node:fs`, `node:assert`).
- Every fact comes from `/Users/User/Documents/Muzzamil Jobs/AGENTS.md`; no invented metrics; keep metric context; Action Sync is team work (team of three); never attribute Anthropic/OpenAI models to Ginseng.
- Copy follows the no-ai-slop skill: invoke `anthropic-skills:no-ai-slop` before writing copy; no em dashes in short copy; none of: delve, foster, leverage, utilize, facilitate, empower, streamline, robust, cutting-edge, transformative, elevate, harness, supercharge, seamless, passionate.
- No text: "hiring", "open to", "freelance", "available for".
- Email `Rasully.m1@gmail.com`. GitHub `https://github.com/Muzzamil-Codes-dev`. LinkedIn `https://www.linkedin.com/in/muzzamil-rasully-0989191a0/`.
- MSc not shown. BSc Mathematics 2:1, Queen Mary University of London, 2022–2026.
- Light tokens: bg `#F3EEE6`, surface `#FBF8F3`, ink `#141414`, muted `#5E5A54`, accent `#D7261E`, border `rgb(20 20 20 / 0.15)`. Dark: bg `#121110`, surface `#1B1A18`, ink `#F1ECE4`, muted `#A39E96`, accent `#EF3B30`, border `rgb(241 236 228 / 0.14)`.
- Fonts: Anton (display), Inter (body), JetBrains Mono (labels/metrics).
- All motion off under `prefers-reduced-motion`. Phone width 375px: 16px gutters, no horizontal scroll.
- Not a git repo: run `git init` in Task 1 so the commit steps work (ask the user first if `.git` is absent at execution time).

## Review Focus

- Dark mode first paint: no flash of light theme and no hydration warning from the toggle. Test: Task 8 browser check loads `/` with dark stored and reads console errors.
- Narrow phones (320–375px): the large Anton headline and pipeline SVG must not overflow. Test: Task 8 checks `document.documentElement.scrollWidth <= innerWidth` at 375 and 320.
- Unknown case-study slug `/projects/nope` must 404, not crash. Test: Task 7 build plus Task 8 navigation check.
- Private/client projects must never render a GitHub link. Test: `scripts/check-content.mjs` asserts the contract-rag and sola entries have no `github` field.
- "Download CV" must not render a dead link when no PDF exists. Test: Task 4 hides the button unless `profile.cvHref` is set; content check asserts the referenced file exists when set.

---

### Task 1: Content check script + design tokens + fonts

**Files:**
- Create: `scripts/check-content.mjs`
- Modify: `package.json` (add `"check": "node scripts/check-content.mjs"`)
- Modify: `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`

**Interfaces:**
- Produces: Tailwind colours `bg`, `surface`, `ink`, `muted`, `accent`, `line`; font families `font-display`, `font-sans`, `font-mono`; utility classes `.section-label` (red square + mono uppercase), `.container-page` (max-w 1200, px-4 md:px-8), `.btn-primary`, `.btn-ghost` (pill, arrow-ready).

- [ ] **Step 1: `git init` (if absent) and write `scripts/check-content.mjs`.** Reads every file under `lib/`, `components/`, `app/` as text and asserts: no banned word or forbidden phrase from Global Constraints (case-insensitive, word-boundary); `Muzzamil755` absent; `Rasully.m1@gmail.com` present in `lib/data.ts`; files `components/QuickScan.tsx`, `components/FocusCard.tsx`, `components/MoreProjects.tsx`, `components/Skills.tsx`, `components/TechStack.tsx` do not exist; `lib/data.ts` contains `Sola`, `Ginseng`, `Sharpmind`, `Xceedure`; the `contract-rag` and `sola-document-processing` blocks in `lib/data.ts` contain no `github:`; if `cvHref:` is set, `public/<path>` exists. Exits 1 listing each failure.
- [ ] **Step 2: Run `npm run check`.** Expected: FAIL (old email, old components, banned phrases).
- [ ] **Step 3: Tokens.** In `globals.css` define the Global Constraints colours as space-separated RGB channels on `:root` and `.dark`; body uses `bg`/`ink`; add the utility classes above. Map them in `tailwind.config.ts` as `rgb(var(--x) / <alpha-value>)`, `darkMode: "class"`.
- [ ] **Step 4: Fonts + metadata in `app/layout.tsx`.** `Anton({weight:"400"})` → `--font-display`, `Inter` → `--font-sans`, `JetBrains_Mono` → `--font-mono`; drop Playfair. Title `Muzzamil Rasully — AI Engineer`; description and OG text written via no-ai-slop from the spec intent (backend and full-stack AI engineer in London building LLM systems).
- [ ] **Step 5: Run `npm run build`.** Expected: succeeds (old components may look wrong; that is fine).
- [ ] **Step 6: Commit** `git add -A && git commit -m "feat: editorial design tokens, fonts, content check"`

### Task 2: Rewrite `lib/data.ts`

**Files:** Modify `lib/data.ts`

**Interfaces — Produces (exact exports):**
```ts
export const profile: { name: string; role: string; location: string; headline: [string, string]; intro: string; about: string; cvHref?: string };
export const socials: { email: string; github: string; linkedin: string };
export const navLinks: readonly { label: string; href: string }[]; // Work #work, Experience #experience, Stack #stack, Contact #contact
export type Tile = { title: string; body: string; icon: LucideIcon };
export const aboutTiles: Tile[];              // 4: LLM backends, Agents, Retrieval, Evaluation & CI
export type Capability = { n: string; title: string; body: string; tools: string[] };
export const capabilities: Capability[];      // 01 Backend & APIs, 02 Agentic systems, 03 RAG & retrieval, 04 Front end
export type Project = { slug: string; title: string; summary: string; result: string; tech: string[]; github?: string; badge?: "Private repo" | "Client work" };
export const featuredProjects: Project[];     // slugs: contract-rag, bug-triage, sola-document-processing
export type ExperienceItem = { role: string; company: string; dates: string; bullets: string[] };
export const experience: ExperienceItem[];    // Sola, Ginseng, Sharpmind, Xceedure (in that order)
export const education: { degree: string; school: string; dates: string };
export const stack: { name: string; group: "Languages" | "Backend" | "AI" | "Data & Cloud" | "Front end" }[];
```

- [ ] **Step 1: Invoke `anthropic-skills:no-ai-slop`**, then write all copy from spec §5 and AGENTS.md. Facts to use verbatim in meaning: Sola 1,200 docs/month, six-person team, 15 → 6 min (60%), background queue with retries, failed validation → human review, AWS Linux; Ginseng 300-case suite, 14 critical regressions blocked (5 hallucination), 40% fewer production incidents, GitHub Actions gates, Action Sync for ~200 staff built in a team of three; Sharpmind ~70% of routine tasks automated, 2–3 h → under 10 min; Xceedure 30,000+ records, 15% fewer reporting inaccuracies. Contract RAG result `88.2% correct on 5 held-out contracts`; Bug-Triage result `36 tests, 99% backend coverage`; Sola result `15 → 6 min per document`. Bug-Triage `github: "https://github.com/Muzzamil-Codes-dev/Bug-Triage"`. `cvHref` left unset. Dates exactly as AGENTS.md.
- [ ] **Step 2: Run `npx tsc --noEmit`.** Expected: errors only in components still importing removed exports (fixed in later tasks).
- [ ] **Step 3: Commit** `git commit -am "content: verified profile, experience and projects"`

### Task 3: Shared pieces — Navbar, Footer, SectionLabel, ThemeToggle

**Files:** Create `components/SectionLabel.tsx`; modify `components/Navbar.tsx`, `components/Footer.tsx`, `components/ThemeToggle.tsx`

**Interfaces:**
- Consumes: `navLinks`, `socials`, `profile` from Task 2.
- Produces: `SectionLabel({ children, right?: ReactNode })` (red square + mono label, hairline rule, optional right-aligned text); `Navbar()`; `Footer()`; `ThemeToggle()` (renders a same-size placeholder until mounted to avoid hydration mismatch).

- [ ] **Step 1:** Navbar: sticky, `bg/80` backdrop blur, wordmark "Muzzamil Rasully" with red dot, links, ThemeToggle, `btn-primary` "Get in touch ↗" (`mailto:`). Under `md` a menu button toggles a dropdown panel; Escape and link click close it.
- [ ] **Step 2:** Footer: name, `© {new Date().getFullYear()}`, GitHub/LinkedIn/email icons with `aria-label`s.
- [ ] **Step 3: Run `npx tsc --noEmit`** for these files. Expected: no errors from them.
- [ ] **Step 4: Commit** `git commit -am "feat: navbar, footer, section label"`

### Task 4: Hero + PipelineVisual

**Files:** Modify `components/Hero.tsx`; create `components/PipelineVisual.tsx`

**Interfaces:**
- Consumes: `profile`, `socials`; `.btn-primary`, `.btn-ghost`.
- Produces: `Hero()`, `PipelineVisual()`.

- [ ] **Step 1: Hero.** Two-column grid at `lg`, stacked below. Left: mono label `AI ENGINEER · BACKEND & FULL STACK · LONDON`; `h1` in `font-display uppercase` with `headline[0]` in ink and `headline[1]` in accent, sized `clamp(3rem, 9vw, 7.5rem)` with `break-words`; `intro`; buttons "See my work" (`#work`) and "Download CV" only when `profile.cvHref`; GitHub/LinkedIn icons.
- [ ] **Step 2: PipelineVisual.** Inline SVG, `viewBox` fixed, `w-full h-auto`, colours via `currentColor`/token classes only. Nodes in order: `POST /ask` → `Hybrid retrieval (dense + BM25)` → `Generate (strict JSON schema)` → `Validate quotes & numbers` → branch to `Answer + citations` and `Abstain`. Red accent panel behind it, mono caption "contract-rag / request path". Edges animate `pathLength` 0→1 once with motion; skipped under `useReducedMotion()`.
- [ ] **Step 3: Run `npm run build`.** Expected: PASS.
- [ ] **Step 4: Commit** `git commit -am "feat: hero with RAG pipeline visual"`

### Task 5: About, Capabilities, FeaturedWork, Experience, Stack, Contact

**Files:** Modify `components/About.tsx`, `components/ProjectCard.tsx`, `components/Experience.tsx`, `components/Contact.tsx`, `components/FeaturedProjects.tsx` → rename to `components/FeaturedWork.tsx`; create `components/Capabilities.tsx`, `components/Stack.tsx`; delete `QuickScan.tsx`, `FocusCard.tsx`, `MoreProjects.tsx`, `Skills.tsx`, `TechStack.tsx`. Modify `app/page.tsx`.

**Interfaces:**
- Consumes: all Task 2 exports; `SectionLabel`, `Reveal({children, className?, delay?, y?})`.
- Produces: `About()`, `Capabilities()`, `FeaturedWork()` (section `id="work"`), `ProjectCard({ project, index }: { project: Project; index: number })`, `Experience()` (`id="experience"`), `Stack()` (`id="stack"`), `Contact()` (`id="contact"`).

- [ ] **Step 1:** About: label "About", display headline (two-tone), `profile.about`, 2×2 tile grid.
- [ ] **Step 2:** Capabilities: label "What I build", 4 columns at `lg` (2 at `md`, 1 below), big mono `n`, title, body, tool chips.
- [ ] **Step 3:** ProjectCard: dark panel (`bg-ink text-bg`, inverted in dark mode to `bg-surface`) showing index `0N`, title and `result` in mono; below: summary, tech chips, "Case study →" (`/projects/{slug}`), GitHub link only if `project.github`, `badge` chip if set. FeaturedWork: 3-up grid at `lg`.
- [ ] **Step 4:** Experience: timeline with dates in mono on the left (above on mobile), role · company, bullets; `education` line at the end.
- [ ] **Step 5:** Stack: grouped grid of names with `react-icons/si` icons where one exists, text-only otherwise.
- [ ] **Step 6:** Contact: display headline "LET'S TALK." with red full stop, one plain sentence, large mailto email, LinkedIn and GitHub links. No hiring or availability copy.
- [ ] **Step 7:** `app/page.tsx`: `Navbar, Hero, About, Capabilities, FeaturedWork, Experience, Stack, Contact, Footer`, sections separated by hairline borders.
- [ ] **Step 8: Run `npm run check && npm run build`.** Expected: check PASS except case-study strings (fixed in Task 6); build PASS.
- [ ] **Step 9: Commit** `git add -A && git commit -m "feat: editorial home sections"`

### Task 6: Case study content

**Files:** Modify `lib/caseStudies.ts`

**Interfaces — Produces:**
```ts
export type CaseStudy = { slug: string; title: string; tagline: string; badge?: "Private repo" | "Client work"; github?: string;
  problem: string; architecture: string[]; decisions: { title: string; body: string }[];
  results: { label: string; value: string; context: string }[]; stack: string[] };
export const caseStudies: Record<string, CaseStudy>;
export const caseStudySlugs: string[]; // = featuredProjects slugs
```

- [ ] **Step 1: Invoke no-ai-slop**, then write the three studies from spec §5 and the RAG-AJW README facts (routing by number of contract IDs, clause-level IDs, bge-base + BM25 min-max fusion, enum-constrained citations, 6 validation checks, one retry then abstain, SQL portfolio register; test results 45/51, citation precision 1.000, Recall@5 0.935; dev 77/90). Bug-Triage combines public and private versions per AGENTS.md; no authentication claim. Sola: client work, no industry or queue technology named.
- [ ] **Step 2: Run `npm run check`.** Expected: PASS.
- [ ] **Step 3: Commit** `git commit -am "content: case studies"`

### Task 7: Case study page

**Files:** Modify `app/projects/[slug]/page.tsx`

**Interfaces:** Consumes `CaseStudy`, `caseStudies`, `caseStudySlugs`, `Navbar`, `Footer`, `SectionLabel`.

- [ ] **Step 1:** Keep `dynamicParams = false`, `generateStaticParams`, `generateMetadata` (title `{title} — Muzzamil Rasully`), `notFound()` for unknown slugs. Layout: back link, display title, tagline, badge; results as mono stat row with context under each value; sections Problem, Architecture (numbered list), Key decisions, Stack; GitHub button only if `github`.
- [ ] **Step 2: Run `npm run check && npm run lint && npm run build`.** Expected: all PASS; build lists 3 `/projects/*` static pages.
- [ ] **Step 3: Commit** `git commit -am "feat: restyled case study pages"`

### Task 8: Browser verification

- [ ] **Step 1:** Start `npm run dev` via `preview_start` (add `.claude/launch.json`, port 3000).
- [ ] **Step 2:** At desktop and 375px, light and dark: screenshot `/` and each `/projects/*`; run `document.documentElement.scrollWidth <= innerWidth` (expect `true`, also at 320px); reload in dark mode and confirm no console errors.
- [ ] **Step 3:** Click every nav anchor and the theme toggle; confirm `/projects/nope` shows 404; confirm all external links point to the Global Constraints URLs.
- [ ] **Step 4:** Fix any issue, re-run `npm run check && npm run build`, commit `git commit -am "fix: verification pass"`.
