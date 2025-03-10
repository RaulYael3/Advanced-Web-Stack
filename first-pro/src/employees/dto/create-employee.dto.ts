import {
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsUUID('4')
  @IsOptional()
  employeeId?: string;

  @IsString()
  @MaxLength(50)
  employeeName: string;

  @IsString()
  @MaxLength(50)
  employeeLastName: string;

  @IsNumber()
  employeePhoneNumber: number;

  @IsString()
  @IsEmail()
  employeeEmail: string;

  @IsOptional()
  @IsObject()
  location: Location;
}
