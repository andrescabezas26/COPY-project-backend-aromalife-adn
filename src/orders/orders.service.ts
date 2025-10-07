import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../entities/order.entity';
import { Candle } from '../entities/candle.entity';
import { User } from '../auth/entity/user.entity';
import { PaymentDetailsDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Candle)
    private readonly candleRepository: Repository<Candle>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createOrder(data: Partial<Order>): Promise<Order> {
    try {
      const order = this.orderRepository.create(data);
      const saved = await this.orderRepository.save(order);
      if (!saved) {
        throw new InternalServerErrorException('Order could not be created');
      }
      
      // Devolver la orden con las relaciones cargadas para las notificaciones
      const fullOrder = await this.orderRepository.findOne({
        where: { id: saved.id },
        relations: ['userId', 'items', 'items.candle', 'items.gift'],
      });
      
      return fullOrder || saved;
    } catch (error) {
      console.error('Error in createOrder:', error);
      throw error;
    }
  }  async findAll(
    page: number = 1,
    limit: number = 10,
    searchTerm?: string,
    status?: OrderStatus | 'ALL',
  ): Promise<{
    orders: Order[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const skip = (page - 1) * limit;
      
      // Build query with QueryBuilder for complex filtering
      const queryBuilder = this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.userId', 'user')
        .leftJoinAndSelect('order.items', 'items')
        .leftJoinAndSelect('items.candle', 'candle')
        .leftJoinAndSelect('items.gift', 'gift')
        .orderBy('order.createdAt', 'DESC');

      // Add search filtering
      if (searchTerm) {
        queryBuilder.andWhere(
          '(order.id ILIKE :search OR user.name ILIKE :search OR user.lastName ILIKE :search OR user.email ILIKE :search)',
          { search: `%${searchTerm}%` }
        );
      }

      // Add status filtering
      if (status && status !== 'ALL') {
        queryBuilder.andWhere('order.status = :status', { status });
      }

      // Get total count for pagination
      const total = await queryBuilder.getCount();

      // Apply pagination
      queryBuilder.skip(skip).take(limit);

      // Execute query
      const orders = await queryBuilder.getMany();

      return {
        orders,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      console.error('Error in findAll orders:', error);
      throw error;
    }
  }
  async findOne(id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['userId', 'items', 'items.candle', 'items.gift'],
      });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return order;
    } catch (error) {
      console.error('Error in findOne order:', error);
      throw error;
    }
  }

  async findByUser(userId: string): Promise<Order[]> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const orders = await this.orderRepository.find({
        where: { userId: { id: userId } },
        relations: ['userId', 'items', 'items.candle', 'items.gift'],
        order: { createdAt: 'DESC' },
      });

      return orders;
    } catch (error) {
      console.error('Error in findByUser orders:', error);
      throw error;
    }
  }

  async update(id: string, data: Partial<Order>): Promise<Order> {
    try {
      const exists = await this.orderRepository.findOne({ where: { id } });
      if (!exists) {
        throw new NotFoundException('Order not found');
      }
      await this.orderRepository.update(id, data);
      return this.findOne(id);
    } catch (error) {
      console.error('Error in update order:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const exists = await this.orderRepository.findOne({ where: { id } });
      if (!exists) {
        throw new NotFoundException('Order not found');
      }
      await this.orderRepository.delete(id);
    } catch (error) {
      console.error('Error in remove order:', error);
      throw error;
    }
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    try {
      const exists = await this.orderRepository.findOne({ where: { id } });
      if (!exists) {
        throw new NotFoundException('Order not found');
      }
      await this.orderRepository.update(id, { status });
      return this.findOne(id);
    } catch (error) {
      console.error('Error in updateStatus order:', error);
      throw error;
    }
  }

  calculateTotalAmount(candles: Candle[]): number {
    return candles.reduce((total, candle) => total + candle.price, 0);
  }

  async processPayment(
    orderId: string,
    paymentDetails: PaymentDetailsDto,
  ): Promise<Order> {
    const order = await this.findOne(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.paymentDetails = paymentDetails;
    order.status = OrderStatus.PROCESSING;
    return this.orderRepository.save(order);
  }

  async assignUserToOrder(orderId: string, userId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['user'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
  
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    order.userId = user;
    return this.orderRepository.save(order);
  }
}
