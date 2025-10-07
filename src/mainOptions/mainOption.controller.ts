import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { MainOptionsService } from './mainOption.service';
import { MainOption } from '../entities/mainOption.entity';
import { CreateMainOptionDto } from './dto/create-main-option.dto';
import { UpdateMainOptionDto } from './dto/update-main-option.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Main Options')
@Controller('main-options')
export class MainOptionsController {
  constructor(private readonly mainOptionsService: MainOptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new main option' })
  @ApiResponse({ status: 201, description: 'Main option created successfully', type: MainOption })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async create(@Body() dto: CreateMainOptionDto): Promise<MainOption> {
    return this.mainOptionsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all main options' })
  @ApiResponse({ status: 200, description: 'Return all main options', type: [MainOption] })
  async findAll(): Promise<MainOption[]> {
    return this.mainOptionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a main option by id' })
  @ApiResponse({ status: 200, description: 'Return the main option', type: MainOption })
  @ApiResponse({ status: 404, description: 'Main option not found' })
  async findOne(@Param('id') id: string): Promise<MainOption> {
    return this.mainOptionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a main option' })
  @ApiResponse({ status: 200, description: 'Main option updated successfully', type: MainOption })
  @ApiResponse({ status: 404, description: 'Main option not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMainOptionDto,
  ): Promise<MainOption> {    return this.mainOptionsService.update(id, dto);
  }

  @Get('count/number')
  @ApiOperation({ summary: 'Get total count of main options' })
  @ApiResponse({ 
    status: 200, 
    description: 'Total count of main options retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', example: 8 }
      }
    }
  })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async getMainOptionsCount(): Promise<{ count: number }> {
    return this.mainOptionsService.getMainOptionsCount();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a main option' })
  @ApiResponse({ status: 200, description: 'Main option deleted successfully' })
  @ApiResponse({ status: 404, description: 'Main option not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async remove(@Param('id') id: string): Promise<void> {
    return this.mainOptionsService.remove(id);
  }
}
