import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      title
      price
      reviewCount
      image
      score
    }
  }
`;
