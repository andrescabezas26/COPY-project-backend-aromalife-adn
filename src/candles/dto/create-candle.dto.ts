import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class CreateCandleDto {
  @ApiProperty({ description: 'Name of the candle' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the candle', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Price of the candle' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'URL of the candle image', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'URL of the audio message', required: false })
  @IsString()
  @IsOptional()
  audioUrl?: string;

  @ApiProperty({ description: 'Custom message for the candle', required: false })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ description: 'URL of the QR code', required: false })
  @IsString()
  @IsOptional()
  qrUrl?: string;

  @ApiProperty({ description: 'ID of the container' })
  @IsUUID()
  @IsNotEmpty()
  containerId: string;

  @ApiProperty({ description: 'ID of the aroma' })
  @IsUUID()
  @IsNotEmpty()
  aromaId: string;

  @ApiProperty({ description: 'Whether the candle is active', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
