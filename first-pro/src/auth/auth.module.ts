import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { JwtModule } from '@nestjs/jwt'
import { Employee } from 'src/employees/entities/employee.entity'
import { Manager } from 'src/managers/entities/manager.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Employee, Manager]),
    JwtModule.register({
      secret: 'SECRET KEY',
      signOptions: {
        expiresIn: '1m',
      },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
