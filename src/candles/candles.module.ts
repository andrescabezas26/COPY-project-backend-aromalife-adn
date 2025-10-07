import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandlesService } from './candles.service';
import { CandlesController } from './candles.controller';
import { Candle } from '../entities/candle.entity';
import { Container } from '../entities/container.entity';
import { Aroma } from '../entities/aroma.entity';
import { Gift } from '../entities/gift.entity';
import { Order } from '../entities/order.entity';
import { CartItem } from '../entities/cart-item.entity';
import { OrderItem } from '../entities/order-item.entity';
import { User } from '../auth/entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryService } from '../common/services/cloudinary.service';
import { QrGeneratorService } from '../common/services/qr-generator.service';
import { LabelsService } from '../labels/labels.service';
import { Label } from '../entities/label.entity';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Candle,
      Container,
      Aroma,
      Gift,
      Order,
      CartItem,
      OrderItem,
      User,
      Label,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    AiModule,
  ],
  controllers: [CandlesController],
  providers: [
    CandlesService,
    CloudinaryService,
    QrGeneratorService,
    LabelsService,
  ],
  exports: [CandlesService, TypeOrmModule],
})
export class CandlesModule {}
