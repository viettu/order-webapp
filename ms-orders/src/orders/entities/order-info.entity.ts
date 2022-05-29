import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_info')
export class OrderInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderEntity, (order) => order.info)
  orders: OrderEntity[];

  @Column()
  @ApiProperty({ description: 'Full name' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Residental address' })
  address: string;

  @Column()
  @ApiProperty({ description: 'Mobile or home phone number' })
  phone: string;
}
