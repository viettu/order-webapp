import { useMutation } from '@apollo/client';
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
import { useEffect } from 'react';
import { CREATE_ORDER_MUTATION } from '../../data';
import { useAppRuntime } from '../../contexts/app-runtime';

export const OrderForm = () => {
  const { items, getTotalAmount, clearItems } = useCart();
  const navigate = useNavigate();

  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER_MUTATION, {
    onCompleted: ({ createOrder: order }) => {
      navigate(`/order/${order.id}`);
    },
  });

  const { setIsLoading, setErrorMessage } = useAppRuntime();
  useEffect(() => {
    setIsLoading(loading);
    if (error) {
      setErrorMessage('Error when creating order');
    }
  }, [loading, error]);

  const getOrderData = (orderInfo: IOrderInfo): Partial<IOrder> => {
    return {
      amount: getTotalAmount(),
      info: orderInfo,
      items: items.map((itm) => {
        return {
          productId: itm.product.id,
          productTitle: itm.product.title,
          productImage: itm.product.image,
          price: itm.product.price,
          quantity: itm.quantity,
          unit: 'Item',
        };
      }),
    };
  };

  const onSubmit = async (values: any, actions: FormikHelpers<any>) => {
    const orderData = getOrderData(values as IOrderInfo);
    try {
      await createOrder({ variables: { order: orderData } });

      clearItems();
    } catch (err) {
      setErrorMessage('Error when creating order');
    }
    actions.setSubmitting(false);
  };

  if (loading) {
    return null;
  }

  return (
    <Formik initialValues={{}} onSubmit={onSubmit}>
      {(props) => (
        <Form>
          <VStack spacing="24px">
            <Field name="name">
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
