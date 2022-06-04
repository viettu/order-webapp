import React from 'react';
import { OrderStateBadge } from '../OrderStateBadge';
import renderer from 'react-test-renderer';
import { TestComponentWrapper } from '../../../utils';

test('snapshot - CANCELLED', () => {
  const component = renderer.create(
    <TestComponentWrapper>
      <OrderStateBadge state="CANCELLED"></OrderStateBadge>
    </TestComponentWrapper>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('snapshot - CREATED', () => {
  const component = renderer.create(
    <TestComponentWrapper>
      <OrderStateBadge state="CREATED"></OrderStateBadge>
    </TestComponentWrapper>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('snapshot - DELIVERED', () => {
  const component = renderer.create(
    <TestComponentWrapper>
      <OrderStateBadge state="DELIVERED"></OrderStateBadge>
    </TestComponentWrapper>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
