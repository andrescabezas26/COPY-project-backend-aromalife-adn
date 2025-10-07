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
import { AromasService } from './aromas.service';
import { Aroma } from '../entities/aroma.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Aromas')
@Controller('aromas')
export class AromasController {
  constructor(private readonly aromasService: AromasService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new aroma' })
  @ApiResponse({
    status: 201,
    description: 'Aroma created successfully',
    type: Aroma,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async create(@Body() createAromaDto: Partial<Aroma>): Promise<Aroma> {
    return this.aromasService.create(createAromaDto);
  }
  @Get()
  @ApiOperation({ summary: 'Get all aromas' })
  @ApiResponse({ status: 200, description: 'Return all aromas', type: [Aroma] })
  async findAll(@Query('relations') relations?: string): Promise<Aroma[]> {
    return this.aromasService.findAll(relations);
  }

  @Get('by-main-option/:mainOptionId')
  @ApiOperation({
    summary: 'Get aromas filtered by main option and optionally by place',
  })
  @ApiResponse({
    status: 200,
    description: 'Return aromas for the main option',
    type: [Aroma],
  })
  @ApiResponse({ status: 404, description: 'No aromas found' })
  async findByMainOptionAndPlace(
    @Param('mainOptionId', new ParseUUIDPipe()) mainOptionId: string,
    @Query('placeId') placeId?: string,
  ): Promise<Aroma[]> {
    return this.aromasService.findByMainOptionAndPlace(mainOptionId, placeId);
  }

  @Get('by-intended-impact/:intendedImpactId')
  @ApiOperation({
    summary: 'Get aromas filtered by intended impact (emotion from test)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return aromas for the intended impact',
    type: [Aroma],
  })
  @ApiResponse({ status: 404, description: 'No aromas found' })
  async findByIntendedImpact(
    @Param('intendedImpactId', new ParseUUIDPipe()) intendedImpactId: string,
  ): Promise<Aroma[]> {
    return this.aromasService.findByIntendedImpact(intendedImpactId);
  }

  @Get('by-test-results/:intendedImpactId')
  @ApiOperation({
    summary:
      'Get aromas filtered by complete test results (intendedImpact, mainOption, place)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return aromas for the complete test results',
    type: [Aroma],
  })
  @ApiResponse({ status: 404, description: 'No aromas found' })
  async findByCompleteTestResults(
    @Param('intendedImpactId', new ParseUUIDPipe()) intendedImpactId: string,
    @Query('mainOptionId') mainOptionId?: string,
    @Query('placeId') placeId?: string,
  ): Promise<Aroma[]> {
    return this.aromasService.findByCompleteTestResults(
      intendedImpactId,
      mainOptionId,
      placeId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an aroma by id' })
  @ApiResponse({ status: 200, description: 'Return the aroma', type: Aroma })
  @ApiResponse({ status: 404, description: 'Aroma not found' })
  async findOne(@Param('id') id: string): Promise<Aroma> {
    return this.aromasService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an aroma' })
  @ApiResponse({
    status: 200,
    description: 'Aroma updated successfully',
    type: Aroma,
  })
  @ApiResponse({ status: 404, description: 'Aroma not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async update(
    @Param('id') id: string,
    @Body() updateAromaDto: Partial<Aroma>,
  ): Promise<Aroma> {
    return this.aromasService.update(id, updateAromaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an aroma' })
  @ApiResponse({ status: 200, description: 'Aroma deleted successfully' })
  @ApiResponse({ status: 404, description: 'Aroma not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async remove(@Param('id') id: string): Promise<void> {
    return this.aromasService.remove(id);
  }

  // Assign an IntendedImpact to an Aroma
  @Patch(':id/assign-intended-impact/:intendedImpactId')
  @ApiOperation({ summary: 'Assign an intended impact to an aroma' })
  @ApiResponse({
    status: 200,
    description: 'Intended impact assigned successfully',
    type: Aroma,
  })
  @ApiResponse({
    status: 404,
    description: 'Aroma or intended impact not found',
  })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async assignIntendedImpact(
    @Param('id', new ParseUUIDPipe()) aromaId: string,
    @Param('intendedImpactId', new ParseUUIDPipe()) intendedImpactId: string,
  ): Promise<Aroma> {
    return this.aromasService.assignIntendedImpact(aromaId, intendedImpactId);
  }

  // Remove an IntendedImpact from an Aroma
  @Patch(':id/remove-intended-impact/:intendedImpactId')
  @ApiOperation({ summary: 'Remove an intended impact from an aroma' })
  @ApiResponse({
    status: 200,
    description: 'Intended impact removed successfully',
    type: Aroma,
  })  @ApiResponse({
    status: 404,
    description: 'Aroma or intended impact not found',
  })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async removeIntendedImpact(
    @Param('id', new ParseUUIDPipe()) aromaId: string,
    @Param('intendedImpactId', new ParseUUIDPipe()) intendedImpactId: string,
  ): Promise<Aroma> {
    return this.aromasService.removeIntendedImpact(aromaId, intendedImpactId);
  }

  @Get('count/number')
  @ApiOperation({ summary: 'Get total count of aromas' })
  @ApiResponse({ 
    status: 200, 
    description: 'Total count of aromas retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', example: 30 }
      }
    }
  })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async getAromasCount(): Promise<{ count: number }> {
    return this.aromasService.getAromasCount();
  }
}
