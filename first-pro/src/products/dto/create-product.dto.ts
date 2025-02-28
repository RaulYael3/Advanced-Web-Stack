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
  @IsUUID('4')
  @IsOptional()
  productId: string;

  @IsString()
  @MaxLength(50)
  name: string;

  @IsNumber()
  price: number;

  @IsInt()
  countSeal: number;

  @IsUUID('4')
  @IsString()
  provider: string;
}
