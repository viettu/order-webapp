import { 
    Box, Heading,
    TableContainer, Table, Thead, Td, Tr, Th, Tbody, Tfoot
} from "@chakra-ui/react";

import React from "react";
import { IOrderItem } from "../../data";

interface IOrderItemsProps {
    items: Array<IOrderItem>
    totalAmount: number
}

export const OrderItems: React.FC<IOrderItemsProps> = ({ items, totalAmount }) => {
    return (
        <>
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
                            {/* <Td isNumeric>{(itemCart.quantity * itemCart)}</Td> */}
                        </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th colSpan={4} textAlign="right">{totalAmount}</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </>
    )
}