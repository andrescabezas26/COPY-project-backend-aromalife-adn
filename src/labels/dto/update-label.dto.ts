import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  IsBoolean,
} from 'class-validator';

export class UpdateLabelDto {
  @ApiProperty({ description: 'Name of the label', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Description of the label', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'URL of the label image', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'Type of label: template or ai-generated',
    enum: ['template', 'ai-generated'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['template', 'ai-generated'])
  type?: 'template' | 'ai-generated';

  @ApiProperty({
    description:
      'AI prompt used to generate the label (only for ai-generated labels)',
    required: false,
  })
  @IsOptional()
  @IsString()
  aiPrompt?: string;

  @ApiProperty({ description: 'Whether the label is active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'ID of the candle this label is designed for',
    required: false,
  })
  @IsOptional()
  candleId?: string;
}
