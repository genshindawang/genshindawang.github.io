import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	schema: z.object({
		title: z.string().trim().min(1),
        status: z.enum(["queue", "reading", "finished"]).default("reading"),
        paperTitle: z.string().default(""),
        paperUrl: z.string().url().refine(v => /^https?:/.test(v)).or(z.literal("")).default(""),
        codeUrl: z.string().url().refine(v => /^https?:/.test(v)).or(z.literal("")).default(""),
        authors: z.string().default(""),
        venue: z.string().default(""),
        pinned: z.boolean().default(false),
        isSample: z.boolean().default(false),
		published: z.coerce.date(),
		updated: z.coerce.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});

export const collections = {
	posts: postsCollection,
};
