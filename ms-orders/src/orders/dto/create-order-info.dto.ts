import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOrderInfoDto {
  @ApiProperty({ description: 'Full name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Residental Address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Mobile or home phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
