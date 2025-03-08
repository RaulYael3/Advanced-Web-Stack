import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  registerUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const savedUser = this.userRepository.save(user);
    return savedUser;
  }
}
