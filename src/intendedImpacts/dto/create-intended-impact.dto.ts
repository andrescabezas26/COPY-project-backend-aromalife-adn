import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsUUID, IsArray } from 'class-validator';

export class CreateIntendedImpactDto {
  @ApiProperty({ description: 'Name of the intendedImpact' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Icon for the intendedImpact', required: true })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({ description: 'Description of the intendedImpact', required: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'List of Aroma IDs', type: [String], required: false })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  aromaIds?: string[]; // Cambiar el nombre para reflejar que son IDs

  @ApiProperty({ description: 'Place ID', required: false })
  @IsOptional()
  placeId?: string;

  @ApiProperty({ description: 'MainOption ID' })
  @IsNotEmpty()
  mainOptionId: string;
}