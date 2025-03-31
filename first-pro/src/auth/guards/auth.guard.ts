import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants, TOKEN_NAME } from '../constants/constants'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    let token = this.extractTokenFromHeader(request)
    if (!token) {
      token = request.cookies?.[TOKEN_NAME]
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync<{ userId: string }>(
        token,
        {
          secret: jwtConstants.secret,
        },
      )
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
