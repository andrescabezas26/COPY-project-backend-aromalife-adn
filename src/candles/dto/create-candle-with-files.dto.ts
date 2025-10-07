import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsUUID,
  IsIn,
} from 'class-validator';

export class CreateCandleWithFilesDto {
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

  @ApiProperty({
    description: 'Custom message for the candle',
    required: false,
  })
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

  @ApiProperty({ description: 'ID of the user (optional)' })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Audio file for the candle (optional)',
    required: false,
  })
  audioFile?: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Label image file for the candle (optional)',
    required: false,
  })
  labelFile?: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: '3D model file for the candle (GLB, GLTF, OBJ - optional)',
    required: false,
  })
  modelFile?: Express.Multer.File;

  @ApiProperty({ description: 'Name of the label', required: false })
  @IsString()
  @IsOptional()
  labelName?: string;

  @ApiProperty({ description: 'Description of the label', required: false })
  @IsString()
  @IsOptional()
  labelDescription?: string;

  @ApiProperty({
    description: 'Type of the label',
    enum: ['template', 'ai-generated', 'custom'],
    required: false,
  })
  @IsString()
  @IsIn(['template', 'ai-generated', 'custom'])
  @IsOptional()
  labelType?: string;

  @ApiProperty({
    description: 'AI prompt for the label (for ai-generated type)',
    required: false,
  })
  @IsString()
  @IsOptional()
  labelAiPrompt?: string;
}
