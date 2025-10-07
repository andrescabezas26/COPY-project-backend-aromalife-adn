import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from '../../../src/reviews/reviews.controller';
import { ReviewService } from '../../../src/reviews/reviews.service';
import { Review } from '../../../src/entities/review.entity';
import { Order, OrderStatus } from '../../../src/entities/order.entity';
import { User } from '../../../src/auth/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ReviewController', () => {
  let controller: ReviewController;
  let service: ReviewService;

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

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((review) =>
      Promise.resolve({
        id: '1',
        ...review,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ),
    find: jest.fn().mockImplementation(() => Promise.resolve([mockReview])),
    findOne: jest
      .fn()
      .mockImplementation(({ where: { id } }) =>
        id === '1' ? Promise.resolve(mockReview) : Promise.resolve(null),
      ),
    update: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ affected: 1 })),
    delete: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Order),
          useValue: {
            findOne: jest.fn().mockImplementation(({ where: { id } }) =>
              id === '1' ? Promise.resolve(mockOrder) : Promise.resolve(null),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of reviews', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockReview]);
    });
  });

  describe('findOne', () => {
    it('should return a review', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockReview);
    });
  });

  describe('create', () => {
    it('should create a review', async () => {
      const createReviewDto = {
        content: 'Test Review',
        rating: 5,
        isApproved: true,
        order: mockOrder,
        user: mockUser,
      };
      const result = await controller.create(createReviewDto);
      expect(result).toEqual({
        id: '1',
        ...createReviewDto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('update', () => {
    it('should update a review', async () => {
      const updateReviewDto = { content: 'Updated Review' };
      const result = await controller.update('1', updateReviewDto);
      expect(result).toEqual(mockReview);
    });
  });

  describe('remove', () => {
    it('should remove a review', async () => {
      const result = await controller.remove('1');
      expect(result).toBeUndefined();
    });
  });
});
