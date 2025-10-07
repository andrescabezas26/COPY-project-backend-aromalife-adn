import { IsUUID, IsInt, Min, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCartItemDto {
  @ApiProperty({ description: 'ID of the gift to add to cart', required: false })
  @IsOptional()
  giftId?: string;

  @ApiProperty({ description: 'ID of the candle to add to cart', required: false })
  @IsOptional()
  candleId?: string;

  @ApiProperty({ description: 'Quantity of items to add', minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Unit price of the item' })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ description: 'Total price for this line item' })
  @IsNumber()
  totalPrice: number;
}
