import { gql } from '@apollo/client';

export const CANCEL_ORDER_MUTATION = gql`
  mutation CancelOrder($id: Int) {
    cancelOrder(id: $id) {
      state
    }
  }
`;
