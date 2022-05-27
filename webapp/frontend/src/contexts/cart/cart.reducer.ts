import {IOrderItem, IProduct} from '../../data';
import {CART_REDUCER_TYPE, ICartItem, ICartReducerAction, ICartStore} from './cart.interface';

export const cartReducer = (state: ICartStore, action: ICartReducerAction): ICartStore => {
    switch (action.type) {
        case CART_REDUCER_TYPE.ADD_ITEM:
            return {...state, items: addItemToCart(state, action)};
        case CART_REDUCER_TYPE.REMOVE_ITEM:
            return {...state, items: removeItemFromCart(state, action)};
        case CART_REDUCER_TYPE.CLEAR_ITEMS:
            return {...state, items: []};
        case CART_REDUCER_TYPE.UPDATE_QUANTITY:
            return {...state, items: updateItemQuantity(state, action)};
    }
};

const updateItemQuantity = (state: ICartStore, action: ICartReducerAction) => {
    if (action.payload) {
        const itemIndex = state.items.findIndex((item) => item.product.id === action.payload?.id);
        if (itemIndex > -1) {
            const cloneItems = [...state.items];
            cloneItems[itemIndex].quantity = action.payload.quantity || 0;

            return cloneItems;
        }
    }

    return [...state.items];
};

const addItemToCart = (state: ICartStore, action: ICartReducerAction) => {
    if (!action.payload) {
        return [...state.items];
    }
    const itemIndex = state.items.findIndex((item) => item.product.id === action.payload?.id);

    // If the item exist in the cart, increase the quatity
    if (itemIndex > -1) {
        const cloneItems = [...state.items];
        const cloneItem = cloneItems[itemIndex];
        cloneItem.quantity += action.payload.quantity || 0;

        return cloneItems;
    }
    return [...state.items, {product: action.payload.product, quantity: action.payload.quantity} as ICartItem];
};

const removeItemFromCart = (state: ICartStore, action: ICartReducerAction) => {
    return state.items.reduce((acc: Array<ICartItem>, item) => {
        if (item.product.id === action.payload?.id) {
            const newQuantity = item.quantity - action.payload?.quantity;

            // Remove out of cart if we remove the last item from the cart
            return newQuantity > 0 ? [...acc, {...item, quantity: newQuantity}] : [...acc];
        }
        return [...acc, item];
    }, []);
};
