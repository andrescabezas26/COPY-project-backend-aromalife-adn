import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftsController } from './gifts.controller';
import { GiftsService } from './gifts.service';
import { Gift } from '../entities/gift.entity';
import { Order } from '../entities/order.entity';
import { PassportModule } from '@nestjs/passport';
import { CloudinaryService } from '../common/services/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gift, Order]), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [GiftsController],
  providers: [GiftsService, CloudinaryService],
  exports: [GiftsService, TypeOrmModule],
})
export class GiftsModule {}
