import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../../../src/orders/orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order, OrderStatus } from '../../../src/entities/order.entity';
import { Candle } from '../../../src/entities/candle.entity';
import { User } from '../../../src/auth/entity/user.entity';
import { Container } from '../../../src/entities/container.entity';
import { Aroma } from '../../../src/entities/aroma.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Cart } from '../../../src/entities/cart.entity';
import { CartItem } from '../../../src/entities/cart-item.entity';
import { Gift } from '../../../src/entities/gift.entity';

const mockContainer: Container = {
  id: 'container1',
  name: 'Glass Container',
  description: 'Beautiful glass container',
  imageUrl: 'https://example.com/container.jpg',
  basePrice: 5,
  dimensions: {
    height: 10,
    width: 8,
    depth: 8
  },
  candles: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockAroma: Aroma = {
  id: 'aroma1',
  name: 'Lavender',
  description: 'Calming lavender scent',
  olfativePyramid: {
    salida: 'Fresh lavender',
    corazon: 'Floral notes',
    fondo: 'Woody undertones'
  },
  imageUrl: 'https://example.com/aroma.jpg',
  intendedImpacts: [],
  candles: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockUser: User = {
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

const mockCandles: Candle[] = [
  { 
    id: 'c1', 
    name: 'Lavender', 
    price: 10, 
    description: 'Lavender scented candle',
    imageUrl: 'https://example.com/lavender.jpg',
    audioUrl: 'https://example.com/lavender.mp3',
    message: 'Enjoy the calming scent',
    qrUrl: 'https://example.com/lavender-qr.png',
    container: mockContainer,
    aroma: mockAroma,
    orderItems: [],
    cartItems: [],
    user: mockUser,
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: 'c2', 
    name: 'Vanilla', 
    price: 15, 
    description: 'Vanilla scented candle',
    imageUrl: 'https://example.com/vanilla.jpg',
    audioUrl: 'https://example.com/vanilla.mp3',
    message: 'Sweet vanilla aroma',
    qrUrl: 'https://example.com/vanilla-qr.png',
    container: mockContainer,
    aroma: mockAroma,
    orderItems: [],
    cartItems: [],
    user: mockUser,
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
];

const mockOrder: Order = {
  id: '1',
  totalAmount: 100,
  shippingAddress: {
    street: '123 Test St',
    city: 'Test City',
    state: 'Test State',
    country: 'Test Country',
    zipCode: '12345'
  },
  status: OrderStatus.PENDING,
  paymentDetails: {
    method: 'credit_card',
    transactionId: '123',
    status: 'pending'
  },
  items: [],
  reviews: [],
  userId: mockUser,
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockGift: Gift = {
  id: '1',
  name: 'Test Gift',
  description: 'A test gift',
  price: 15,
  imageUrl: 'https://example.com/gift.jpg',
  cartItems: [],
  orderItems: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockCart: Cart = {
  id: '1',
  userId: mockUser,
  checkedOut: false,
  cartItems: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockCartItem: CartItem = {
  id: '1',
  cart: mockCart,
  candle: mockCandles[0],
  gift: mockGift,
  quantity: 2,
  unitPrice: 10,
  totalPrice: 20,
  calculatePrice: jest.fn()
};

describe('OrdersService', () => {
  let service: OrdersService;

  const orderRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const candleRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const userRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getRepositoryToken(Order), useValue: orderRepository },
        { provide: getRepositoryToken(Candle), useValue: candleRepository },
        { provide: getRepositoryToken(User), useValue: userRepository },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create and return an order', async () => {
      orderRepository.create.mockReturnValue(mockOrder);
      orderRepository.save.mockResolvedValue(mockOrder);

      const result = await service.createOrder(mockOrder);
      expect(orderRepository.create).toHaveBeenCalledWith(mockOrder);
      expect(orderRepository.save).toHaveBeenCalledWith(mockOrder);
      expect(result).toEqual(mockOrder);
    });

    it('should throw BadRequestException if order data is invalid', async () => {
      const invalidOrder = { ...mockOrder, totalAmount: -1 };
      orderRepository.create.mockReturnValue(invalidOrder);
      orderRepository.save.mockRejectedValue(new BadRequestException('Invalid order data'));
      
      await expect(service.createOrder(invalidOrder)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return a list of orders', async () => {
      orderRepository.find.mockResolvedValue([mockOrder]);
      const result = await service.findAll();
      expect(result).toEqual([mockOrder]);
      expect(orderRepository.find).toHaveBeenCalled();
    });

    it('should throw if no orders found', async () => {
      orderRepository.find.mockResolvedValue([]);
      await expect(service.findAll()).rejects.toThrow(NotFoundException);
      expect(orderRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an order by id', async () => {
      orderRepository.findOne.mockResolvedValue(mockOrder);
      const result = await service.findOne('1');
      expect(result).toEqual(mockOrder);
      expect(orderRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw if order not found', async () => {
      orderRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
      expect(orderRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('update', () => {
    it('should update and return the order', async () => {
      const updatedOrder = { ...mockOrder, status: OrderStatus.PROCESSING };
      orderRepository.findOne
        .mockResolvedValueOnce(mockOrder)
        .mockResolvedValueOnce(updatedOrder);
      orderRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update('1', { status: OrderStatus.PROCESSING });
      expect(result).toEqual(updatedOrder);
      expect(orderRepository.update).toHaveBeenCalledWith('1', { status: OrderStatus.PROCESSING });
    });

    it('should throw if order does not exist', async () => {
      orderRepository.findOne.mockResolvedValue(null);
      await expect(service.update('1', {})).rejects.toThrow(NotFoundException);
    });

    it('should throw if update data is invalid', async () => {
      orderRepository.findOne.mockResolvedValue(mockOrder);
      orderRepository.update.mockRejectedValue(new BadRequestException('Invalid update data'));
      await expect(service.update('1', { totalAmount: -1 })).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should delete an order', async () => {
      orderRepository.findOne.mockResolvedValue(mockOrder);
      orderRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove('1');
      expect(orderRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw if order not found', async () => {
      orderRepository.findOne.mockResolvedValue(null);
      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateStatus', () => {
    it('should update status of the order', async () => {
      const updatedOrder = { ...mockOrder, status: OrderStatus.PROCESSING };
      orderRepository.findOne
        .mockResolvedValueOnce(mockOrder)
        .mockResolvedValueOnce(updatedOrder);
      orderRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.updateStatus('1', OrderStatus.PROCESSING);
      expect(result).toEqual(updatedOrder);
      expect(orderRepository.update).toHaveBeenCalledWith('1', { status: OrderStatus.PROCESSING });
    });

    it('should throw if order not found', async () => {
      orderRepository.findOne.mockResolvedValue(null);
      await expect(service.updateStatus('1', OrderStatus.PROCESSING)).rejects.toThrow(NotFoundException);
    });

    it('should throw if status is invalid', async () => {
      orderRepository.findOne.mockResolvedValue(mockOrder);
      orderRepository.update.mockRejectedValue(new BadRequestException('Invalid status'));
      await expect(service.updateStatus('1', 'INVALID_STATUS' as OrderStatus)).rejects.toThrow(BadRequestException);
    });
  });

  describe('calculateTotalAmount', () => {
    it('should calculate total price of candles', () => {
      const total = service.calculateTotalAmount(mockCandles);
      expect(total).toBe(25);
    });

    it('should return 0 for empty candle array', () => {
      const total = service.calculateTotalAmount([]);
      expect(total).toBe(0);
    });

    it('should handle candles with zero price', () => {
      const candlesWithZeroPrice = [
        { ...mockCandles[0], price: 0 },
        { ...mockCandles[1], price: 15 }
      ];
      const total = service.calculateTotalAmount(candlesWithZeroPrice);
      expect(total).toBe(15);
    });
  });

  describe('processPayment', () => {
    it('should update payment details and status', async () => {
      const paymentDto = { method: 'card', transactionId: 'abc123', status: 'pending' };
      const orderWithPayment = { 
        ...mockOrder, 
        paymentDetails: paymentDto, 
        status: OrderStatus.PROCESSING 
      };
      
      orderRepository.findOne.mockResolvedValue(mockOrder);
      orderRepository.save.mockResolvedValue(orderWithPayment);

      const result = await service.processPayment('1', paymentDto);
      expect(result.status).toBe(OrderStatus.PROCESSING);
      expect(result.paymentDetails).toEqual(paymentDto);
      expect(orderRepository.save).toHaveBeenCalled();
    });

    it('should throw if order not found', async () => {
      orderRepository.findOne.mockResolvedValue(null);
      await expect(service.processPayment('99', { method: 'cash', transactionId: 'x', status: 'pending' }))
        .rejects.toThrow(NotFoundException);
    });

    it('should throw if payment details are invalid', async () => {
      orderRepository.findOne.mockResolvedValue(mockOrder);
      orderRepository.save.mockRejectedValue(new BadRequestException('Invalid payment details'));
      await expect(service.processPayment('1', { method: '', transactionId: '', status: '' }))
        .rejects.toThrow(BadRequestException);
    });
  });

  describe('assignUserToOrder', () => {
    it('should assign user to order and return updated order', async () => {
      const orderWithUser = { ...mockOrder, user: mockUser };
      orderRepository.findOne.mockResolvedValueOnce(mockOrder);
      userRepository.findOne.mockResolvedValueOnce(mockUser);
      orderRepository.save.mockResolvedValue(orderWithUser);

      const result = await service.assignUserToOrder('1', '1');
      expect(result.userId).toEqual(mockUser);
      expect(orderRepository.save).toHaveBeenCalled();
    });

    it('should throw if order not found', async () => {
      orderRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.assignUserToOrder('1', '1')).rejects.toThrow(NotFoundException);
    });

    it('should throw if user not found', async () => {
      orderRepository.findOne.mockResolvedValueOnce(mockOrder);
      userRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.assignUserToOrder('1', '1')).rejects.toThrow(NotFoundException);
    });

    it('should throw if user is already assigned', async () => {
      const orderWithUser = { ...mockOrder, user: mockUser };
      orderRepository.findOne.mockResolvedValueOnce(orderWithUser);
      userRepository.findOne.mockResolvedValueOnce(mockUser);
      orderRepository.save.mockRejectedValue(new BadRequestException('User already assigned'));
      await expect(service.assignUserToOrder('1', '1')).rejects.toThrow(BadRequestException);
    });
  });
});
