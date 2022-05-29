import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderItemDto {
  @ApiProperty({ description: 'Id of the product' })
  productId: number;

  @ApiProperty({ description: 'Product title' })
  productTitle: string;

  @ApiProperty({ description: 'Product image name' })
  productImage: string;

  @ApiProperty({ description: 'Product price' })
  price: number;

  @ApiProperty({ description: 'Product quantiry' })
  quantity: number;

  @ApiProperty({ description: 'Product unit, currently the value is always "Item"' })
  unit: string;
}
