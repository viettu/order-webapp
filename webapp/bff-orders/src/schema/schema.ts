import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type OrderItem {
    id: Int
    order: Order
    product: String
    price: Float
    quantity: Int
    unit: String
  }

  type OrderInfo {
    id: Int
    orders: [Order]
    name: String
    address: String
    phone: String
  }

  type Order {
    id: Int
    state: String
    items: [OrderItem]
    info: OrderInfo
    amount: Float
    entityCreated: String
    entityUpdated: String
  }

  input OrderItemInput {
    product: String
    price: Float
    quantity: Float
    unit: String
  }

  input OrderInfoInput {
    name: String
    address: String
    phone: String
  }

  input OrderInput {
    amount: Float
    items: [OrderItemInput]
    info: OrderInfoInput
  }

  type Query {
    getOrder(id: Int): Order
    getOrderState(id: Int): String
    getOrders: [Order]
  }

  type Mutation {
    createOrder(order: OrderInput): Order
    cancelOrder(id: Int): Order
  }
`;

export { typeDefs };
