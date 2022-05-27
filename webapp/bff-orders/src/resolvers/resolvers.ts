// TODO: should refactor this with strong type checking
const resolvers = {
  Query: {
    getOrder: async (_: any, { id }: any, { dataSources }: any) => {
      return dataSources.OrdersApi.getOrder(id);
    },
    getOrders: async (_: any, __: any, { dataSources }: any) => {
      return dataSources.OrdersApi.getOrders();
    },
    getOrderState: async (_: any, { id }: any, { dataSources }: any) => {
      return dataSources.OrdersApi.getOrderState(id);
    },
  },
  Mutation: {
    createOrder: async (_: any, { order }: any, { dataSources }: any) => {
      return dataSources.OrdersApi.createOrder(order);
    },
    cancelOrder: async (_: any, { id }: any, { dataSources }: any) => {
      return dataSources.OrdersApi.cancelOrder(id);
    },
  },
};

export { resolvers };