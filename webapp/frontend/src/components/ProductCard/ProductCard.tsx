import React from 'react';
import { Box, IconButton, chakra, Flex, Image } from '@chakra-ui/react';
import { AiTwotoneStar } from 'react-icons/ai';
import { IProduct } from '../../data';
import { AiOutlineShoppingCart } from 'react-icons/ai';

type ProductCardProps = {
  product: IProduct;
  addItemToCart?: () => void;
};

const ChakraStar = chakra(AiTwotoneStar);
export const ProductCard: React.FC<ProductCardProps> = ({ product, addItemToCart }) => {
  const { title, price, score, image } = product;
  return (
    <Flex
      w="full"
      h="full"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      bg="white"
      rounded="xl"
      shadow="lg"
      borderWidth="1px"
    >
      <Box w="full" h="full">
        <Box w="100%" height="200px" position="relative" overflow="hidden" roundedTop="lg">
          <Image src={`/images/${image}.png`} objectFit="cover" alt={title} />
        </Box>

        <Box p="6">
          <Box fontWeight="semibold" as="h4" lineHeight="tight">
            {title}
          </Box>

          <Flex>
            <Box flex={1}>
              <Box>${price}</Box>
              <Flex mt="3" alignItems="center">
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <ChakraStar key={i} color={i < score ? 'teal.500' : 'gray.300'} />
                  ))}
              </Flex>
            </Box>
            <IconButton
              colorScheme="teal"
              size="lg"
              onClick={() => addItemToCart?.()}
              variant="ghost"
              aria-label="open menu"
              icon={<AiOutlineShoppingCart fontSize={'2em'} />}
            />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};
