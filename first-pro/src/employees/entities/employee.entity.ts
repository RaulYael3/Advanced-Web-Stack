import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column('int')
  phoneNumber: number;

  @Column('text')
  email: string;

  @Column({ type: 'text', nullable: true })
  photoUrl: string;
}
