import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candle } from '../entities/candle.entity';
import { Container } from '../entities/container.entity';
import { Aroma } from '../entities/aroma.entity';
import { Gift } from '../entities/gift.entity';
import { User } from '../auth/entity/user.entity';
import { CartItem } from '../entities/cart-item.entity';
import { OrderItem } from '../entities/order-item.entity';
import { CloudinaryService } from '../common/services/cloudinary.service';
import { QrGeneratorService } from '../common/services/qr-generator.service';
import { LabelsService } from '../labels/labels.service';

@Injectable()
export class CandlesService {
  constructor(
    @InjectRepository(Candle)
    private readonly candleRepository: Repository<Candle>,
    @InjectRepository(Container)
    private readonly containerRepository: Repository<Container>,
    @InjectRepository(Aroma)
    private readonly aromaRepository: Repository<Aroma>,
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly qrGeneratorService: QrGeneratorService,
    private readonly labelsService: LabelsService,
  ) {}

  async createCandle(data: Partial<Candle>): Promise<Candle> {
    try {
      const candle = this.candleRepository.create(data);
      const saved = await this.candleRepository.save(candle);
      if (!saved) {
        throw new InternalServerErrorException('Candle could not be created');
      }
      return saved;
    } catch (error) {
      console.error('Error in createCandle:', error);
      throw error;
    }
  }

