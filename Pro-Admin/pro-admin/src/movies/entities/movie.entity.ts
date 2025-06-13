import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Screening } from '../../screenings/entities/screening.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Movie {
  @ApiProperty({ description: 'ID único de la película' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'Título de la película' })
  @Column()
  name: string

  @ApiProperty({ description: 'Duración en minutos' })
  @Column()
  duration: number

  @ApiProperty({ description: 'URL de la imagen de la película', required: false })
  @Column({ nullable: true })
  photo: string

  @ApiProperty({ description: 'Sinopsis de la película', required: false })
  @Column({ nullable: true })
  synopsis: string

  @ApiProperty({ description: 'Clasificación de la película', required: false })
  @Column({ nullable: true })
  classification: string

  @ApiProperty({ description: 'Género de la película', required: false })
  @Column({ nullable: true })
  genre: string

  @ApiProperty({ description: 'Funciones programadas', type: () => [Screening] })
  @OneToMany(() => Screening, (screening) => screening.movie)
  screenings: Screening[]
}
