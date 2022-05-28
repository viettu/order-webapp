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
              <Td p={2} width={'100px'} fontWeight={'bold'}>
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
  );
};

export default OrderDetailInfo;
