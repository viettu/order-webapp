import React from 'react';
import { Badge } from '@chakra-ui/react';
import { OrderStates } from '../../data';

type OrderStateBadgeProps = {
  fontSize?: string;
  state: string;
};

export const OrderStateBadge: React.FC<OrderStateBadgeProps> = ({ fontSize = '1.2em', state }) => {
  return (
    <>
      {state === OrderStates.CREATED && <Badge fontSize={fontSize}>CREATED</Badge>}
      {state === OrderStates.CONFIRMED && (
        <Badge fontSize={fontSize} colorScheme="green">
          CONFIRMED
        </Badge>
      )}
      {state === OrderStates.CANCELLED && (
        <Badge fontSize={fontSize} colorScheme="red">
          CANCELLED
        </Badge>
      )}
      {state === OrderStates.DELIVERED && (
        <Badge fontSize={fontSize} colorScheme="purple">
          {' '}
          DELIVERED
        </Badge>
      )}
    </>
  );
};
