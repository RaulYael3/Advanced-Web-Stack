import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeesRepository.create(createEmployeeDto);
    const savedEmployee = this.employeesRepository.save(employee);
    return savedEmployee;
  }

  findAll() {
    return this.employeesRepository.find();
  }

  findByLocation(id: number) {
    return this.employeesRepository.findBy({
      location: {
        locationId: id,
      },
    });
  }

  async findOne(id: string) {
    const employee = await this.employeesRepository.findOneBy({ id: id });
    if (!employee) throw new NotFoundException();
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeesRepository.preload({
      id: id,
      ...updateEmployeeDto,
    });

    if (!employeeToUpdate) throw new NotFoundException();
    await this.employeesRepository.save(employeeToUpdate);
    return employeeToUpdate;
  }

  async remove(id: string) {
    return this.employeesRepository.delete({ id: id });
  }
}
