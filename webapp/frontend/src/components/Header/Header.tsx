import { Box, Button, HStack, Flex, Heading, Spacer, IconButton } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { useCart } from '../../contexts/cart';
import UserProfile from "../UserProfile/UserProfile";
import { AiOutlineShoppingCart } from "react-icons/ai";

export const Header: React.FC = () => {
    const { getItemsCount } = useCart();
    const itemsInCart = getItemsCount();
    return (
        <Flex
            px="4"
            position="sticky"
            top="0"
            height="20"
            zIndex="1"
            alignItems="center"
            bg="white"
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
            justifyContent={{ base: "space-between", md: "flex-end" }}
            >
                <Box p='2'>
                    <Link to={'/product-selection'}>
                        <Heading size='md' color={'teal'}>Shooooop</Heading>
                    </Link>
                </Box>
                <Spacer />

                <HStack spacing={5}>
                    <Link to={'/cart'}>
                        <Button leftIcon={<AiOutlineShoppingCart fontSize={'2em'} />} colorScheme='teal' variant='outline' borderWidth={0}>
                            { itemsInCart > 0 ? itemsInCart : '' }
                        </Button>
                    </Link>
                    <UserProfile></UserProfile>
                </HStack>
        </Flex>
    )
}