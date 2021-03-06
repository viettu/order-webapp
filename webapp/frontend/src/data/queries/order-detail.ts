import { gql } from '@apollo/client';

/**
 * Get detail order with all informations
 */
export const QUERY_ORDER_DETAIL = gql`
  query GetOrderDetail($id: Int) {
    getOrder(id: $id) {
      id
      state
      info {
        name
        address
        phone
      }
      items {
        id
        productId
        product {
          id
          image
          title
          price
          reviewCount
          score
        }
        quantity
        price
      }
    }
  }
`;
