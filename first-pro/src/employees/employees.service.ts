import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  private readonly employees: CreateEmployeeDto[] = [
    {
      id: 1,
      name: 'Alberto',
      lastName: 'Gonzalez',
      phoneNumber: 'XXX123135',
    },
    {
      id: 2,
      name: 'Maria',
      lastName: 'Gonzalez',
      phoneNumber: 'XXX123136',
    },
    {
      id: 3,
      name: 'Juan',
      lastName: 'Gonzalez',
      phoneNumber: 'XXX123137',
    },
  ];

  create(createEmployeeDto: CreateEmployeeDto) {
    this.employees.push(createEmployeeDto);
    return CreateEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
