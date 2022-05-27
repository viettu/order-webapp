export const ORDERS_PAYMENT_QUEUE_NAME = "PAY_PROCESS";

export enum OrderStates {
    CREATED = 'CREATED',
    CANCELLED = 'CANCELLED',
    CONFIRMED = 'CONFIRMED',
    DELIVERED = 'DELIVERED'
};

export enum PaymentProcessStatuses {
    CONFIRMED = 'CONFIRMED',
    DECLINED = 'DECLINED'
}