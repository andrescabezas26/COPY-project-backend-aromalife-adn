import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { GenerateLabelDto } from './dto/generate-label.dto';
import { CreateCustomLabelDto } from './dto/create-custom-label.dto';
import { Label } from '../entities/label.entity';

@ApiTags('labels')
@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new label' })
  @ApiResponse({
    status: 201,
    description: 'The label has been successfully created.',
    type: Label,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Candle not found.' })
  create(@Body() createLabelDto: CreateLabelDto): Promise<Label> {
    return this.labelsService.create(createLabelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active labels' })
  @ApiResponse({
    status: 200,
    description: 'Return all active labels.',
    type: [Label],
  })
  findAll(): Promise<Label[]> {
    return this.labelsService.findAll();
  }

  @Get('templates')
  @ApiOperation({ summary: 'Get all template labels' })
  @ApiResponse({
    status: 200,
    description: 'Return all template labels.',
    type: [Label],
  })
  getTemplates(): Promise<Label[]> {
    return this.labelsService.getTemplates();
  }

  @Get('candle/:candleId')
  @ApiOperation({ summary: 'Get label by candle ID' })
  @ApiParam({ name: 'candleId', description: 'Candle ID' })
  @ApiResponse({
    status: 200,
    description: 'Return label for the specified candle.',
    type: Label,
  })
  @ApiResponse({ status: 404, description: 'Candle not found.' })
  findByCandle(@Param('candleId') candleId: string): Promise<Label | null> {
    return this.labelsService.findByCandle(candleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a label by ID' })
  @ApiParam({ name: 'id', description: 'Label ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the label.',
    type: Label,
  })
  @ApiResponse({ status: 404, description: 'Label not found.' })
  findOne(@Param('id') id: string): Promise<Label> {
    return this.labelsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a label' })
  @ApiParam({ name: 'id', description: 'Label ID' })
  @ApiResponse({
    status: 200,
    description: 'The label has been successfully updated.',
    type: Label,
  })
  @ApiResponse({ status: 404, description: 'Label not found.' })
  update(
    @Param('id') id: string,
    @Body() updateLabelDto: UpdateLabelDto,
  ): Promise<Label> {
    return this.labelsService.update(id, updateLabelDto);
  }

  @Patch(':id/with-file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update a label with file upload' })
  @ApiParam({ name: 'id', description: 'Label ID' })
  @ApiResponse({
    status: 200,
    description: 'The label has been successfully updated.',
    type: Label,
  })
  @ApiResponse({ status: 404, description: 'Label not found.' })
  @ApiResponse({ status: 400, description: 'Invalid file or data.' })
  updateWithFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
    @Body('description') description?: string,
  ): Promise<Label> {
    return this.labelsService.updateWithFile(
      id,
      {
        name,
        description,
      },
      file,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a label' })
  @ApiParam({ name: 'id', description: 'Label ID' })
  @ApiResponse({
    status: 204,
    description: 'The label has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Label not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.labelsService.remove(id);
  }

  @Post('generate-ai')
  @ApiOperation({ summary: 'Generate a label using AI' })
  @ApiQuery({
    name: 'candleId',
    required: false,
    description: 'Optional candle ID to associate with the generated label',
  })
  @ApiResponse({
    status: 201,
    description: 'The label has been successfully generated.',
    type: Label,
  })
  @ApiResponse({ status: 400, description: 'Failed to generate label.' })
  generateWithAI(
    @Body() generateLabelDto: GenerateLabelDto,
    @Query('candleId') candleId?: string,
  ): Promise<Label> {
    return this.labelsService.generateWithAI(generateLabelDto, candleId);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a custom label with file upload' })
  @ApiResponse({
    status: 201,
    description: 'The custom label has been successfully created.',
    type: Label,
  })
  @ApiResponse({ status: 400, description: 'Invalid file or data.' })
  uploadCustomLabel(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
    @Body('description') description?: string,
  ): Promise<Label> {
    if (!name || !file) {
      throw new BadRequestException('Name and file are required');
    }

    return this.labelsService.createCustomLabel({
      file,
      name,
      description,
    });
  }
  @Post('upload-template')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a template label with file upload' })
  @ApiResponse({
    status: 201,
    description: 'The template label has been successfully created.',
    type: Label,
  })
  @ApiResponse({ status: 400, description: 'Invalid file or data.' })
  uploadTemplateLabel(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
    @Body('description') description?: string,
  ): Promise<Label> {
    if (!name || !file) {
      throw new BadRequestException('Name and file are required');
    }

    return this.labelsService.createTemplateLabel({
      file,
      name,
      description,
    });
  }
}
