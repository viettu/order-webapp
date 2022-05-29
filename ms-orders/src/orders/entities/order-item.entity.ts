import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;

  @Column()
  @ApiProperty({ description: 'ProductId' })
  productId: number;

  // for demo purpose, keep product image and product tile directly in the order item
  @Column()
  @ApiProperty({ description: 'Product title' })
  productTitle: string;

  @Column()
  @ApiProperty({ description: 'Product image' })
  productImage: string;

  @Column()
  @ApiProperty({ description: 'Product price' })
  price: number;

  @Column()
  @ApiProperty({ description: 'Product quantity' })
  quantity: number;

  @Column()
  @ApiProperty({ description: 'Product unit' })
  unit: string;
}
