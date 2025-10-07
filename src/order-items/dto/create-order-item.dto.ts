import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'ID of the order', required: true })
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ description: 'ID of the candle', required: false })
  @IsUUID()
  @IsOptional()
  candleId?: string;

  @ApiProperty({ description: 'ID of the gift', required: false })
  @IsUUID()
  @IsOptional()
  giftId?: string;

  @ApiProperty({ description: 'Quantity of the item', required: true })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Unit price of the item', required: true })
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @ApiProperty({ description: 'Total price of the item', required: true })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}