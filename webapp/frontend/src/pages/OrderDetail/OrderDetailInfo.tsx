import { TableContainer, Table, Tr, Td, Tbody, Box } from '@chakra-ui/react';
import { IOrderInfo } from '../../data';

type OrderDetailInfoProps = {
  orderInfo: IOrderInfo;
};

const OrderDetailInfo: React.FC<OrderDetailInfoProps> = ({ orderInfo }) => {
  if (!orderInfo) {
    return null;
  }

  return (
    <Box border={'1px solid lightgray'} borderRadius={'20px'} p={2}>
      <TableContainer>
        <Table variant="unstyled" colorScheme="teal">
          <Tbody>
            <Tr>
              <Td width={'100px'} p={2} fontWeight={'bold'}>
                Order Number:
              </Td>
              <Td p={2}>20002020-#</Td>
            </Tr>
            <Tr>
              <Td p={2} fontWeight={'bold'}>
                Name:
              </Td>
              <Td p={2}>{orderInfo.name}</Td>
            </Tr>
            <Tr>
              <Td p={2} fontWeight={'bold'}>
                Phone:
              </Td>
              <Td p={2}>{orderInfo.phone}</Td>
            </Tr>
            <Tr>
              <Td p={2} fontWeight={'bold'}>
                Address:
              </Td>
              <Td p={2}>{orderInfo.address}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>

    // <VStack border={'1px solid lightgray'} borderRadius={'20px'} p={5} spacing={2} alignItems={'start'}>
    //     <HStack spacing={5}>
    //         <Text minW={'100px'}>Order Number:</Text>
    //         <Text>20002020-#:</Text>
    //     </HStack>
    //     <HStack spacing={5}>
    //         <Text>Name:</Text>
    //         <Text>{orderInfo.name}</Text>
    //     </HStack>
    //     <HStack spacing={5}>
    //         <Text>Phone:</Text>
    //         <Text>{orderInfo.phone}</Text>
    //     </HStack>
    //     <HStack spacing={5}>
    //         <Text>Address:</Text>
    //         <Text>{orderInfo.address}</Text>
    //     </HStack>
    // </VStack>
  );
};

export default OrderDetailInfo;
