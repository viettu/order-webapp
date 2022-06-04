import React from 'react';
import { Layout } from '../Layout';
import renderer from 'react-test-renderer';
import { TestComponentWrapper } from '../../../utils';

test('snapshot', () => {
  const component = renderer.create(
    <TestComponentWrapper>
      <Layout></Layout>
    </TestComponentWrapper>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
