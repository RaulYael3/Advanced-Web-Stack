import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    default: 'user@gmail.com',
  })
  @IsEmail()
  userEmail: string

  @ApiProperty({
    default: '23213fe4231',
  })
  @IsString()
  @MinLength(8)
  userPassword: string

  @ApiProperty({
    default: 'Employee',
  })
  @IsOptional()
  @IsIn(['Admin', 'Employee', 'Manager'])
  userRoles: string[]
}
