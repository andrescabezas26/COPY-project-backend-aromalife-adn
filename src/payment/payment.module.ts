import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { CartModule } from '../cart/cart.module';
import { AuthModule } from '../auth/auth.module';
import { OrdersModule } from '../orders/orders.module';
import { OrderItemModule } from '../order-items/order-items.module';
import { NotificationModule } from '../notifications/notification.module';

@Module({
  imports: [CartModule, AuthModule, OrdersModule, OrderItemModule, NotificationModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}