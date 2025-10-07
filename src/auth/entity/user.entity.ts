import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { Cart } from '../../entities/cart.entity';
import { Candle } from '../../entities/candle.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text')
  name: string;

  @Column('text')
  lastName: string;

  @Column('text')
  phone: string;

  @Column({ type: 'text' })
  phoneCountryCode: string;

  @Column('text')
  city: string;

  @Column('text', { nullable: true })
  state?: string;

  @Column('text')
  country: string;

  @Column('text')
  address: string;

  @Column('text', { nullable: true })
  profilePicture?: string;

  @Column('text', { array: true, default: [] })
  roles: string[];

  @Column('bool', { default: true })
  isActive: boolean;

  @OneToMany(() => Order, (order) => order.userId)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.userId)
  carts: Cart[];

  @OneToMany(() => Candle, (candle) => candle.user)
  candles: Candle[];
}
