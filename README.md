# Matt Prior Watson — Film Colourist Portfolio

A minimalist, high-performance portfolio website built with [Astro](https://astro.build) and configured for deployment on [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/).

---

## 📁 Where to Change Information

All personal details, text, and settings are organized in specific files:

### 1. Global Site Settings & Socials
- **File:** `src/data/site.json`
  - `reelPoster`: Path to the homepage showreel thumbnail (e.g. `"/reel-poster.jpg"`).
  - `profileImage`: Path to portrait for the About page (e.g. `"/profile.jpg"`).
  - `profileAlt`: Accessible description for the portrait.
  - `cvUrl`: Path to your downloadable CV PDF (e.g. `"/cv.pdf"`) or an external link.
  - `socials`: List of social media links. Uses open-source [Simple Icons](https://simpleicons.org) CDN slugs for automatic vector icons (e.g., `"vimeo"`, `"instagram"`, `"imdb"`, `"linkedin"`, `"youtube"`).

- **File:** `src/consts.ts`
  - `SITE_TITLE`: Your name as it appears in the header and SEO title tag (`"Matt Prior Watson"`).
  - `SITE_DESCRIPTION`: Default description used in search engine results and social shares.

---

### 2. Homepage & Showreel
- **File:** `src/pages/index.astro`
  - Contains the showreel video embed:
    ```astro
    <VideoEmbed
      src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
      title="Showreel"
      poster={reelPoster}
    />
    ```
  - Supports YouTube embeds (`https://www.youtube.com/embed/...`) and Vimeo player embeds (`https://player.vimeo.com/video/...`).
  - Clicking the video smoothly replaces the poster thumbnail with the autoplaying iframe without layout shifts.

---

### 3. Projects & Credits (Film / Commercials / Music Videos)
Each project has its own Markdown file in `src/content/projects/`.

To add a new project, create a new file like `src/content/projects/my-project.md`:

```markdown
---
title: "Project Title"
description: "Brief summary of the project for search engines."
pubDate: "October 2024"
category: "Commercial" # e.g. Commercial, Feature Film, Music Video, Short Film
videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
heroImage: "/my-project/hero.jpg"
galleryImages:
  - "/my-project/still-1.jpg"
  - "/my-project/still-2.jpg"
  - "/my-project/still-3.jpg"
  - "/my-project/still-4.jpg"
  - "/my-project/still-5.jpg"
  - "/my-project/still-6.jpg"
credits:
  - role: "Director"
    name: "Director Name"
  - role: "Director of Photography"
    name: "DOP Name"
  - role: "Production Company"
    name: "Company Name"
awards:
  - "Winner - Best Cinematography, Festival 2024"
---

Write your project overview, color grade approach, LUT details, and narrative notes here.
```

- **Project Page Structure:**
  1. Category eyebrow & Title
  2. Main video player (with `heroImage` thumbnail facade)
  3. Bio / Overview text
  4. Credits list
  5. Awards list (if present)
  6. 2 or 3-column Stills Gallery with full-screen lightbox viewer

---

### 4. About Page
- **File:** `src/pages/about.astro`
  - Edit the bio paragraphs, color suites/software worked in (DaVinci Resolve, ACES, Baselight), and approach.
  - Automatically loads `profileImage` and `cvUrl` from `src/data/site.json`.

---

### 5. Contact Page
- **File:** `src/pages/contact.astro`
  - **Direct Inquiries:** Update `mailto:colorist@example.com`.
  - **Location & Timezone:** Update your base city and working availability.
  - **Representation:** Update agency name and agent booking email.
  - Social profile links are automatically generated from `site.json`.

---

## 🖼️ What Images to Upload (in `public/`)

All static media should be placed inside the `public/` folder so they are served directly at the root URL.

| Asset | File Path in `public/` | Recommended Dimensions | Ratio | Notes |
|---|---|---|---|---|
| **Showreel Poster** | `/public/reel-poster.jpg` | 1920 × 1080 px | 16:9 | High-res still shown on the homepage before playing the showreel. Also acts as default social share image. |
| **Profile Portrait** | `/public/profile.jpg` | 800 × 1000 px | 4:5 | Portrait photo for the About page. |
| **CV Document** | `/public/cv.pdf` | Standard A4 / Letter | N/A | Downloadable resume linked on the About page. |
| **Project Hero** | `/public/<project-name>/hero.jpg` | 1920 × 1080 px | 16:9 | Displayed on the `/credits` grid card and as the project's video player thumbnail. |
| **Project Stills** | `/public/<project-name>/still-1.jpg`, etc. | 1920 × 1080 px or native | 16:9 (or 2.39:1 scope) | Up to 6 stills per project. Displayed in the 2-3 column gallery; opens full-size in the lightbox. |
| **Favicon** | `/public/favicon.svg` | SVG vector | 1:1 | Browser tab icon. |

> **Tip:** Keep image file sizes optimised (under 500 KB per still, JPG or WebP) for fast page loading.

---

## 🧞 Available Commands

Run these from the project root in your terminal:

| Command | Action |
|---|---|
| `npm install` | Install all dependencies |
| `npm run dev` | Launch local development server (`http://localhost:4321`) |
| `npm run build` | Build production site into `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Deploy production site to Cloudflare Workers |
| `npm run cf-typegen` | Regenerate Cloudflare worker TypeScript types |

---

## ☁️ Deployment

This project uses `@astrojs/cloudflare` with static asset deployment on Cloudflare Workers.

To deploy changes to Cloudflare:
```bash
npm run build
npm run deploy
```
Make sure you are logged into Wrangler (`npx wrangler login`).
