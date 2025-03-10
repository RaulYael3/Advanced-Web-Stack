import { IsEmail, IsString, MinLength } from 'class-validator';

export class LogionUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    default: 'user@gmail.com',
  })
  userEmail: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    default: 'Abcdef_#12',
  })
  userPassword: string;
}
