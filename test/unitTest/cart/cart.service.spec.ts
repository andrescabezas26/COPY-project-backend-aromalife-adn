import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../../../src/cart/cart.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from '../../../src/entities/cart.entity';
import { CartItem } from '../../../src/entities/cart-item.entity';
import { Gift } from '../../../src/entities/gift.entity';
import { Candle } from '../../../src/entities/candle.entity';
import { User } from '../../../src/auth/entity/user.entity';
import { NotFoundException } from '@nestjs/common';

const mockRepo = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  preload: jest.fn(),
  delete: jest.fn(),
});

describe('CartService', () => {
  let service: CartService;
  let cartRepo: any;
  let cartItemRepo: any;
  let giftRepo: any;
  let candleRepo: any;
  let userRepo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        { provide: getRepositoryToken(Cart), useFactory: mockRepo },
        { provide: getRepositoryToken(CartItem), useFactory: mockRepo },
        { provide: getRepositoryToken(Gift), useFactory: mockRepo },
        { provide: getRepositoryToken(Candle), useFactory: mockRepo },
        { provide: getRepositoryToken(User), useFactory: mockRepo },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartRepo = module.get(getRepositoryToken(Cart));
    cartItemRepo = module.get(getRepositoryToken(CartItem));
    giftRepo = module.get(getRepositoryToken(Gift));
    candleRepo = module.get(getRepositoryToken(Candle));
    userRepo = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a cart', async () => {
      const mockUser = {
        id: 'user1',
        email: 'test@example.com',
        name: 'Test User',
        roles: ['user'],
        isActive: true,
        orders: [],
        carts: [],
        candles: []
      };
      const dto = { userId: 'user1' };
      const cart = { id: 'cart1', userId: mockUser, checkedOut: false };
      
      userRepo.findOne.mockResolvedValue(mockUser);
      cartRepo.create.mockReturnValue(cart);
      cartRepo.save.mockResolvedValue(cart);
      
      expect(await service.create(dto as any)).toEqual(cart);
      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { id: 'user1' } });
      expect(cartRepo.create).toHaveBeenCalledWith({ userId: mockUser, checkedOut: false });
      expect(cartRepo.save).toHaveBeenCalledWith(cart);
    });

    it('should throw if user not found', async () => {
      const dto = { userId: 'user1' };
      userRepo.findOne.mockResolvedValue(null);
      await expect(service.create(dto as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a cart if found', async () => {
      const cart = { id: 'cart1' };
      cartRepo.findOne.mockResolvedValue(cart);
      expect(await service.findOne('cart1')).toEqual(cart);
    });
    it('should throw if not found', async () => {
      cartRepo.findOne.mockResolvedValue(undefined);
      await expect(service.findOne('cart1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and save a cart', async () => {
      const mockUser = {
        id: 'user1',
        email: 'test@example.com',
        name: 'Test User',
        roles: ['user'],
        isActive: true,
        orders: [],
        carts: [],
        candles: []
      };
      const existingCart = { id: 'cart1', userId: mockUser, checkedOut: false };
      const updateData = { checkedOut: true };
      const updatedCart = { ...existingCart, ...updateData };
      
      cartRepo.findOne.mockResolvedValue(existingCart);
      cartRepo.save.mockResolvedValue(updatedCart);
      
      expect(await service.update('cart1', updateData as any)).toEqual(updatedCart);
      expect(cartRepo.findOne).toHaveBeenCalledWith({
        where: { id: 'cart1' },
        relations: ['userId']
      });
      expect(cartRepo.save).toHaveBeenCalledWith(updatedCart);
    });

    it('should throw if not found', async () => {
      cartRepo.findOne.mockResolvedValue(null);
      await expect(service.update('cart1', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a cart if found', async () => {
      cartRepo.findOne.mockResolvedValue({ id: 'cart1' });
      cartRepo.delete.mockResolvedValue(undefined);
      await service.remove('cart1');
      expect(cartRepo.delete).toHaveBeenCalledWith('cart1');
    });
    it('should throw if not found', async () => {
      cartRepo.findOne.mockResolvedValue(undefined);
      await expect(service.remove('cart1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('addItem', () => {
    it('should add an item to a cart', async () => {
      const cart = { id: 'cart1' };
      const cartItem = { id: 'item1', calculatePrice: jest.fn() };
      cartRepo.findOne.mockResolvedValue(cart);
      cartItemRepo.create.mockReturnValue(cartItem);
      cartItemRepo.save.mockResolvedValue(cartItem);
      const dto = { quantity: 1 };
      expect(await service.addItem('cart1', dto as any)).toEqual(cartItem);
      expect(cartItem.calculatePrice).toHaveBeenCalled();
    });
    it('should throw if cart not found', async () => {
      cartRepo.findOne.mockResolvedValue(undefined);
      await expect(service.addItem('cart1', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateItem', () => {
    it('should update a cart item', async () => {
      const cartItem = { id: 'item1', calculatePrice: jest.fn() };
      cartItemRepo.findOne.mockResolvedValue(cartItem);
      cartItemRepo.save.mockResolvedValue(cartItem);
      expect(await service.updateItem('cart1', 'item1', {} as any)).toEqual(cartItem);
      expect(cartItem.calculatePrice).toHaveBeenCalled();
    });
    it('should throw if cart item not found', async () => {
      cartItemRepo.findOne.mockResolvedValue(undefined);
      await expect(service.updateItem('cart1', 'item1', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeItem', () => {
    it('should remove a cart item', async () => {
      cartItemRepo.findOne.mockResolvedValue({ id: 'item1' });
      cartItemRepo.delete.mockResolvedValue(undefined);
      await service.removeItem('cart1', 'item1');
      expect(cartItemRepo.delete).toHaveBeenCalledWith('item1');
    });
    it('should throw if cart item not found', async () => {
      cartItemRepo.findOne.mockResolvedValue(undefined);
      await expect(service.removeItem('cart1', 'item1')).rejects.toThrow(NotFoundException);
    });
  });
}); 