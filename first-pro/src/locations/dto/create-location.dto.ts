import { ArrayNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @MaxLength(35)
  locationName: string;
  @IsString()
  @MaxLength(160)
  locationAddress: string;
  @ArrayNotEmpty()
  locationLatLng: number[];
}
