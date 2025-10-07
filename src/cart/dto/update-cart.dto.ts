import { IsBoolean, IsOptional } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @IsOptional()
  @IsBoolean()
  checkedOut?: boolean;
}
