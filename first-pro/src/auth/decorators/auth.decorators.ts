import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Admin } from 'typeorm';

export const Auth = (...roles: string[]) => {
  roles.push(Admin);
  return applyDecorators(Roles(roles), UseGuards(AuthGuard, RolesGuard));
};
