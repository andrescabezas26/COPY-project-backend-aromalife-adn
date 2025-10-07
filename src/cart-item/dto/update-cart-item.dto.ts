import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateCartItemDto } from './create-cart-item.dto';

export class UpdateCarItemDto extends PartialType(CreateCartItemDto) {}
