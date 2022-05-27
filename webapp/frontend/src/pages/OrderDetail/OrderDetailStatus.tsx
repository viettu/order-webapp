import { useQuery } from "@apollo/client";
import { Badge, HStack } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { OrderStates, QUERY_ORDER_STATE } from "../../data";
import { useEffect } from "react";

type OrderDetailStatusProps = {
    orderId: number
    pollingStatusInterval?: number
}

const OrderDetailStatus: React.FC<OrderDetailStatusProps> = ({orderId, pollingStatusInterval = 0}) => {
    const { data, stopPolling, error } = useQuery(QUERY_ORDER_STATE, {
        variables: { orderId },
        pollInterval: pollingStatusInterval,
        fetchPolicy: 'cache-and-network',
    });

    if (error) {
        return null;
    }

    const state = data?.getOrderState;
    useEffect(() => {
        if (state === OrderStates.CANCELLED || state.DELIVERED) {
            stopPolling();
        }
    }, [state, stopPolling])

    return (
        <HStack mt={5} spacing={10}>
            <Badge fontSize='1.2em'>
                <CheckIcon color='green.500' />
                CREATED
            </Badge>
            <Badge colorScheme='green' fontSize='1.2em'>
                {state === OrderStates.CONFIRMED && (<CheckIcon color='green.500' />)}
                COFIRMED
            </Badge>
            <Badge colorScheme='red' fontSize='1.2em'>
                {state === OrderStates.CANCELLED && (<CheckIcon color='green.500' />)}
                CANCELLED
            </Badge>
            <Badge colorScheme='purple' fontSize='1.2em'>
                {state === OrderStates.DELIVERED && (<CheckIcon color='green.500' />)}
                DELIVERED
            </Badge>
        </HStack>
    )
}

export default OrderDetailStatus;