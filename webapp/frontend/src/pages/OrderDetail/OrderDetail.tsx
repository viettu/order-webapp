import { useQuery } from '@apollo/client';
import { Box, Heading } from '@chakra-ui/react';
import { QUERY_ORDER_DETAIL } from '../../data';
import { useParams } from 'react-router-dom';

import OrderDetailState from './OrderDetailState';
import OrderDetailItems from './OrderDetailItems';
import OrderDetailInfo from './OrderDetailInfo';
import { useAppRuntime } from '../../contexts/app-runtime';
import { useEffect } from 'react';

const OrderDetail = () => {
  const { id } = useParams();
  const orderId = parseInt(`${id}`);

  const { data, loading, error } = useQuery(QUERY_ORDER_DETAIL, {
    variables: { id: orderId },
    fetchPolicy: 'cache-and-network',
  });

  const { setIsLoading, setErrorMessage } = useAppRuntime();
  useEffect(() => {
    setIsLoading(loading);
    if (error) {
      setErrorMessage('Error when loading order');
    }
  }, [loading, error]);

  if (loading) {
    return null;
  }

  return (
    <Box w={'100%'} h={'100%'} alignContent="center">
      <Heading as="h4" size="md" borderBottom={'1px solid lightgray'} pb={3} mb={5}>
        Order Details
      </Heading>

      {data && <OrderDetailInfo orderInfo={data.getOrder?.info}></OrderDetailInfo>}

      <Heading as="h4" size="md" mt={10}>
        Status
      </Heading>
      <OrderDetailState orderId={orderId} pollingStatusInterval={2000}></OrderDetailState>

      <Heading as="h4" size="md" mt={10}>
        Order items
      </Heading>
      {data && <OrderDetailItems items={data.getOrder?.items}></OrderDetailItems>}
    </Box>
  );
};

export default OrderDetail;
