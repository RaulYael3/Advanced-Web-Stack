import {
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { Manager } from '../entities/manager.entity';

export class CreateManagerDto extends Manager {}
