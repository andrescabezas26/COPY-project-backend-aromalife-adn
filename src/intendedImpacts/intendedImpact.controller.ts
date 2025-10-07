import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Patch,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { IntendedImpactService } from './intendedImpact.service';
import { IntendedImpact } from '../entities/intendedImpact.entity';
import { CreateIntendedImpactDto } from './dto/create-intended-impact.dto';
import { UpdateIntendedImpactDto } from './dto/update-intended-impact.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Intended Impacts')
@Controller('intended-impacts')
export class IntendedImpactController {
  constructor(private readonly intendedImpactService: IntendedImpactService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new intended impact' })
  @ApiResponse({
    status: 201,
    description: 'Intended impact created successfully',
    type: IntendedImpact,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async create(@Body() dto: CreateIntendedImpactDto): Promise<IntendedImpact> {
    return this.intendedImpactService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all intended impacts' })
  @ApiResponse({
    status: 200,
    description: 'Return all intended impacts',
    type: [IntendedImpact],
  })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async findAll(): Promise<IntendedImpact[]> {
    return this.intendedImpactService.findAll();
  }

  @Get('with-main-option')
  @ApiOperation({
    summary: 'Get all intended impacts with main option information',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all intended impacts with main option names',
  })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async findAllWithMainOption(): Promise<any[]> {
    return this.intendedImpactService.findAllWithMainOption();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an intended impact by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the intended impact',
    type: IntendedImpact,
  })
  @ApiResponse({ status: 404, description: 'Intended impact not found' })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('relations') relations?: string,
  ): Promise<IntendedImpact> {
    return this.intendedImpactService.findOne(id, relations);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an intended impact' })
  @ApiResponse({
    status: 200,
    description: 'Intended impact updated successfully',
    type: IntendedImpact,
  })
  @ApiResponse({ status: 404, description: 'Intended impact not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateIntendedImpactDto,
  ): Promise<IntendedImpact> {
    return this.intendedImpactService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an intended impact' })
  @ApiResponse({
    status: 200,
    description: 'Intended impact deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Intended impact not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.intendedImpactService.remove(id);
  }

  // Assign a MainOption to an IntendedImpact
  @Patch(':id/assign-main-option/:mainOptionId')
  @ApiOperation({ summary: 'Assign a MainOption to an IntendedImpact' })
  @ApiResponse({
    status: 200,
    description: 'MainOption assigned successfully',
    type: IntendedImpact,
  })
  @ApiResponse({
    status: 404,
    description: 'Intended impact or MainOption not found',
  })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async assignMainOption(
    @Param('id', new ParseUUIDPipe()) intendedImpactId: string,
    @Param('mainOptionId', new ParseUUIDPipe()) mainOptionId: string,
  ): Promise<IntendedImpact> {
    return this.intendedImpactService.assignMainOption(
      intendedImpactId,
      mainOptionId,
    );
  }

  // Assign a Place to an IntendedImpact
  @Patch(':id/assign-place/:placeId')
  @ApiOperation({ summary: 'Assign a Place to an IntendedImpact' })
  @ApiResponse({
    status: 200,
    description: 'Place assigned successfully',
    type: IntendedImpact,
  })
  @ApiResponse({
    status: 404,
    description: 'Intended impact or Place not found',
  })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async assignPlace(
    @Param('id', new ParseUUIDPipe()) intendedImpactId: string,
    @Param('placeId', new ParseUUIDPipe()) placeId: string,
  ): Promise<IntendedImpact> {
    return this.intendedImpactService.assignPlace(intendedImpactId, placeId);
  }

  @Get('by-main-option/:mainOptionId')
  @ApiOperation({
    summary: 'Get intended impacts by main option and optionally by place',
  })
  @ApiResponse({
    status: 200,
    description: 'Return intended impacts for the main option',
    type: [IntendedImpact],
  })
  @ApiResponse({ status: 404, description: 'No intended impacts found' })  async findByMainOptionAndPlace(
    @Param('mainOptionId', new ParseUUIDPipe()) mainOptionId: string,
    @Query('placeId') placeId?: string,
  ): Promise<IntendedImpact[]> {
    return this.intendedImpactService.findByMainOptionAndPlace(
      mainOptionId,
      placeId,
    );
  }

  @Get('count/number')
  @ApiOperation({ summary: 'Get total count of intended impacts' })
  @ApiResponse({ 
    status: 200, 
    description: 'Total count of intended impacts retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', example: 12 }
      }
    }
  })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async getIntendedImpactsCount(): Promise<{ count: number }> {
    return this.intendedImpactService.getIntendedImpactsCount();
  }
}
