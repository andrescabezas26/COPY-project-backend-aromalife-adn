import { IsUUID, IsInt, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @ApiProperty({ description: 'The ID of the cart', required: true })
  @IsUUID()
  cartId: string;

  @ApiProperty({ description: 'The ID of the gift', required: false })
  @IsOptional()
  @IsUUID()
  giftId?: string;

  @ApiProperty({ description: 'The ID of the candle', required: false })
  @IsOptional()
  @IsUUID()
  candleId?: string;

  @ApiProperty({ description: 'The quantity of items', minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}