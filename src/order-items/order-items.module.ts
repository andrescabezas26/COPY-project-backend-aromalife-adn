import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';
import { Candle } from '../entities/candle.entity';
import { Gift } from '../entities/gift.entity';
import { OrderItemService } from './order-items.service';
import { OrderItemController } from './order-items.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Order, Candle, Gift]), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService],
})
export class OrderItemModule {}