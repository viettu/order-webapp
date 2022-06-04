export class IOrderItem {
  id: number;
  productId: number;
  product?: IProduct;
  price: number;
  quantity: number;
}

export class IOrderInfo {
  id: number;
  name: string;
  address: string;
  phone: string;
}

export class IOrder {
  id: number;
  items?: IOrderItem[];
  info?: IOrderInfo;
  state: string;
  amount: number;
  entityCreated: Date;
  entityUpdated: Date;
}

export interface IProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  reviewCount: number;
  score: number;
}
