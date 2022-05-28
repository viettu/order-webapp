import { gql } from '@apollo/client';

export const QUERY_ORDERS = gql`
  query GetOrders {
    getOrders {
      id
      state
      amount
      entityCreated
      info {
        name
        phone
        address
      }
      items {
        quantity
        price
      }
    }
  }
`;
