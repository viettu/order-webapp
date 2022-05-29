import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderInfoDto {
  @ApiProperty({ description: 'Full name' })
  name: string;

  @ApiProperty({ description: 'Residental Address' })
  address: string;

  @ApiProperty({ description: 'Mobile or home phone number' })
  phone: string;
}
