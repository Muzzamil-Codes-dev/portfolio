# Learning Guide — Reverse-Engineering This Portfolio

A guided tour of your own portfolio site, written so you can **learn modern web
development by reading the code you already own**. It starts from the big picture,
then explains every concept the project uses, points at the exact files, and ends
with recipes and exercises.

> Read it top to bottom once, then keep it open beside the code and jump to the
> section for whatever file you're looking at.

---

## Table of contents

1. [How to use this guide](#1-how-to-use-this-guide)
2. [The 60-second mental model](#2-the-60-second-mental-model)
3. [The languages involved](#3-the-languages-involved)
4. [The toolchain: what each tool does](#4-the-toolchain-what-each-tool-does)
5. [Running the project](#5-running-the-project)
6. [The file map](#6-the-file-map)
7. [Concept 1 — Components & JSX](#7-concept-1--components--jsx)
8. [Concept 2 — Server vs Client Components](#8-concept-2--server-vs-client-components)
9. [Concept 3 — The App Router & rendering flow](#9-concept-3--the-app-router--rendering-flow)
10. [Concept 4 — Data-driven UI + TypeScript](#10-concept-4--data-driven-ui--typescript)
11. [Concept 5 — Styling: Tailwind & the theme system](#11-concept-5--styling-tailwind--the-theme-system)
12. [Concept 6 — Fonts](#12-concept-6--fonts)
13. [Concept 7 — Dark / light mode](#13-concept-7--dark--light-mode)
14. [Concept 8 — Animations](#14-concept-8--animations)
15. [Concept 9 — Reusable components](#15-concept-9--reusable-components)
16. [Concept 10 — Dynamic routes & static generation](#16-concept-10--dynamic-routes--static-generation)
17. [Concept 11 — Metadata, SEO & accessibility](#17-concept-11--metadata-seo--accessibility)
18. [Trace a page load end-to-end](#18-trace-a-page-load-end-to-end)
19. [Recipes: how to change things](#19-recipes-how-to-change-things)
20. [Gotchas & real lessons from building this](#20-gotchas--real-lessons-from-building-this)
21. [Glossary](#21-glossary)
22. [A learning path + exercises](#22-a-learning-path--exercises)
23. [Further reading](#23-further-reading)

---

## 1. How to use this guide

- **Beginner?** Read sections 2–6 slowly, then do the section-22 exercises in order.
  Don't try to memorise — change something, save, watch the browser update.
- **Know some JS already?** Skim 2–6, then focus on concepts 2, 3, 5, and 10 —
  those are the parts that are specific to Next.js and Tailwind.
- **The golden loop:** run `npm run dev`, open the site, change one line, save, see
  it update. Repeat. You learn far faster by editing than by reading.

---

## 2. The 60-second mental model

This is a **statically-generated website** built with **Next.js**. In plain terms:

- You write **components** (reusable chunks of UI) in **TypeScript + JSX**.
- All your *content* (projects, skills, experience) lives in plain arrays in
  `lib/`, separate from the UI that displays it.
- **Tailwind CSS** gives you styling by adding class names like `text-muted` or
  `rounded-2xl` instead of writing separate CSS files.
- When you run `npm run build`, Next.js turns everything into plain **HTML, CSS,
  and JavaScript files** that any web host can serve. Pages are pre-built ahead
  of time, so they load fast and are great for SEO.

The whole site is essentially: **data (lib/) → components (components/) →
pages (app/) → HTML the browser shows.**

```
lib/data.ts  ──►  <ProjectCard/>  ──►  <FeaturedProjects/>  ──►  app/page.tsx  ──►  HTML
 (content)         (one card)          (a section)             (the page)
```

---

## 3. The languages involved

You'll see five "languages" in this repo. Here's what each is for:

| Language | What it is | Where you see it |
|---|---|---|
| **HTML** | The structure of a page (headings, lists, links). | Hidden inside JSX — tags like `<h1>`, `<ul>`, `<a>`. |
| **CSS** | How things look (colour, spacing, layout). | Mostly via Tailwind class names; raw CSS in `app/globals.css`. |
| **JavaScript (JS)** | The programming language of the web — logic, loops, functions. | Under everything; `.js` config files. |
| **TypeScript (TS)** | JavaScript **plus types** that catch mistakes before you run the code. | Every `.ts` / `.tsx` file. |
| **JSX** | A syntax that lets you write HTML-like tags *inside* JavaScript. | Every `.tsx` file (the "x" = JSX). |

**Key idea:** `.tsx` = TypeScript + JSX. It's how React lets you describe UI
("what the screen should look like") using code.

A tiny example that shows all of them at once:

```tsx
// TypeScript type — describes the shape of the data
type Props = { name: string };

// A component: a function that returns JSX (HTML-like) using a JS value
function Hello({ name }: Props) {
  return <h1 className="text-2xl font-bold">Hello, {name}</h1>;
  //         ^HTML tag   ^CSS via Tailwind      ^JS value in {}
}
```

---

## 4. The toolchain: what each tool does

When you open the project you'll see config files. Don't be intimidated — each
tool does one job:

| File | Tool | Job |
|---|---|---|
| `package.json` | **npm** | Lists your dependencies and the `dev`/`build` commands. |
| `node_modules/` | npm | Where downloaded libraries live (never edit; it's git-ignored). |
| `next.config.mjs` | **Next.js** | The framework that does routing, building, and rendering. |
| `tsconfig.json` | **TypeScript** | Tells the type-checker how to read your code (incl. the `@/` import alias). |
| `tailwind.config.ts` | **Tailwind CSS** | Defines your colours, fonts, and where to scan for class names. |
| `postcss.config.mjs` | **PostCSS** | The plumbing that runs Tailwind + autoprefixer over your CSS. |
| `.gitignore` | **Git** | Lists files that should NOT be committed (node_modules, .next, .env). |

**Dependencies in this project** (see `package.json`):

- `next`, `react`, `react-dom` — the framework + UI library.
- `tailwindcss`, `postcss`, `autoprefixer` — styling.
- `motion` — animations (the scroll fade-ins).
- `next-themes` — the dark/light toggle.
- `lucide-react` — clean line icons (UI icons like the moon/sun).
- `react-icons` — brand/tech logos (Python, PyTorch, …).
- `typescript`, `@types/*` — the type system.

---

## 5. Running the project

From the `portfolio/` folder, in a terminal:

```bash
npm install          # one-time: download dependencies into node_modules/
npm run dev          # start a live dev server (auto-reloads on save)
npm run build        # produce the optimised production build
npm run start        # serve the production build locally
```

- `npm run dev` → open the URL it prints (usually `http://localhost:3000`).
  Editing a file and saving updates the browser instantly (this is **HMR**, Hot
  Module Replacement).
- `npm run build` → type-checks, lints, and pre-renders every page. If this
  passes, your code is healthy.

> ⚠️ **Don't run `npm run build` while `npm run dev` is running** in the same
> folder — they share the `.next/` cache and will corrupt each other (see
> [Gotchas](#20-gotchas--real-lessons-from-building-this)).

---

## 6. The file map

```
portfolio/
├── app/                      # ROUTES live here (App Router)
│   ├── layout.tsx            # the shell wrapped around every page (fonts, <html>, theme)
│   ├── page.tsx              # the homepage ("/") — just lists the sections in order
│   ├── globals.css           # theme variables + reusable Tailwind component classes
│   └── projects/
│       └── [slug]/
│           └── page.tsx      # ONE template that renders every case-study page
│
├── components/               # REUSABLE UI pieces (no routing here)
│   ├── Navbar.tsx            # sticky top nav + mobile menu + theme toggle
│   ├── Hero.tsx              # the headline area at the top
│   ├── FocusCard.tsx         # the code-snippet card in the hero
│   ├── QuickScan.tsx         # the "recruiter snapshot" card
│   ├── FeaturedProjects.tsx  # section: the top 3 projects
│   ├── MoreProjects.tsx      # section: the other projects
│   ├── ProjectCard.tsx       # ONE project card (used by both sections)
│   ├── TechStack.tsx         # the horizontal tech strip
│   ├── Skills.tsx            # tiered skills (Strong / Used / Familiar)
│   ├── Experience.tsx        # the work-history timeline
│   ├── About.tsx             # about text + 3 cards
│   ├── Contact.tsx           # contact links
│   ├── Footer.tsx            # the footer
│   ├── Reveal.tsx            # wrapper that fades children in on scroll
│   ├── ThemeProvider.tsx     # enables dark/light theming app-wide
│   └── ThemeToggle.tsx       # the sun/moon button
│
├── lib/                      # DATA + content (no UI here)
│   ├── data.ts               # nav, projects, skills, experience, etc.
│   └── caseStudies.ts        # long-form content for the case-study pages
│
├── public/                   # static files served as-is (put cv.pdf here)
├── package.json … tailwind.config.ts   # config (section 4)
```

**The single most important habit to notice:** *content* (in `lib/`) is kept
separate from *presentation* (in `components/`), and *pages* (in `app/`) just
arrange components. This separation is why the site is easy to edit.

---

## 7. Concept 1 — Components & JSX

A **component** is a function that returns UI. That's it. Look at
`components/Footer.tsx` — it's a function named `Footer` that returns some JSX,
and other files use it by writing `<Footer />`.

Rules you'll see throughout:

- Components are **PascalCase** (`ProjectCard`, not `projectCard`).
- They return **one** top-level element (often wrapped in `<>...</>`, a
  "fragment", when you don't want an extra `<div>`).
- HTML attributes are camelCase and slightly renamed: `class` → `className`,
  `for` → `htmlFor`.
- `{ }` drops a JavaScript value into JSX: `{project.title}`.
- **Props** are the inputs to a component, passed like HTML attributes:
  `<ProjectCard project={p} featured />`.

Rendering a list — the **`.map()`** pattern — is everywhere. From
`components/FeaturedProjects.tsx`:

```tsx
{featuredProjects.map((project, i) => (
  <Reveal key={project.slug} delay={(i % 3) * 0.06}>
    <ProjectCard project={project} featured />
  </Reveal>
))}
```

`.map()` turns an **array of data** into an **array of components**. The `key`
prop (a unique string) helps React track each item efficiently — always provide
one when mapping.

---

## 8. Concept 2 — Server vs Client Components

This is the #1 thing that's new in modern Next.js. Every component is one of two
kinds:

- **Server Component (default):** runs only when the page is built/served. It
  produces HTML. It **cannot** use browser features (clicks, `useState`,
  `window`). Most of this site is server components — they're lighter and faster.
- **Client Component:** runs in the browser too, so it can be interactive. You
  opt in by putting `"use client";` as the very first line of the file.

In this project, only the pieces that *need* interactivity are client components:

| Client (`"use client"`) | Why |
|---|---|
| `Navbar.tsx` | tracks scroll position + opens a mobile menu (`useState`, `useEffect`) |
| `ThemeToggle.tsx` | reacts to a click and reads the current theme |
| `ThemeProvider.tsx` | wraps the app in theme context |
| `Reveal.tsx` | runs the scroll animation in the browser |

Everything else (`Hero`, `ProjectCard`, `Skills`, the case-study page…) is a
**server component**. Notice they can still *use* client components — e.g.
`Hero` (server) renders `<Reveal>` (client). The rule is one-directional: server
can include client, and you mark the leaf that needs the browser.

> Mental test: "Does this need a click, hover state, timer, or `window`?" If yes →
> client. If it's just displaying data → server.

---

## 9. Concept 3 — The App Router & rendering flow

Next.js uses **file-based routing**: the folder structure under `app/` *is* the
URL structure.

| File | URL |
|---|---|
| `app/page.tsx` | `/` (homepage) |
| `app/projects/[slug]/page.tsx` | `/projects/anything` (the `[slug]` is a variable) |

Two special files:

- **`app/layout.tsx`** is the shell wrapped around *every* page. It defines the
  `<html>` and `<body>`, loads fonts, sets `<head>` metadata, and wraps children
  in the `ThemeProvider`. Open it and notice `{children}` — that's where each
  page gets injected.
- **`app/page.tsx`** is the homepage. It's beautifully boring on purpose — it
  just lists the sections in order:

```tsx
<main>
  <Hero />
  <QuickScan />
  <FeaturedProjects />
  <TechStack />
  <Skills />
  <Experience />
  <MoreProjects />
  <About />
  <Contact />
</main>
```

Want to reorder the page? Reorder these lines. That's the whole homepage.

---

## 10. Concept 4 — Data-driven UI + TypeScript

Open `lib/data.ts`. There's almost no UI here — just **arrays of objects**. The
components read these arrays and render them. This is the pattern that makes the
site maintainable: to add a project you edit data, not JSX.

TypeScript **types** describe the shape of that data. Example from `lib/data.ts`:

```ts
export type Highlight = { label?: string; text: string };

export type Project = {
  slug: string;          // required string
  title: string;
  summary: string;
  highlights: Highlight[];   // an array of Highlight objects
  tech: string[];            // an array of strings
  icon: LucideIcon;
  github?: string;           // the "?" means OPTIONAL
  caseStudy?: boolean;
  privateRepo?: boolean;
};
```

Why this matters:

- The `?` marks optional fields. `github?: string` means a project may or may not
  have a repo link — and the card code checks for it before showing a button.
- If you mistype a field (e.g. `tite` instead of `title`), TypeScript flags it
  **before** you ever load the page. That's the whole point of types: catch
  mistakes early.
- `export` makes the value usable in other files via `import`.

The `@/` you see in imports (e.g. `import { projects } from "@/lib/data"`) is an
**alias for the project root**, configured in `tsconfig.json`. It saves you from
writing `../../lib/data`.

---

## 11. Concept 5 — Styling: Tailwind & the theme system

### Tailwind in one paragraph
Instead of writing CSS in a separate file, you add small utility classes directly
on elements. `className="mt-4 flex gap-2 rounded-xl"` means *margin-top, use
flexbox, gap between children, rounded corners*. It feels verbose at first but
you stop switching files and you never invent CSS class names.

### The theme (the clever part)
The beige/brown palette and dark mode are powered by **CSS variables**. Open
`app/globals.css`:

```css
:root {            /* light mode */
  --bg: 246 240 231;       /* note: raw R G B numbers, not #hex */
  --accent: 91 70 54;
}
.dark {            /* dark mode — same variable names, different values */
  --bg: 23 19 15;
  --accent: 214 185 140;
}
```

Then `tailwind.config.ts` maps those variables to colour names:

```ts
colors: {
  bg: "rgb(var(--bg) / <alpha-value>)",
  accent: "rgb(var(--accent) / <alpha-value>)",
}
```

Now `bg-bg`, `text-accent`, `border-accent/40` all work **and automatically swap
in dark mode**, because they read the variables. Switching `.dark` on the
`<html>` element re-points every variable at once.

> **Why raw `R G B` numbers instead of `#hex`?** So Tailwind's opacity syntax
> works. `bg-accent/40` compiles to `rgb(var(--accent) / 0.4)`. That only works
> if the variable holds the channels (`91 70 54`), not a hex string. This is a
> real trick worth remembering.

### Reusable class bundles
At the bottom of `globals.css`, `@layer components { ... }` defines shortcuts like
`.card`, `.chip`, `.btn-primary`. Instead of repeating ten utilities on every
card, components just write `className="card"`. Look how `.btn-primary` is built
from `.btn`:

```css
.btn-primary { @apply btn bg-accent text-bg shadow-soft hover:opacity-95; }
```

`@apply` pastes other Tailwind utilities into a custom class.

---

## 12. Concept 6 — Fonts

`app/layout.tsx` loads two Google fonts through Next's `next/font` helper:

```ts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
```

`next/font` downloads and self-hosts the fonts at build time (faster, no layout
shift, privacy-friendly). It exposes them as CSS variables, which
`tailwind.config.ts` wires to `font-sans` (Inter, body) and `font-display`
(Playfair, headings). That's why every heading uses `font-display`.

---

## 13. Concept 7 — Dark / light mode

Three files cooperate:

1. **`ThemeProvider.tsx`** (client) wraps the app with `next-themes`, configured
   with `attribute="class"` — meaning it toggles `class="dark"` on `<html>`.
2. **`globals.css`** defines the `.dark` variable overrides (section 11).
3. **`ThemeToggle.tsx`** (client) is the button. Study its **`mounted`** pattern:

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);   // runs only in the browser, after load
// ...render the real icon only when `mounted`, else a placeholder
```

Why? The server doesn't know whether the visitor prefers dark mode, so if we
rendered the sun/moon immediately the server's guess could mismatch the browser
("hydration mismatch" warning). Waiting for `mounted` avoids that. This pattern
appears any time a component depends on something only the browser knows.

`useState` (remember a value) and `useEffect` (run code after render) are the two
React **hooks** you'll use most.

---

## 14. Concept 8 — Animations

Open `components/Reveal.tsx`. It's a tiny but powerful reusable wrapper:

```tsx
"use client";
import { motion } from "motion/react";

export function Reveal({ children, delay = 0, y = 24 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}                 // start: invisible, nudged down
      whileInView={{ opacity: 1, y: 0 }}          // animate to this when scrolled into view
      viewport={{ once: true, margin: "-80px" }}  // trigger once, slightly early
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
```

`motion.div` is a normal `<div>` that can animate. `whileInView` runs the
animation when the element scrolls into view. Because `Reveal` wraps *children*,
any section can fade in by writing `<Reveal>...</Reveal>` — that's **composition**
(building behaviour by nesting components).

---

## 15. Concept 9 — Reusable components

`components/ProjectCard.tsx` renders **one** project card and is used by both the
featured section and the "more" section. It takes a `featured` prop to change
size:

```tsx
export function ProjectCard({ project, featured = false }: {
  project: Project; featured?: boolean;
}) {
  return (
    <article className={`card card-hover flex h-full flex-col ${featured ? "p-6" : "p-5"}`}>
      ...
    </article>
  );
}
```

Notice the **conditional rendering** patterns inside it — this is everyday React:

```tsx
{project.caseStudy && <Link …>Case Study</Link>}     // show only if caseStudy is true
{showGithub ? <a…>GitHub</a> : null}                  // if/else with the ternary ? :
{project.label && <span>{project.label}:</span>}      // skip falsy values
```

`&&` means "render the right side only if the left is true". The ternary
`condition ? a : b` chooses between two outputs. Master these two and you can
express almost any UI logic.

One component, two looks, fed by data — that's the reuse that keeps the codebase
small.

---

## 16. Concept 10 — Dynamic routes & static generation

The case-study pages are the most advanced part. There's **one** file —
`app/projects/[slug]/page.tsx` — that produces **five** pages
(`/projects/finsight-ai`, `/projects/telco-churn`, …). The `[slug]` folder name
makes `slug` a variable.

Three pieces make it work:

```ts
export const dynamicParams = false;          // any slug not listed below → 404

export function generateStaticParams() {     // tell Next which pages to pre-build
  return caseStudySlugs.map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;             // read the slug from the URL
  const study = caseStudies[slug];           // look up its content
  if (!study) notFound();                    // safety: show 404 if missing
  // ...render `study`
}
```

- **`generateStaticParams`** lists every slug, so Next pre-renders all five pages
  at build time (this is **SSG** — Static Site Generation). You saw this in the
  build output: `● /projects/[slug]` with the five paths underneath.
- **`params` is awaited** because in Next 15 route params arrive asynchronously.
- The content comes from `lib/caseStudies.ts` — again, **data separate from UI**.

This is the same pattern blogs use for posts, shops use for products, etc. Learn
it once, reuse it forever.

---

## 17. Concept 11 — Metadata, SEO & accessibility

- **Metadata:** `app/layout.tsx` exports a `metadata` object (title, description)
  for the homepage, and the case-study page exports `generateMetadata()` to make a
  *per-page* title like “FinSight AI — Case Study”. Good titles/descriptions are
  how Google and link previews describe your page.
- **Semantic HTML:** the code uses real tags — `<header>`, `<main>`, `<section>`,
  `<article>`, `<nav>`, `<dl>/<dt>/<dd>` (description lists in the snapshot and
  "At a glance" box). Screen readers and search engines understand these.
- **Accessibility touches:** `aria-label` on icon-only buttons (the theme toggle,
  the mobile menu), `aria-hidden` on decorative graphics, and `alt`-style labels.
  These make the site usable with a keyboard and screen reader.

---

## 18. Trace a page load end-to-end

Putting it all together — what happens when someone visits `/`:

1. The browser requests `/`. Next.js serves pre-built HTML (fast).
2. `app/layout.tsx` provides the `<html>/<body>`, the fonts, and the
   `ThemeProvider`.
3. `app/page.tsx` is the page content — it renders the section components in order.
4. Each section (e.g. `FeaturedProjects`) imports data from `lib/data.ts` and
   `.map()`s it into `ProjectCard`s.
5. Tailwind classes (resolved at build time from `globals.css` + the config)
   style everything; CSS variables decide light/dark.
6. A little JavaScript "hydrates" the **client** components so the nav, theme
   toggle, and scroll animations become interactive.

Now `/projects/finsight-ai`:

1. That HTML was pre-built at `npm run build` time via `generateStaticParams`.
2. `app/projects/[slug]/page.tsx` looked up `caseStudies["finsight-ai"]` and
   rendered the "At a glance" box, visuals, and sections.

---

## 19. Recipes: how to change things

**Add or edit a project** → edit `lib/data.ts`. Add an object to
`featuredProjects` or `moreProjects`:

```ts
{
  slug: "my-new-project",
  title: "My New Project",
  summary: "One clear sentence.",
  highlights: [{ label: "Built", text: "the thing" }, { label: "Result", text: "0.91 F1" }],
  tech: ["Python", "PyTorch"],
  icon: BrainCircuit,                  // import it at the top from lucide-react
  github: "https://github.com/...",    // omit for no button
  caseStudy: true,                     // only if you also add a case study (below)
}
```

**Add a case study page** → add an entry to `lib/caseStudies.ts` whose key
matches the project `slug`. The page builds itself. (Set `caseStudy: true` on the
project so the card links to it.)

**Change a colour / the whole theme** → edit the `--variables` in
`app/globals.css` (`:root` for light, `.dark` for dark). Everything updates.

**Reorder / add a homepage section** → edit the list in `app/page.tsx`.

**Change wording** → almost all copy is in `lib/data.ts`, `lib/caseStudies.ts`,
or directly in the relevant component (`Hero.tsx`, `About.tsx`).

**Add your CV** → drop a `cv.pdf` into `public/`. The "Download CV" buttons point
at `/cv.pdf`.

**Add a new icon** → import it from `lucide-react` (UI icons) or
`react-icons/si` (tech logos) at the top of the file. ⚠️ Only import names that
actually exist, or the build fails (see Gotchas).

---

## 20. Gotchas & real lessons from building this

These are real issues hit while building — worth knowing:

1. **Tailwind opacity needs RGB-channel variables.** `bg-bg/80` only works
   because `--bg` holds `246 240 231`, not `#F6F0E7`. If you switch a theme
   variable to hex, opacity utilities silently break.
2. **Never run `next build` while `next dev` is running** in the same folder. They
   fight over the `.next/` cache and you get weird 500 errors like *"Cannot find
   module './vendor-chunks/…'"*. Fix: stop dev, delete `.next/`, restart.
3. **Server vs client.** Using `useState`, `onClick`, or `window` in a file
   without `"use client"` at the top throws an error. Add the directive or move
   the interactive bit into its own client component.
4. **Icon imports must exist.** Importing a non-existent icon (e.g. a wrong
   `react-icons` name) fails the build. When unsure, use a `lucide-react` icon you
   know exists.
5. **`key` when mapping.** Forgetting `key={…}` in a `.map()` produces a console
   warning and can cause subtle update bugs.
6. **Next 15 `params` is async.** In dynamic routes you must `await params`.

---

## 21. Glossary

- **Component** — a function returning UI; reused like an HTML tag.
- **Props** — inputs passed to a component.
- **JSX/TSX** — HTML-like syntax inside JS/TS.
- **Hook** — a `use…` function (`useState`, `useEffect`) that adds React features
  to a component.
- **State** — data a component remembers between renders (`useState`).
- **Server Component** — renders to HTML on the server; the default.
- **Client Component** — runs in the browser; opt in with `"use client"`.
- **Hydration** — the browser "wiring up" pre-rendered HTML so it becomes
  interactive.
- **SSG (Static Site Generation)** — pages pre-built at build time.
- **Route** — a URL, defined by a file under `app/`.
- **Dynamic route** — a route with a variable segment like `[slug]`.
- **Utility class** — a single-purpose Tailwind class (`mt-4`, `flex`).
- **CSS variable** — a `--name` value reused across CSS; here it powers theming.
- **Dependency** — an external library listed in `package.json`.
- **HMR** — Hot Module Replacement; the dev server live-updating on save.

---

## 22. A learning path + exercises

Do these in order, in the running dev server. Each builds on the last.

**Level 1 — Reading & tiny edits**
1. Change your hero subheading text in `components/Hero.tsx`. Save, watch it
   update.
2. In `lib/data.ts`, change a project's `summary`. See the card change.
3. Flip a theme colour in `app/globals.css` (e.g. make `--accent` more red in
   `:root`). Observe everything that uses the accent change.

**Level 2 — Data & lists**
4. Add a new skill to the "Strong" tier in `lib/data.ts` (`skillTiers`).
5. Add a brand-new project object to `moreProjects`. Make a card appear with no
   new UI code. (This proves you understand data-driven UI.)
6. Remove the `github` field from one project and watch the GitHub button
   disappear (conditional rendering).

**Level 3 — Components**
7. Read `components/ProjectCard.tsx` and add a new optional field to the `Project`
   type (e.g. `year?: string`), then render it on the card.
8. Create a brand-new section component `components/Testimonials.tsx` (copy the
   structure of `About.tsx`), feed it an array from `lib/data.ts`, and add it to
   `app/page.tsx`.

**Level 4 — Routing & interactivity**
9. Add a new case study: a `caseStudies` entry + set `caseStudy: true` on its
   project. Visit `/projects/your-slug`.
10. Read `ThemeToggle.tsx` until you can explain the `mounted` pattern in your own
    words. Then add a third theme value if you're feeling brave.

**Level 5 — Ship it**
11. Run `npm run build` (with dev stopped). Fix any type errors it reports.
12. Deploy to **Vercel** (free): push the repo to GitHub, import it on
    vercel.com, done. Your site goes live with a URL.

> Tip: after each change, if something breaks, read the **error message** — it
> usually names the file and line. Errors are how you learn fastest.

---

## 23. Further reading

- **Next.js App Router** — https://nextjs.org/docs/app (start with "Building Your
  Application → Routing").
- **React (the new docs are excellent)** — https://react.dev/learn
- **TypeScript for JS devs** — https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- **Tailwind CSS** — https://tailwindcss.com/docs/utility-first
- **Motion (animations)** — https://motion.dev/docs/react-quick-start
- **MDN (the web reference for HTML/CSS/JS)** — https://developer.mozilla.org/

---

*Built for learning. Edit it, break it, fix it — that's the job.*
