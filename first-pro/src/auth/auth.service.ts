import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LogionUserDto } from './dto/logoin-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  registerUser(loginUser: LogionUserDto) {
    loginUser.userPassword = bcrypt.hashSync(loginUser.userPassword, 5);
    const user = this.userRepository.create(loginUser);
    const savedUser = this.userRepository.save(user);
    return savedUser;
  }

  async loginUser(loginUser: LogionUserDto) {
    const user = await this.userRepository.findOne({
      where: { userEmail: loginUser.userEmail },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const match = await bcrypt.compare(
      loginUser.userPassword,
      user.userPassword,
    );

    if (!match) {
      throw new UnauthorizedException('The password is incorrect');
    }

    const payload = {
      userEmail: user.userEmail,
      userPass: user.userPassword,
      userRoles: user.userRoles,
    };

    const token = this.jwtService.sign(payload);

    return { token };
  }
}
