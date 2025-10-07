import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Candle } from './candle.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Label {
  @ApiProperty({ description: 'Unique identifier of the label' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Name of the label' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Description of the label', required: false })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'URL of the label image' })
  @Column({ name: 'image_url' })
  imageUrl: string;

  @ApiProperty({
    description: 'Type of label: template, ai-generated, or custom',
  })
  @Column({
    type: 'enum',
    enum: ['template', 'ai-generated', 'custom'],
    default: 'template',
  })
  type: 'template' | 'ai-generated' | 'custom';

  @ApiProperty({
    description:
      'AI prompt used to generate the label (only for ai-generated labels)',
    required: false,
  })
  @Column({ name: 'ai_prompt', nullable: true })
  aiPrompt: string;

  @ApiProperty({ description: 'Whether the label is active', default: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Candle this label is designed for',
    required: false,
    type: () => Candle,
  })
  @OneToMany(() => Candle, (candle) => candle.label, {
    nullable: true,
  })
  candle: Candle;

  @ApiProperty({ description: 'Date when the label was created' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the label was last updated' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
