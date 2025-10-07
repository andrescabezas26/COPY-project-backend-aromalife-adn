import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { Cart } from '../entities/cart.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cart' })
  @ApiResponse({ status: 201, description: 'Cart created successfully', type: Cart })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get a cart by id' })
  @ApiResponse({ status: 200, description: 'Return the cart', type: Cart })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Post(':id/items')
  @ApiOperation({ summary: 'Add an item to the cart' })
  @ApiResponse({ status: 201, description: 'Item added successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  addItem(
    @Param('id') cartId: string,
    @Body() addCartItemDto: AddCartItemDto,
  ) {
    return this.cartService.addItem(cartId, addCartItemDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a cart' })
  @ApiResponse({ status: 200, description: 'Cart updated successfully', type: Cart })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart' })
  @ApiResponse({ status: 200, description: 'Cart deleted successfully' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }

  @Patch(':cartId/items/:itemId')
  @ApiOperation({ summary: 'Update an item in the cart' })
  @ApiResponse({ status: 200, description: 'Item updated successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  updateItem(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(cartId, itemId, updateCartItemDto);
  }

  @Delete(':cartId/items/:itemId')
  @ApiOperation({ summary: 'Remove an item from the cart' })
  @ApiResponse({ status: 200, description: 'Item removed successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  removeItem(@Param('cartId') cartId: string, @Param('itemId') itemId: string) {
    return this.cartService.removeItem(cartId, itemId);
  }

  @Patch(':id/assign-user/:userId')
  @ApiOperation({ summary: 'Assign a user to a cart' })
  @ApiResponse({ status: 200, description: 'User assigned successfully', type: Cart })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async assignUserToCart(
    @Param('id') cartId: string,
    @Param('userId') userId: string,
  ): Promise<Cart> {
    return this.cartService.assignUserToCart(cartId, userId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get active cart for a user' })
  @ApiResponse({ status: 200, description: 'Return the user\'s active cart', type: Cart })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @Auth(ValidRoles.client, ValidRoles.admin, ValidRoles.manager)
  findByUser(@Param('userId') userId: string) {
    return this.cartService.findByUser(userId);
  }
}
