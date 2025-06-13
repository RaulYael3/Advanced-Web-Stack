import { Injectable } from '@nestjs/common'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class S3Service {
  private s3: S3Client

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION')
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID')
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY')

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error('Missing required AWS configuration')
    }

    this.s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    })
  }

  async uploadFile(file: Express.Multer.File) {
    const key = `movies/${Date.now()}-${file.originalname}`
    const url = `https://nest-ocso-test.s3.amazonaws.com/${key}`
    const bucket = 'nest-ocso-test'

    const command = new PutObjectCommand({
      Key: key,
      Body: file.buffer,
      Bucket: bucket,
      ContentType: file.mimetype
    })

    await this.s3.send(command)
    return url
  }
}
