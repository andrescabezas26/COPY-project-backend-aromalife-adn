import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsOptional, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateMainOptionDto {
  @ApiProperty({ description: 'Name of the main option' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the main option', required: true })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Emoji representing the main option', maxLength: 10, required: true })
  @IsString()
  @MaxLength(10)
  emoji: string;
}
