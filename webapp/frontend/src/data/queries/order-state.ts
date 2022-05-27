import { gql } from "@apollo/client";

export const QUERY_ORDER_STATE = gql`
    query GetOrderState($id: Int) {
        getOrderState(id: $id)
    }
`;