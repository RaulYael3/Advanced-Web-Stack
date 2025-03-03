import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateProviderDto {
  @IsString()
  @MaxLength(100)
  providerName: string;
  @IsEmail()
  providerEmail: string;
  @IsString()
  providerPhone: string;
  @IsUUID()
  @IsOptional()
  providerId: string;
}
