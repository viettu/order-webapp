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
    const order: IOrder = await this.getData(`/orders/${id}`);

    // fill product info for items
    if (order.items && order.items.length > 0) {
      const productIds = order.items.map((item) => item.productId);
      const products = await this.productApi.getProductsByIds(productIds);

      order.items.forEach((item) => {
        const foundProduct = products.find((p) => (p.id = item.productId));
        item.product = { ...foundProduct };
      });
    }

    return order;
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
