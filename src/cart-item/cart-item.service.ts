import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';
import { Gift } from '../entities/gift.entity';
import { Candle } from '../entities/candle.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCarItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
    @InjectRepository(Candle)
    private readonly candleRepository: Repository<Candle>,
  ) {}

  async create(createDto: CreateCartItemDto): Promise<CartItem> {
    try {
      const cart = await this.cartRepository.findOne({ where: { id: createDto.cartId } });
      if (!cart) throw new NotFoundException('Cart not found');

      const cartItem = this.cartItemRepository.create({ quantity: createDto.quantity, cart });

      if (createDto.giftId) {
        const gift = await this.giftRepository.findOne({ where: { id: createDto.giftId } });
        if (!gift) throw new NotFoundException('Gift not found');
        cartItem.gift = gift;
      }

      if (createDto.candleId) {
        const candle = await this.candleRepository.findOne({ where: { id: createDto.candleId } });
        if (!candle) throw new NotFoundException('Candle not found');
        cartItem.candle = candle;
      }

      cartItem.calculatePrice();
      return await this.cartItemRepository.save(cartItem);
    } catch (error) {
      console.error('Error in create cart item:', error);
      throw error;
    }
  }

  async findAll(): Promise<CartItem[]> {
    try {
      const items = await this.cartItemRepository.find({ relations: ['cart', 'gift', 'candle'] });
      if (!items.length) throw new NotFoundException('No cart items found');
      return items;
    } catch (error) {
      console.error('Error in findAll cart items:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<CartItem> {
    try {
      const item = await this.cartItemRepository.findOne({ where: { id }, relations: ['cart', 'gift', 'candle'] });
      if (!item) throw new NotFoundException('Cart item not found');
      return item;
    } catch (error) {
      console.error('Error in findOne cart item:', error);
      throw error;
    }
  }

  async update(id: string, updateDto: UpdateCarItemDto): Promise<CartItem> {
    try {
      const item = await this.findOne(id);

      if (updateDto.quantity !== undefined) item.quantity = updateDto.quantity;

      if (updateDto.giftId) {
        const gift = await this.giftRepository.findOne({ where: { id: updateDto.giftId } });
        if (!gift) throw new NotFoundException('Gift not found');
        item.gift = gift;
      }

      if (updateDto.candleId) {
        const candle = await this.candleRepository.findOne({ where: { id: updateDto.candleId } });
        if (!candle) throw new NotFoundException('Candle not found');
        item.candle = candle;
      }

      item.calculatePrice();
      return await this.cartItemRepository.save(item);
    } catch (error) {
      console.error('Error in update cart item:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.cartItemRepository.delete(id);
      if (result.affected === 0) throw new NotFoundException('Cart item not found');
    } catch (error) {
      console.error('Error in remove cart item:', error);
      throw error;
    }
  }

  async assignCandle(cartItemId: string, candleId: string): Promise<CartItem> {
    try {
      const cartItem = await this.cartItemRepository.findOne({
        where: { id: cartItemId },
        relations: ['candle'],
      });
      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }
    
      const candle = await this.candleRepository.findOne({ where: { id: candleId } });
      if (!candle) {
        throw new NotFoundException('Candle not found');
      }
    
      cartItem.candle = candle;
      cartItem.calculatePrice();
      return await this.cartItemRepository.save(cartItem);
    } catch (error) {
      console.error('Error in assignCandle to cart item:', error);
      throw error;
    }
  }

  async assignGift(cartItemId: string, giftId: string): Promise<CartItem> {
    try {
      const cartItem = await this.cartItemRepository.findOne({
        where: { id: cartItemId },
        relations: ['gift'],
      });
      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }
    
      const gift = await this.giftRepository.findOne({ where: { id: giftId } });
      if (!gift) {
        throw new NotFoundException('Gift not found');
      }
    
      cartItem.gift = gift;
      cartItem.calculatePrice();
      return await this.cartItemRepository.save(cartItem);
    } catch (error) {
      console.error('Error in assignGift to cart item:', error);
      throw error;
    }
  }

  async assignCart(cartItemId: string, cartId: string): Promise<CartItem> {
    try {
      const cartItem = await this.cartItemRepository.findOne({
        where: { id: cartItemId },
        relations: ['cart'],
      });
      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }
    
      const cart = await this.cartRepository.findOne({ where: { id: cartId } });
      if (!cart) {
        throw new NotFoundException('Cart not found');
      }
    
      cartItem.cart = cart;
      return await this.cartItemRepository.save(cartItem);
    } catch (error) {
      console.error('Error in assignCart to cart item:', error);
      throw error;
    }
  }
}
