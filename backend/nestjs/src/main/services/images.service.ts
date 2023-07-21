import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class ImagesService {
  private minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: '172.29.0.2',
      port: 9000,
      useSSL: false,
      accessKey: process.env.MINIO_LOGIN,
      secretKey: process.env.MINIO_PASSWORD
    });
  }

  async generatePresignedUrl(objectName: string): Promise<string> {
    try {
      return await this.minioClient.presignedGetObject('images', objectName, 3600);
    } catch (err) {
      console.error('Error generating presigned URL:', err);
      throw err;
    }
  }

  async uploadImage(bucketName: string, objectName: string, file: Buffer): Promise<void> {
    try {
      await this.minioClient.putObject(bucketName, objectName, file);
    } catch (err) {
      console.error('Error uploading image:', err);
      throw err;
    }
  }
}
