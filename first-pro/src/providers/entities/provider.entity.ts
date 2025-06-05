import { Product } from 'src/products/entities/product.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  providerId: string

  @Column('text', {
    unique: true,
  })
  providerName: string

  @Column('text')
  providerEmail: string

  @Column({
    type: 'text',
    nullable: true,
  })
  providerPhone: string

  @OneToMany(() => Product, (product) => product.provider)
  products: Product[]
}
