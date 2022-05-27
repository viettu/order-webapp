import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { OrderStates, QUERY_ORDER_STATE } from "../../data";
import { useEffect } from "react";
import OrderStateBadge from "../../components/OrderStateBadge/OrderStateBadge";

type OrderDetailStateProps = {
    orderId: number;
    pollingStatusInterval?: number;
}

const OrderDetailState: React.FC<OrderDetailStateProps> = ({orderId, pollingStatusInterval }) => {
    const { data, stopPolling, error } = useQuery(QUERY_ORDER_STATE, {
        variables: { id: orderId },
        pollInterval: pollingStatusInterval,
        fetchPolicy: 'network-only',
    });

    const state = data?.getOrderState;
    useEffect(() => {
        if (state === OrderStates.CANCELLED || state === OrderStates.DELIVERED) {
            stopPolling();
        }
    }, [state, stopPolling])

    if (error) {
        return null;
    }

    return (
        <Box>
            <OrderStateBadge state={state} fontSize={'1.2em'}></OrderStateBadge>
        </Box>
    )
}

OrderDetailState.defaultProps = {
    pollingStatusInterval: 0
};

export default OrderDetailState;