import { Test, TestingModule } from '@nestjs/testing';
import { CartItemService } from '../../../src/cart-item/cart-item.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartItem } from '../../../src/entities/cart-item.entity';
import { Cart } from '../../../src/entities/cart.entity';
import { Candle } from '../../../src/entities/candle.entity';
import { Gift } from '../../../src/entities/gift.entity';
import { NotFoundException } from '@nestjs/common';

describe('CartItemService', () => {
  let service: CartItemService;
  let cartItemRepo;
  let cartRepo;
  let candleRepo;
  let giftRepo;

  const mockUser = {
    id: '1',
    email: 'test@test.com',
    password: 'password',
    firstName: 'Test',
    lastName: 'User',
    name: 'Test User',
    roles: ['user'],
    orders: [],
    carts: [],
    candles: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
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
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    candles: []
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
    price: 25,
    imageUrl: 'test.jpg',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    cartItems: [],
    orderItems: [],
    calculatePrice: jest.fn().mockReturnValue(25)
  };

  const mockCart = {
    id: '1',
    userId: mockUser,
    checkedOut: false,
    isActive: true,
    cartItems: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    calculateTotal: jest.fn().mockReturnValue(100)
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
    calculatePrice: jest.fn().mockReturnValue(100)
  };

  const mockRepo = () => ({
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    preload: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartItemService,
        { provide: getRepositoryToken(CartItem), useFactory: mockRepo },
        { provide: getRepositoryToken(Cart), useFactory: mockRepo },
        { provide: getRepositoryToken(Candle), useFactory: mockRepo },
        { provide: getRepositoryToken(Gift), useFactory: mockRepo }
      ],
    }).compile();

    service = module.get<CartItemService>(CartItemService);
    cartItemRepo = module.get(getRepositoryToken(CartItem));
    cartRepo = module.get(getRepositoryToken(Cart));
    candleRepo = module.get(getRepositoryToken(Candle));
    giftRepo = module.get(getRepositoryToken(Gift));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a cart item', async () => {
      cartRepo.findOne.mockResolvedValueOnce(mockCart); // Mock válido para el carrito
      candleRepo.findOne.mockResolvedValueOnce(mockCandle); // Mock válido para la vela
      giftRepo.findOne.mockResolvedValueOnce(mockGift); // Mock válido para el regalo
      cartItemRepo.create.mockReturnValueOnce(mockCartItem); // Mock para crear el cart item
      cartItemRepo.save.mockResolvedValueOnce(mockCartItem); // Mock para guardar el cart item

      const createCartItemDto = {
        cartId: '1',
        candleId: '1',
        giftId: '1',
        quantity: 2,
      };

      const result = await service.create(createCartItemDto);
      expect(result).toEqual(mockCartItem);
      expect(cartRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(candleRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(giftRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(cartItemRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          quantity: createCartItemDto.quantity,
          cart: expect.objectContaining({ id: '1' }),
        })
      );
      expect(cartItemRepo.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if cart not found', async () => {
      cartRepo.findOne.mockResolvedValueOnce(null);

      const createCartItemDto = {
        cartId: '1',
        candleId: '1',
        giftId: '1',
        quantity: 2
      };

      await expect(service.create(createCartItemDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if candle not found', async () => {
      candleRepo.findOne.mockResolvedValueOnce(null);

      const createCartItemDto = {
        cartId: '1',
        candleId: '1',
        giftId: '1',
        quantity: 2
      };

      await expect(service.create(createCartItemDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if gift not found', async () => {
      giftRepo.findOne.mockResolvedValueOnce(null);

      const createCartItemDto = {
        cartId: '1',
        candleId: '1',
        giftId: '1',
        quantity: 2
      };

      await expect(service.create(createCartItemDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of cart items', async () => {
      cartItemRepo.find.mockResolvedValueOnce([mockCartItem]); // Mock válido para devolver un array de cart items

      const result = await service.findAll();
      expect(result).toEqual([mockCartItem]);
      expect(cartItemRepo.find).toHaveBeenCalledWith({ relations: ['cart', 'gift', 'candle'] });
    });
  });

  describe('findOne', () => {
    it('should return a cart item', async () => {
      cartItemRepo.findOne.mockResolvedValue(mockCartItem);
      const result = await service.findOne('1');
      expect(result).toEqual(mockCartItem);
      expect(cartItemRepo.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['cart', 'gift', 'candle']
      });
    });

    it('should throw NotFoundException if cart item not found', async () => {
      cartItemRepo.findOne.mockResolvedValueOnce(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a cart item', async () => {
      cartItemRepo.findOne.mockResolvedValueOnce(mockCartItem);
      cartItemRepo.preload.mockResolvedValueOnce(mockCartItem);
      cartItemRepo.save.mockResolvedValueOnce(mockCartItem);
      const updateCartItemDto = {
        quantity: 3,
      };
      const result = await service.update('1', updateCartItemDto);
      expect(result).toEqual(mockCartItem);
      expect(cartItemRepo.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['cart', 'gift', 'candle'],
      });
      expect(cartItemRepo.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if cart item not found', async () => {
      cartItemRepo.preload.mockResolvedValueOnce(null);
      const updateCartItemDto = {
        quantity: 3,
      };
      await expect(service.update('1', updateCartItemDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a cart item', async () => {
      cartItemRepo.delete.mockResolvedValueOnce({ affected: 1 });

      await expect(service.remove('1')).resolves.toBeUndefined();
      expect(cartItemRepo.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if cart item not found', async () => {
      cartItemRepo.delete.mockResolvedValueOnce({ affected: 0 });

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('assignCandle', () => {
    it('should assign a candle to a cart item', async () => {
      cartItemRepo.findOne.mockResolvedValueOnce(mockCartItem);
      candleRepo.findOne.mockResolvedValueOnce(mockCandle);
      cartItemRepo.save.mockResolvedValueOnce(mockCartItem);
      const result = await service.assignCandle('1', '1');
      expect(result).toEqual(mockCartItem);
      expect(cartItemRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' }, relations: ['candle'] });
      expect(candleRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(cartItemRepo.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if cart item not found', async () => {
      cartItemRepo.findOne.mockResolvedValueOnce(null);

      await expect(service.assignCandle('1', '1')).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if candle not found', async () => {
      candleRepo.findOne.mockResolvedValueOnce(null);

      await expect(service.assignCandle('1', '1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('assignGift', () => {
    it('should assign a gift to a cart item', async () => {
      cartItemRepo.findOne.mockResolvedValueOnce(mockCartItem);
      giftRepo.findOne.mockResolvedValueOnce(mockGift);
      cartItemRepo.save.mockResolvedValueOnce(mockCartItem);
      const result = await service.assignGift('1', '1');
      expect(result).toEqual(mockCartItem);
      expect(cartItemRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' }, relations: ['gift'], });
      expect(giftRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(cartItemRepo.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if cart item not found', async () => {
      cartItemRepo.findOne.mockResolvedValueOnce(null);

      await expect(service.assignGift('1', '1')).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if gift not found', async () => {
      giftRepo.findOne.mockResolvedValueOnce(null);

      await expect(service.assignGift('1', '1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('assignCart', () => {
    it('should assign a cart to a cart item', async () => {
      cartItemRepo.findOne.mockResolvedValue(mockCartItem);
      cartRepo.findOne.mockResolvedValue(mockCart);
      cartItemRepo.save.mockResolvedValue(mockCartItem);

      const result = await service.assignCart('1', '1');
      expect(result).toEqual(mockCartItem);
      expect(cartItemRepo.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['cart']
      });
      expect(cartRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(cartItemRepo.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if cart item not found', async () => {
      cartItemRepo.findOne.mockResolvedValueOnce(null);

      await expect(service.assignCart('1', '1')).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if cart not found', async () => {
      cartRepo.findOne.mockResolvedValueOnce(null);

      await expect(service.assignCart('1', '1')).rejects.toThrow(NotFoundException);
    });
  });
}); 