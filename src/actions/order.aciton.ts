'use server';

import { getCustomerOrderData } from "@/services/order.service";

export const getCustomerOrder = async () => {
    const response = await getCustomerOrderData();
    return response;
}