  async createCandleWithFiles(
    data: {
      name: string;
      description?: string;
      labelId?: string;
      price: number;
      message?: string;
      audioUrl?: string;
      qrUrl?: string;
      containerId: string;
      aromaId: string;
      userId?: string;
      isActive?: boolean;
      labelName?: string;
      labelDescription?: string;
      labelType?: string;
      labelAiPrompt?: string;
    },
    audioFile?: Express.Multer.File,
    labelFile?: Express.Multer.File,
    modelFile?: Express.Multer.File,
    baseUrl?: string,
  ): Promise<Candle> {
    try {
      // Validate required relationships exist
      const container = await this.containerRepository.findOne({
        where: { id: data.containerId },
      });
      if (!container) {
        throw new NotFoundException(
          `Container with ID ${data.containerId} not found`,
        );
      }

      const aroma = await this.aromaRepository.findOne({
        where: { id: data.aromaId },
      });
      if (!aroma) {
        throw new NotFoundException(`Aroma with ID ${data.aromaId} not found`);
      }

      let user: User | undefined = undefined;
      if (data.userId) {
        const foundUser = await this.userRepository.findOne({
          where: { id: data.userId },
        });
        if (!foundUser) {
          throw new NotFoundException(`User with ID ${data.userId} not found`);
        }
        user = foundUser;
      }

      // Upload audio file if provided
      let audioUrlFile: string | undefined;
      if (audioFile) {
        try {
          console.log('Attempting to upload audio file to Cloudinary...');
          audioUrlFile = await this.cloudinaryService.uploadAudio(audioFile);
          console.log(
            'Audio uploaded successfully to Cloudinary:',
            audioUrlFile,
          );
        } catch (error) {
          console.error('Failed to upload audio to Cloudinary:', error);
          throw new BadRequestException(
            `Failed to upload audio: ${error.message}`,
          );
        }
      } else {
        console.log('No audio file to upload');
      }

      // Upload 3D model file if provided
      let modelUrl: string | undefined;
      if (modelFile) {
        try {
          console.log('Attempting to upload 3D model file to Cloudinary...');
          modelUrl = await this.cloudinaryService.upload3DModel(modelFile);
          console.log(
            '3D model uploaded successfully to Cloudinary:',
            modelUrl,
          );
        } catch (error) {
          console.error('Failed to upload 3D model to Cloudinary:', error);
          throw new BadRequestException(
            `Failed to upload 3D model: ${error.message}`,
          );
        }
      } else {
        console.log('No 3D model file to upload');
      }

      // Handle label logic based on type and data from Zustand store
      let label;
      let prompt: string | undefined;

      // Process label data from frontend store
      if (data.labelType && data.labelName) {
        console.log('Processing label data from frontend store...');
        console.log('Label type:', data.labelType);
        console.log('Label name:', data.labelName);
        console.log('Label description:', data.labelDescription);
        console.log('Label AI prompt:', data.labelAiPrompt);

        // Handle conditional logic based on label type
        if (data.labelType === 'ai-generated' && data.labelAiPrompt) {
          prompt = data.labelAiPrompt;
          console.log('Using AI prompt for ai-generated label:', prompt);

          if (labelFile) {
            try {
              console.log('Creating AI-generated label...');
              label = await this.labelsService.createCustomLabel({
                file: labelFile,
                name: data.labelName,
                description: prompt, // Use aiPrompt as description for AI-generated
              });
              console.log('AI-generated label created successfully:', label);
            } catch (error) {
              console.error('Failed to create AI-generated label:', error);
              throw new BadRequestException(
                `Failed to create AI-generated label: ${error.message}`,
              );
            }
          } else {
            console.log('No label file provided for AI-generated label');
          }
        } else if (data.labelType === 'custom' && data.labelDescription) {
          console.log(
            'Using description for custom label:',
            data.labelDescription,
          );

          if (labelFile) {
            try {
              console.log('Creating custom label...');
              label = await this.labelsService.createCustomLabel({
                file: labelFile,
                name: data.labelName,
                description: data.labelDescription,
              });
              console.log('Custom label created successfully:', label);
            } catch (error) {
              console.error('Failed to create custom label:', error);
              throw new BadRequestException(
                `Failed to create custom label: ${error.message}`,
              );
            }
          } else {
            console.log('No label file provided for custom label');
          }
        } else if (data.labelType === 'template' && data.labelId) {
          try {
            console.log('Finding template label by ID...');
            label = await this.labelsService.findOne(data.labelId);
            console.log('Template label found:', label);
          } catch (error) {
            console.error('Failed to find template label:', error);
            throw new BadRequestException(
              `Failed to find template label: ${error.message}`,
            );
          }
        }
      } else if (labelFile) {
        // Fallback to original logic for backwards compatibility
        try {
          console.log('Creating custom label (fallback)...');
          label = await this.labelsService.createCustomLabel({
            file: labelFile,
            name: `${data.name} - Custom Label`,
            description: 'Custom label created for candle',
          });
          console.log('Custom label created successfully:', label);
        } catch (error) {
          console.error('Failed to create custom label:', error);
          throw new BadRequestException(
            `Failed to create custom label: ${error.message}`,
          );
        }
      } else if (data.labelId) {
        // Fallback to original logic for backwards compatibility
        try {
          console.log('Finding template label...');
          label = await this.labelsService.findOne(data.labelId);
          console.log('Template label found:', label);
        } catch (error) {
          console.error('Failed to find template label:', error);
          throw new BadRequestException(
            `Failed to find template label: ${error.message}`,
          );
        }
      } else {
        console.log('No label data provided');
      }

      // Create candle with uploaded URLs and relationships
      const candleData: Partial<Candle> = {
        name: data.name,
        description: data.description,
        price: data.price,
        message: data.message,
        qrUrl: data.qrUrl,
        audioUrl: audioUrlFile || data.audioUrl,
        modelUrl: modelUrl,
        container: container,
        aroma: aroma,
      };

      if (user) {
        candleData.user = user;
      }

      // Associate the label ID if we have one (either custom or template)
      if (label) {
        console.log('Associating label ID with candle:', label.id);
        candleData.label = label.id;
      }

      console.log('Creating candle with data:', {
        ...candleData,
        container: {
          id: candleData.container?.id,
          name: candleData.container?.name,
        },
        aroma: { id: candleData.aroma?.id, name: candleData.aroma?.name },
        user: candleData.user
          ? { id: candleData.user.id, email: candleData.user.email }
          : undefined,
      });

      const candle = this.candleRepository.create(candleData);
      const saved = await this.candleRepository.save(candle);

      if (!saved) {
        throw new InternalServerErrorException('Candle could not be created');
      }

      // Generate and upload QR code after candle is created
      try {
        console.log('Generating QR code for candle:', saved.id);

        // Use provided baseUrl or fallback to localhost
        const qrBaseUrl = baseUrl || 'http://localhost:3000';

        // Generate QR code buffer
        const qrBuffer = await this.qrGeneratorService.generateCandleQR(
          saved.id,
          qrBaseUrl,
        );

        // Upload QR code to Cloudinary
        const qrUrl = await this.cloudinaryService.uploadQRCode(
          qrBuffer,
          saved.id,
        );

        // Update candle with QR URL
        saved.qrUrl = qrUrl;
        await this.candleRepository.save(saved);

        console.log('QR code generated and uploaded successfully:', qrUrl);
      } catch (qrError) {
        console.error('Failed to generate/upload QR code:', qrError);
        // Don't fail the entire candle creation if QR generation fails
        // Just log the error and continue
      }

      console.log('Candle created successfully:', {
        id: saved.id,
        name: saved.name,
        audioUrl: saved.audioUrl,
        qrUrl: saved.qrUrl,
        labelType: data.labelType,
        prompt: prompt, // Log the prompt variable when it's an ai-generated type
      });

      return saved;
    } catch (error) {
      console.error('Error in createCandleWithFiles:', error);
      throw error;
    }
  }

