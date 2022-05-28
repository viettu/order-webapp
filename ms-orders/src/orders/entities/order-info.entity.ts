import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity("order_info")
export class OrderInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderEntity, order => order.info)
  orders: OrderEntity[];

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;
}
