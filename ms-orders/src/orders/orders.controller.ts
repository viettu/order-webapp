import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(): Promise<OrderEntity[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<OrderEntity> {
    return this.ordersService.findOne(id);
  }

  @Post(':id')
  cancel(@Param('id') id: number): Promise<OrderEntity> {
    return this.ordersService.cancel(id);
  }

  @Get(':id/state')
  getState(@Param('id') id: number): Promise<string> {
    return this.ordersService.getState(id);
  }
}
