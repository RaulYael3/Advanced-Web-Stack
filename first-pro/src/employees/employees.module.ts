import { Module } from '@nestjs/common'
import { EmployeesService } from './employees.service'
import { EmployeesController } from './employees.controller'
import { Employee } from './entities/employee.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AwsModule } from '../aws/aws.module'

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), AwsModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
