import React from 'react';
import { ProductCard } from '../ProductCard';
import renderer from 'react-test-renderer';
import { TestComponentWrapper } from '../../../utils';
import { IProduct } from '../../../data';

test('snapshot', () => {
  const product: IProduct = {
    id: 1,
    title: 'AIR 1',
    price: 500,
    reviewCount: 5,
    score: 400,
    image: 'air1',
  };
  const component = renderer.create(
    <TestComponentWrapper>
      <ProductCard product={product}></ProductCard>
    </TestComponentWrapper>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
