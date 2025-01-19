import { cloudinary } from '@/cloudinary.config';

export const uploadImageToCloudinary = async (
  salonName: string,
  filePath: string
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: salonName,
    });
    return result.secure_url;
  } catch (error) {
    throw new Error(error);
  }
};
