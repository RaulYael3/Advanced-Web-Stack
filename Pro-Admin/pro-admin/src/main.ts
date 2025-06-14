// main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // CORS configuration
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })

  // Comentar temporalmente el ValidationPipe global para debug
  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true,
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   disableErrorMessages: false,
  //   validationError: {
  //     target: false,
  //     value: false,
  //   },
  // }))

  // Debug middleware para POST /seats
  app.use('/seats', (req, res, next) => {
    if (req.method === 'POST') {
      console.log('=== MIDDLEWARE DEBUG POST /seats ===')
      console.log('Request headers:', req.headers)
      console.log('Request body before processing:', req.body)
      console.log('Body type:', typeof req.body)
      console.log('Body keys:', Object.keys(req.body || {}))
      console.log('======================================')
    }
    next()
  })

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Pro-Admin API')
    .setDescription('The Pro-Admin API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('rooms')
    .addTag('seats')
    .addTag('movies')
    .addTag('screenings')
    .addTag('tickets')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  // Cookies
  app.use(cookieParser())

  await app.listen(4000)
  console.log('Application is running on: http://localhost:4000')
  console.log('Swagger documentation: http://localhost:4000/api')
}
bootstrap()
