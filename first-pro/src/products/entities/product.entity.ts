import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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

  // @Column('uuid', { nullable: true })
  // provider: string;
}
