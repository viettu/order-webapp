import React from 'react';
import { UserProfile } from '../UserProfile';
import renderer from 'react-test-renderer';
import { TestComponentWrapper } from '../../../utils';

test('snapshot', () => {
  const component = renderer.create(
    <TestComponentWrapper>
      <UserProfile></UserProfile>
    </TestComponentWrapper>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
