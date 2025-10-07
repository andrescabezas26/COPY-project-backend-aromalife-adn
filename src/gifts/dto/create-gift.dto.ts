import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class IncludedItemDto {
  @ApiProperty({ 
    description: 'Order ID of the included item',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ 
    description: 'Quantity of the item',
    minimum: 1,
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class GiftOptionsDto {
  @ApiProperty({ 
    description: 'Whether to include gift wrapping',
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  wrapping?: boolean;

  @ApiProperty({ 
    description: 'Whether to include a personal message',
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  message?: boolean;

  @ApiProperty({ 
    description: 'Whether to include a greeting card',
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  card?: boolean;
}

export class CreateGiftDto {
  @ApiProperty({ 
    description: 'Name of the gift',
    example: 'Deluxe Gift Set'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    description: 'Description of the gift',
    required: false,
    example: 'A luxurious gift set containing premium items'
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    description: 'Price of the gift',
    example: 99.99,
    minimum: 0
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ 
    description: 'URL of the gift image',
    required: false,
    example: 'https://example.com/images/gift-set.jpg'
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ 
    description: 'List of items included in the gift',
    type: [IncludedItemDto],
    required: false
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IncludedItemDto)
  @IsOptional()
  includedItems?: IncludedItemDto[];

  @ApiProperty({ 
    description: 'Gift customization options',
    type: GiftOptionsDto,
    required: false
  })
  @ValidateNested()
  @Type(() => GiftOptionsDto)
  @IsOptional()
  giftOptions?: GiftOptionsDto;
}
