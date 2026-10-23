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
		galleryImages: z.array(z.string()).optional(),
		credits: z
			.array(z.object({ role: z.string(), name: z.string() }))
			.optional(),
		awards: z.array(z.string()).optional(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { projects };