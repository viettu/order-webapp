import { 
    Box, Heading,
    TableContainer, Table, Thead, Td, Tr, Th, Tbody, Tfoot
} from "@chakra-ui/react";

import { OrderForm } from "./OrderForm";
import { useCart } from '../../contexts/cart';

export const Order = () => {
    const { items, getTotalAmount } = useCart();

    return (
        <Box w={'full'} h={'full'} bg={'white'}>
            <Box p={5}>
                <Heading as='h4' size='md'>
                    Your order items
                </Heading>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                        <Tr>
                            <Th>Item</Th>
                            <Th isNumeric>Quantity</Th>
                            <Th isNumeric>Price</Th>
                            <Th isNumeric>Total</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {items.map(itemCart => (
                            <Tr key={itemCart.id}>
                                <Td>{itemCart.product}</Td>
                                <Td isNumeric>{itemCart.quantity}</Td>
                                <Td isNumeric>{itemCart.price}</Td>
                                <Td isNumeric>{(itemCart.price * itemCart.quantity).toFixed(2)}</Td>
                            </Tr>
                            ))}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th colSpan={3} textAlign="right">{getTotalAmount()}</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>

            <Box p={5}>
                <Heading as='h4' size='md'>
                    Your payment info
                </Heading>

                <OrderForm></OrderForm>
            </Box>
        </Box>
    )
}