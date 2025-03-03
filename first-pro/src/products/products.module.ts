import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProvidersModule } from 'src/providers/providers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProvidersModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
