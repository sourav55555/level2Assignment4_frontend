'use server';

import { getCustomerOrderData, orderStatusChange } from "@/services/order.service";

export const getCustomerOrder = async () => {
    const response = await getCustomerOrderData();
    return response;
}
export const orderStatus = async (orderId: string, status: string) => {
    const response = await orderStatusChange(orderId, status);
    return response;
}