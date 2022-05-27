import { Box, Text, VStack, Flex, Spacer, Center, StackDivider, Image } from "@chakra-ui/react";
import { IOrderItem } from '../../data';

type OrderDetailItemsProps = {
    items: Array<IOrderItem>
}

const OrderDetailItems: React.FC<OrderDetailItemsProps> = ({items}) => {
    if (!items || items.length === 0) {
        return null
    }

    const getTotalAmount = () => {
        return items.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);
    }

    return (
        <VStack divider={<StackDivider borderColor='gray.200' />}>
            {items.map((item: IOrderItem) => (
                <Flex key={item.id} w={'100%'} direction={'row'} alignItems={'center'}>
                    <Image w={100} h={100}
                        src={`/images/${item.product.image}.png`}
                        objectFit="cover"
                        alt={item.product.title}>
                    </Image>
                    <Flex flex={1} flexWrap={'wrap'} direction={{ base: "column", md: "row" }} ml={5}>
                        <Box flex={1}>
                            <Text fontWeight={'bold'}>{item.product.title}</Text>
                        </Box>
                        <Box w={{ base: '200px' }} textAlign={{base: 'left', md: 'right'}}>{item.price}</Box>
                        <Box w={{ base: '200px' }} textAlign={{base: 'left', md: 'right'}}>{item.quantity}</Box>
                        <Box w={{ base: '200px' }} textAlign={{base: 'left', md: 'right'}}>{(item.quantity * item.price).toFixed(2)}</Box>
                    </Flex>
                </Flex>
            ))}
            <Flex w={'100%'} bgColor={'gray.100'} p={5}>
                <Spacer></Spacer>
                <Center>
                    <Text fontSize='xl'>Order Total:</Text>
                    <Text fontSize='xl' ml={3} fontWeight={'bold'}>{getTotalAmount()}</Text>
                </Center>
            </Flex>
        </VStack>
    )
}

export default OrderDetailItems