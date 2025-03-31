import { Controller, Post, Body, Param, Put, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LogionUserDto } from './dto/logoin-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Response } from 'express'
import { TOKEN_NAME } from './constants/constants'
import { Cookies } from './decorators/cookies.decorators'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singup')
  async singup(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.registerUser(createAuthDto)
  }

  @Post('login')
  async login(
    @Body() loginUser: LogionUserDto,
    @Res({ passthrough: true }) response: Response,
    @Cookies() cookies: any,
  ) {
    const token = await this.authService.loginUser(loginUser)
    response.cookie(TOKEN_NAME, token, {
      httpOnly: false,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
  }

  @Put('/:email')
  updateUser(
    @Param('email') userEmail: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(userEmail, updateUserDto)
  }
}
