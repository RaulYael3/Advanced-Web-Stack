import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { RoomScreening } from '../../rooms/entities/room-screening.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity()
export class Screening {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  datetime: Date;

  @ManyToOne(() => Movie, movie => movie.screenings)
  movie: Movie;

  @OneToMany(() => RoomScreening, roomScreening => roomScreening.screening)
  roomScreenings: RoomScreening[];

  @OneToMany(() => Ticket, ticket => ticket.screening)
  tickets: Ticket[];
}
