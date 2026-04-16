import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'streamifier';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error || !result) return reject(error || new Error('Upload failed'));
        resolve(result);
      });

      toStream.createReadStream(file.buffer).pipe(upload);
    });
  }
}
