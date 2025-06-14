import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator'
import { Transform } from 'class-transformer'

export class UpdateSeatDto {
  @IsOptional()
  @IsString()
  row?: string

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  seatNumber?: number

  @IsOptional()
  @IsBoolean()
  isOccupied?: boolean

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  roomId?: number
}
