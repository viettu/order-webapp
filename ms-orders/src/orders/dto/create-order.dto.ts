import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderInfoDto } from './create-order-info.dto';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @ApiProperty({ description: 'Amount of the order' })
  amount: number;

  @ApiProperty({ description: 'List of order items' })
  items: CreateOrderItemDto[];

  @ApiProperty({ description: 'Meta infomation of the order' })
  info: CreateOrderInfoDto;
}
