import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Candle } from './candle.entity';
import { IntendedImpact } from './intendedImpact.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Aroma {
  @ApiProperty({ description: 'Unique identifier of the aroma' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Name of the aroma' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Description of the aroma' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    description: 'Olfative pyramid of the aroma',
    example: {
      salida: 'Citrus notes',
      corazon: 'Floral notes',
      fondo: 'Woody notes',
    },
  })
  @Column({ type: 'json', name: 'olfative_pyramid' })
  olfativePyramid: {
    salida: string;
    corazon: string;
    fondo: string;
  };

  @ApiProperty({ description: 'URL of the aroma image' })
  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @ApiProperty({ description: 'Color of the aroma' })
  @Column()
  color: string;

  @ApiProperty({ description: 'Date when the aroma was created' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the aroma was last updated' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Associated intended impacts',
    type: () => [IntendedImpact],
  })
  @ManyToMany(() => IntendedImpact, (intendedImpact) => intendedImpact.aromas, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  intendedImpacts: IntendedImpact[];

  @ApiProperty({
    description: 'Candles using this aroma',
    type: () => [Candle],
  })
  @OneToMany(() => Candle, (candle) => candle.aroma)
  candles: Candle[];
}
