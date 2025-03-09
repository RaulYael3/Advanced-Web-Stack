import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = this.userRepository.create(createUserDto);
    const savedUser = this.userRepository.save(user);
    return savedUser;
  }

  async loginUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { userEmail: createUserDto.userEmail },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const match = await bcrypt.compare(
      createUserDto.userPassword,
      user.userPassword,
    );

    if (!match) {
      throw new UnauthorizedException('The password is incorrect');
    }

    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.userEmail,
      },
      'SECRET KEY',
      { expiresIn: '1h' },
    );

    return { token };
  }
}
