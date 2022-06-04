export interface IProduct {
  id: number;
  title: string;
  price: number;
  reviewCount: number;
  score: number;
  image: string;
}

export interface IOrderItem {
  id: number;
  productId: number;
  product?: IProduct;
  price: number;
  quantity: number;
}

export interface IOrderInfo {
  name: string;
  address: string;
  phone: string;
}

export interface IOrder {
  id: number;
  state: string;
  amount: number;
  items: Array<Partial<IOrderItem>>;
  info: IOrderInfo;
  entityCreated: string;
}

export enum OrderStates {
  CREATED = 'CREATED',
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
}
