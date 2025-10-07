import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Candle } from './candle.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Container {
  @ApiProperty({ description: 'Unique identifier of the container' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Name of the container' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Description of the container' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'URL of the container image' })
  @Column({ name: 'image_url' })
  imageUrl: string;

  @ApiProperty({ description: 'Base price of the container' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'base_price',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  basePrice: number;

  @ApiProperty({
    description: 'Dimensions of the container',
    example: {
      height: 10,
      width: 8,
      depth: 8,
    },
  })
  @Column({ type: 'jsonb', nullable: true })
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };

  @ApiProperty({
    description: 'Candles using this container',
    type: () => [Candle],
  })
  @OneToMany(() => Candle, (candle) => candle.container)
  candles: Candle[];

  @ApiProperty({ description: 'Date when the container was created' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the container was last updated' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
