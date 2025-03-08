import {
  IsEmail,
  IsNumber,
  isPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateManagerDto {
  @IsString()
  @MaxLength(80)
  managerFullName: string;

  @IsString()
  @IsEmail()
  managerEmail: string;

  @IsString()
  managerPhoneNumber: string;

  @IsNumber()
  managerSalary: number;
}
