import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  @MinLength(8)
  userPassword: string;
}
