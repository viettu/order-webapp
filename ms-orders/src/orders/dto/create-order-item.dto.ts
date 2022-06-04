import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'Id of the product' })
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'Product price' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Product quantiry' })
  @IsNumber()
  quantity: number;
}
