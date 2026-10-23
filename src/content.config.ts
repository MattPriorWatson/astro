import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		client: z.string().optional(), // no longer displayed
		category: z.string(),
		videoUrl: z.string().optional(),
		heroImage: z.string(),
		galleryImages: z.array(z.string()).optional(), // List of up to 6 image URLs
		credits: z
			.array(z.object({ role: z.string(), name: z.string() }))
			.optional(),
		awards: z.array(z.string()).optional(),
		featured: z.boolean().default(false), // no longer used on the home page
	}),
});

export const collections = { projects };