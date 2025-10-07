import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Order } from './order.entity';
import { CartItem } from './cart-item.entity';
import { OrderItem } from './order-item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Gift {
  @ApiProperty({ description: 'Unique identifier of the gift' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Name of the gift' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Description of the gift', required: false })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'Price of the gift' })
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
  price: number;

  @ApiProperty({ description: 'URL of the gift image' })
  @Column({ name: 'image_url' })
  imageUrl: string;

  @ApiProperty({ description: 'Date when the gift was created' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the gift was last updated' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ApiProperty({ description: 'Cart items containing this gift', type: () => [CartItem] })
  @OneToMany(() => CartItem, (cartItems) => cartItems.gift)
  cartItems: CartItem[];

  @ApiProperty({ description: 'Order items containing this gift', type: () => [OrderItem] })
  @OneToMany(() => OrderItem, (orderItems) => orderItems.gift)
  orderItems: OrderItem[];
}
