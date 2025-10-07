import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateContainerDto {
  @ApiProperty({ description: 'Name of the container' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the container', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Image URL of the container', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Base price of the container' })
  @IsNumber()
  @IsNotEmpty()
  basePrice: number;

  @ApiProperty({ description: 'Volume of the container in ml' })
  @IsNumber()
  @IsNotEmpty()
  volume: number;

  @ApiProperty({ description: 'Height of the container in cm' })
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @ApiProperty({ description: 'Diameter of the container in cm' })
  @IsNumber()
  @IsNotEmpty()
  diameter: number;

  @ApiProperty({ description: 'Weight of the container in grams' })
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @ApiProperty({ description: 'Whether the container is active', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 