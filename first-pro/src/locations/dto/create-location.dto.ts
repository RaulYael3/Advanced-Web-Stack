import {
  ArrayNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator'
import { Manager } from 'src/managers/entities/manager.entity'
import { Region } from 'src/regions/entities/region.entity'

export class CreateLocationDto {
  @IsString()
  @MaxLength(35)
  locationName: string
  @IsString()
  @MaxLength(160)
  locationAddress: string
  @ArrayNotEmpty()
  locationLatLng: number[]

  @IsObject()
  @IsOptional()
  region: Region

  @IsUUID()
  @IsOptional()
  manager: Manager
}
