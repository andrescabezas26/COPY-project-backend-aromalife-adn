import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Label } from '../entities/label.entity';
import { Candle } from '../entities/candle.entity';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { GenerateLabelDto } from './dto/generate-label.dto';
import { AiService } from '../ai/ai.service';
import { CloudinaryService } from '../common/services/cloudinary.service';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private labelRepository: Repository<Label>,
    @InjectRepository(Candle)
    private candleRepository: Repository<Candle>,
    private aiService: AiService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createLabelDto: CreateLabelDto): Promise<Label> {
    const { candleId, ...labelData } = createLabelDto;

    const label = this.labelRepository.create(labelData);

    if (candleId) {
      const candle = await this.candleRepository.findOne({
        where: { id: candleId },
      });
      if (!candle) {
        throw new NotFoundException(`Candle with ID ${candleId} not found`);
      }
      label.candle = candle;
    }

    return this.labelRepository.save(label);
  }

  async findAll(): Promise<Label[]> {
    return this.labelRepository.find({
      relations: ['candle'],
      where: { isActive: true },
    });
  }

  async findByCandle(candleId: string): Promise<Label | null> {
    const candle = await this.candleRepository.findOne({
      where: { id: candleId },
    });

    if (!candle) {
      throw new NotFoundException(`Candle with ID ${candleId} not found`);
    }

    return this.labelRepository.findOne({
      where: {
        candle: { id: candleId },
        isActive: true,
      },
      relations: ['candle'],
    });
  }

  async findOne(id: string): Promise<Label> {
    const label = await this.labelRepository.findOne({
      where: { id },
      relations: ['candle'],
    });

    if (!label) {
      throw new NotFoundException(`Label with ID ${id} not found`);
    }

    return label;
  }

  async update(id: string, updateLabelDto: UpdateLabelDto): Promise<Label> {
    const { candleId, ...labelData } = updateLabelDto;

    const label = await this.findOne(id);

    if (candleId) {
      const candle = await this.candleRepository.findOne({
        where: { id: candleId },
      });
      if (!candle) {
        throw new NotFoundException(`Candle with ID ${candleId} not found`);
      }
      label.candle = candle;
    }

    Object.assign(label, labelData);
    return this.labelRepository.save(label);
  }

  async updateWithFile(
    id: string,
    data: Partial<Label>,
    file?: Express.Multer.File,
  ): Promise<Label> {
    try {
      const label = await this.findOne(id);

      let updateData = { ...data };

      // If there's a file, upload it to Cloudinary
      if (file) {
        try {
          const imageUrl = await this.cloudinaryService.uploadLabelImage(file);
          updateData.imageUrl = imageUrl;
        } catch (uploadError) {
          console.error('Error uploading image to Cloudinary:', uploadError);
          throw new BadRequestException(
            `Failed to upload image: ${uploadError.message}`,
          );
        }
      }

      Object.assign(label, updateData);
      return this.labelRepository.save(label);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error('Error in updateWithFile:', error);
      throw new BadRequestException(`Failed to update label: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    const label = await this.findOne(id);

    // Delete image from Cloudinary if exists
    if (label.imageUrl && label.imageUrl.includes('cloudinary.com')) {
      const imagePublicId = this.cloudinaryService.extractPublicId(
        label.imageUrl,
      );
      console.log(`Label image URL: ${label.imageUrl}`);
      console.log(`Extracted image publicId: ${imagePublicId}`);

      if (imagePublicId) {
        try {
          console.log(`Deleting label image from Cloudinary: ${imagePublicId}`);
          await this.cloudinaryService.deleteImage(imagePublicId);
          console.log(`✅ Successfully deleted label image: ${imagePublicId}`);
        } catch (error) {
          console.error(
            `❌ Failed to delete label image ${imagePublicId}:`,
            error,
          );
          // Don't throw, just log the error to avoid blocking label deletion
        }
      } else {
        console.log('⚠️ Could not extract publicId from Label image URL');
      }
    }

    // Perform soft delete
    label.isActive = false;
    await this.labelRepository.save(label);
  }

  async generateWithAI(
    generateLabelDto: GenerateLabelDto,
    candleId?: string,
  ): Promise<Label> {
    try {
      // Generate image using AI service
      const imageUrl = await this.aiService.generateImage(
        generateLabelDto.prompt,
      );

      if (!imageUrl) {
        throw new BadRequestException('Failed to generate image with AI');
      }

      // Create label with AI-generated image
      const createLabelDto: CreateLabelDto = {
        name:
          generateLabelDto.name || `AI Generated - ${new Date().toISOString()}`,
        imageUrl,
        type: 'ai-generated',
        aiPrompt: generateLabelDto.prompt,
        candleId,
      };

      return this.create(createLabelDto);
    } catch (error) {
      throw new BadRequestException(
        `Failed to generate label: ${error.message}`,
      );
    }
  }

  async getTemplates(): Promise<Label[]> {
    return this.labelRepository.find({
      where: {
        type: 'template',
        isActive: true,
      },
      relations: ['candle'],
    });
  }

  async createCustomLabel(data: {
    file: Express.Multer.File;
    name: string;
    description?: string;
  }): Promise<Label> {
    const { file, name, description } = data;

    if (!file) {
      throw new BadRequestException('Image file is required for custom labels');
    }

    // Validar que el archivo sea una imagen
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('File must be an image');
    }

    try {
      // Subir imagen a Cloudinary en una carpeta específica para labels
      const imageUrl = await this.cloudinaryService.uploadLabelImage(file);

      // Crear la etiqueta personalizada
      const labelData: CreateLabelDto = {
        name,
        description,
        imageUrl,
        type: 'custom',
        isActive: true,
      };

      return this.create(labelData);
    } catch (error) {
      throw new BadRequestException(
        `Failed to create custom label: ${error.message}`,
      );
    }
  }

  async createTemplateLabel(data: {
    file: Express.Multer.File;
    name: string;
    description?: string;
  }): Promise<Label> {
    const { file, name, description } = data;

    if (!file) {
      throw new BadRequestException('Image file is required for custom labels');
    }

    // Validar que el archivo sea una imagen
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('File must be an image');
    }

    try {
      // Subir imagen a Cloudinary en una carpeta específica para labels
      const imageUrl = await this.cloudinaryService.uploadLabelImage(file);

      // Crear la etiqueta personalizada
      const labelData: CreateLabelDto = {
        name,
        description,
        imageUrl,
        type: 'template',
        isActive: true,
      };

      return this.create(labelData);
    } catch (error) {
      throw new BadRequestException(
        `Failed to create custom label: ${error.message}`,
      );
    }
  }
}
