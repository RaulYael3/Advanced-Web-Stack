import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(50)
  @IsOptional()
  name?: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  price?: number;

  @IsInt()
  @IsOptional()
  countSeal?: number;

  @IsUUID('4')
  @IsOptional()
  providerId?: string;
}
