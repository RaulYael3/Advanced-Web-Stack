import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const products = this.productRepository.create(createProductDto);
    const savedProduct = this.productRepository.save(products);
    return savedProduct;
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const products = await this.productRepository.findOneBy({ productId: id });
    if (!products) throw new NotFoundException();
    return products;
  }

  // findByProvider(id: string) {
  //   const products = this.products.filter((product) => product.provider === id);
  //   if (products.length === 0) throw new NotFoundException();
  //   return products;
  // }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto,
    });
    if (!productToUpdate) throw new NotFoundException();
    await this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  async remove(id: string) {
    return this.productRepository.delete({ productId: id });
  }
}
