import { Module } from '@nestjs/common'
import { ProvidersService } from './providers.service'
import { ProvidersController } from './providers.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Provider } from './entities/provider.entity'
import { Product } from 'src/products/entities/product.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Provider, Product])],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
