

import { gql, useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react"

const GET_ORDERS = gql`
query GetOrders {
    getOrders {
        id
        state
    }
}`;

// const OrderItem: React.FC = () => {
//     return (

//     )
// }

export const OrderList: React.FC = () => {
    const { loading, error, data } = useQuery(GET_ORDERS);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    
// return data.map(({ id, state }) => (
//   <div key={currency}>
//     <p>
//       {currency}: {rate}
//     </p>
//   </div>
// ));

    return (
        <Box>
            {JSON.stringify(data)}
        </Box>
    );
}
  