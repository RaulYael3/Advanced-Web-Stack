import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: string;

  @Column('text')
  userEmail: string;

  @Column('text')
  userPassword: string;

  @Column('simple-array', {
    default: 'Employee',
  })
  userRoles: string[];
}
