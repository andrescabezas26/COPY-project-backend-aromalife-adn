import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCustomLabelDto {
  @ApiProperty({ description: 'Name of the custom label' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the custom label',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'ID of the candle this label is designed for',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  candleId?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file for the custom label',
  })
  file: Express.Multer.File;
}
