import React from 'react';
import { CreateOrderPage } from '../CreateOrderPage';
import renderer from 'react-test-renderer';
import { TestComponentWrapper } from '../../../utils';

test('snapshot', () => {
  const component = renderer.create(
    <TestComponentWrapper>
      <CreateOrderPage></CreateOrderPage>
    </TestComponentWrapper>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
