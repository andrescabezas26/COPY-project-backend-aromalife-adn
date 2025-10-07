import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/entity/user.entity';
import { Gift } from './gift.entity';
import { Review } from './review.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  PENDING = 'PENDING', // Order has been created but not yet processed, es cuando se hace el pago
  PROCESSING = 'PROCESSING', // Order is being prepared or processed, es cuando se prepara el pedido y es aceptado por el admin para empezar a crear la vela
  SHIPPED = 'SHIPPED', // Order has been shipped to the customer
  DELIVERED = 'DELIVERED',  // Order has been delivered to the customer
  CANCELLED = 'CANCELLED',  // Order has been cancelled by the customer or the system
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: 'jsonb' })
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'jsonb', nullable: true })
  paymentDetails: {
    method: string;
    transactionId: string;
    status: string;
  };

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @OneToMany(() => Review, (review) => review.order)
  reviews: Review[];

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
