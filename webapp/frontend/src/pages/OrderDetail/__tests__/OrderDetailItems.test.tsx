import React from 'react';
import OrderDetailItems from '../OrderDetailItems';
import renderer from 'react-test-renderer';
import { TestComponentWrapper } from '../../../utils';

test('snapshot', () => {
  const orderItems = [
    {
      id: 1,
      productId: 1,
      productTitle: 'AIR',
      productImage: 'air',
      price: 500,
      quantity: 5,
    },
  ];
  const component = renderer.create(
    <TestComponentWrapper>
      <OrderDetailItems items={orderItems}></OrderDetailItems>
    </TestComponentWrapper>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
