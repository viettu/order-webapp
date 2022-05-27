import {IOrderItem, IProduct} from '../../data';

export enum CART_REDUCER_TYPE {
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
    CLEAR_ITEMS = 'CLEAR_ITEMS',
    UPDATE_QUANTITY = 'UPDATE_QUANTITY',
}

export interface ICartItemsOperatorsPayload {
    id?: number;
    quantity: number;
    product?: IProduct;
}

export interface ICartReducerAction {
    type: CART_REDUCER_TYPE;
    payload?: ICartItemsOperatorsPayload | undefined;
}

export interface ICartItem {
    product: IProduct;
    quantity: number;
}

export interface ICartStore {
    items: Array<ICartItem>;
}
