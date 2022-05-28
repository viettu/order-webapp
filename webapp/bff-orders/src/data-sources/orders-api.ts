import { IOrder } from 'src/schema';
import BaseApi from './base-api';
import ProductsApi from './products-api';

export interface IOrdersApi {
  getOrder: (id: number) => Promise<IOrder>;
  getOrders: () => Promise<Array<IOrder>>;
  createOrder: (order: Partial<IOrder>) => Promise<IOrder>;
  getOrderState: (id: number) => Promise<string>;
  cancelOrder: (id: number) => Promise<IOrder>;
}

class OrdersApi extends BaseApi implements IOrdersApi {
  private readonly productApi = new ProductsApi();

  constructor() {
    super();
    this.baseURL = process.env.ORDERS_SERVICE_URL;
  }

  async getOrder(id: number): Promise<IOrder> {
    return this.getData(`/orders/${id}`);
  }

  async getOrderState(id: number): Promise<string> {
    return this.getData(`/orders/${id}/state`);
  }

  async getOrders(): Promise<Array<IOrder>> {
    return this.getData('/orders');
  }

  async createOrder(order: Partial<IOrder>): Promise<IOrder> {
    return this.postData('/orders', order);
  }

  async cancelOrder(id: number) {
    return this.postData(`/orders/${id}`);
  }
}

export default OrdersApi;
