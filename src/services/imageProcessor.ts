import axios from 'axios';
import sharp from 'sharp';

export const processImages = async (jobId: string, visits: any[]) => {
    for (const visit of visits) {
        for (const imageUrl of visit.image_url) {
            try {
                const response = await axios({ url: imageUrl, responseType: 'arraybuffer' });
                const metadata = await sharp(response.data).metadata();
                const perimeter = 2 * (metadata.height! + metadata.width!);

                await new Promise((resolve) => setTimeout(resolve, Math.random() * 300 + 100));

                console.log(`Processed: ${imageUrl}, Perimeter: ${perimeter}`);
            } catch (error) {
                throw [{ store_id: visit.store_id, error: 'Image download failed' }];
            }
        }
    }
};
