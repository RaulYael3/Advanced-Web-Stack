import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { RoomScreening } from '../../rooms/entities/room-screening.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Screening {
  @ApiProperty({ description: 'ID único de la función' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Fecha y hora de la función' })
  @Column()
  datetime: Date;

  @ApiProperty({ description: 'Película de la función', type: () => Movie })
  @ManyToOne(() => Movie, movie => movie.screenings)
  movie: Movie;

  @ApiProperty({ description: 'Salas asignadas a la función', type: () => [RoomScreening] })
  @OneToMany(() => RoomScreening, roomScreening => roomScreening.screening)
  roomScreenings: RoomScreening[];

  @ApiProperty({ description: 'Tickets vendidos para esta función', type: () => [Ticket] })
  @OneToMany(() => Ticket, ticket => ticket.screening)
  tickets: Ticket[];
}
