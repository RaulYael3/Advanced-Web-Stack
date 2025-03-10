import e from 'express';
import { Employee } from 'src/employees/entities/employee.entity';
import { Manager } from 'src/managers/entities/manager.entity';
import { Region } from 'src/regions/entities/region.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('increment')
  location: number;
  @Column('text')
  locationName: string;
  @Column('text')
  locationAddress: string;
  @Column('simple-array')
  locationLatLng: number[];

  @OneToOne(() => Manager, { eager: true })
  @JoinColumn({
    name: 'managerID',
  })
  manager: Manager;

  @ManyToOne(() => Region, (region) => region.locations)
  @JoinColumn({
    name: 'regionId',
  })
  region: Region;

  @OneToMany(() => Employee, (employee) => employee.location)
  employee: Employee[];
}
