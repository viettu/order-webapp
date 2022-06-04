import React from 'react';
import { ProductsPage } from '../ProductsPage';
import renderer from 'react-test-renderer';
import { TestComponentWrapper } from '../../../utils';

test('snapshot', () => {
  const component = renderer.create(
    <TestComponentWrapper>
      <ProductsPage></ProductsPage>
    </TestComponentWrapper>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
