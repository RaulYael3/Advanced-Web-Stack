import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  create(createProviderDto: CreateProviderDto) {
    const provider = this.providerRepository.create(createProviderDto);
    const savedProvider = this.providerRepository.save(provider);
    return savedProvider;
  }

  findAll() {
    return this.providerRepository.find();
  }

  async findOne(id: string) {
    const provider = await this.providerRepository.findOneBy({
      providerId: id,
    });
    if (!provider) throw new NotFoundException();
    return provider;
  }

  async findByName(name: string) {
    const provider = await this.providerRepository.findOneBy({
      providerName: Like(`%${name}%`),
    });
    if (!provider) throw new NotFoundException();
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const providertoUpdate = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto,
    });
    if (!providertoUpdate) throw new NotFoundException();
    await this.providerRepository.save(providertoUpdate);
    return providertoUpdate;
  }

  async remove(id: string) {
    return this.providerRepository.delete({ providerId: id });
  }
}
