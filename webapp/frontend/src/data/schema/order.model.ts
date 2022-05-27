export interface IProduct {
    id: number;
    title: string;
    price: number;
    reviewCount: number;
    score: number;
    unit?: string;
}

export interface IOrderItem {
    id: number;
    product: string;
    price: number;
    quantity: number;
}

export interface IOrderInfo {
    name: string;
    address: string;
    phone: string;
}

export interface IOrder {
    id: number;
    amount: number;
    items: Array<Partial<IOrderItem>>;
    info: IOrderInfo;
    createdDate: string;
}

export enum OrderStates {
    CREATED = 'CREATED',
    CANCELLED = 'CANCELLED',
    CONFIRMED = 'CONFIRMED',
    DELIVERED = 'DELIVERED'
}