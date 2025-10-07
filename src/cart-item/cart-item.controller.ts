import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItem } from '../entities/cart-item.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCarItemDto } from './dto/update-cart-item.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Cart Items')
@Controller('cart-items')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cart item' })
  @ApiResponse({ status: 201, description: 'Cart item created successfully', type: CartItem })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  async create(@Body() dto: CreateCartItemDto): Promise<CartItem> {
    return this.cartItemService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({ status: 200, description: 'Return all cart items', type: [CartItem] })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  async findAll(): Promise<CartItem[]> {
    return this.cartItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cart item by id' })
  @ApiResponse({ status: 200, description: 'Return the cart item', type: CartItem })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  async findOne(@Param('id') id: string): Promise<CartItem> {
    return this.cartItemService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a cart item' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully', type: CartItem })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  async update(@Param('id') id: string, @Body() dto: UpdateCarItemDto): Promise<CartItem> {
    return this.cartItemService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart item' })
  @ApiResponse({ status: 200, description: 'Cart item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  async remove(@Param('id') id: string): Promise<void> {
    return this.cartItemService.remove(id);
  }

  @Patch(':id/assign-candle/:candleId')
  @ApiOperation({ summary: 'Assign a candle to a cart item' })
  @ApiResponse({ status: 200, description: 'Candle assigned successfully', type: CartItem })
  @ApiResponse({ status: 404, description: 'Cart item or candle not found' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  async assignCandle(
    @Param('id') cartItemId: string,
    @Param('candleId') candleId: string,
  ): Promise<CartItem> {
    return this.cartItemService.assignCandle(cartItemId, candleId);
  }

  @Patch(':id/assign-gift/:giftId')
  @ApiOperation({ summary: 'Assign a gift to a cart item' })
  @ApiResponse({ status: 200, description: 'Gift assigned successfully', type: CartItem })
  @ApiResponse({ status: 404, description: 'Cart item or gift not found' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  async assignGift(
    @Param('id') cartItemId: string,
    @Param('giftId') giftId: string,
  ): Promise<CartItem> {
    return this.cartItemService.assignGift(cartItemId, giftId);
  }

  @Patch(':id/assign-cart/:cartId')
  @ApiOperation({ summary: 'Assign a cart to a cart item' })
  @ApiResponse({ status: 200, description: 'Cart assigned successfully', type: CartItem })
  @ApiResponse({ status: 404, description: 'Cart item or cart not found' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  async assignCart(
    @Param('id') cartItemId: string,
    @Param('cartId') cartId: string,
  ): Promise<CartItem> {
    return this.cartItemService.assignCart(cartItemId, cartId);
  }
}
