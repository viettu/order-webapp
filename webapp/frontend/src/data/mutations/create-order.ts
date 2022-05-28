import { gql } from '@apollo/client';

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($order: OrderInput) {
    createOrder(order: $order) {
      id
      state
    }
  }
`;
