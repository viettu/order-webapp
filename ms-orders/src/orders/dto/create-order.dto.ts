import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderInfoDto } from './create-order-info.dto';
import { CreateOrderItemDto } from './create-order-item.dto';
import { IsNumber, IsArray, IsNotEmptyObject, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @ApiProperty({ description: 'Amount of the order' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'List of order items' })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiProperty({ description: 'Meta infomation of the order' })
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderInfoDto)
  info: CreateOrderInfoDto;
}
