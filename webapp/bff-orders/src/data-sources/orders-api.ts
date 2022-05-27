import BaseApi from './base-api';

export interface IOrdersApi {
  getOrders: () => Promise<any>;
  createOrder: (order: any) => Promise<any>;
}

class OrdersApi extends BaseApi implements IOrdersApi {
  constructor() {
    super();
    this.baseURL = process.env.ORDERS_SERVICE_URL;
  }

  public async getOrder(id: number) {
    return this.getData(`/orders/${id}`);
  }

  public async getOrderState(id: number) {
    return this.getData(`/orders/${id}/state`);
  }

  public async getOrders() {
    return this.getData('/orders');
  }

  // TODO: should replase "any"
  public async createOrder(order: any) {
    return this.postData('/orders', order);
  }

  public async cancelOrder(id: number) {
    return this.postData(`/orders/${id}`);
  }
}

export default OrdersApi;

