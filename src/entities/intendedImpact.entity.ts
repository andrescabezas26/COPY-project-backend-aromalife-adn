import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Aroma } from './aroma.entity';
import { Place } from './place.entity';
import { MainOption } from './mainOption.entity';

@Entity()
export class IntendedImpact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @ManyToMany(() => Aroma, (aroma) => aroma.intendedImpacts)
  aromas: Aroma[];

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Place, (place) => place.intendedImpacts, { nullable: true })
  place: Place;

  @ManyToOne(() => MainOption, (mainOption) => mainOption.intendedImpacts)
  mainOption: MainOption;
}
