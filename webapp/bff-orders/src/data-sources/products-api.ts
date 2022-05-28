import { IProduct } from '../schema';
import BaseApi from './base-api';

export interface IProductsApi {
  getProducts: () => Promise<Array<IProduct>>;
  getProductsByIds: (
    ids: Array<number>,
  ) => Promise<{ [index: number]: IProduct }>;
  getProduct: (id: number) => Promise<IProduct>;
}

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'AIR 1',
    image: 'air1',
    price: 100,
    reviewCount: 50,
    score: 3,
  },
  {
    id: 2,
    title: 'AIR 2',
    image: 'air2',
    price: 150,
    reviewCount: 66,
    score: 4,
  },
  {
    id: 3,
    title: 'AIR 3',
    image: 'air3',
    price: 170,
    reviewCount: 82,
    score: 2,
  },
  {
    id: 4,
    title: 'CLEAN 1',
    image: 'clean1',
    price: 300,
    reviewCount: 40,
    score: 5,
  },
  {
    id: 5,
    title: 'CLEAN 2',
    image: 'clean2',
    price: 120,
    reviewCount: 66,
    score: 4,
  },
  {
    id: 6,
    title: 'CLICK 1',
    image: 'click1',
    price: 270,
    reviewCount: 83,
    score: 3,
  },
  {
    id: 7,
    title: 'CLICK 2',
    image: 'click2',
    price: 300,
    reviewCount: 40,
    score: 5,
  },
  {
    id: 8,
    title: 'CLICK 3',
    image: 'click3',
    price: 320,
    reviewCount: 66,
    score: 4,
  },
  {
    id: 9,
    title: 'TALENT 1',
    image: 'talent1',
    price: 470,
    reviewCount: 83,
    score: 5,
  },
  {
    id: 10,
    title: 'TALENT 2',
    image: 'talent2',
    price: 470,
    reviewCount: 83,
    score: 5,
  },
];

class ProductsApi extends BaseApi implements IProductsApi {
  constructor() {
    super();
  }

  async getProducts(): Promise<Array<IProduct>> {
    return this.cloneMockData();
  }

  async getProductsByIds(
    ids: Array<number>,
  ): Promise<{ [index: number]: IProduct }> {
    const products = this.cloneMockData().filter(
      (itm) => ids.indexOf(itm.id) >= 0,
    );
    const response: { [index: number]: IProduct } = {};
    products.forEach((item) => (response[item.id] = item));
    return response;
  }

  async getProduct(id: number): Promise<IProduct> {
    return this.cloneMockData().find((itm) => itm.id === id);
  }

  private cloneMockData(): Array<IProduct> {
    return MOCK_PRODUCTS.map((item) => ({ ...item }));
  }
}

export default ProductsApi;
