import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  providerId: string;

  @Column('text')
  providerName: string;

  @Column('text')
  providerEmail: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  providerPhone: string;
}
