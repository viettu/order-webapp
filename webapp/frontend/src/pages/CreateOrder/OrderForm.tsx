import { gql, useMutation } from '@apollo/client';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  VStack,
  InputLeftElement,
  Center,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { useCart } from '../../contexts/cart';
import { IOrder, IOrderInfo } from '../../data';
import { useNavigate } from 'react-router-dom';
// import styled from "styled-components";

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($order: OrderInput) {
    createOrder(order: $order) {
      id
      state
    }
  }
`;

// const StyledForm = styled(Form)`
//     width: 100%
// `

export const OrderForm = () => {
  const { items, getTotalAmount, clearItems } = useCart();
  const navigate = useNavigate();

  const [createOrder, { loading }] = useMutation(CREATE_ORDER_MUTATION, {
    onCompleted: ({ createOrder: order }) => {
      navigate(`/order/${order.id}`);
    },
  });

  function getOrderData(orderInfo: IOrderInfo): Partial<IOrder> {
    return {
      amount: getTotalAmount(),
      info: orderInfo,
      items: items.map((itm) => {
        return {
          productId: itm.product.id,
          price: itm.product.price,
          quantity: itm.quantity,
          unit: 'Item',
        };
      }),
    };
  }

  const validateName = (value: string) => {
    let error;
    if (!value) {
      error = 'Name is required';
    }
    return error;
  };

  const onSubmit = async (values: any, actions: FormikHelpers<any>) => {
    const orderData = getOrderData(values as IOrderInfo);
    try {
      const newOrder = await createOrder({
        variables: {
          order: orderData,
        },
      });

      clearItems();
    } catch (err) {
      // TODO: set error;
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik initialValues={{}} onSubmit={onSubmit}>
      {(props) => (
        <Form>
          <VStack spacing="24px">
            <Field name="name" validate={validateName}>
              {({ field, form }: any) => (
                <FormControl isRequired isInvalid={form.errors.fullName && form.touched.fullName}>
                  <FormLabel htmlFor="name">Full name</FormLabel>
                  <Input {...field} id="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="address">
              {({ field, form }: any) => (
                <FormControl isRequired isInvalid={form.errors.address && form.touched.address}>
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <Input {...field} id="address" />
                  <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="phone">
              {({ field, form }: any) => (
                <FormControl isRequired isInvalid={form.errors.address && form.touched.address}>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<PhoneIcon color="gray.300" />} />
                    <Input type="tel" {...field} id="phone" />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </VStack>

          <Center w={'100%'}>
            <Button mt={4} colorScheme="teal" size="lg" isLoading={props.isSubmitting} type="submit">
              Create Order
            </Button>
          </Center>
        </Form>
      )}
    </Formik>
  );
};
