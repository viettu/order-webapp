import React from 'react';
import { OrderDetailPage } from '../OrderDetailPage';
import renderer from 'react-test-renderer';
import { TestComponentWrapper } from '../../../utils';

test('snapshot', () => {
  const component = renderer.create(
    <TestComponentWrapper>
      <OrderDetailPage></OrderDetailPage>
    </TestComponentWrapper>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
