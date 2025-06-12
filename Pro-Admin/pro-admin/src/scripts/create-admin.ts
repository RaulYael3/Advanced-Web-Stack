import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    const createUserDto: CreateUserDto = {
      email: 'admin@cinerex.com',
      password: 'Admin123!',
      role: UserRole.ADMIN,
    };

    const adminUser = await usersService.create(createUserDto);
    console.log('Usuario administrador creado exitosamente:', adminUser);
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error);
  } finally {
    await app.close();
  }
}

bootstrap(); 