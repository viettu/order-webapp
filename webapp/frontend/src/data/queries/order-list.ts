import { gql } from '@apollo/client';

export const QUERY_ORDERS = gql`
  query GetOrders {
    getOrders {
      id
      state
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
