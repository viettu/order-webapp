import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, List, ListItem, Text, VStack, HStack, Flex, Heading, Spacer, Button, Wrap, WrapItem, Center,
    NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, IconButton, StackDivider,
    Image,
    ListIcon,
    Stack,
    Badge
} from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from '@chakra-ui/icons';
import {IOrderItem, QUERY_ORDER_DETAIL} from '../../data';

import { useCart } from '../../contexts/cart';
import { OrderItems } from "../../components";
import { useParams } from "react-router-dom";
import OrderDetailStatus from "./OrderDetailStatus";



export const OrderDetail = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery(QUERY_ORDER_DETAIL, {
        variables: { id: parseInt( `${id}`, 10) },
      });

    // const { data: queryOrderStatusData, stopPolling } = useQuery(QUERY_ORDER_STATUS, {
    //     variables: { orderId },
    //     pollInterval: AppConfigurations.POLLING_INTERVAL,
    //     fetchPolicy: 'cache-and-network',
    // });

    // const orderStep = getOrderStep(data?.getOrder?.state);
    // useEffect(() => {
    // if ([OrderStep.DELIVERED, OrderStep.CANCEL].includes(orderStep)) {
    //     stopPolling();
    // }
    // }, [stopPolling, orderStep]);

      if(loading || error) {
          return <Box>aa</Box>;
      }

    return (
        <Box w={'100%'} h={'100%'} alignContent="center">
            <Heading as='h3' size='lg' borderBottom={'1px solid lightgray'} pb={3} mb={5}>
                Order Detail
            </Heading>

            <VStack border={'1px solid lightgray'} borderRadius={'20px'} p={5} spacing={2} alignItems={'start'}>
                <HStack spacing={5}>
                    <Text minW={'100px'}>Order Number:</Text>
                    <Text>20002020-#:</Text>
                </HStack>
                <HStack spacing={5}>
                    <Text>Name:</Text>
                    <Text>Nguyen Viet Tu</Text>
                </HStack>
                <HStack spacing={5}>
                    <Text>Phone:</Text>
                    <Text>0909147287</Text>
                </HStack>
                <HStack spacing={5}>
                    <Text>Address:</Text>
                    <Text >B3, 05-02 Hoang Anh Gia Lai Gold House, Ap 3, Phuoc Kien, Nha Be, TP. HCM</Text>
                </HStack>
            </VStack>

            <Heading as='h4' size='md' mt={10}>
                Order Statuses
            </Heading>
            {/* <OrderDetailStatus orderId={parseInt(`${id}`)} pollingStatusInterval={2000}></OrderDetailStatus> */}
            <Heading as='h4' size='md' mt={10}>
                Order Items
            </Heading>
            <VStack divider={<StackDivider borderColor='gray.200' />} flex={1} flexWrap={'wrap'}>
                {data.getOrder.items.map((item: IOrderItem) => (
                    <Flex key={item.id} w={'100%'} direction={'row'} alignItems={'center'}>
                        <Center w={100} h={100} >
                            <Image
                                src={'https://bit.ly/2Z4KKcF'}
                                objectFit="cover"
                                alt="picture of a house"
                            />
                        </Center>
                        <Flex flex={1} flexWrap={'wrap'}>
                            <Box flex={1} ml={5} display={{ base: "none", md: "block" }}>
                                <Text>Bad rooo char</Text>
                            </Box>
                            <Center w={{ base: 100 }} ml={2}>
                                {100}
                            </Center>
                            <Center w={{ base: 80 }}>
                                <Text>{(item.price * item.quantity).toFixed()}</Text>
                            </Center>
                        </Flex>
                    </Flex>
                ))}
                <Flex w={'100%'} bgColor={'gray.100'} p={5}>
                    <Spacer></Spacer>
                    <Center>
                        <Text fontSize='xl'>Order Total:</Text>
                        <Text fontSize='xl' ml={3} fontWeight={'bold'}>{'2000'}</Text>
                    </Center>
                </Flex>
            </VStack>
        </Box>
    )
}