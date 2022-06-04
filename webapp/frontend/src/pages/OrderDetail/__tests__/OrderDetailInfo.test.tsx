import React from 'react';
import OrderDetailInfo from '../OrderDetailInfo';
import renderer from 'react-test-renderer';
import { TestComponentWrapper } from '../../../utils';

test('snapshot', () => {
  const orderInfo = {
    name: 'Viet Tu',
    address: 'Address',
    phone: '09090909',
  };
  const component = renderer.create(
    <TestComponentWrapper>
      <OrderDetailInfo orderInfo={orderInfo}></OrderDetailInfo>
    </TestComponentWrapper>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
