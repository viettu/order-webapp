import React from 'react';
import {
  Box,
  Text,
  VStack,
  Flex,
  Spacer,
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  StackDivider,
  Image,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

import { DeleteIcon } from '@chakra-ui/icons';
import { useCart } from '../../contexts/cart';
import { OrderForm } from './OrderForm';
import { Link } from 'react-router-dom';
import { AppContainer } from '../../components';

export const CreateOrderPage: React.FC = () => {
  const { items, getTotalAmount, removeItem, updateQuantity } = useCart();

  return (
    <AppContainer heading="List of orders">
      {items.length === 0 && (
        <Alert status="warning">
          <AlertIcon />
          Your cart is empty, click
          <Link to={'/products'}>
            <Text p={2} as="span" fontSize={'1.2em'} fontWeight="bold" color={'teal'}>
              here
            </Text>
          </Link>{' '}
          to continue shopping...
        </Alert>
      )}

      <Flex width={'100%'} direction={{ base: 'column', md: 'row' }}>
        <VStack divider={<StackDivider borderColor="gray.200" />} flex={1} flexWrap={'wrap'}>
          {items.map((item) => (
            <Flex key={item.product.id} w={'100%'} direction={'row'} alignItems={'center'}>
              <Image
                w={100}
                h={100}
                src={`/images/${item.product.image}.png`}
                objectFit="cover"
                alt={item.product.title}
              />
              <Flex flex={1} flexWrap={'nowrap'} direction={{ base: 'column', md: 'row' }} ml={5} mr={2}>
                <Box flex={1}>
                  <Text fontWeight={'bold'}>{item.product.title}</Text>
                </Box>
                <Box flex={1} textAlign={{ base: 'left', md: 'right' }}>
                  {item.product.price}
                </Box>
                <Flex flex={1} justifyContent={{ base: 'left', lg: 'right' }}>
                  <NumberInput
                    size="sm"
                    maxW={20}
                    defaultValue={item.quantity}
                    min={1}
                    max={100}
                    flex={'none'}
                    onChange={(valueString) => updateQuantity(item.product.id, parseInt(valueString))}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
                <Box flex={1} textAlign={{ base: 'left', md: 'right' }}>
                  ${item.quantity * item.product.price}
                </Box>
              </Flex>
              <IconButton
                variant="outline"
                aria-label="Remove item"
                onClick={() => removeItem(item.product.id, item.quantity)}
                icon={<DeleteIcon />}
              />
            </Flex>
          ))}
          <Flex w={'100%'} p={5}>
            <Spacer></Spacer>
            <Center>
              <Text fontSize="xl">Order Total:</Text>
              <Text fontSize="xl" ml={3} fontWeight={'bold'}>
                {getTotalAmount()}
              </Text>
            </Center>
          </Flex>
        </VStack>
        {items.length > 0 && (
          <VStack p={5} m={{ base: 0, md: 5 }} border={'1px solid lightgray'} borderRadius={20} w={{ base: 'auto' }}>
            <OrderForm></OrderForm>
          </VStack>
        )}
      </Flex>
    </AppContainer>
  );
};
