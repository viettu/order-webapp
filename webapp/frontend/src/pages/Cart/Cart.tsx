import { Box, List, ListItem, Text, VStack, Flex, Heading, Spacer, Button, Wrap, WrapItem, Center,
        NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, IconButton, StackDivider,
        Image
} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import {useCart} from '../../contexts/cart';
import { OrderForm } from "../Order/OrderForm";

export const Cart : React.FC = () => {
    const { items, getTotalAmount, removeItem, updateQuantity } = useCart();

    const handleItemQuantityChange = (id: number, quantity: number) => {
        updateQuantity(id, quantity);
    }
  return (
    <Box>
        <Heading as='h3' size='lg' borderBottom={'1px solid lightgray'} pb={3}>
            Shopping Cart
        </Heading>
        
        <Flex width={'100%'}>
            <VStack divider={<StackDivider borderColor='gray.200' />} flex={1} flexWrap={'wrap'}>
                {items.map(item => (
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
                                <NumberInput size='sm' maxW={20} defaultValue={item.quantity} 
                                    min={1} max={100} 
                                    onChange={(valueString) => handleItemQuantityChange(item.id, parseInt(valueString))}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Center>
                            <Center w={{ base: 80 }}>
                                <Text>{(item.price * item.quantity).toFixed()}</Text>
                            </Center>
                        </Flex>
                        <Center>
                            <IconButton
                                variant="outline"
                                aria-label="Remove item"
                                onClick={() => removeItem(item.id, item.quantity)}
                                icon={<DeleteIcon />}
                            />
                        </Center>
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
            <VStack p={5} m={5} border={'1px solid lightgray'} borderRadius={20} w={'450px'}>
                <OrderForm></OrderForm>
            </VStack>
        </Flex>
    </Box>
  );
}