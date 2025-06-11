// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cookies
  app.use(cookieParser());

  // Cors (solo si consumes desde otro dominio)
  app.enableCors({
    origin: ['http://localhost:3000'], // frontend
    credentials: true,
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Cinerex API')
    .setDescription('Backend para el panel administrativo y sitio web')
    .setVersion('1.0')
    .addCookieAuth('jwt') // Para documentar JWT via cookies
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000); // puerto por default para backend
}
bootstrap();
