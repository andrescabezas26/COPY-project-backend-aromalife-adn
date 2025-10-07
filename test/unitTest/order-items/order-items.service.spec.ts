import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemService } from '../../../src/order-items/order-items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderItem } from '../../../src/entities/order-item.entity';
import { Order } from '../../../src/entities/order.entity';
import { Candle } from '../../../src/entities/candle.entity';
import { Gift } from '../../../src/entities/gift.entity';
import { NotFoundException } from '@nestjs/common';

describe('OrderItemService', () => {
  let service: OrderItemService;
  let orderItemRepo: any;
  let orderRepo: any;
  let candleRepo: any;
  let giftRepo: any;

  const mockOrder = {
    id: '1',
    totalAmount: 100,
    status: 'PENDING',
    shippingAddress: {
      street: 'Test Street',
      city: 'Test City',
      state: 'Test State',
      country: 'Test Country',
      zipCode: '12345'
    },
    paymentDetails: {
      method: 'CREDIT_CARD',
      status: 'PENDING'
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockCandle = {
    id: '1',
    name: 'Test Candle',
    description: 'Test Description',
    price: 50,
    stock: 10,
    isActive: true
  };

  const mockGift = {
    id: '1',
    name: 'Test Gift',
    description: 'Test Description',
    price: 25,
    imageUrl: 'test.jpg',
    isActive: true
  };

  const mockOrderItem = {
    id: '1',
    order: mockOrder,
    candle: mockCandle,
    gift: mockGift,
    quantity: 2,
    unitPrice: 50,
    totalPrice: 100,
    calculatePrice: jest.fn()
  };

  const mockRepo = () => ({
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    delete: jest.fn()
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemService,
        { provide: getRepositoryToken(OrderItem), useFactory: mockRepo },
        { provide: getRepositoryToken(Order), useFactory: mockRepo },
        { provide: getRepositoryToken(Candle), useFactory: mockRepo },
        { provide: getRepositoryToken(Gift), useFactory: mockRepo }
      ],
    }).compile();

    service = module.get<OrderItemService>(OrderItemService);
    orderItemRepo = module.get(getRepositoryToken(OrderItem));
    orderRepo = module.get(getRepositoryToken(Order));
    candleRepo = module.get(getRepositoryToken(Candle));
    giftRepo = module.get(getRepositoryToken(Gift));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an order item', async () => {
      const createDto = {
        orderId: '1',
        candleId: '1',
        giftId: '1',
        quantity: 2,
        unitPrice: 50,
        totalPrice: 100
      };

      orderRepo.findOne.mockResolvedValue(mockOrder);
      candleRepo.findOne.mockResolvedValue(mockCandle);
      giftRepo.findOne.mockResolvedValue(mockGift);
      orderItemRepo.create.mockReturnValue(mockOrderItem);
      orderItemRepo.save.mockResolvedValue(mockOrderItem);

      const result = await service.create(createDto);
      expect(result).toEqual(mockOrderItem);
      expect(orderItemRepo.create).toHaveBeenCalled();
      expect(orderItemRepo.save).toHaveBeenCalled();
    });

    it('should throw if order not found', async () => {
      const createDto = {
        orderId: '1',
        quantity: 2,
        unitPrice: 50,
        totalPrice: 100
      };

      orderRepo.findOne.mockResolvedValue(null);
      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of order items', async () => {
      orderItemRepo.find.mockResolvedValue([mockOrderItem]);
      const result = await service.findAll();
      expect(result).toEqual([mockOrderItem]);
    });
  });

  describe('findOne', () => {
    it('should return an order item', async () => {
      orderItemRepo.findOne.mockResolvedValue(mockOrderItem);
      const result = await service.findOne('1');
      expect(result).toEqual(mockOrderItem);
    });

    it('should throw if order item not found', async () => {
      orderItemRepo.findOne.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an order item', async () => {
      const updateDto = {
        quantity: 3,
        unitPrice: 60,
        totalPrice: 180
      };

      orderItemRepo.findOne.mockResolvedValue(mockOrderItem);
      orderItemRepo.save.mockResolvedValue({ ...mockOrderItem, ...updateDto });

      const result = await service.update('1', updateDto);
      expect(result).toEqual({ ...mockOrderItem, ...updateDto });
    });

    it('should throw if order item not found', async () => {
      orderItemRepo.findOne.mockResolvedValue(null);
      await expect(service.update('1', { quantity: 3 })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an order item', async () => {
      orderItemRepo.delete.mockResolvedValue({ affected: 1 });
      await service.remove('1');
      expect(orderItemRepo.delete).toHaveBeenCalledWith('1');
    });

    it('should throw if order item not found', async () => {
      orderItemRepo.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('assignCandle', () => {
    it('should assign a candle to an order item', async () => {
      orderItemRepo.findOne.mockResolvedValue(mockOrderItem);
      candleRepo.findOne.mockResolvedValue(mockCandle);
      orderItemRepo.save.mockResolvedValue({ ...mockOrderItem, candle: mockCandle });

      const result = await service.assignCandle('1', '1');
      expect(result).toEqual({ ...mockOrderItem, candle: mockCandle });
    });

    it('should throw if order item not found', async () => {
      orderItemRepo.findOne.mockResolvedValue(null);
      await expect(service.assignCandle('1', '1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('assignGift', () => {
    it('should assign a gift to an order item', async () => {
      orderItemRepo.findOne.mockResolvedValue(mockOrderItem);
      giftRepo.findOne.mockResolvedValue(mockGift);
      orderItemRepo.save.mockResolvedValue({ ...mockOrderItem, gift: mockGift });

      const result = await service.assignGift('1', '1');
      expect(result).toEqual({ ...mockOrderItem, gift: mockGift });
    });

    it('should throw if order item not found', async () => {
      orderItemRepo.findOne.mockResolvedValue(null);
      await expect(service.assignGift('1', '1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('assignOrder', () => {
    it('should assign an order to an order item', async () => {
      orderItemRepo.findOne.mockResolvedValue(mockOrderItem);
      orderRepo.findOne.mockResolvedValue(mockOrder);
      orderItemRepo.save.mockResolvedValue({ ...mockOrderItem, order: mockOrder });

      const result = await service.assignOrder('1', '1');
      expect(result).toEqual({ ...mockOrderItem, order: mockOrder });
    });

    it('should throw if order item not found', async () => {
      orderItemRepo.findOne.mockResolvedValue(null);
      await expect(service.assignOrder('1', '1')).rejects.toThrow(NotFoundException);
    });
  });
}); 