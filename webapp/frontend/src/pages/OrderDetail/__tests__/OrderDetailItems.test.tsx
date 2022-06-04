import React from 'react';
import OrderDetailItems from '../OrderDetailItems';
import renderer from 'react-test-renderer';
import { TestComponentWrapper } from '../../../utils';

test('snapshot', () => {
  const orderItems = [
    {
      id: 1,
      productId: 1,
      product: {
        id: 1,
        title: 'AIR',
        image: 'air',
        price: 500,
        reviewCount: 5,
        score: 5
      },
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
