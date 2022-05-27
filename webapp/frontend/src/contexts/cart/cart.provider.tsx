import React, { useReducer, useContext, createContext } from 'react';
import { IOrderItem, IProduct } from '../../data';
import { CART_REDUCER_TYPE, ICartItem, ICartStore } from './cart.interface';
import { cartReducer } from './cart.reducer';

interface CartProviderProps {
    children?: React.ReactNode
}

const useCartActions = (initialCart: ICartStore = { items: []}) => {
  const [state, dispatch] = useReducer(cartReducer, initialCart)

  const addCartItem = (item: IProduct, quantity = 1) => {
    dispatch({ type: CART_REDUCER_TYPE.ADD_ITEM, payload: { ...item, quantity } });
  };

  const removeCartItem = (id: number, quantity = 1) => {
    dispatch({ type: CART_REDUCER_TYPE.REMOVE_ITEM, payload: { id, quantity } });
  };

  const updateCartItemQuantity = (id: number, quantity = 1) => {
    dispatch({ type: CART_REDUCER_TYPE.UPDATE_QUANTITY, payload: { id, quantity } });
  };

  const clearCartItems = () => {
    dispatch({ type: CART_REDUCER_TYPE.CLEAR_ITEMS });
  };

  const getItemsCount = () => state.items?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const getTotalAmount = () => state.items.reduce(
    (acc, item) => acc + (item.quantity * item.price),
    0
  );

  return {
    state,
    addCartItem,
    removeCartItem,
    clearCartItems,
    getItemsCount,
    getTotalAmount,
    updateCartItemQuantity
  };
};

const CartStore = createContext({} as any);
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const cartActions = useCartActions();

  return (
    <CartStore.Provider value={
      {
        items: cartActions.state.items,
        addItem: cartActions.addCartItem,
        removeItem: cartActions.removeCartItem,
        clearItems: cartActions.clearCartItems,
        getItemsCount: cartActions.getItemsCount,
        getTotalAmount: cartActions.getTotalAmount,
        updateQuantity: cartActions.updateCartItemQuantity
      }
    }>
      {children}
    </CartStore.Provider>
  )
};

export interface ICartContext {
  isOpen: boolean;
  items: Array<ICartItem>
  addItem: (item: IProduct, quantity?: number) => void
  removeItem: (id: number, quantity?: number) => void
  updateQuantity: (id: number, quantity?: number) => void
  clearItems: () => void
  getItemsCount: () => number
  getTotalAmount: () => number;
}

export const useCart = () => useContext<ICartContext>(CartStore);
