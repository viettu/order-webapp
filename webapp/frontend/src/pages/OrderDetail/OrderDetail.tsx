import { useQuery } from '@apollo/client';
import { Box, Heading, Center, Spinner } from '@chakra-ui/react';
import { QUERY_ORDER_DETAIL } from '../../data';
import { useParams } from 'react-router-dom';

import OrderDetailState from './OrderDetailState';
import OrderDetailItems from './OrderDetailItems';
import OrderDetailInfo from './OrderDetailInfo';

const OrderDetail = () => {
  const { id } = useParams();
  const orderId = parseInt(`${id}`);
  const { data, loading, error } = useQuery(QUERY_ORDER_DETAIL, {
    variables: { id: orderId },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <Center w={'100vh'} h={'100vh'}>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    );
  }

  // TODO: implement for loading and error state
  if (loading || error) {
    return <Box>aa</Box>;
  }

  return (
    <Box w={'100%'} h={'100%'} alignContent="center">
      <Heading as="h4" size="md" borderBottom={'1px solid lightgray'} pb={3} mb={5}>
        Order Details
      </Heading>

      <OrderDetailInfo orderInfo={data.getOrder.info}></OrderDetailInfo>

      <Heading as="h4" size="md" mt={10}>
        Status
      </Heading>
      <OrderDetailState orderId={orderId} pollingStatusInterval={2000}></OrderDetailState>

      <Heading as="h4" size="md" mt={10}>
        Order items
      </Heading>
      <OrderDetailItems items={data.getOrder.items}></OrderDetailItems>
    </Box>
  );
};

export default OrderDetail;
