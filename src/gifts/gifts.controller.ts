import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GiftsService } from './gifts.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { Gift } from '../entities/gift.entity';
import { UpdateGiftDto } from './dto/update-gift.dto';

@ApiTags('Gifts')
@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Create a new gift' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Gift created successfully', type: Gift })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async create(
    @Body() createGiftDto: Partial<Gift>,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Gift> {
    return this.giftsService.create(createGiftDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all gifts' })
  @ApiResponse({ status: 200, description: 'Return all gifts', type: [Gift] })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async findAll(): Promise<Gift[]> {
    return this.giftsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a gift by id' })
  @ApiResponse({ status: 200, description: 'Return the gift', type: Gift })
  @ApiResponse({ status: 404, description: 'Gift not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async findOne(@Param('id') id: string): Promise<Gift> {
    return this.giftsService.findOne(id);
  }
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Update a gift' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Gift updated successfully', type: Gift })
  @ApiResponse({ status: 404, description: 'Gift not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async update(
    @Param('id') id: string,
    @Body() updateGiftDto: Partial<Gift>,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Gift> {
    return this.giftsService.update(id, updateGiftDto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a gift' })
  @ApiResponse({ status: 200, description: 'Gift deleted successfully' })
  @ApiResponse({ status: 404, description: 'Gift not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async remove(@Param('id') id: string): Promise<void> {
    return this.giftsService.remove(id);
  }
}
