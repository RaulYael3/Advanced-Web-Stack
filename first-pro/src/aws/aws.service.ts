import { Injectable } from '@nestjs/common'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
@Injectable()
export class AwsService {
  private s3 = new S3Client({
    region: 'us-east-2',
    credentials: () =>
      Promise.resolve({
        accessKeyId: process.env.accesskey_bucket as string,
        secretAccessKey: process.env.secretkey_bucket as string,
      }),
  })

  async uploadFile(file: Express.Multer.File) {
    const key = file.originalname
    const url = `https://nest-ocso-test.s3.amazonaws.com/${key}`
    const bucket = 'nest-ocso-test'
    const command = new PutObjectCommand({
      Key: key,
      Body: file.buffer,
      Bucket: bucket,
    })
    await this.s3.send(command)
    return url
  }
}
