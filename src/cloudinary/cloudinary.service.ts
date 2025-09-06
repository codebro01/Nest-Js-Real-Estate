import { Injectable, BadRequestException } from '@nestjs/common';
import {
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { cloudinary } from '@src/cloudinary/config';

@Injectable()
export class CloudinaryService {
  /**
   * Upload an image buffer to Cloudinary
   * @param fileBuffer - image file buffer (from Multer memoryStorage)
   * @param folder - Cloudinary folder name
   * @param verifyStudent - apply verify-student transformation?
   */
  async uploadImage(
    fileBuffer: Buffer[],
    folder: string,
    // verifyStudent = false,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          transformation:  [{ width: 500, height: 500, crop: 'scale' }],
        },
        (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
          if (error || !result) {
            return reject(new BadRequestException('Failed to upload image'));
          }
          resolve(result);
        },
      );

      stream.end(fileBuffer);
    });
  }

  /**
   * Delete image from Cloudinary
   */
  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}
