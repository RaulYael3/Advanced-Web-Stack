import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singup')
  async singup(createAuthDto: CreateUserDto) {
    return await this.authService.registerUser(createAuthDto);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return await this.authService.loginUser(createUserDto);
  }
}
