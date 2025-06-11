import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Res,
  BadRequestException,
  Query,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { ApiTags } from '@nestjs/swagger'

import { Response } from 'express'
import { LoginUserDto } from './dto/login-user.dto'
// import { Cookies } from './decorators/cookies.decorators'
import { TOKEN_NAME } from './constants/constants'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/:id')
  registerManager(
    @Query('role') role: string,
    @Body() createUserDto: CreateUserDto,
    @Param('id') id: string,
  ) {
    if (role === 'manager') {
      return this.authService.registerManager(id, createUserDto)
    } else if (role === 'employee') {
      return this.authService.registerEmployee(id, createUserDto)
    }
    throw new BadRequestException('Rol inválido')
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
    // @Cookies() cookies: any,
  ) {
    const token = await this.authService.loginUser(loginUserDto)
    const expireDate = new Date()
    expireDate.setDate(expireDate.getDay() + 7)
    response.cookie(TOKEN_NAME, token, {
      httpOnly: true,
      // secure: 'production',
      sameSite: 'none',
      // domain: process.env.cookiesDomain,
      expires: expireDate,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    console.log('Token de sesión:', token)
    return { meesage: 'succes' }
  }
  @Patch('/:id')
  updateUser(
    @Param('id') userEmail: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(userEmail, updateUserDto)
  }
}
