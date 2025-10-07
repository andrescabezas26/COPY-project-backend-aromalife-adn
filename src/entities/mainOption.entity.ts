import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IntendedImpact } from './intendedImpact.entity';

@Entity()
export class MainOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  emoji: string;

  @OneToMany(() => IntendedImpact, (intendedImpact) => intendedImpact.mainOption)
  intendedImpacts: IntendedImpact[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}