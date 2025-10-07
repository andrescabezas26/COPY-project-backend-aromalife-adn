import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreatePlaceDto {
  @ApiProperty({ description: 'Name of the place' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the place' })
  @IsString()
  @IsOptional()
  description?: string;
}
