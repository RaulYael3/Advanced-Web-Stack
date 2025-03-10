import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Location } from 'src/locations/entities/location.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  employeeId: string;

  @Column({ type: 'varchar', length: 50 })
  employeeName: string;

  @Column({ type: 'varchar', length: 50 })
  employeeLastName: string;

  @Column('int')
  employeePhoneNumber: number;

  @Column('text', {
    unique: true,
  })
  employeeEmail: string;

  @Column({ type: 'text', nullable: true })
  employeePhotoUrl: string;

  @ManyToOne(() => Location, (location) => location.employee)
  @JoinColumn({
    name: 'locationiId',
  })
  employeeLocation: Location;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'userId',
  })
  user: User;
}
