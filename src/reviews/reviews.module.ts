import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../entities/review.entity';
import { ReviewService } from './reviews.service';
import { ReviewController } from './reviews.controller';
import { PassportModule } from '@nestjs/passport';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), PassportModule.register({ defaultStrategy: 'jwt' }), OrdersModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewsModule {}
