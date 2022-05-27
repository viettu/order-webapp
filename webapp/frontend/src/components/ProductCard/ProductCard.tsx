import { Box, Button, IconButton, chakra, Flex, Image } from "@chakra-ui/react"
import { AiTwotoneStar } from "react-icons/ai";
import { IProduct } from "../../data";
import { AiOutlineShoppingCart } from "react-icons/ai";

interface ProductCardProps {
    product: IProduct,
    addItemToCart?: () => void
}

const ChakraStar = chakra(AiTwotoneStar);
// const ChakraCart = chakra(BsFillCartPlusFill);

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    addItemToCart
}) => {
    const {
        title,
        price,
        reviewCount,
        score,
        image
      } = product;
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
          <Box
            w="100%"
            height="200px"
            position="relative"
            overflow="hidden"
            roundedTop="lg"
          >
            <Image
              src={`/images/${image}.png`}
              objectFit="cover"
              alt={title}
            />
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
                        .fill("")
                        .map((_, i) => (
                            <ChakraStar
                            key={i}
                            color={i < score ? "teal.500" : "gray.300"}
                            />
                        ))}
                        {/* <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        {reviewCount} reviews
                        </Box> */}
                    </Flex>
                </Box>
                <IconButton
                  colorScheme='teal'
                  size="lg"
                  onClick={() => addItemToCart?.()}
                  variant="ghost"
                  aria-label="open menu"
                  icon={<AiOutlineShoppingCart fontSize={'2em'} />}
                />
                {/* <Center w={50} h={50} color="blue">
                    <Button onClick={() => addItemToCart?.()}>
                        Add to cart
                    </Button>
                </Center> */}
            </Flex>
          </Box>
        </Box>
      </Flex>
    )
}

// import Image from "next/image";
// import { Box, Flex, chakra } from "@chakra-ui/react";
// import { AiTwotoneStar } from "react-icons/ai";

// const ChakraStar = chakra(AiTwotoneStar);

// export default function ProductCard({ product, setModalData }) {
//   const { img, title, price } = product;
//   const score = Math.floor(Math.random(5) * 5);
//   const reviewCount = Math.floor(Math.random(50) * 50);

//   return (
//     <Flex
//       w="full"
//       h="full"
//       alignItems="center"
//       justifyContent="center"
//       cursor="pointer"
//       bg="white"
//       rounded="xl"
//       shadow="lg"
//       borderWidth="1px"
//       onClick={() => setModalData(product)}
//     >
//       <Box w="full" h="full">
//         <Box
//           w="100%"
//           height="200px"
//           position="relative"
//           overflow="hidden"
//           roundedTop="lg"
//         >
//           <Image
//             src={img}
//             objectFit="cover"
//             alt="picture of a house"
//             layout="fill"
//           />
//         </Box>

//         <Box p="6">
//           <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
//             {title}
//           </Box>

//           <Box>${price}</Box>

//           <Box d="flex" mt="3" alignItems="center">
//             {Array(5)
//               .fill("")
//               .map((_, i) => (
//                 <ChakraStar
//                   key={i}
//                   color={i < score ? "teal.500" : "gray.300"}
//                 />
//               ))}
//             <Box as="span" ml="2" color="gray.600" fontSize="sm">
//               {reviewCount} reviews
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </Flex>
//   );
// }
