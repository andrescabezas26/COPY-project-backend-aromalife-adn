import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemController } from '../../../src/order-items/order-items.controller';
import { OrderItemService } from '../../../src/order-items/order-items.service';
import { OrderItem } from '../../../src/entities/order-item.entity';
import { Order, OrderStatus } from '../../../src/entities/order.entity';
import { Candle } from '../../../src/entities/candle.entity';
import { Gift } from '../../../src/entities/gift.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('OrderItemController', () => {
  let controller: OrderItemController;
  let service: OrderItemService;

  const mockUser = {
    id: '1',
    email: 'test@test.com',
    password: 'password',
    name: 'Test User',
    roles: ['user'],
    orders: [],
    carts: [],
    candles: [],
    isActive: true,
  };

  const mockOrder = {
    id: '1',
    totalAmount: 100,
    status: OrderStatus.PENDING,
    shippingAddress: {
      street: 'Test Street',
      city: 'Test City',
      state: 'Test State',
      country: 'Test Country',
      zipCode: '12345'
    },
    paymentDetails: {
      method: 'CREDIT_CARD',
      status: 'PENDING',
      transactionId: 'test-transaction-123'
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [],
    reviews: [],
    userId: mockUser
  };

  const mockContainer = {
    id: '1',
    name: 'Test Container',
    description: 'Test Description',
    price: 20,
    basePrice: 15,
    dimensions: {
      width: 10,
      height: 10,
      depth: 10
    },
    imageUrl: 'test-container.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    candles: []
  };

  const mockPlace = {
    id: '1',
    name: 'Test Place',
    icon: '🏠',
    intendedImpacts: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockMainOption = {
    id: '1',
    name: 'Test Option',
    description: 'Test Description',
    emoji: '🌟',
    intendedImpacts: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockIntendedImpact = {
    id: '1',
    name: 'Test Impact',
    icon: '🎯',
    description: 'Test Description',
    aromas: [],
    place: mockPlace,
    mainOption: mockMainOption
  };

  const mockAroma = {
    id: '1',
    name: 'Test Aroma',
    description: 'Test Description',
    price: 15,
    imageUrl: 'test-aroma.jpg',
    olfativePyramid: {
      salida: 'Top Note',
      corazon: 'Middle Note',
      fondo: 'Base Note'
    },
    intendedImpacts: [mockIntendedImpact],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    candles: []
  };

  const mockCandle = {
    id: '1',
    name: 'Test Candle',
    description: 'Test Description',
    price: 50,
    stock: 10,
    imageUrl: 'test-image.jpg',
    audioUrl: 'test-audio.mp3',
    message: 'Test Message',
    qrUrl: 'test-qr.png',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    cartItems: [],
    orderItems: [],
    container: mockContainer,
    aroma: mockAroma,
    user: mockUser
  };

  const mockGift = {
    id: '1',
    name: 'Test Gift',
    description: 'Test Description',
    price: 30,
    imageUrl: 'test-image.jpg',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    cartItems: [],
    orderItems: []
  };

  const mockOrderItem = {
    id: '1',
    order: mockOrder,
    candle: mockCandle,
    gift: mockGift,
    quantity: 2,
    unitPrice: 50,
    totalPrice: 100
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
      controllers: [OrderItemController],
      providers: [
        OrderItemService,
        { provide: getRepositoryToken(OrderItem), useFactory: mockRepo },
        { provide: getRepositoryToken(Order), useFactory: mockRepo },
        { provide: getRepositoryToken(Candle), useFactory: mockRepo },
        { provide: getRepositoryToken(Gift), useFactory: mockRepo }
      ],
    }).compile();

    controller = module.get<OrderItemController>(OrderItemController);
    service = module.get<OrderItemService>(OrderItemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      jest.spyOn(service, 'create').mockResolvedValue(mockOrderItem);
      const result = await controller.create(createDto);
      expect(result).toEqual(mockOrderItem);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of order items', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockOrderItem]);
      const result = await controller.findAll();
      expect(result).toEqual([mockOrderItem]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an order item', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockOrderItem);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockOrderItem);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw if order item not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());
      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an order item', async () => {
      const updateDto = {
        quantity: 3
      };

      jest.spyOn(service, 'update').mockResolvedValue({ ...mockOrderItem, ...updateDto });
      const result = await controller.update('1', updateDto);
      expect(result).toEqual({ ...mockOrderItem, ...updateDto });
      expect(service.update).toHaveBeenCalledWith('1', updateDto);
    });

    it('should throw if order item not found', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());
      await expect(controller.update('1', { quantity: 3 })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an order item', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
    });

    it('should throw if order item not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());
      await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('assignCandle', () => {
    it('should assign a candle to an order item', async () => {
      jest.spyOn(service, 'assignCandle').mockResolvedValue({ ...mockOrderItem, candle: mockCandle });
      const result = await controller.assignCandle('1', '1');
      expect(result).toEqual({ ...mockOrderItem, candle: mockCandle });
      expect(service.assignCandle).toHaveBeenCalledWith('1', '1');
    });

    it('should throw if order item not found', async () => {
      jest.spyOn(service, 'assignCandle').mockRejectedValue(new NotFoundException());
      await expect(controller.assignCandle('1', '1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('assignGift', () => {
    it('should assign a gift to an order item', async () => {
      jest.spyOn(service, 'assignGift').mockResolvedValue({ ...mockOrderItem, gift: mockGift });
      const result = await controller.assignGift('1', '1');
      expect(result).toEqual({ ...mockOrderItem, gift: mockGift });
      expect(service.assignGift).toHaveBeenCalledWith('1', '1');
    });

    it('should throw if order item not found', async () => {
      jest.spyOn(service, 'assignGift').mockRejectedValue(new NotFoundException());
      await expect(controller.assignGift('1', '1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('assignOrder', () => {
    it('should assign an order to an order item', async () => {
      jest.spyOn(service, 'assignOrder').mockResolvedValue({ ...mockOrderItem, order: mockOrder });
      const result = await controller.assignOrder('1', '1');
      expect(result).toEqual({ ...mockOrderItem, order: mockOrder });
      expect(service.assignOrder).toHaveBeenCalledWith('1', '1');
    });

    it('should throw if order item not found', async () => {
      jest.spyOn(service, 'assignOrder').mockRejectedValue(new NotFoundException());
      await expect(controller.assignOrder('1', '1')).rejects.toThrow(NotFoundException);
    });
  });
}); 