import OrdersApi, { IOrdersApi } from './orders-api';
import ProductsApi, { IProductsApi } from './products-api';

export interface IDatasources {
  OrdersApi: IOrdersApi;
  ProductsApi: IProductsApi;
}

export default () => ({
  OrdersApi: new OrdersApi(),
  ProductsApi: new ProductsApi()
});
