import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: 'user@gmail.com',
  })
  @IsEmail()
  userEmail: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    default: 'Abcdef_#12',
  })
  userPassword: string;

  @IsOptional()
  @IsIn(['Admin', 'Employee', 'Manager'])
  @ApiProperty({
    default: 'Employee',
  })
  userRoles: string[];
}
