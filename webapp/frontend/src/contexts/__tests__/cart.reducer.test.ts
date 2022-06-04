import { CART_REDUCER_TYPE, ICartReducerAction } from '../cart/cart.interface';
import { cartReducer } from '../cart/cart.reducer';

test('Should add item to cart', () => {
  const currentStore = { items: [] };
  const payload = {
    product: { id: 1, title: 'AIR', price: 100, reviewCount: 50, score: 5, image: 'air' },
    quantity: 5,
  };
  const action: ICartReducerAction = {
    type: CART_REDUCER_TYPE.ADD_ITEM,
    payload,
  };

  const store = cartReducer(currentStore, action);
  expect(store.items.length).toEqual(1);
  expect(store.items[0]).toEqual(payload);
});

test('Should update quantity of item', () => {
  const payload = {
    product: { id: 1, title: 'AIR', price: 100, reviewCount: 50, score: 5, image: 'air' },
    quantity: 5,
  };
  const currentStore = { items: [payload] };
  const action: ICartReducerAction = {
    type: CART_REDUCER_TYPE.UPDATE_QUANTITY,
    payload: { id: 1, quantity: 7 },
  };

  const store = cartReducer(currentStore, action);
  expect(store.items[0].quantity).toEqual(7);
});

test('Should clear all items in cart', () => {
  const payload = {
    product: { id: 1, title: 'AIR', price: 100, reviewCount: 50, score: 5, image: 'air' },
    quantity: 5,
  };
  const currentStore = { items: [payload] };
  const action: ICartReducerAction = {
    type: CART_REDUCER_TYPE.CLEAR_ITEMS,
  };

  const store = cartReducer(currentStore, action);
  expect(store.items.length).toEqual(0);
});
