import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'Content of the review' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'Rating of the review (1-5)' })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({ description: 'ID of the user who wrote the review' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'ID of the candle being reviewed' })
  @IsString()
  @IsNotEmpty()
  candleId: string;
}
