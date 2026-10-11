import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		client: z.string().optional(),
		category: z.string(),
		videoUrl: z.string().optional(),
		heroImage: z.string(),
		beforeImage: z.string().optional(),
		afterImage: z.string().optional(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { projects };
