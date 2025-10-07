import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';
import { Gift } from '../entities/gift.entity';
import { Candle } from '../entities/candle.entity';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Cart, Gift, Candle]), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
