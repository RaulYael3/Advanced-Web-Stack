import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { UserRole } from '../entities/user.entity'

export class CreateUserDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'usuario@ejemplo.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Contraseña123!'
  })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({
    description: 'Rol del usuario',
    enum: UserRole,
    default: UserRole.USER
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole
}
