import { cloudinary } from '@/cloudinary.config';

export const uploadImageToCloudinary = async (
  salonName: string,
  filePath: string
) => {
  try {
    if (!salonName || !filePath) throw new Error('Problem s poslanim podacima');

    const result = await cloudinary.uploader.upload(filePath, {
      folder: salonName,
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Error uploading to Cloudinary');
  }
};

export async function handleImageUpload(image: File | null, salon: any) {
  if (!image) return null;

  try {
    const fileBuffer = await image.arrayBuffer();
    const mimeType = image.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');
    const fileUri = `data:${mimeType};${encoding},${base64Data}`;

    return await uploadImageToCloudinary(`${salon.id}-${salon.name}`, fileUri);
  } catch (error) {
    return null;
  }
}
