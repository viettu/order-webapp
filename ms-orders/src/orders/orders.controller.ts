import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new order' })
  create(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'list of orders', type: OrderEntity })
  findAll(): Promise<OrderEntity[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The order was found', type: OrderEntity })
  @ApiOperation({ summary: 'Find one order' })
  @ApiResponse({ status: 404, description: 'Order was not found' })
  findOne(@Param('id') id: number): Promise<OrderEntity> {
    return this.ordersService.findOne(id);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Cancel an order' })
  @ApiResponse({ status: 200, description: 'Cancel order is successful', type: OrderEntity })
  @ApiResponse({ status: 400, description: 'Unable cancel an cancelled or delivered order' })
  cancel(@Param('id') id: number): Promise<OrderEntity> {
    return this.ordersService.cancel(id);
  }

  @Get(':id/state')
  @ApiOperation({ summary: 'Get state of an order' })
  @ApiResponse({ status: 200, description: 'Get state is successful' })
  getState(@Param('id') id: number): Promise<string> {
    return this.ordersService.getState(id);
  }
}
