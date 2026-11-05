import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.string().trim().min(1);
const order = z.number().int().positive();
const icon = z.enum(['arrow', 'book', 'sun', 'case', 'award', 'check', 'pin', 'phone', 'globe']);
const link = z.object({ label: text, href: z.string().regex(/^#[a-z][a-z0-9-]*$/) });

const courses = defineCollection({
  loader: glob({ base: './src/content/courses', pattern: '*.md' }),
  schema: z.object({
    order,
    icon,
    category: text,
    title: text,
    description: text,
    feature: text,
  }),
});

const faqs = defineCollection({
  loader: glob({ base: './src/content/faqs', pattern: '*.md' }),
  schema: z.object({ order, question: text }),
});

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '*.md' }),
  schema: z.object({ order, title: text }),
});

const sections = defineCollection({
  loader: glob({ base: './src/content/sections', pattern: '*.md' }),
  schema: z.object({
    eyebrow: text,
    title: z.array(text).min(1),
    emphasis: text,
  }),
});

const settings = defineCollection({
  loader: glob({ base: './src/content', pattern: 'site.md' }),
  schema: z.object({
    name: text,
    wordmark: text,
    brandSubtitle: text,
    tagline: text,
    meta: z.object({
      title: text,
      description: text,
      socialTitle: text,
      socialDescription: text,
    }),
    navigation: z.array(link).min(1),
    navigationAction: link,
    labels: z.object({
      skipLink: text,
      menu: text,
      navigation: text,
      homepage: text,
      backToHome: text,
      backToTop: text,
    }),
    hero: z.object({
      primaryAction: link,
      secondaryAction: link,
      note: text,
      imageAlt: text,
      caption: text,
      captionEmphasis: text,
      greeting: text,
      greetingContinuation: text,
    }),
    values: z.array(z.object({ icon, label: text })).min(1),
    courses: z.object({
      expandLabel: text,
      contactLabel: text,
      help: text,
      helpAction: link,
    }),
    method: z.object({
      imageAlt: text,
      imageCaption: text,
      quote: z.array(text).min(1),
      quoteEmphasis: text,
      quoteLabel: text,
    }),
    schoolAction: link,
    contact: z.object({
      dialCode: z.string().regex(/^\+\d{1,3}$/),
      phone: z.string().regex(/^\d[\d ]+\d$/),
      street: text,
      postcode: z.string().regex(/^\d{5}$/),
      city: text,
      province: text,
      provinceCode: text,
      callLabel: text,
      visitLabel: text,
      visitTitle: text,
      directionsLabel: text,
      phoneLabel: text,
      phoneNote: text,
      decoration: text,
    }),
    footer: z.object({
      tagline: text,
      facebookLabel: text,
      facebookUrl: z.url().refine((value) => value.startsWith('https://'), 'Use an HTTPS URL'),
      privacyLabel: text,
    }),
  }),
});

export const collections = { courses, faqs, services, sections, settings };
