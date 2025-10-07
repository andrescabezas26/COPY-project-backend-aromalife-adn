import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order, OrderStatus } from '../entities/order.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully', type: Order })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async create(@Body() createOrderDto: Partial<Order>): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }
  @Get()
  @ApiOperation({ summary: 'Get all orders with pagination' })
  @ApiResponse({ status: 200, description: 'Return paginated orders' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search term for filtering' })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus, description: 'Filter by order status' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('status') status?: OrderStatus | 'ALL',
  ): Promise<{
    orders: Order[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    return this.ordersService.findAll(page, limit, search, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by id' })
  @ApiResponse({ status: 200, description: 'Return the order', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all orders for a specific user' })
  @ApiResponse({ status: 200, description: 'Return all orders for the user', type: [Order] })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async findByUser(@Param('userId') userId: string): Promise<Order[]> {
    return this.ordersService.findByUser(userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order' })
  @ApiResponse({ status: 200, description: 'Order updated successfully', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: Partial<Order>,
  ): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @Auth(ValidRoles.admin)
  async remove(@Param('id') id: string): Promise<void> {
    return this.ordersService.remove(id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update order status' })
  @ApiResponse({ status: 200, description: 'Order status updated successfully', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ): Promise<Order> {
    return this.ordersService.updateStatus(id, status);
  }

  @Post(':id/payment')
  @ApiOperation({ summary: 'Process payment for an order' })
  @ApiResponse({ status: 200, description: 'Payment processed successfully', type: Order })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async processPayment(
    @Param('id') id: string,
    @Body() paymentDetails: any,
  ): Promise<Order> {
    return this.ordersService.processPayment(id, paymentDetails);
  }

  @Patch(':id/assign-user/:userId')
  @ApiOperation({ summary: 'Assign a user to an order' })
  @ApiResponse({ status: 200, description: 'User assigned to order successfully', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async assignUserToOrder(
    @Param('id') orderId: string,
    @Param('userId') userId: string,
  ): Promise<Order> {
    return this.ordersService.assignUserToOrder(orderId, userId);
  }
}
