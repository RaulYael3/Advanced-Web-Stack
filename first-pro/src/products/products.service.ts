import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
      productId: uuidv4(),
      name: 'Sabritas normal',
      price: 100,
      countSeal: 3,
      provider: uuidv4(),
    },
    {
      productId: uuidv4(),
      name: 'Sabritas adobadas',
      price: 90,
      countSeal: 3,
      provider: uuidv4(),
    },
    {
      productId: uuidv4(),
      name: 'Sabritas limon',
      price: 80,
      countSeal: 3,
      provider: uuidv4(),
    },
  ];

  create(createProductDto: CreateProductDto) {
    if (!createProductDto.productId) {
      createProductDto.productId = uuidv4();
    }
    this.products.push(createProductDto);
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const products = this.products.filter(
      (product) => product.productId === id,
    )[0];
    if (!products) throw new NotFoundException();
    return products;
  }

  findByProvider(id: string) {
    const products = this.products.filter((product) => product.provider === id);
    if (products.length === 0) throw new NotFoundException();
    return products;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let productToUpdate = this.findOne(id);
    productToUpdate = {
      ...productToUpdate,
      ...updateProductDto,
    };

    this.products = this.products.map((product) => {
      if (product.productId === id) {
        product = productToUpdate;
      }

      return product;
    });

    return productToUpdate;
  }

  remove(id: string) {
    this.findOne(id);
    this.products = this.products.filter((product) => product.productId !== id);
    return this.products;
  }
}
