export class IOrderItem {
  id: number;
  // order?: IOrder;
  productId: number;
  productTitle: string;
  productImage: string;
  // product?: IProduct;
  price: number;
  quantity: number;
  unit: string;
}

export class IOrderInfo {
  id: number;
  // orders?: IOrder[];
  name: string;
  address: string;
  phone: string;
}

export class IOrder {
  id: number;
  // items?: IOrderItem[];
  // info?: IOrderInfo;
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
