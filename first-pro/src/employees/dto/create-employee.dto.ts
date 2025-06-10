import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator'
import { Location } from 'src/locations/entities/location.entity'

export class LocationEmployeeDto extends Location {
  @ApiProperty()
  locationId: number

  @ApiPropertyOptional()
  declare locationName: string

  @ApiPropertyOptional()
  declare locationLatLng: number[]

  @ApiPropertyOptional()
  declare locationAddress: string
}

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @IsUUID('4')
  @IsOptional()
  employeeId?: string

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  employeeName: string

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  employeeLastName: string

  @ApiPropertyOptional()
  @IsOptional()
  employeePhoto: string

  @ApiProperty()
  @IsNumber()
  employeePhoneNumber: number

  @ApiProperty()
  @IsString()
  @IsEmail()
  employeeEmail: string

  @ApiProperty()
  @IsOptional()
  @IsObject()
  location: LocationEmployeeDto
}
