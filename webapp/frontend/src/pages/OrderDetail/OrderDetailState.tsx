import React from 'react';
import { Box, Button, HStack, Spinner, Text } from '@chakra-ui/react';
import { OrderStates } from '../../data';
import { OrderStateBadge } from '../../components';

type OrderDetailStateProps = {
  orderState: OrderStates;
  cancelOrder?: () => void;
};

const OrderDetailState: React.FC<OrderDetailStateProps> = ({ orderState, cancelOrder }) => {
  return (
    <>
      <Box>
        <OrderStateBadge state={orderState} fontSize={'1.2em'}></OrderStateBadge>
        {orderState === 'CONFIRMED' && (
          <Button onClick={cancelOrder} bgColor={'red.300'} size={'sm'} ml={10}>
            Cancel order
          </Button>
        )}
      </Box>

      {orderState === 'CONFIRMED' && (
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

export default OrderDetailState;
