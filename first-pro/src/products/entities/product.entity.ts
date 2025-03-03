import { Provider } from 'src/providers/entities/provider.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column('float')
  price: number;

  @Column('int')
  countSeal: number;

  @ManyToOne(() => Provider, (provider) => provider.products, {
    eager: true,
  })
  provider: Provider;
}
