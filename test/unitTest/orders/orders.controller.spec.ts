import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../../../src/orders/orders.controller';
import { OrdersService } from '../../../src/orders/orders.service';
import { Order, OrderStatus } from '../../../src/entities/order.entity';
import { CreateOrderDto } from '../../../src/orders/dto/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  const mockOrder = {
    id: '1',
    status: OrderStatus.PENDING,
    totalAmount: 100,
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
    items: [
      {
        id: '1',
        quantity: 2,
        unitPrice: 50,
        totalPrice: 100,
        candle: { id: '1', name: 'Test Candle', price: 50 },
      },
    ],
    user: { id: '1', email: 'test@example.com' },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockService = {
    createOrder: jest.fn().mockResolvedValue(mockOrder),
    findAll: jest.fn().mockResolvedValue([mockOrder]),
    findOne: jest.fn().mockResolvedValue(mockOrder),
    update: jest.fn().mockResolvedValue(mockOrder),
    remove: jest.fn().mockResolvedValue(undefined),
    updateStatus: jest.fn().mockResolvedValue(mockOrder),
    processPayment: jest.fn().mockResolvedValue(mockOrder),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockOrder]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single order', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockOrder);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const updateOrderDto = { status: OrderStatus.PROCESSING };
      const result = await controller.update('1', updateOrderDto);
      expect(result).toEqual(mockOrder);
      expect(service.update).toHaveBeenCalledWith('1', updateOrderDto);
    });
  });

  describe('remove', () => {
    it('should delete an order', async () => {
      const result = await controller.remove('1');
      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });

  describe('updateStatus', () => {
    it('should update the status of an order', async () => {
      const result = await controller.updateStatus('1', OrderStatus.SHIPPED);
      expect(result).toEqual(mockOrder);
      expect(service.updateStatus).toHaveBeenCalledWith('1', OrderStatus.SHIPPED);
    });
  });

  describe('processPayment', () => {
    it('should process payment for an order', async () => {
      const paymentDetails = {
        method: 'credit_card',
        transactionId: '123456',
        status: 'completed',
      };
      const result = await controller.processPayment('1', paymentDetails);
      expect(result).toEqual(mockOrder);
      expect(service.processPayment).toHaveBeenCalledWith('1', paymentDetails);
    });
  });
});