import {IOrderItem} from '../../data';

export enum CART_REDUCER_TYPE {
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
    CLEAR_ITEMS = 'CLEAR_ITEMS',
    UPDATE_QUANTITY = 'UPDATE_QUANTITY',
}

export interface ICartItemsOperatorsPayload {
    id?: number;
    quantity: number;
    price?: number;
}

export interface ICartReducerAction {
    type: CART_REDUCER_TYPE;
    payload?: ICartItemsOperatorsPayload | undefined;
}

// TODO; should remove this interface?
export interface ICartItem extends IOrderItem {
    amount?: number;
}

export interface ICartStore {
    items: Array<ICartItem>;
}
