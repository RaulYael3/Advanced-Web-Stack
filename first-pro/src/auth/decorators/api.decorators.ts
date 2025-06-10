import { ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export const ApiAuth = () => {
  return applyDecorators(
    ApiResponse({
      status: 201,
      example: {
        employeeId: 'UUID',
        employeeName: 'Raul Yael',
        employeeLastName: 'Perez Duarde',
        employeeEmail: 'raul@gmail.com',
        employeePhoneNumber: '443 590 1249',
        employeePhoto: 'URL',
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Missing or invalid token',
    }),
    ApiResponse({
      status: 403,
      description: 'Missing role',
    }),
  );
};
