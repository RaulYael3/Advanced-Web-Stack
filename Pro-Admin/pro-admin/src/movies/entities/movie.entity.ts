import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Screening } from '../../screenings/entities/screening.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  synopsis: string;

  @Column({ nullable: true })
  classification: string;

  @Column({ nullable: true })
  genre: string;

  @OneToMany(() => Screening, screening => screening.movie)
  screenings: Screening[];
}
