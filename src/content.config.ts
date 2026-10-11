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
		galleryImages: z.array(z.string()).optional(), // List of up to 6 image URLs
		featured: z.boolean().default(false),
	}),
});

export const collections = { projects };