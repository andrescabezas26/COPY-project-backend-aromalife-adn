import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Gift } from '../entities/gift.entity';
import { Candle } from '../entities/candle.entity';
import { User } from '../auth/entity/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
    @InjectRepository(Candle)
    private readonly candleRepository: Repository<Candle>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

    // En cart.service.ts
  async create(createCartDto: CreateCartDto): Promise<Cart> {
    // Buscar el usuario primero
    const user = await this.userRepository.findOne({ where: { id: createCartDto.userId } });
    if (!user) throw new NotFoundException(`User Not Found with ID ${createCartDto.userId}`);
    
    // Crear el carrito con el usuario encontrado
    try {
      const cart = this.cartRepository.create({
      userId: user,
      checkedOut: createCartDto.checkedOut || false
    });
    
      return await this.cartRepository.save(cart);
    } catch (error) {
      console.error('Error in create cart:', error);
      throw error;
    }
  }
  async findOne(id: string): Promise<Cart> {
    try {
      const cart = await this.cartRepository.findOne({
        where: { id },
        relations: [
          'userId',
          'cartItems', 
          'cartItems.gift', 
          'cartItems.candle',
          'cartItems.candle.label',
          'cartItems.candle.container',
          'cartItems.candle.aroma'
        ],
      });
      if (!cart) throw new NotFoundException('Cart not found');
      return cart;
    } catch (error) {
      console.error('Error in findOne cart:', error);
      throw error;
    }
  }

    async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    // Primero, busca el carrito existente
    const existingCart = await this.cartRepository.findOne({ 
      where: { id },
      relations: ['userId'] // Carga la relación existente
    });
    if (!existingCart) throw new NotFoundException('Cart not found');
    
    // Crea un objeto para actualizar
    const updateData: DeepPartial<Cart> = {};
    
    // Si hay checkedOut en el DTO, cópialo
    if (updateCartDto.checkedOut !== undefined) {
      updateData.checkedOut = updateCartDto.checkedOut;
    }
    
    // Si hay userId en el DTO, busca el usuario
    if (updateCartDto.userId) {
      const user = await this.userRepository.findOne({ where: { id: updateCartDto.userId } });
      if (!user) throw new NotFoundException(`User not found with ID ${updateCartDto.userId}`);
      updateData.userId = user;
    }
    
    // Ahora actualiza el carrito
    Object.assign(existingCart, updateData);
    
    return this.cartRepository.save(existingCart);
  }

  async remove(id: string): Promise<void> {
    try {
      const cart = await this.cartRepository.findOne({ 
        where: { id },
        relations: ['cartItems', 'cartItems.gift', 'cartItems.candle']
      });
      
      if (!cart) throw new NotFoundException('Cart not found');

      // Primero eliminamos los cart items
      await this.cartItemRepository.remove(cart.cartItems);

      // Finalmente eliminamos el carrito
      await this.cartRepository.remove(cart);
    } catch (error) {
      console.error('Error in remove cart:', error);
      throw error;
    }
  }

  async addItem(
    cartId: string,
    addCartItemDto: AddCartItemDto,
  ): Promise<CartItem> {
    try {
      const cart = await this.cartRepository.findOne({ where: { id: cartId } });
      if (!cart) throw new NotFoundException('Cart not found');
      
      let gift: Gift | null = null;
      let candle: Candle | null = null;

      if (addCartItemDto.giftId) {
        gift = await this.giftRepository.findOne({
          where: { id: addCartItemDto.giftId },
        });
        if (!gift) throw new NotFoundException('Gift not found');
      }

      if (addCartItemDto.candleId) {
        candle = await this.candleRepository.findOne({
          where: { id: addCartItemDto.candleId },
          relations: ['label', 'container', 'aroma']
        });
        if (!candle) throw new NotFoundException('Candle not found');
      }

      const cartItem = this.cartItemRepository.create({
        quantity: addCartItemDto.quantity,
      });
      
      cartItem.cart = cart;
      if (gift) cartItem.gift = gift;
      if (candle) cartItem.candle = candle;
      
      cartItem.calculatePrice();
      return await this.cartItemRepository.save(cartItem);
    } catch (error) {
      console.error('Error in addItem to cart:', error);
      throw error;
    }
  }

  async updateItem(
    cartId: string,
    itemId: string,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    try {
      const cartItem = await this.cartItemRepository.findOne({
        where: { id: itemId, cart: { id: cartId } },
        relations: ['gift', 'candle', 'candle.label', 'candle.container', 'candle.aroma'],
      });
      if (!cartItem) throw new NotFoundException('Cart item not found');
      Object.assign(cartItem, updateCartItemDto);
      cartItem.calculatePrice();
      return await this.cartItemRepository.save(cartItem);
    } catch (error) {
      console.error('Error in updateItem in cart:', error);
      throw error;
    }
  }

  async removeItem(cartId: string, itemId: string): Promise<void> {
    try {
      const cartItem = await this.cartItemRepository.findOne({
        where: { id: itemId, cart: { id: cartId } },
      });
      if (!cartItem) throw new NotFoundException('Cart item not found');
      await this.cartItemRepository.delete(itemId);
    } catch (error) {
      console.error('Error in removeItem from cart:', error);
      throw error;
    }
  }

  async assignUserToCart(cartId: string, userId: string): Promise<Cart> {
    try {
      const cart = await this.cartRepository.findOne({
        where: { id: cartId },
        relations: ['user'],
      });
      if (!cart) {
        throw new NotFoundException('Cart not found');
      }
    
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
    
      cart.userId = user;
      return await this.cartRepository.save(cart);
    } catch (error) {
      console.error('Error in assignUserToCart:', error);
      throw error;
    }
  }
  async findByUser(userId: string): Promise<Cart | null> {
    try {
      
      const cart = await this.cartRepository.findOne({
        where: { 
          userId: { id: userId },
          checkedOut: false 
        },
        relations: [
          'cartItems', 
          'cartItems.gift', 
          'cartItems.candle',
          'cartItems.candle.label',
          'cartItems.candle.container',
          'cartItems.candle.aroma'
        ],
        order: { createdAt: 'DESC' }
      });
      
      console.log("Cart found:", !!cart);
      if (cart) {
        cart.cartItems?.forEach((item, index) => {
          console.log(`Backend Item ${index}:`, {
            id: item.id,
            candleId: item.candle?.id,
            giftId: item.gift?.id,
            hasCandle: !!item.candle,
            hasGift: !!item.gift,
            candleData: item.candle ? {
              id: item.candle.id,
              name: item.candle.name,
              hasLabel: !!item.candle.label,
              hasContainer: !!item.candle.container,
              labelData: item.candle.label ? {
                id: item.candle.label.id,
                name: item.candle.label.name,
                imageUrl: item.candle.label.imageUrl,
                type: item.candle.label.type,
                description: item.candle.label.description
              } : null,
              containerData: item.candle.container ? {
                id: item.candle.container.id,
                name: item.candle.container.name,
                imageUrl: item.candle.container.imageUrl
              } : null
            } : null
          });
        });
      }
      console.log("==========================================");
      
      return cart;
    } catch (error) {
      console.error('Error in findByUser cart:', error);
      throw error;
    }
  }
}
