"use server"

import { Env } from "@/env"
import { getOrdersListAdmin, getUsersListAdmin, userStatusChangeAdmin } from "@/services/admin.service";



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
