import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const key = `movies/${Date.now()}-${file.originalname}`;
    const url = `https://nest-ocso-test.s3.amazonaws.com/${key}`;
    const bucket = 'nest-ocso-test';
    
    const command = new PutObjectCommand({
      Key: key,
      Body: file.buffer,
      Bucket: bucket,
      ContentType: file.mimetype,
    });

    await this.s3.send(command);
    return url;
  }
} 