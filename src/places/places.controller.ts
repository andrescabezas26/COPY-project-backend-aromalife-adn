import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { Place } from '../entities/place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Places')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new place' })
  @ApiResponse({
    status: 201,
    description: 'Place created successfully',
    type: Place,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async create(@Body() createPlaceDto: CreatePlaceDto): Promise<Place> {
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all places' })
  @ApiResponse({ status: 200, description: 'Return all places', type: [Place] })
  async findAll(): Promise<Place[]> {
    return this.placesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a place by id' })
  @ApiResponse({ status: 200, description: 'Return the place', type: Place })
  @ApiResponse({ status: 404, description: 'Place not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async findOne(@Param('id') id: string): Promise<Place> {
    return this.placesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a place' })
  @ApiResponse({
    status: 200,
    description: 'Place updated successfully',
    type: Place,
  })
  @ApiResponse({ status: 404, description: 'Place not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async update(
    @Param('id') id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ): Promise<Place> {
    return this.placesService.update(id, updatePlaceDto);  }

  @Get('count/number')
  @ApiOperation({ summary: 'Get total count of places' })
  @ApiResponse({ 
    status: 200, 
    description: 'Total count of places retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', example: 6 }
      }
    }
  })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async getPlacesCount(): Promise<{ count: number }> {
    return this.placesService.getPlacesCount();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a place' })
  @ApiResponse({ status: 200, description: 'Place deleted successfully' })
  @ApiResponse({ status: 404, description: 'Place not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async remove(@Param('id') id: string): Promise<void> {
    return this.placesService.remove(id);
  }
}
