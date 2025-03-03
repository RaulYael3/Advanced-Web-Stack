import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('increment')
  location: number;
  @Column('text')
  locationName: string;
  @Column('text')
  locationAddress: string;
  @Column('array')
  locationLatLng: number[];
}
