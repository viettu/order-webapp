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
  items?: OrderItemEntity[];

  @ManyToOne(() => OrderInfoEntity, (info) => info.orders)
  info: OrderInfoEntity;

  @Column()
  state: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  entityCreated: Date;

  @UpdateDateColumn()
  entityUpdated: Date;
}
