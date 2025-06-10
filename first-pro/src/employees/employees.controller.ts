import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { EmployeesService } from './employees.service'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { ROLES } from 'src/auth/constants/roles.constants'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiAuth } from 'src/auth/decorators/api.decorators'
import { AwsService } from 'src/aws/aws.service'

@ApiAuth()
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly awsService: AwsService,
  ) {}

  @Auth(ROLES.MANAGER)
  @Post()
  @ApiResponse({
    status: 201,
    example: {
      employeeId: 'UUID',
      employeeName: 'Raul Yael',
      employeeLastName: 'Perez Duarde',
      employeeEmail: 'raul@gmail.com',
      employeePhoneNumber: '443 590 1249',
      employeePhoto: 'URL',
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Missing or invalid token',
  })
  @ApiResponse({
    status: 403,
    description: 'Missing role',
  })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto)
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Patch(':id/upload')
  @UseInterceptors(FileInterceptor('employeePhoto'))
  async uploadPhoto(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileUrl = await this.awsService.uploadFile(file)
    updateEmployeeDto.emplyeePhoto = fileUrl
    return this.employeesService.update(id, updateEmployeeDto)
  }

  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll()
  }

  @Auth(ROLES.MANAGER)
  @Get('/location/:id')
  findAllLocation(@Param('id') id: string) {
    return this.employeesService.findByLocation(+id)
  }

  @Auth(ROLES.MANAGER)
  @Get('/:id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.employeesService.findOne(id)
  }

  @Auth(ROLES.EMPLOYEE)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto)
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.remove(id)
  }
}
