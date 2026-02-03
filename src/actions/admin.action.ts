/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { createCategoryData, getDashboardDataAdmin, getOrdersListAdmin, getUsersListAdmin, updateCategoryData, userStatusChangeAdmin } from "@/services/admin.service";



export const getAdminUsers = async () => {
    const data = await getUsersListAdmin();
    return data;
}
export const getAdminOrders = async () => {
    const data = await getOrdersListAdmin();
    return data;
}
export const getDashboardData = async () => {
    const data = await getDashboardDataAdmin();
    return data;
}

export const changeUserStatus = async (payload: any, userId: string) => {
    const data = await userStatusChangeAdmin(payload, userId);

    return data;
}
export const createCategory = async (payload: any) => {
    const result = await createCategoryData(payload);
    return result;
}
export const updateCategory = async (payload: any, categoryId:string) => {
    const result = await updateCategoryData(payload, categoryId);
    return result;
}