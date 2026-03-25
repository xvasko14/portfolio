import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    tags: z.array(z.string()),
    status: z.enum(["concept", "in-progress", "shipped"]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects };
