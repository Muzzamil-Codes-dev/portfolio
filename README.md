# Muzzamil Rasully — Portfolio

A minimal, premium personal portfolio for a **Data Analyst / Aspiring ML
Engineer**. Warm beige palette, day/night toggle, an "Analytics Snapshot"
dashboard card instead of a hero photo, and project cards wired to real GitHub
repositories.

## Stack
- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** (theme via CSS variables, `darkMode: "class"`)
- **Motion** (`motion/react`) for subtle scroll animations
- **next-themes** for the day/night toggle
- **lucide-react** + **react-icons** for icons

## Getting started
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project structure
```
app/
  layout.tsx          # fonts (Inter + Playfair), metadata, ThemeProvider
  page.tsx            # composes all sections
  globals.css         # palette CSS variables + component utility classes
components/
  Navbar.tsx          # sticky blur nav + mobile menu + theme toggle
  Hero.tsx            # intro + AnalyticsSnapshot
  AnalyticsSnapshot.tsx  # SVG dashboard card (no photo)
  TechStack.tsx       # tech strip
  About.tsx           # intro + 3 cards
  Experience.tsx      # timeline
  Projects.tsx        # project cards (GitHub-linked)
  Skills.tsx          # grouped pill badges
  Contact.tsx         # contact links
  Footer.tsx
  Reveal.tsx          # scroll fade-in wrapper (Motion)
  ThemeProvider.tsx   # next-themes wrapper
  ThemeToggle.tsx     # day/night button
lib/
  data.ts             # ALL editable content: nav, socials, projects, experience, skills
```

## Editing content
Everything lives in [`lib/data.ts`](lib/data.ts):
- **Projects** — title, description, tech, GitHub link, optional `demo`, and
  `isPrivate` (shows a "Private" badge instead of a dead link). Add a `demo`
  URL to a project and its **Live Demo** button appears automatically.
- **Experience**, **Skills**, **About cards**, **tech strip** — plain arrays.
- **Socials** — update `email` and `linkedin` (GitHub is already set).

## Customising the theme
Colours are CSS variables in [`app/globals.css`](app/globals.css) (`:root` for
light, `.dark` for night) and surfaced to Tailwind as `bg`, `surface`, `fg`,
`muted`, `accent`, `line`.

## To-do for you
- Add your CV at `public/cv.pdf` (the **Download CV** button points there).
- Update your LinkedIn URL and email in `lib/data.ts`.