  async findAll(): Promise<Candle[]> {
    try {
      const candles = await this.candleRepository.find({
        relations: ['container', 'aroma', 'user', 'label'],
      });
      if (!candles || candles.length === 0) {
        throw new NotFoundException('No candles found');
      }
      return candles;
    } catch (error) {
      console.error('Error in findAll candles:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Candle> {
    try {
      const candle = await this.candleRepository.findOne({
        where: { id },
        relations: ['container', 'aroma', 'user', 'label'],
      });
      if (!candle) {
        throw new NotFoundException('Candle not found');
      }
      return candle;
    } catch (error) {
      console.error('Error in findOne candle:', error);
      throw error;
    }
  }

  async findByUser(userId: string): Promise<Candle[]> {
    try {
      // First check if user exists
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // Find all candles for this user
      const candles = await this.candleRepository.find({
        where: { user: { id: userId } },
        relations: ['container', 'aroma', 'user', 'label'],
      });

      return candles;
    } catch (error) {
      console.error('Error in findByUser candles:', error);
      throw error;
    }
  }

  async update(id: string, data: Partial<Candle>): Promise<Candle> {
    try {
      const exists = await this.candleRepository.findOne({ where: { id } });
      if (!exists) {
        throw new NotFoundException('Candle not found');
      }
      await this.candleRepository.update(id, data);
      return this.findOne(id);
    } catch (error) {
      console.error('Error in update candle:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const candle = await this.candleRepository.findOne({
        where: { id },
        relations: ['label'], // Include label to check for label images
      });
      if (!candle) {
        throw new NotFoundException('Candle not found');
      }

      console.log(`=== DELETING CANDLE ${id} ===`);
      console.log('Candle data:', {
        id: candle.id,
        name: candle.name,
        qrUrl: candle.qrUrl,
        audioUrl: candle.audioUrl,
        labelImageUrl: candle.label?.imageUrl,
      });

      // Check if candle is referenced in any orders (completed purchases)
      const orderItemsCount = await this.orderItemRepository.count({
        where: { candle: { id } },
      });

      if (orderItemsCount > 0) {
        throw new ConflictException(
          'Cannot delete candle that has been purchased. This candle is referenced in existing orders.',
        );
      }

      // Remove any cart items that reference this candle (pending items in cart)
      await this.cartItemRepository.delete({ candle: { id } });
      console.log(`Removed cart items for candle ${id}`);

      // Delete associated files from Cloudinary before deleting the candle
      const deletePromises: Promise<void>[] = [];

      // Delete QR code image if exists
      if (candle.qrUrl) {
        const qrPublicId = this.cloudinaryService.extractPublicId(candle.qrUrl);
        console.log(`QR URL: ${candle.qrUrl}`);
        console.log(`Extracted QR publicId: ${qrPublicId}`);

        if (qrPublicId) {
          console.log(`Deleting QR image from Cloudinary: ${qrPublicId}`);
          deletePromises.push(
            this.cloudinaryService
              .deleteImage(qrPublicId)
              .then(() => {
                console.log(`✅ Successfully deleted QR image: ${qrPublicId}`);
              })
              .catch((error) => {
                console.error(
                  `❌ Failed to delete QR image ${qrPublicId}:`,
                  error,
                );
                // Don't throw, just log the error to avoid blocking candle deletion
              }),
          );
        } else {
          console.log('⚠️ Could not extract publicId from QR URL');
        }
      }

      // Delete audio file if exists
      if (candle.audioUrl && candle.audioUrl.includes('cloudinary.com')) {
        const audioPublicId = this.cloudinaryService.extractPublicId(
          candle.audioUrl,
        );
        console.log(`Audio URL: ${candle.audioUrl}`);
        console.log(`Extracted Audio publicId: ${audioPublicId}`);

        if (audioPublicId) {
          console.log(`Deleting audio file from Cloudinary: ${audioPublicId}`);
          deletePromises.push(
            this.cloudinaryService
              .deleteAudio(audioPublicId)
              .then(() => {
                console.log(
                  `✅ Successfully deleted audio file: ${audioPublicId}`,
                );
              })
              .catch((error) => {
                console.error(
                  `❌ Failed to delete audio file ${audioPublicId}:`,
                  error,
                );
                // Don't throw, just log the error to avoid blocking candle deletion
              }),
          );
        } else {
          console.log('⚠️ Could not extract publicId from Audio URL');
        }
      }

      // Delete label image if exists
      if (candle.label && candle.label.imageUrl) {
        const labelPublicId = this.cloudinaryService.extractPublicId(
          candle.label.imageUrl,
        );
        console.log(`Label URL: ${candle.label.imageUrl}`);
        console.log(`Extracted Label publicId: ${labelPublicId}`);

        if (labelPublicId) {
          console.log(`Deleting label image from Cloudinary: ${labelPublicId}`);
          deletePromises.push(
            this.cloudinaryService
              .deleteImage(labelPublicId)
              .then(() => {
                console.log(
                  `✅ Successfully deleted label image: ${labelPublicId}`,
                );
              })
              .catch((error) => {
                console.error(
                  `❌ Failed to delete label image ${labelPublicId}:`,
                  error,
                );
                // Don't throw, just log the error to avoid blocking candle deletion
              }),
          );
        } else {
          console.log('⚠️ Could not extract publicId from Label URL');
        }
      }

      // Delete 3D model file if exists
      if (candle.modelUrl && candle.modelUrl.includes('cloudinary.com')) {
        const modelPublicId = this.cloudinaryService.extractPublicId(
          candle.modelUrl,
        );
        console.log(`Model URL: ${candle.modelUrl}`);
        console.log(`Extracted Model publicId: ${modelPublicId}`);

        if (modelPublicId) {
          console.log(`Deleting 3D model from Cloudinary: ${modelPublicId}`);
          deletePromises.push(
            this.cloudinaryService
              .delete3DModel(modelPublicId)
              .then(() => {
                console.log(
                  `✅ Successfully deleted 3D model: ${modelPublicId}`,
                );
              })
              .catch((error) => {
                console.error(
                  `❌ Failed to delete 3D model ${modelPublicId}:`,
                  error,
                );
                // Don't throw, just log the error to avoid blocking candle deletion
              }),
          );
        } else {
          console.log('⚠️ Could not extract publicId from Model URL');
        }
      }

      // Wait for all Cloudinary deletions to complete (with error handling)
      if (deletePromises.length > 0) {
        console.log(
          `Waiting for ${deletePromises.length} Cloudinary deletions to complete...`,
        );
        const results = await Promise.allSettled(deletePromises);
        console.log('Cloudinary deletion results:', results);
      } else {
        console.log('No Cloudinary files to delete');
      }

      // Delete the candle from database
      await this.candleRepository.delete(id);
      console.log(`✅ Candle ${id} successfully deleted from database`);
    } catch (error) {
      console.error('❌ Error in remove candle:', error);
      throw error;
    }
  }

  async getContainers(): Promise<Container[]> {
    try {
      return await this.containerRepository.find();
    } catch (error) {
      console.error('Error in getContainers:', error);
      throw error;
    }
  }

  async getGifts(): Promise<Gift[]> {
    try {
      return await this.giftRepository.find();
    } catch (error) {
      console.error('Error in getGifts:', error);
      throw error;
    }
  }

  async assignAroma(candleId: string, aromaId: string): Promise<Candle> {
    try {
      const candle = await this.candleRepository.findOne({
        where: { id: candleId },
      });
      if (!candle) {
        throw new NotFoundException('Candle not found');
      }

      const aroma = await this.aromaRepository.findOne({
        where: { id: aromaId },
      });
      if (!aroma) {
        throw new NotFoundException('Aroma not found');
      }

      candle.aroma = aroma;
      return await this.candleRepository.save(candle);
    } catch (error) {
      console.error('Error in assignAroma:', error);
      throw error;
    }
  }

  async assignContainer(
    candleId: string,
    containerId: string,
  ): Promise<Candle> {
    try {
      const candle = await this.candleRepository.findOne({
        where: { id: candleId },
      });
      if (!candle) {
        throw new NotFoundException('Candle not found');
      }

      const container = await this.containerRepository.findOne({
        where: { id: containerId },
      });
      if (!container) {
        throw new NotFoundException('Container not found');
      }

      candle.container = container;
      return await this.candleRepository.save(candle);
    } catch (error) {
      console.error('Error in assignContainer:', error);
      throw error;
    }
  }

  async assignCandleToUser(candleId: string, userId: string): Promise<Candle> {
    const candle = await this.candleRepository.findOne({
      where: { id: candleId },
    });
    if (!candle) {
      throw new Error('Candle not found');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    candle.user = user;
    return this.candleRepository.save(candle);
  }
}
