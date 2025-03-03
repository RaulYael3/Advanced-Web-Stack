import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/providers/entities/provider.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { providerId, ...productDetails } = createProductDto;

    const newProduct = this.productRepository.create({
      ...productDetails,
      provider: { providerId },
    });

    return await this.productRepository.save(newProduct);
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { productId: id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  findByProvider(provider_Id: string) {
    return this.productRepository.findBy({
      provider: { providerId: provider_Id },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { providerId, ...productProps } = updateProductDto;

    const updateData: Partial<Product> = {
      ...productProps,
    };

    if (providerId) {
      const provider = await this.providerRepository.findOne({
        where: { providerId },
      });

      if (!provider) {
        throw new NotFoundException(`Provider with ID ${providerId} not found`);
      }

      updateData.provider = provider;
    }

    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateData,
    });

    if (!productToUpdate)
      throw new NotFoundException(`Product with ID ${id} not found`);

    return await this.productRepository.save(productToUpdate);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return { message: `Product with ID ${id} deleted successfully` };
  }
}
