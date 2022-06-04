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

  @Column()
  @ApiProperty({ description: 'Product price' })
  price: number;

  @Column()
  @ApiProperty({ description: 'Product quantity' })
  quantity: number;
}
