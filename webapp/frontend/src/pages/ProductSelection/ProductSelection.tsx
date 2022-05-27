// import ProductModal from "@components/ProductModal ";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { ProductCard } from "../../components";
import {useCart, ICartItem} from '../../contexts/cart';
import { IProduct } from "../../data";

export const ProductSelection : React.FC = () => {
    const { addItem, items } = useCart();

  // const [modalData, setModalData] = useState(null);
  const data: Array<IProduct> = [
      {
        id: 1,
        title: 'Product 1',
        price: 100,
        reviewCount: 100,
        score: 3
      },
      {
        id: 2,
        title: 'Product 2',
        price: 100,
        reviewCount: 100,
        score: 3
      },
      {
        id: 3,
        title: 'Product 3',
        price: 100,
        reviewCount: 100,
        score: 3
      },
      {
        id: 4,
        title: 'Product 4',
        price: 100,
        reviewCount: 100,
        score: 3
      },
      {
        id: 5,
        title: 'Product 5',
        price: 100,
        reviewCount: 100,
        score: 3
      },
    ];

  const getItemCart = (product: IProduct) => {
    return {...product, product: product.title};
  }

  return (
    <Box>
      <SimpleGrid
        mt="4"
        minChildWidth="250px"
        spacing="2em"
        minH="full"
      >
        {data.map((product, i) => (
          <Box key={i}>
            <ProductCard product={product} addItemToCart={() => addItem(getItemCart(product))}/>
          </Box>
        ))}
      </SimpleGrid>
      {/* <ProductModal
        isOpen={modalData ? true : false}
        onClose={() => setModalData(null)}
        modalData={modalData}
      /> */}
    </Box>
  );
}
