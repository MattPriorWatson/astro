import sharp from 'sharp';

export interface ImageSize {
	width: number;
	height: number;
	/** width / height, as displayed (EXIF rotation taken into account) */
	ratio: number;
}

// Used when a file can't be read (e.g. a remote URL): assume 16:9
const FALLBACK: ImageSize = { width: 1600, height: 900, ratio: 16 / 9 };

const cache = new Map<string, Promise<ImageSize>>();

/**
 * Reads the real dimensions of an image that lives in /public (e.g. "/butler/butler-1.jpg")
 * at build time, so galleries can lay images out at their true aspect ratio.
 */
export function getImageSize(src: string): Promise<ImageSize> {
	let result = cache.get(src);
	if (!result) {
		result = read(src);
		cache.set(src, result);
	}
	return result;
}

async function read(src: string): Promise<ImageSize> {
	if (!src.startsWith('/')) return FALLBACK;
	try {
		const file = `${process.cwd()}/public${decodeURIComponent(src)}`;
		const { width, height, orientation } = await sharp(file).metadata();
		if (!width || !height) return FALLBACK;
		// EXIF orientations 5-8 are rotated 90°, so the displayed width/height are swapped
		const [w, h] = orientation && orientation >= 5 ? [height, width] : [width, height];
		return { width: w, height: h, ratio: w / h };
	} catch {
		console.warn(`[imageSize] Could not read ${src}; falling back to 16:9`);
		return FALLBACK;
	}
}
