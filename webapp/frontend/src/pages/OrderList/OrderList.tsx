import { Box, Text, VStack, Flex, List, ListItem, Stack, Heading } from '@chakra-ui/react';
import { IOrder, QUERY_ORDERS } from '../../data';
import OrderStateBadge from '../../components/OrderStateBadge/OrderStateBadge';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

type OrderListProps = {
  // orderId: number
};

const OrderList: React.FC<OrderListProps> = () => {
  const { data, loading, error } = useQuery(QUERY_ORDERS);
  const navigate = useNavigate();

  if (loading) {
    return <Box>Loading</Box>;
  }

  if (error) {
    return <Box>Error</Box>;
  }

  const orders = data.getOrders as Array<IOrder>;

  return (
    <>
      <Heading as="h4" size="md" borderBottom={'1px solid lightgray'} pb={3} mb={5}>
        List of orders
      </Heading>
      <List spacing={5}>
        {orders.map((item) => (
          <ListItem
            key={item.id}
            boxShadow="outline"
            p={5}
            rounded="lg"
            _hover={{
              background: 'white',
              color: 'teal.500',
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/order/${item.id}`)}
          >
            <VStack spacing={2}>
              <Flex direction={'row'} w={'100%'}>
                <Stack direction={'row'} spacing={'50px'}>
                  <Box>
                    <Text as={'span'}>{`Order Nr: `}</Text>
                    <Text as={'span'}>{`220220101-#`}</Text>
                  </Box>
                  <Box>
                    <OrderStateBadge state={item.state} fontSize={'0.8em'}></OrderStateBadge>
                  </Box>
                  <Box>
                    <Text as={'span'}>{`Created: `}</Text>
                    <Text as={'span'}>{item.entityCreated}</Text>
                  </Box>
                </Stack>
              </Flex>
              <Flex direction={'row'} w={'100%'}>
                <Box>
                  <Text as={'span'}>{`Amount: `}</Text>
                  <Text as={'span'}>{`220220101`}</Text>
                </Box>
              </Flex>
            </VStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default OrderList;
