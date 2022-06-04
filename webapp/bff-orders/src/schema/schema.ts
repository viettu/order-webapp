import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Product {
    id: Int!
    title: String!
    image: String!
    price: Float!
    reviewCount: Int
    score: Int
  }

  type OrderItem {
    id: Int!
    productId: Int!
    product: Product
    price: Float!
    quantity: Int!
  }

  type OrderInfo {
    id: Int!
    name: String!
    address: String!
    phone: String!
  }

  type Order {
    id: Int!
    state: String!
    items: [OrderItem]
    info: OrderInfo
    amount: Float!
    entityCreated: String!
    entityUpdated: String!
  }

  input OrderItemInput {
    productId: Int!
    price: Float!
    quantity: Float!
  }

  input OrderInfoInput {
    name: String!
    address: String!
    phone: String!
  }

  input OrderInput {
    amount: Float!
    items: [OrderItemInput]
    info: OrderInfoInput
  }

  type Query {
    getOrder(id: Int): Order
    getOrderState(id: Int): String
    getOrders: [Order]
    getProducts: [Product]
  }

  type Mutation {
    createOrder(order: OrderInput): Order
    cancelOrder(id: Int): Order
  }
`;

export { typeDefs };
