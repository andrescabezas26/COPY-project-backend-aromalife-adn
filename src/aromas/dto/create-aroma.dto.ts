import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class OlfativePyramidDto {
  @ApiProperty({ description: 'Top notes of the aroma' })
  @IsString()
  @IsNotEmpty()
  salida: string;

  @ApiProperty({ description: 'Heart notes of the aroma' })
  @IsString()
  @IsNotEmpty()
  corazon: string;

  @ApiProperty({ description: 'Base notes of the aroma' })
  @IsString()
  @IsNotEmpty()
  fondo: string;
}

export class CreateAromaDto {
  @ApiProperty({ description: 'Name of the aroma' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the aroma', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'URL of the aroma image', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Intensity of the aroma (1-5)' })
  @IsNumber()
  @IsNotEmpty()
  intensity: number;

  @ApiProperty({ description: 'Category of the aroma' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'Whether the aroma is active', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ description: 'Color of the aroma', required: false })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({
    description: 'Olfative pyramid of the aroma',
    type: OlfativePyramidDto,
  })
  @ValidateNested()
  @Type(() => OlfativePyramidDto)
  @IsNotEmpty()
  olfativePyramid: OlfativePyramidDto;
}
