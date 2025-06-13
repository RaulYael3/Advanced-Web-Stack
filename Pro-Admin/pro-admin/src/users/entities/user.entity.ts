import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: UserRole.USER })
  role: UserRole
}
