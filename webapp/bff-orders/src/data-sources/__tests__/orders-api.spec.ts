import OrdersApi from '../orders-api';

const mockOrder = {
  id: 1,
  state: 'CREATED',
  amount: 100,
};

describe('OrdersAPI', () => {
  let orderApi;
  const getDataFn = jest.fn().mockResolvedValue(mockOrder);
  const postDataFn = jest.fn().mockResolvedValue(mockOrder);

  beforeEach(() => {
    orderApi = new OrdersApi();
    orderApi.getData = getDataFn;
    orderApi.postData = postDataFn;
  });

  it('getOrder', async () => {
    await orderApi.getOrder(10);
    expect(getDataFn).toHaveBeenCalledWith('/orders/10');
  });

  it('getOrderState', async () => {
    await orderApi.getOrderState(1);
    expect(getDataFn).toHaveBeenCalledWith('/orders/1/state');
  });
});
