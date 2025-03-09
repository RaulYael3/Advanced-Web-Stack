import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provider]),
    JwtModule.register({
      secret: 'SECRET KEY',
      signOptions: {
        expiresIn: '1m',
      },
    }),
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService],
  exports: [TypeOrmModule],
})
export class ProvidersModule {}
