import { CreateOrderInfoDto } from "./create-order-info.dto";
import { CreateOrderItemDto } from "./create-order-item.dto";

export class CreateOrderDto {
    amount: number;
    items: CreateOrderItemDto[]
    info: CreateOrderInfoDto
}