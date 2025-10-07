import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GenerateLabelDto {
  @ApiProperty({
    description: 'Text prompt to generate the label image with AI',
    example: 'Fondo pastel con flores de lavanda y texto elegante',
  })
  @IsString()
  prompt: string;

  @ApiProperty({
    description: 'Optional name for the generated label',
    required: false,
  })
  @IsString()
  name?: string;
}
