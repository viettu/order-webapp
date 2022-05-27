import OrdersApi, { IOrdersApi } from './orders-api';

export interface IDatasources {
  OrdersApi: IOrdersApi;
}

export default () => ({
  OrdersApi: new OrdersApi(),
});
