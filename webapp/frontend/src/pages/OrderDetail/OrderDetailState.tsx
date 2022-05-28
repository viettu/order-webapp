import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, HStack, Spinner, Text } from '@chakra-ui/react';
import { CANCEL_ORDER_MUTATION, OrderStates, QUERY_ORDER_STATE } from '../../data';
import { useEffect } from 'react';
import { OrderStateBadge } from '../../components';

type OrderDetailStateProps = {
  orderId: number;
  pollingStatusInterval?: number;
};

const OrderDetailState: React.FC<OrderDetailStateProps> = ({ orderId, pollingStatusInterval }) => {
  const { data, stopPolling, error } = useQuery(QUERY_ORDER_STATE, {
    variables: { id: orderId },
    pollInterval: pollingStatusInterval,
    fetchPolicy: 'network-only',
  });

  const [cancelOrder] = useMutation(CANCEL_ORDER_MUTATION, {
    variables: { id: orderId },
  });

  const state = data?.getOrderState;
  useEffect(() => {
    if (state === OrderStates.CANCELLED || state === OrderStates.DELIVERED) {
      stopPolling();
    }
  }, [state, stopPolling]);

  if (error) {
    return null;
  }

  return (
    <>
      <Box>
        <OrderStateBadge state={state} fontSize={'1.2em'}></OrderStateBadge>
        {state === 'CONFIRMED' && (
          <Button onClick={() => cancelOrder()} bgColor={'red.300'} size={'sm'} ml={10}>
            Cancel order
          </Button>
        )}
      </Box>

      {state === 'CONFIRMED' && (
        <HStack spacing={'10px'} alignItems={'center'} mt={5}>
          <Spinner size="md" color="teal" />
          <Text as="span" color={'teal'} fontSize={'0.9em'}>
            Your order takes 10 seconds for delivering. By clicking "Cancel order" you will cancel your order
            immediately.
          </Text>
        </HStack>
      )}
    </>
  );
};

OrderDetailState.defaultProps = {
  pollingStatusInterval: 0,
};

export default OrderDetailState;
