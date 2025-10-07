import { Test, TestingModule } from '@nestjs/testing';
import { CartItemController } from '../../../src/cart-item/cart-item.controller';
import { CartItemService } from '../../../src/cart-item/cart-item.service';
import { CartItem } from '../../../src/entities/cart-item.entity';
import { Cart } from '../../../src/entities/cart.entity';
import { Candle } from '../../../src/entities/candle.entity';
import { Gift } from '../../../src/entities/gift.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CartItemController', () => {
  let controller: CartItemController;
  let service: CartItemService;

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

  const mockCart = {
    id: '1',
    userId: mockUser,
    checkedOut: false,
    isActive: true,
    cartItems: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    calculateTotal: jest.fn().mockReturnValue(100),
  };

  const mockContainer = {
    id: '1',
    name: 'Test Container',
    description: 'Test Description',
    basePrice: 15,
    dimensions: {
      width: 10,
      height: 10,
      depth: 10,
    },
    imageUrl: 'test-container.jpg',
    candles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockAroma = {
    id: '1',
    name: 'Test Aroma',
    description: 'Test Description',
    olfativePyramid: {
      salida: 'Top Note',
      corazon: 'Middle Note',
      fondo: 'Base Note',
    },
    imageUrl: 'test-aroma.jpg',
    intendedImpacts: [],
    candles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCandle = {
    id: '1',
    name: 'Test Candle',
    description: 'Test Description',
    price: 50,
    stock: 10,
    imageUrl: 'test.jpg',
    audioUrl: 'test.mp3',
    message: 'Test Message',
    qrUrl: 'test.png',
    isActive: true,
    container: mockContainer,
    aroma: mockAroma,
    orderItems: [],
    cartItems: [],
    user: mockUser,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockGift = {
    id: '1',
    name: 'Test Gift',
    description: 'Test Description',
    price: 25,
    imageUrl: 'test.jpg',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    cartItems: [],
    orderItems: [],
    calculatePrice: jest.fn().mockReturnValue(25),
  };

  const mockCartItem = {
    id: '1',
    cart: mockCart,
    candle: mockCandle,
    gift: mockGift,
    quantity: 2,
    unitPrice: 50,
    totalPrice: 100,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    calculatePrice: jest.fn().mockReturnValue(100),
  };

  const mockRepo = () => ({
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartItemController],
      providers: [
        CartItemService,
        { provide: getRepositoryToken(CartItem), useFactory: mockRepo },
        { provide: getRepositoryToken(Cart), useFactory: mockRepo },
        { provide: getRepositoryToken(Candle), useFactory: mockRepo },
        { provide: getRepositoryToken(Gift), useFactory: mockRepo },
      ],
    }).compile();

    controller = module.get<CartItemController>(CartItemController);
    service = module.get<CartItemService>(CartItemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a cart item', async () => {
      const createDto = {
        cartId: '1',
        candleId: '1',
        giftId: '1',
        quantity: 2,
        unitPrice: 50,
        totalPrice: 100,
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockCartItem);
      const result = await controller.create(createDto);
      expect(result).toEqual(mockCartItem);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of cart items', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockCartItem]);
      const result = await controller.findAll();
      expect(result).toEqual([mockCartItem]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a cart item', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockCartItem);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockCartItem);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw if cart item not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());
      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a cart item', async () => {
      const updateDto = {
        quantity: 3,
        unitPrice: 60,
        totalPrice: 180,
      };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ ...mockCartItem, ...updateDto });
      const result = await controller.update('1', updateDto);
      expect(result).toEqual({ ...mockCartItem, ...updateDto });
      expect(service.update).toHaveBeenCalledWith('1', updateDto);
    });

    it('should throw if cart item not found', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());
      await expect(controller.update('1', { quantity: 3 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a cart item', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
    });

    it('should throw if cart item not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());
      await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('assignCandle', () => {
    it('should assign a candle to a cart item', async () => {
      jest
        .spyOn(service, 'assignCandle')
        .mockResolvedValue({ ...mockCartItem, candle: mockCandle });
      const result = await controller.assignCandle('1', '1');
      expect(result).toEqual({ ...mockCartItem, candle: mockCandle });
      expect(service.assignCandle).toHaveBeenCalledWith('1', '1');
    });

    it('should throw if cart item not found', async () => {
      jest
        .spyOn(service, 'assignCandle')
        .mockRejectedValue(new NotFoundException());
      await expect(controller.assignCandle('1', '1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('assignGift', () => {
    it('should assign a gift to a cart item', async () => {
      jest
        .spyOn(service, 'assignGift')
        .mockResolvedValue({ ...mockCartItem, gift: mockGift });
      const result = await controller.assignGift('1', '1');
      expect(result).toEqual({ ...mockCartItem, gift: mockGift });
      expect(service.assignGift).toHaveBeenCalledWith('1', '1');
    });

    it('should throw if cart item not found', async () => {
      jest
        .spyOn(service, 'assignGift')
        .mockRejectedValue(new NotFoundException());
      await expect(controller.assignGift('1', '1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('assignCart', () => {
    it('should assign a cart to a cart item', async () => {
      jest
        .spyOn(service, 'assignCart')
        .mockResolvedValue({ ...mockCartItem, cart: mockCart });
      const result = await controller.assignCart('1', '1');
      expect(result).toEqual({ ...mockCartItem, cart: mockCart });
      expect(service.assignCart).toHaveBeenCalledWith('1', '1');
    });

    it('should throw if cart item not found', async () => {
      jest
        .spyOn(service, 'assignCart')
        .mockRejectedValue(new NotFoundException());
      await expect(controller.assignCart('1', '1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
