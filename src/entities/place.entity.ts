import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IntendedImpact } from './intendedImpact.entity';

@Entity()
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @OneToMany(() => IntendedImpact, (intendedImpact) => intendedImpact.place)
  intendedImpacts: IntendedImpact[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
