import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Container } from '../entities/container.entity';
import { CloudinaryService } from '../common/services/cloudinary.service';

@Injectable()
export class ContainersService {
  constructor(
    @InjectRepository(Container)
    private readonly containerRepository: Repository<Container>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}  async create(createContainerDto: Partial<Container>, file?: Express.Multer.File): Promise<Container> {
    try {
      let imageUrl: string | undefined;
      
      // Si hay un archivo, subirlo a Cloudinary
      if (file) {
        try {
          imageUrl = await this.uploadContainerImage(file);
        } catch (uploadError) {
          console.error('Error uploading image to Cloudinary:', uploadError);
          // Continuar sin imagen si falla la subida
        }
      }

      // Procesar dimensions si viene como string JSON desde FormData
      let processedData = { ...createContainerDto };
      if (processedData.dimensions && typeof processedData.dimensions === 'string') {
        try {
          processedData.dimensions = JSON.parse(processedData.dimensions as string);
        } catch (error) {
          console.error('Error parsing dimensions:', error);
          processedData.dimensions = undefined;
        }
      }

      const containerData = {
        ...processedData,
        ...(imageUrl && { imageUrl })
      };

      const container = this.containerRepository.create(containerData);
      const saved = await this.containerRepository.save(container);
      if (!saved) {
        throw new InternalServerErrorException('Container could not be created');
      }
      return saved;
    } catch (error) {
      console.error('Error in create container:', error);
      throw error;
    }
  }

  async findAll(): Promise<Container[]> {
    try {
      const containers = await this.containerRepository.find({});
      if (!containers || containers.length === 0) {
        throw new NotFoundException('No containers found');
      }
      return containers;
    } catch (error) {
      console.error('Error in findAll containers:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Container> {
    try {
      const container = await this.containerRepository.findOne({ where: { id } });
      if (!container) {
        throw new NotFoundException('Container not found');
      }
      return container;
    } catch (error) {
      console.error('Error in findOne container:', error);
      throw error;
    }
  }  async update(id: string, data: Partial<Container>, file?: Express.Multer.File): Promise<Container> {
    try {
      const container = await this.containerRepository.findOne({ where: { id } });
      if (!container) {
        throw new NotFoundException('Container not found');
      }

      let updateData = { ...data };
      
      // Procesar dimensions si viene como string JSON desde FormData
      if (updateData.dimensions && typeof updateData.dimensions === 'string') {
        try {
          updateData.dimensions = JSON.parse(updateData.dimensions as string);
        } catch (error) {
          console.error('Error parsing dimensions:', error);
          updateData.dimensions = undefined;
        }
      }
      
      // Si hay un archivo, eliminar la imagen anterior de Cloudinary y subir la nueva
      if (file) {
        // Si el contenedor ya tiene una imagen, eliminarla de Cloudinary
        if (container.imageUrl && container.imageUrl.includes('cloudinary.com')) {
          try {
            const publicId = this.cloudinaryService.extractPublicId(container.imageUrl);
            if (publicId) {
              await this.cloudinaryService.deleteImage(publicId);
              console.log(`Imagen anterior del contenedor eliminada de Cloudinary: ${publicId}`);
            }
          } catch (deleteError) {
            console.warn(
              'Error al eliminar imagen anterior del contenedor de Cloudinary:',
              deleteError,
            );
            // Continuar con la subida de la nueva imagen aunque falle la eliminación
          }
        }

        try {
          const imageUrl = await this.uploadContainerImage(file);
          updateData.imageUrl = imageUrl;
        } catch (uploadError) {
          console.error('Error uploading image to Cloudinary:', uploadError);
          // Continuar sin actualizar la imagen si falla la subida
        }
      }

      await this.containerRepository.update(id, updateData);
      return this.findOne(id);
    } catch (error) {
      console.error('Error in update container:', error);
      throw error;
    }
  }
  async remove(id: string): Promise<void> {
    try {
      // Primero obtener el contenedor para verificar si tiene imagen
      const container = await this.containerRepository.findOne({ where: { id } });
      if (!container) {
        throw new NotFoundException('Container not found');
      }

      // Si el contenedor tiene imagen de Cloudinary, eliminarla
      if (container.imageUrl && container.imageUrl.includes('cloudinary.com')) {
        try {
          const publicId = this.cloudinaryService.extractPublicId(container.imageUrl);
          if (publicId) {
            await this.cloudinaryService.deleteImage(publicId);
            console.log(`Imagen del contenedor eliminada de Cloudinary: ${publicId}`);
          }
        } catch (deleteError) {
          console.warn(
            'Error al eliminar imagen del contenedor de Cloudinary:',
            deleteError,
          );
          // Continuar con la eliminación del contenedor aunque falle la eliminación de la imagen
        }
      }

      // Eliminar el contenedor de la base de datos
      const result = await this.containerRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Container not found');
      }
    } catch (error) {
      console.error('Error in remove container:', error);
      throw error;
    }
  }

  private async uploadContainerImage(file: Express.Multer.File): Promise<string> {
    // Usar el servicio de Cloudinary con configuración específica para contenedores
    return new Promise((resolve, reject) => {
      const cloudinary = require('cloudinary').v2;

      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'image',
            folder: 'aromalife/containers',
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
          },        )
        .end(file.buffer);
    });
  }

  async getContainersCount(): Promise<{ count: number }> {
    try {
      const count = await this.containerRepository.count();
      return { count };
    } catch (error) {
      console.error('Error in getContainersCount:', error);
      throw error;
    }
  }
}
