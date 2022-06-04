import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Heading } from '@chakra-ui/react';
import { CANCEL_ORDER_MUTATION, OrderStates, QUERY_ORDER_DETAIL } from '../../data';
import { useParams } from 'react-router-dom';
import OrderDetailState from './OrderDetailState';
import OrderDetailItems from './OrderDetailItems';
import OrderDetailInfo from './OrderDetailInfo';
import { useAppRuntime } from '../../contexts/app-runtime';
import { useEffect } from 'react';
import { AppContainer } from '../../components';

const POLLING_INTERVAL = 2000;

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams();
  const orderId = parseInt(`${id}`);

  const { setIsLoading, setErrorMessage } = useAppRuntime();

  const { data, loading, error, stopPolling } = useQuery(QUERY_ORDER_DETAIL, {
    variables: { id: orderId },
    pollInterval: POLLING_INTERVAL,
    fetchPolicy: 'cache-and-network',
  });

  const [cancelOrder] = useMutation(CANCEL_ORDER_MUTATION, {
    variables: { id: orderId },
  });

  const state = data?.getOrder?.state;
  useEffect(() => {
    if (error || state === OrderStates.CANCELLED || state === OrderStates.DELIVERED) {
      stopPolling();
    }
  }, [state, stopPolling, error]);

  useEffect(() => {
    setIsLoading(loading);
    setErrorMessage(error ? 'Error when loading order' : '');
  }, [loading, error]);

  return (
    <AppContainer heading="Order Details">
      {data && <OrderDetailInfo orderInfo={data.getOrder?.info}></OrderDetailInfo>}

      <Heading as="h4" size="md" mt={10}>
        Status
      </Heading>
      <OrderDetailState orderState={state} cancelOrder={() => cancelOrder()}></OrderDetailState>

      <Heading as="h4" size="md" mt={10}>
        Order items
      </Heading>
      {data && <OrderDetailItems items={data.getOrder?.items}></OrderDetailItems>}
    </AppContainer>
  );
};
