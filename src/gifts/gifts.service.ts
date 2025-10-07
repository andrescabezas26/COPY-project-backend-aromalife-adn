import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from '../entities/gift.entity';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { CloudinaryService } from '../common/services/cloudinary.service';

@Injectable()
export class GiftsService {
  constructor(
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(data: Partial<Gift>, file?: Express.Multer.File): Promise<Gift> {
    try {

      console.log("Estoy en el create deeeeeee GiftsService");

      let imageUrl: string | undefined;
      
      // Si hay un archivo, subirlo a Cloudinary
      if (file) {
        try {
          imageUrl = await this.uploadGiftImage(file);
        } catch (uploadError) {
          console.error('Error uploading image to Cloudinary:', uploadError);
          // Continuar sin imagen si falla la subida
        }
      }

      const giftData = {
        ...data,
        ...(imageUrl && { imageUrl })
      };

      const gift = this.giftRepository.create(giftData);
      const saved = await this.giftRepository.save(gift);
      if (!saved) {
        throw new InternalServerErrorException('Gift could not be created');
      }
      return saved;
    } catch (error) {
      console.error('Error in create gift:', error);
      throw error;
    }
  }

  async findAll(): Promise<Gift[]> {
    try {
      const gifts = await this.giftRepository.find({});
      if (!gifts || gifts.length === 0) {
        throw new NotFoundException('No gifts found');
      }
      return gifts;
    } catch (error) {
      console.error('Error in findAll gifts:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Gift> {
    try {
      const gift = await this.giftRepository.findOne({ where: { id } });
      if (!gift) {
        throw new NotFoundException('Gift not found');
      }
      return gift;
    } catch (error) {
      console.error('Error in findOne gift:', error);
      throw error;
    }
  }  async update(id: string, data: Partial<Gift>, file?: Express.Multer.File): Promise<Gift> {
    try {
      const gift = await this.giftRepository.findOne({ where: { id } });
      if (!gift) {
        throw new NotFoundException('Gift not found');
      }

      let updateData = { ...data };
      
      // Si hay un archivo, eliminar la imagen anterior de Cloudinary y subir la nueva
      if (file) {
        // Si el regalo ya tiene una imagen, eliminarla de Cloudinary
        if (gift.imageUrl && gift.imageUrl.includes('cloudinary.com')) {
          try {
            const publicId = this.cloudinaryService.extractPublicId(gift.imageUrl);
            if (publicId) {
              await this.cloudinaryService.deleteImage(publicId);
              console.log(`Imagen anterior del regalo eliminada de Cloudinary: ${publicId}`);
            }
          } catch (deleteError) {
            console.warn(
              'Error al eliminar imagen anterior del regalo de Cloudinary:',
              deleteError,
            );
            // Continuar con la subida de la nueva imagen aunque falle la eliminación
          }
        }

        try {
          const imageUrl = await this.uploadGiftImage(file);
          updateData.imageUrl = imageUrl;
        } catch (uploadError) {
          console.error('Error uploading image to Cloudinary:', uploadError);
          // Continuar sin actualizar la imagen si falla la subida
        }
      }

      await this.giftRepository.update(id, updateData);
      return this.findOne(id);
    } catch (error) {
      console.error('Error in update gift:', error);
      throw error;
    }
  }  async remove(id: string): Promise<void> {
    try {
      // Primero obtener el regalo para verificar si tiene imagen
      const gift = await this.giftRepository.findOne({ where: { id } });
      if (!gift) {
        throw new NotFoundException('Gift not found');
      }

      // Si el regalo tiene imagen de Cloudinary, eliminarla
      if (gift.imageUrl && gift.imageUrl.includes('cloudinary.com')) {
        try {
          const publicId = this.cloudinaryService.extractPublicId(gift.imageUrl);
          if (publicId) {
            await this.cloudinaryService.deleteImage(publicId);
            console.log(`Imagen del regalo eliminada de Cloudinary: ${publicId}`);
          }
        } catch (deleteError) {
          console.warn(
            'Error al eliminar imagen del regalo de Cloudinary:',
            deleteError,
          );
          // Continuar con la eliminación del regalo aunque falle la eliminación de la imagen
        }
      }

      // Eliminar el regalo de la base de datos
      const result = await this.giftRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Gift not found');
      }
    } catch (error) {
      console.error('Error in remove gift:', error);
      throw error;
    }
  }

  private async uploadGiftImage(file: Express.Multer.File): Promise<string> {
    // Usar el servicio de Cloudinary con configuración específica para regalos
    return new Promise((resolve, reject) => {
      const cloudinary = require('cloudinary').v2;

      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'image',
            folder: 'aromalife/gifts',
            transformation: [
              { width: 800, height: 600, crop: 'fit' },
              { quality: 'auto:good' },
              { format: 'webp' },
            ],
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (result) {
              resolve(result.secure_url);
            } else {
              reject(new Error('No result from Cloudinary upload'));
            }
          },
        )
        .end(file.buffer);
    });
  }
}