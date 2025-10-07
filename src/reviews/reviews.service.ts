import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createReviewDto: Partial<Review>): Promise<Review> {
    try {
      const review = this.reviewRepository.create(createReviewDto);
      const saved = await this.reviewRepository.save(review);
      if (!saved) {
        throw new InternalServerErrorException('Review could not be created');
      }
      return saved;
    } catch (error) {
      console.error('Error in create review:', error);
      throw error;
    }
  }

  async findAll(): Promise<Review[]> {
    try {
      const reviews = await this.reviewRepository.find({});
      if (!reviews || reviews.length === 0) {
        throw new NotFoundException('No reviews found');
      }
      return reviews;
    } catch (error) {
      console.error('Error in findAll reviews:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Review> {
    try {
      const review = await this.reviewRepository.findOne({ where: { id } });
      if (!review) {
        throw new NotFoundException('Review not found');
      }
      return review;
    } catch (error) {
      console.error('Error in findOne review:', error);
      throw error;
    }
  }

  async update(id: string, updateReviewDto: Partial<Review>): Promise<Review> {
    try {
      const exists = await this.reviewRepository.findOne({ where: { id } });
      if (!exists) {
        throw new NotFoundException('Review not found');
      }
      await this.reviewRepository.update(id, updateReviewDto);
      return this.findOne(id);
    } catch (error) {
      console.error('Error in update review:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const exists = await this.reviewRepository.findOne({ where: { id } });
      if (!exists) {
        throw new NotFoundException('Review not found');
      }
      await this.reviewRepository.delete(id);
    } catch (error) {
      console.error('Error in remove review:', error);
      throw error;
    }
  }

  async assignReviewToOrder(reviewId: string, orderId: string): Promise<Review> {
    try {
      const review = await this.reviewRepository.findOne({
        where: { id: reviewId },
        relations: ['order'],
      });
      if (!review) {
        throw new NotFoundException('Review not found');
      }
    
      const order = await this.orderRepository.findOne({ where: { id: orderId } });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
    
      review.order = order;
      return this.reviewRepository.save(review);
    } catch (error) {
      console.error('Error in assignReviewToOrder:', error);
      throw error;
    }
  }
}
