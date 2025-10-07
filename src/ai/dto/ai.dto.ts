import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class PromptDto {
  @ApiProperty({ description: 'Prompt for AI generation' })
  @IsString()
  @IsNotEmpty()
  prompt: string;
}
