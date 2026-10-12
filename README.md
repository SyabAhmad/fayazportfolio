# Sayyad Fayaz Ahmad Shah — Portfolio

Personal portfolio and blog for **Sayyad Fayaz Ahmad Shah**, Chemistry Researcher
& Quality Control Analyst. Built to present research experience to academic
supervisors, pharmaceutical employers and international collaborators.

Live site: [sayyadfayaz.vercel.app](https://sayyadfayaz.vercel.app)

## Stack

- **Vite 7** + **React 19** (SWC transform)
- **React Router 7** — `/`, `/blog`, `/blog/:slug`
- **Tailwind CSS v4** — configured entirely through `@theme` in `src/index.css`,
  no `tailwind.config.js`
- `react-icons` for iconography
- Deployed on **Vercel** — `vercel.json` and `public/_redirects` both rewrite all
  paths to `index.html`, so blog deep links resolve without extra config

## Design system

**Editorial / scientific paper.** Warm paper background, Source Serif 4 for
display and body copy, Inter for UI, a single oxblood accent, square corners and
hairline rules. No glows, no film grain, no rounded pills.

Tokens are **semantic**, not ramp-based, and live in the `@theme` block of
`src/index.css`:

| Token | Role |
| --- | --- |
| `--color-page` / `--color-surface` | Backgrounds |
| `--color-fg` / `--color-fg-soft` / `--color-fg-faint` | Text, strongest to lightest |
| `--color-rule` / `--color-rule-soft` | Hairlines |
| `--color-accent` | The single accent colour |
| `--color-on-accent` | Text sitting on an accent fill |

### Themes

Light above is the default. The header toggle switches to a **technical
monograph** theme — flat near-black, Inter display, mono-forward, brass accent —
by redefining the same token names under `:root[data-theme="dark"]`. No component
knows which theme is active, and there are no `dark:` variants anywhere.

Light is the default and is **not** overridden by the OS colour-scheme
preference; only an explicit stored choice in `localStorage` changes it. A
blocking script in `index.html` applies it before first paint, so there is no
flash of the wrong theme.

### Adding a colour

Define it in **both** `@theme` (light) and the dark block. Never reach for a
`dark:` variant in a component.

> **Token gotcha:** Tailwind v4 silently drops utilities for names that are not in
> `@theme` — the build still passes with exit code 0. If a class stops having any
> effect, check the token exists first.

## Pages

| Route | Contents |
| --- | --- |
| `/` | Hero, Experience, Skills, Education, Publications & Writing, Contact |
| `/blog` | All articles, most recent first, lead story highlighted |
| `/blog/:slug` | Article: byline, body, tags, author box, related reading |

## Writing

Articles live in `src/data/blogPosts.json`. Each post carries `slug`, `title`,
`kicker`, `excerpt`, `date`, `readingTime`, `tags` and a `body` array of blocks:

```json
{ "type": "p",  "text": "..." }
{ "type": "h2", "text": "..." }
{ "type": "ul", "items": ["...", "..."] }
{ "type": "ol", "items": ["...", "..."] }
{ "type": "quote", "text": "...", "cite": "..." }
```

Author details are read from `contactData.json` and rendered automatically, so
changing the name, bio or email updates every byline and author box at once.

**After publishing, add the URL to `public/sitemap.xml`.**

## Content

All other copy lives in `src/data/*.json` — hero, experience, skills, education,
publications and contact. **Edit JSON, not components.**

## Assets

- `public/PP.jpg` — source photograph
- `public/dp.png` — 256×256 avatar (apple-touch icon, JSON-LD, bylines)
- `public/og.jpg` — 1200×630 social share card
- `public/favicon.svg` — browser-tab monogram

Regenerate the derived images after changing the photo:

```powershell
.\scripts\gen-assets.ps1
```

Requires Windows PowerShell (uses `System.Drawing`). The OG card is JPEG q90
because it carries no transparency and that keeps it near 75 KB.

## Scripts

```bash
npm run dev       # dev server
npm run build     # production build
npm run preview   # serve the build locally
npm run lint      # eslint
```

## SEO

`index.html` carries a canonical URL, Open Graph and Twitter cards with absolute
image URLs, `theme-color`, and JSON-LD `Person` schema. `public/sitemap.xml`
lists the home page, the blog index and every article; `public/robots.txt`
points at it.

> Articles are client-rendered, so crawlers that do not execute JavaScript will
> only see the index page. Moving to pre-rendered pages is the next step if
> organic search on the blog matters.