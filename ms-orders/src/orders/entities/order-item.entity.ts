import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;

  @Column()
  productId: number;

  // for demo purpose, keep product image and product tile directly in the order item
  @Column()
  productTitle: string;

  @Column()
  productImage: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  unit: string;
}
