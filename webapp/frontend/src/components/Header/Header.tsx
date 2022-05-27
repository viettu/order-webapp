import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import {useCart} from '../../contexts/cart';

export const Header: React.FC = () => {
    const { getItemsCount } = useCart();
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
                    <Heading size='md'>Boooooo...</Heading>
                </Box>
                <Spacer />
                <ButtonGroup gap='2'>
                    <Link to={'/product-selection'}>
                        <Button colorScheme='teal'>Your orders (0)</Button>
                    </Link>
                    <Link to={'/cart'}>
                        <Button colorScheme='teal'>Your card ({getItemsCount()})</Button>
                    </Link>
                </ButtonGroup>
        </Flex>
    )
}