import { IDatasources } from 'src/data-sources';
import { resolvers } from '../resolvers';

const mockGetOrderValue = {
  id: 1,
  state: 'CREATED',
  amount: 500,
};

const mockGetOrdersValue = [
  {
    id: 1,
    state: 'CREATED',
    amount: 500,
  },
  {
    id: 2,
    state: 'DELIVERED',
    amount: 300,
  },
];

const mockDataSources: IDatasources = {
  OrdersApi: {
    getOrder: jest.fn().mockResolvedValue(mockGetOrderValue),
    getOrders: jest.fn().mockResolvedValue(mockGetOrdersValue),
    getOrderState: jest.fn().mockResolvedValue('CREATED'),
    createOrder: jest.fn(),
    cancelOrder: jest.fn(),
  },
  ProductsApi: {
    getProducts: jest.fn().mockResolvedValue([]),
    getProductsByIds: jest.fn().mockResolvedValue([]),
    getProduct: jest.fn().mockResolvedValue({}),
  },
};

describe('Resolvers', () => {
  describe('Query', () => {
    it('getOrder', async () => {
      const result = await resolvers.Query.getOrder(
        undefined,
        {},
        { dataSources: mockDataSources },
      );
      expect(result).toEqual(mockGetOrderValue);
    });

    it('getOrders', async () => {
      const result = await resolvers.Query.getOrders(
        undefined,
        {},
        { dataSources: mockDataSources },
      );
      expect(result).toEqual(mockGetOrdersValue);
    });

    it('getOrderState', async () => {
      const result = await resolvers.Query.getOrderState(
        undefined,
        {},
        { dataSources: mockDataSources },
      );
      expect(result).toEqual('CREATED');
    });
  });
});
