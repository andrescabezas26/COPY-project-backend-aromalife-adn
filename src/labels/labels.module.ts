import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';
import { Label } from '../entities/label.entity';
import { Candle } from '../entities/candle.entity';
import { AiModule } from '../ai/ai.module';
import { CloudinaryService } from '../common/services/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Label, Candle]), AiModule],
  controllers: [LabelsController],
  providers: [LabelsService, CloudinaryService],
  exports: [LabelsService],
})
export class LabelsModule {}
