import { IDatasources } from 'src/data-sources';

interface IContext {
  dataSources: IDatasources;
}

// TODO: should refactor this with strong type checking
const resolvers = {
  Query: {
    getOrder: async (_: any, { id }: any, { dataSources }: IContext) => {
      return dataSources.OrdersApi.getOrder(id);
    },
    getOrders: async (_: any, __: any, { dataSources }: IContext) => {
      return dataSources.OrdersApi.getOrders();
    },
    getOrderState: async (_: any, { id }: any, { dataSources }: IContext) => {
      return dataSources.OrdersApi.getOrderState(id);
    },
    getProducts: async (_: any, __: any, { dataSources }: IContext) => {
      return dataSources.ProductsApi.getProducts();
    },
  },
  Mutation: {
    createOrder: async (_: any, { order }: any, { dataSources }: IContext) => {
      return dataSources.OrdersApi.createOrder(order);
    },
    cancelOrder: async (_: any, { id }: any, { dataSources }: IContext) => {
      return dataSources.OrdersApi.cancelOrder(id);
    },
  },
};

export { resolvers };
