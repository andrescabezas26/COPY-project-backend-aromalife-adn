import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewService } from '../../../src/reviews/reviews.service';
import { Review } from '../../../src/entities/review.entity';
import { Order, OrderStatus } from '../../../src/entities/order.entity';
import { NotFoundException } from '@nestjs/common';

describe('ReviewService', () => {
  let service: ReviewService;
  let reviewRepository: Repository<Review>;
  let orderRepository: Repository<Order>;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    password: 'hashedpassword',
    name: 'Test User',
    roles: ['user'],
    isActive: true,
    orders: [],
    reviews: [],
    carts: [],
    candles: []
  };

  const mockOrder = {
    id: '1',
    userId: mockUser,
    totalAmount: 100.0,
    status: OrderStatus.DELIVERED,
    shippingAddress: {
      street: 'Test Street',
      city: 'Test City',
      state: 'Test State',
      country: 'Test Country',
      zipCode: '12345',
    },
    paymentDetails: {
      method: 'credit_card',
      transactionId: '123456',
      status: 'completed',
    },
    isActive: true,
    gifts: [],
    reviews: [],
    items: [],
    candles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockReview = {
    id: '1',
    content: 'Test Review',
    rating: 5,
    isApproved: true,
    order: mockOrder,
    user: mockUser,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockReviewRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(review => Promise.resolve({ id: '1', ...review })),
    find: jest.fn().mockImplementation(() => Promise.resolve([mockReview])),
    findOne: jest.fn().mockImplementation((options) => {
      if (options?.where?.id === '1') {
        return Promise.resolve(mockReview);
      }
      if (options?.where?.id === '2') {
        return Promise.resolve(null);
      }
      return Promise.resolve(null);
    }),
    update: jest.fn().mockImplementation(() => Promise.resolve({ affected: 1 })),
    delete: jest.fn().mockImplementation(() => Promise.resolve({ affected: 1 })),
  };

  const mockOrderRepository = {
    findOne: jest.fn().mockImplementation((options) => {
      if (options?.where?.id === '1') {
        return Promise.resolve(mockOrder);
      }
      if (options?.where?.id === '2') {
        return Promise.resolve(null);
      }
      return Promise.resolve(null);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockReviewRepository,
        },
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    reviewRepository = module.get<Repository<Review>>(getRepositoryToken(Review));
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new review', async () => {
      const createReviewDto = {
        content: 'Test Review',
        rating: 5,
        isApproved: true,
        userId: '1',
        candleId: '1'
      };

      const result = await service.create(createReviewDto);
      expect(result).toEqual({
        id: '1',
        ...createReviewDto,
      });
      expect(reviewRepository.create).toHaveBeenCalledWith(createReviewDto);
      expect(reviewRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all reviews when no filter is provided', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockReview]);
      expect(reviewRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single review', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockReview);
      expect(reviewRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException when review not found', async () => {
      await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
      await expect(service.findOne('2')).rejects.toThrow('Review not found');
    });
  });

  describe('update', () => {
    it('should update a review', async () => {
      const updateReviewDto = { content: 'Updated Review' };
      const result = await service.update('1', updateReviewDto);
      expect(result).toEqual(mockReview);
      expect(reviewRepository.update).toHaveBeenCalledWith('1', updateReviewDto);
    });

    it('should throw NotFoundException when updating non-existent review', async () => {
      const updateReviewDto = { content: 'Updated Review' };
      await expect(service.update('2', updateReviewDto)).rejects.toThrow(NotFoundException);
      await expect(service.update('2', updateReviewDto)).rejects.toThrow('Review not found');
    });
  });

  describe('remove', () => {
    it('should remove a review', async () => {
      await service.remove('1');
      expect(reviewRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when removing non-existent review', async () => {
      await expect(service.remove('2')).rejects.toThrow(NotFoundException);
      await expect(service.remove('2')).rejects.toThrow('Review not found');
    });
  });

  describe('assignReviewToOrder', () => {
    it('should assign a review to an order', async () => {
      const result = await service.assignReviewToOrder('1', '1');
      expect(result).toBeDefined();
      expect(reviewRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['order'],
      });
      expect(orderRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException when review not found', async () => {
      await expect(service.assignReviewToOrder('2', '1')).rejects.toThrow(NotFoundException);
      await expect(service.assignReviewToOrder('2', '1')).rejects.toThrow('Review not found');
    });

    it('should throw NotFoundException when order not found', async () => {
      await expect(service.assignReviewToOrder('1', '2')).rejects.toThrow(NotFoundException);
      await expect(service.assignReviewToOrder('1', '2')).rejects.toThrow('Order not found');
    });
  });
}); 