import { IsUUID, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({ description: 'ID of the user who owns this cart' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Whether the cart has been checked out', required: false, default: false })
  @IsNotEmpty()
  @IsBoolean()
  checkedOut: boolean;
}
