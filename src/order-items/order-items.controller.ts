import { Controller, Get, Post, Put, Delete, Param, Body, Patch } from '@nestjs/common';
import { OrderItemService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from '../entities/order-item.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Order Items')
@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order item' })
  @ApiResponse({ status: 201, description: 'Order item created successfully', type: OrderItem })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async create(@Body() createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all order items' })
  @ApiResponse({ status: 200, description: 'Return all order items', type: [OrderItem] })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async findAll(): Promise<OrderItem[]> {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order item by id' })
  @ApiResponse({ status: 200, description: 'Return the order item', type: OrderItem })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async findOne(@Param('id') id: string): Promise<OrderItem> {
    return this.orderItemService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order item' })
  @ApiResponse({ status: 200, description: 'Order item updated successfully', type: OrderItem })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order item' })
  @ApiResponse({ status: 200, description: 'Order item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async remove(@Param('id') id: string): Promise<void> {
    return this.orderItemService.remove(id);
  }

  @Patch(':id/assign-candle/:candleId')
  @ApiOperation({ summary: 'Assign a candle to an order item' })
  @ApiResponse({ status: 200, description: 'Candle assigned successfully', type: OrderItem })
  @ApiResponse({ status: 404, description: 'Order item or candle not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async assignCandle(
    @Param('id') orderItemId: string,
    @Param('candleId') candleId: string,
  ): Promise<OrderItem> {
    return this.orderItemService.assignCandle(orderItemId, candleId);
  }
  
  @Patch(':id/assign-order/:orderId')
  @ApiOperation({ summary: 'Assign an order to an order item' })
  @ApiResponse({ status: 200, description: 'Order assigned successfully', type: OrderItem })
  @ApiResponse({ status: 404, description: 'Order item or order not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async assignOrder(
    @Param('id') orderItemId: string,
    @Param('orderId') orderId: string,
  ): Promise<OrderItem> {
    return this.orderItemService.assignOrder(orderItemId, orderId);
  }
  
  @Patch(':id/assign-gift/:giftId')
  @ApiOperation({ summary: 'Assign a gift to an order item' })
  @ApiResponse({ status: 200, description: 'Gift assigned successfully', type: OrderItem })
  @ApiResponse({ status: 404, description: 'Order item or gift not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async assignGift(
    @Param('id') orderItemId: string,
    @Param('giftId') giftId: string,
  ): Promise<OrderItem> {
    return this.orderItemService.assignGift(orderItemId, giftId);
  }
}