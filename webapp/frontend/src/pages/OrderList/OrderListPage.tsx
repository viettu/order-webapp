import React from 'react';
import { Box, Text, VStack, Flex, List, ListItem, Stack } from '@chakra-ui/react';
import { IOrder, QUERY_ORDERS } from '../../data';
import { AppContainer, OrderStateBadge } from '../../components';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useAppRuntime } from '../../contexts/app-runtime';
import { useEffect } from 'react';

export const OrderListPage: React.FC = () => {
  const { data, loading, error } = useQuery(QUERY_ORDERS, {
    fetchPolicy: 'cache-and-network',
  });
  const navigate = useNavigate();
  const { setIsLoading, setErrorMessage } = useAppRuntime();

  useEffect(() => {
    setIsLoading(loading);
    setErrorMessage(error ? 'Error when loading list of orders' : '');
  }, [loading, error]);

  const formatDate = (dateIso: string): string => {
    return dateIso?.substring(0, 10).split('-').join('');
  };

  const orders = (data?.getOrders as Array<IOrder>) || [];
  const sortedOrdersDesc = [...orders].sort((a, b) => b.id - a.id);
  return (
    <AppContainer heading="List of orders">
      <List spacing={5}>
        {sortedOrdersDesc.map((order) => (
          <ListItem
            key={order.id}
            boxShadow="outline"
            p={5}
            rounded="lg"
            _hover={{
              background: 'white',
              color: 'teal.500',
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/order/${order.id}`)}
          >
            <VStack spacing={2}>
              <Flex direction={'row'} w={'100%'}>
                <Stack direction={'row'} spacing={'50px'}>
                  <Box>
                    <Text as={'span'} fontWeight="bold">{`Order Nr: `}</Text>
                    <Text as={'span'}>{`${order.entityCreated?.substring(0, 10).split('-').join('')}#${
                      order.id
                    }`}</Text>
                  </Box>
                  <Box>
                    <OrderStateBadge state={order.state} fontSize={'0.8em'}></OrderStateBadge>
                  </Box>
                  <Box>
                    <Text as={'span'} fontWeight="bold">{`Created: `}</Text>
                    <Text as={'span'}>{order.entityCreated?.substring(0, 10)}</Text>
                  </Box>
                </Stack>
              </Flex>
              <Flex direction={'row'} w={'100%'} display={{ base: 'none', md: 'flex' }}>
                <Box>
                  <Text as={'span'} fontWeight="bold">{`Amount: `}</Text>
                  <Text as={'span'}>${order.amount}</Text>
                </Box>
              </Flex>
              <Flex direction={'row'} w={'100%'}>
                <Box>
                  <Text as={'span'} fontWeight="bold">{`Name: `}</Text>
                  <Text as={'span'}>{`${formatDate(order.info?.name)}`}</Text>
                </Box>
              </Flex>
            </VStack>
          </ListItem>
        ))}
      </List>
    </AppContainer>
  );
};
