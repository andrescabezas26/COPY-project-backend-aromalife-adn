import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { CandlesService } from './candles.service';
import { Candle } from '../entities/candle.entity';
import { Container } from '../entities/container.entity';
import { Gift } from '../entities/gift.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { CreateCandleWithFilesDto } from './dto/create-candle-with-files.dto';

@ApiTags('Candles')
@Controller('candles')
export class CandlesController {
  constructor(private readonly candlesService: CandlesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new candle' })
  @ApiResponse({
    status: 201,
    description: 'Candle created successfully',
    type: Candle,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async create(@Body() createCandleDto: Partial<Candle>): Promise<Candle> {
    return this.candlesService.createCandle(createCandleDto);
  }

  @Post('with-files')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audioFile', maxCount: 1 },
      { name: 'labelFile', maxCount: 1 },
      { name: 'modelFile', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new candle with audio and label files' })
  @ApiResponse({
    status: 201,
    description: 'Candle created successfully with uploaded files',
    type: Candle,
  })
  @ApiResponse({ status: 400, description: 'Bad request or file upload error' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async createWithFiles(
    @Req() req: Request,
    @UploadedFiles()
    files: {
      audioFile?: Express.Multer.File[];
      labelFile?: Express.Multer.File[];
      modelFile?: Express.Multer.File[];
    },
    @Body('name') name: string,
    @Body('description') description?: string,
    @Body('price') price?: string,
    @Body('message') message?: string,
    @Body('qrUrl') qrUrl?: string,
    @Body('containerId') containerId?: string,
    @Body('aromaId') aromaId?: string,
    @Body('userId') userId?: string,
    @Body('isActive') isActive?: string,
    @Body('labelId') labelId?: string,
    @Body('audioUrl') audioUrl?: string,
    @Body('labelName') labelName?: string,
    @Body('labelDescription') labelDescription?: string,
    @Body('labelType') labelType?: string,
    @Body('labelAiPrompt') labelAiPrompt?: string,
  ): Promise<Candle> {
    // Validate required fields
    if (!name || !price || !containerId || !aromaId) {
      throw new BadRequestException(
        'Name, price, containerId, and aromaId are required',
      );
    }

    // Parse numeric and boolean values
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      throw new BadRequestException('Price must be a valid number');
    }

    const parsedIsActive = isActive === 'true' || isActive === undefined;

    // Extract files
    const audioFile = files.audioFile?.[0];
    const labelFile = files.labelFile?.[0];
    const modelFile = files.modelFile?.[0];

    console.log('Extracted files:', {
      audioFile: audioFile
        ? {
            originalname: audioFile.originalname,
            mimetype: audioFile.mimetype,
            size: audioFile.size,
          }
        : 'No audio file',
      labelFile: labelFile
        ? {
            originalname: labelFile.originalname,
            mimetype: labelFile.mimetype,
            size: labelFile.size,
          }
        : 'No label file',
      modelFile: modelFile
        ? {
            originalname: modelFile.originalname,
            mimetype: modelFile.mimetype,
            size: modelFile.size,
          }
        : 'No model file',
    });

    // Validate audio file type if provided
    if (audioFile && !audioFile.mimetype.startsWith('audio/')) {
      throw new BadRequestException('Audio file must be an audio format');
    }

    // Validate label file type if provided
    if (labelFile && !labelFile.mimetype.startsWith('image/')) {
      throw new BadRequestException('Label file must be an image format');
    }

    // Validate model file type if provided (GLTF, GLB, or other 3D formats)
    if (modelFile) {
      const validModelTypes = [
        'model/gltf-binary',
        'model/gltf+json',
        'application/octet-stream', // For .glb files
        'model/obj',
        'application/json', // For .gltf files
      ];
      const fileExtension = modelFile.originalname
        .toLowerCase()
        .split('.')
        .pop();
      const validExtensions = ['glb', 'gltf', 'obj'];

      if (
        !validModelTypes.includes(modelFile.mimetype) &&
        !validExtensions.includes(fileExtension ?? '')
      ) {
        throw new BadRequestException(
          'Model file must be a valid 3D format (GLB, GLTF, OBJ)',
        );
      }
    }

    // Get base URL for QR generation (use frontend URL from environment)
    const baseUrl =
      process.env.FRONTEND_URL ||
      process.env.FRONTEND_URL_QR ||
      'http://localhost:3000';

    return this.candlesService.createCandleWithFiles(
      {
        name,
        description,
        price: parsedPrice,
        message,
        qrUrl,
        containerId,
        aromaId,
        userId,
        isActive: parsedIsActive,
        labelId,
        audioUrl,
        labelName,
        labelDescription,
        labelType,
        labelAiPrompt,
      },
      audioFile,
      labelFile,
      modelFile,
      baseUrl,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all candles' })
  @ApiResponse({
    status: 200,
    description: 'Return all candles',
    type: [Candle],
  })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async findAll(): Promise<Candle[]> {
    return this.candlesService.findAll();
  }

  @Get('containers')
  @ApiOperation({ summary: 'Get all available containers' })
  @ApiResponse({
    status: 200,
    description: 'Return all containers',
    type: [Container],
  })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async getContainers(): Promise<Container[]> {
    return this.candlesService.getContainers();
  }

  @Get('gifts')
  @ApiOperation({ summary: 'Get all available gifts' })
  @ApiResponse({ status: 200, description: 'Return all gifts', type: [Gift] })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async getGifts(): Promise<Gift[]> {
    return this.candlesService.getGifts();
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all candles for a specific user',
    description:
      'Retrieves all candles created by or assigned to a specific user. Includes relationships with container, aroma, user, and labels.',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all candles for the specified user',
    type: [Candle],
  })
  @ApiResponse({
    status: 404,
    description: 'User not found or no candles found',
  })
  @ApiResponse({ status: 400, description: 'Invalid user ID format' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async findByUser(@Param('userId') userId: string): Promise<Candle[]> {
    return this.candlesService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a candle by id' })
  @ApiResponse({ status: 200, description: 'Return the candle', type: Candle })
  @ApiResponse({ status: 404, description: 'Candle not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async findOne(@Param('id') id: string): Promise<Candle> {
    return this.candlesService.findOne(id);
  }

  @Get('qr/:id')
  @ApiOperation({ summary: 'Get candle details for QR code access (public)' })
  @ApiResponse({
    status: 200,
    description: 'Return the candle details for QR access',
    type: Candle,
  })
  @ApiResponse({ status: 404, description: 'Candle not found' })
  async findOneForQR(@Param('id') id: string): Promise<Candle> {
    return this.candlesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a candle' })
  @ApiResponse({
    status: 200,
    description: 'Candle updated successfully',
    type: Candle,
  })
  @ApiResponse({ status: 404, description: 'Candle not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async update(
    @Param('id') id: string,
    @Body() updateCandleDto: Partial<Candle>,
  ): Promise<Candle> {
    return this.candlesService.update(id, updateCandleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a candle' })
  @ApiResponse({ status: 200, description: 'Candle deleted successfully' })
  @ApiResponse({ status: 404, description: 'Candle not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async remove(@Param('id') id: string): Promise<void> {
    return this.candlesService.remove(id);
  }

  @Patch(':candleId/assign-aroma/:aromaId')
  @ApiOperation({ summary: 'Assign an aroma to a candle' })
  @ApiResponse({
    status: 200,
    description: 'Aroma assigned successfully',
    type: Candle,
  })
  @ApiResponse({ status: 404, description: 'Candle or aroma not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async assignAroma(
    @Param('candleId') candleId: string,
    @Param('aromaId') aromaId: string,
  ): Promise<Candle> {
    return this.candlesService.assignAroma(candleId, aromaId);
  }

  @Patch(':candleId/assign-container/:containerId')
  @ApiOperation({ summary: 'Assign a container to a candle' })
  @ApiResponse({
    status: 200,
    description: 'Container assigned successfully',
    type: Candle,
  })
  @ApiResponse({ status: 404, description: 'Candle or container not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async assignContainer(
    @Param('candleId') candleId: string,
    @Param('containerId') containerId: string,
  ): Promise<Candle> {
    return this.candlesService.assignContainer(candleId, containerId);
  }

  // Assigning a user to a candle
  @Patch(':candleId/assign-user/:userId')
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async assignCandleToUser(
    @Param('candleId') candleId: string,
    @Param('userId') userId: string,
  ): Promise<Candle> {
    return this.candlesService.assignCandleToUser(candleId, userId);
  }
}
