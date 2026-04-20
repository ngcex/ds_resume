import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().nullable().optional(),
    location: z.string().optional(),
    logo: z.string().optional(),
    summary: z.string(),
    bullets: z.array(z.string()).optional(),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/education" }),
  schema: z.object({
    degree: z.string(),
    institution: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().nullable().optional(),
    thesis: z.string().optional(),
    notes: z.string().optional(),
  }),
});

const publications = defineCollection({
  loader: glob({
    pattern: "**/*.{yaml,yml,md}",
    base: "./src/content/publications",
  }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    venue: z.string(),
    venueShort: z.string().optional(),
    type: z.enum(["peer-reviewed", "conference", "internal-talk", "poster"]),
    authors: z.array(z.string()),
    authorPosition: z.enum(["first", "middle", "last", "solo"]),
    doi: z.string().nullable().optional(),
    adsLink: z.string().nullable().optional(),
    url: z.string().nullable().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const site = defineCollection({
  loader: file("./src/content/site/site.yaml"),
  schema: z.object({
    name: z.string(),
    jobTitle: z.string(),
    tagline: z.string(),
    bio: z.string(),
    socials: z.object({
      github: z.string().optional(),
      linkedin: z.string().optional(),
      orcid: z.string().optional(),
      email: z.string().optional(),
    }),
    formspreeId: z.string().nullable().optional(),
  }),
});

export const collections = {
  experience,
  education,
  publications,
  projects,
  site,
};
