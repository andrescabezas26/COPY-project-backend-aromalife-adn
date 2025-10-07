import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  IsBoolean,
} from 'class-validator';

export class CreateLabelDto {
  @ApiProperty({ description: 'Name of the label' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the label', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'URL of the label image', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'Type of label: template, ai-generated, or custom',
    enum: ['template', 'ai-generated', 'custom'],
    default: 'template',
  })
  @IsEnum(['template', 'ai-generated', 'custom'])
  type: 'template' | 'ai-generated' | 'custom';

  @ApiProperty({
    description:
      'AI prompt used to generate the label (only for ai-generated labels)',
    required: false,
  })
  @IsOptional()
  @IsString()
  aiPrompt?: string;

  @ApiProperty({ description: 'Whether the label is active', default: true })
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
