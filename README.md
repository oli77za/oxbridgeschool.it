# Oxbridge School

A mobile-first, Italian-language static website for Oxbridge School in Guidonia,
built with Astro and plain CSS. No CMS, database, UI framework, or server runtime
is needed in production.

## Development

Use a Node version satisfying `package.json` (`>=22.23.4`) and Yarn.

```sh
yarn install
yarn astro dev --background
yarn astro dev status
yarn astro dev logs
yarn astro dev stop
```

The development server runs at `http://localhost:4321`.

```sh
yarn build
yarn preview
```

Pushes to `main` deploy the site to GitHub Pages through
`.github/workflows/deploy.yml`; the workflow can also be started manually.
In the repository's **Settings → Pages**, select **GitHub Actions** as the
deployment source and configure the `www.oxbridgeschool.it` custom domain and
its DNS records if the site should use that address. You can also deploy the
generated `dist/` directory to any other static host. Existing main Drupal
content URLs have static redirect pages pointing to the corresponding
sections. On a host supporting HTTP redirects, configure equivalent permanent
redirects for those routes; Astro's static output uses HTML redirects.

## Editing content

All editable copy lives in Markdown under `src/content/`. You do not need to
change Astro templates to update it.

| What to change | Where |
| --- | --- |
| Course cards and expanded descriptions | `src/content/courses/*.md` |
| Questions and answers | `src/content/faqs/*.md` |
| Language services | `src/content/services/*.md` |
| Homepage section headings and introductions | `src/content/sections/*.md` |
| Teaching method and its numbered points | `src/content/sections/metodo.md` |
| Contact details, navigation, button labels, SEO and shared copy | `src/content/site.md` |
| Privacy text | The body of `src/content/site.md` |

Each file starts with **frontmatter**: structured fields between two `---` lines.
The text below it is ordinary Markdown, supporting paragraphs, **bold**, *italic*,
links, and lists. For example, a course file looks like this:

```md
---
order: 1
icon: sun
category: PICCOLI PASSI, GRANDI SCOPERTE
title: Bambini e ragazzi
description: Una breve descrizione per la scheda del corso.
feature: Piccoli gruppi, massimo 8 bambini
---

La descrizione completa del corso va qui. Puoi usare **grassetto** e
[collegamenti](https://example.com).

Un nuovo paragrafo si crea lasciando una riga vuota.
```

- Edit an existing file to change its content. To add a course, FAQ, or service,
  copy an existing file in the same folder and give it a new filename.
- `order` controls display order: use distinct positive integers.
- Course filenames become section IDs. Keep `bambini.md`, `adulti.md`,
  `aziende.md`, and `esami.md` stable to preserve incoming links and redirects.
- The supported icon names are `arrow`, `book`, `sun`, `case`, `award`, `check`,
  `pin`, `phone`, and `globe`.
- In section files, `title` is a list of heading fragments and `emphasis` is the
  highlighted ending. The template controls their visual arrangement.
- In the method file, use `###` headings for the numbered teaching principles;
  numbering is generated automatically by CSS.
- `site.md` contains structured YAML settings above `---` and the privacy
  paragraph below. The phone number and address are defined once; call links,
  directions, and repeated contact information are derived from those fields.
- Quote frontmatter strings containing `: ` or beginning with `#`. Keep phone
  numbers and postal codes quoted so YAML preserves them as text.

Run `yarn build` after editing. Astro's content collection schemas in
`src/content.config.ts` validate required fields, types, icons, and link formats.
Invalid metadata fails the build with the file and field that need fixing.
The development server also reloads content as you edit.

Markdown is processed **at build time**, not in the visitor's browser. The output
is still plain HTML, CSS, images, fonts, and the small navigation script. After
an edit, rebuild and redeploy `dist/`; the deployed site does not read Markdown
files dynamically.

## Editing the design

- `src/pages/index.astro`: page layout and content rendering.
- `src/content.config.ts`: Markdown collection schemas and loaders.
- `src/styles/global.css`: responsive layout, colors, typography, and focus states.
- `src/components/Icon.astro`: shared inline SVG icons.
- `public/images/`: locally hosted editorial photos.
- `astro.config.mjs`: production domain and legacy URL redirects.

The mobile menu uses a small progressive-enhancement script. Navigation remains
available without JavaScript; course descriptions and FAQs use native HTML
`details` elements. The contact links dial the school directly, rather than
displaying a form that would require a backend.

## Content and launch checks

Copy is adapted from the existing public school website, including the published
phone number (348 824 8674), address (Via Roma 120, Guidonia), course types,
teaching method, children's group size, and language services.

Before launch, confirm the phone number, address, current course and service
availability, and Facebook destination with the school. Historical dates,
outdated business exam names, and guaranteed learning outcomes have deliberately
not been carried over. International exam preparation is distinguished from the
certification awarded by an external examination center.

The photographs are illustrative, not photographs of the school or its students:

- Students — image source:
  `https://images.unsplash.com/photo-1523240795612-9a054b0db644`
- London — image source:
  `https://images.unsplash.com/photo-1513635269975-59663e0ac1ad`

Fonts (DM Sans and Manrope, Latin variable subsets) and images are self-hosted.
Font licenses are included in `public/fonts/`. No external requests are needed
to render the page. No analytics, tracking scripts, embedded maps, or data
collection forms are included. Review any legal/business disclosures required
by the school before publication.
