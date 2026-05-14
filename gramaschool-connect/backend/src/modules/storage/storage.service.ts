import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private s3: AWS.S3;
  private bucket: string;

  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION || 'ap-south-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.bucket = process.env.AWS_S3_BUCKET || 'gramaschool-uploads';
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<{ url: string; key: string }> {
    const key = `${folder}/${uuid()}-${file.originalname}`;
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.upload(params).promise();
    const url = `https://${this.bucket}.s3.amazonaws.com/${key}`;
    this.logger.log(`File uploaded: ${key}`);
    return { url, key };
  }

  async deleteFile(key: string): Promise<void> {
    await this.s3
      .deleteObject({ Bucket: this.bucket, Key: key })
      .promise();
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.bucket,
      Key: key,
      Expires: expiresIn,
    });
  }
}
