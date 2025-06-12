import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new auth record' })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({ status: 201, description: 'The auth record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all auth records' })
  @ApiResponse({ status: 200, description: 'Return all auth records.' })
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an auth record by id' })
  @ApiParam({ name: 'id', description: 'Auth record ID' })
  @ApiResponse({ status: 200, description: 'Return the auth record.' })
  @ApiResponse({ status: 404, description: 'Auth record not found.' })
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an auth record' })
  @ApiParam({ name: 'id', description: 'Auth record ID' })
  @ApiBody({ type: UpdateAuthDto })
  @ApiResponse({ status: 200, description: 'The auth record has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Auth record not found.' })
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an auth record' })
  @ApiParam({ name: 'id', description: 'Auth record ID' })
  @ApiResponse({ status: 200, description: 'The auth record has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Auth record not found.' })
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
