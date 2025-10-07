import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../../entities/order.entity';

export class OrderItemDto {
  @ApiProperty({ description: 'ID of the candle' })
  @IsString()
  @IsNotEmpty()
  candleId: string;

  @ApiProperty({ description: 'Quantity of candles' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Status of the order',
    enum: OrderStatus,
    required: false,
  })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiProperty({ description: 'Total amount of the order' })
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({ description: 'ID of the user placing the order' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Items in the order', type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ description: 'Shipping address', required: false })
  @IsString()
  @IsOptional()
  shippingAddress?: string;

  @ApiProperty({ description: 'Payment method', required: false })
  @IsString()
  @IsOptional()
  paymentMethod?: string;
}

export class PaymentDetailsDto {
  @ApiProperty({ description: 'Method of payment' })
  @IsString()
  method: string;

  @ApiProperty({ description: 'ID of the transaction' })
  @IsString()
  transactionId: string;

  @ApiProperty({ description: 'Status of the payment' })
  @IsString()
  status: string;
}
