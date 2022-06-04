import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderInfoEntity } from './order-info.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    cascade: true,
    nullable: true,
  })
  @ApiProperty({ description: 'Order items', type: OrderItemEntity })
  items?: OrderItemEntity[];

  @ManyToOne(() => OrderInfoEntity, (info) => info.orders)
  @ApiProperty({ description: 'meta infor of who crated order', type: OrderInfoEntity })
  info: OrderInfoEntity;

  @ApiProperty({ description: 'The state of order. Value could be CREATED | DELIVERED | CANCELLED' })
  @Column()
  state: string;

  @ApiProperty({ description: 'Amount of order' })
  @Column()
  amount: number;

  @CreateDateColumn()
  @ApiProperty({ description: 'Order created date' })
  entityCreated: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Order last updated date' })
  entityUpdated: Date;
}
