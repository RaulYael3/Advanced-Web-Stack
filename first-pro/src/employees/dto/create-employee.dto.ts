import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator'
import { Location } from 'src/locations/entities/location.entity'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  employeeName: string

  @ApiProperty()
  @IsString()
  @MaxLength(70)
  employeeLastName: string

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  employeePhoneNumber: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  employeeEmail: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location: Location | string

  @ApiPropertyOptional()
  @IsOptional()
  emplyeePhoto: string
}
