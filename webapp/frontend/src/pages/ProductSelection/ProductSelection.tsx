import { Box, SimpleGrid, Heading } from '@chakra-ui/react';
import { ProductCard } from '../../components';
import { useCart } from '../../contexts/cart';
import { IProduct } from '../../data';

const MOCK_PRODUCTS = [
  { id: 1, title: 'AIR 1', image: 'air1', price: 100, reviewCount: 50, score: 3 },
  { id: 2, title: 'AIR 2', image: 'air2', price: 150, reviewCount: 66, score: 4 },
  { id: 3, title: 'AIR 3', image: 'air3', price: 170, reviewCount: 82, score: 2 },
  { id: 4, title: 'CLEAN 1', image: 'clean1', price: 300, reviewCount: 40, score: 5 },
  { id: 5, title: 'CLEAN 2', image: 'clean2', price: 120, reviewCount: 66, score: 4 },
  { id: 6, title: 'CLICK 1', image: 'click1', price: 270, reviewCount: 83, score: 3 },
  { id: 7, title: 'CLICK 2', image: 'click2', price: 300, reviewCount: 40, score: 5 },
  { id: 8, title: 'CLICK 3', image: 'click3', price: 320, reviewCount: 66, score: 4 },
  { id: 9, title: 'TALENT 1', image: 'talent1', price: 470, reviewCount: 83, score: 5 },
  { id: 10, title: 'TALENT 2', image: 'talent2', price: 470, reviewCount: 83, score: 5 },
];

export const ProductSelection: React.FC = () => {
  const { addItem } = useCart();
  const data: Array<IProduct> = MOCK_PRODUCTS;

  const getItemCart = (product: IProduct) => {
    return { ...product, product: product.title };
  };

  return (
    <Box>
      <Heading as="h4" size="md" borderBottom={'1px solid lightgray'} pb={3}>
        Product selection
      </Heading>
      <SimpleGrid mt="4" minChildWidth="250px" spacing="2em" minH="full">
        {data.map((product, i) => (
          <Box key={i}>
            <ProductCard product={product} addItemToCart={() => addItem(getItemCart(product))} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
