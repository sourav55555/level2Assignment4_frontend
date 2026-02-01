/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';


import { providerDashboard, providerMeals, providerService } from "@/services/provider.service";

export type BlogData = {
    title: string;
    content: string;
    tags: string[]
}
// export const getBlogs = async () => {
//     return await blogService.getBlogPosts() 
// }

export const createMealReq = async (data: any) => {
     const response = await providerService.createProvider(data);

    return response
}
export const updateMealReq = async (data: any, id: string) => {
     const response = await providerService.updateProviderMeal(data, id);

    return response
}

export const getProviderMeal = async () => {
    const response = await providerMeals();
    return response;
}
export const getMealData = async () => {
    const response = await providerMeals();
    return response;
}

export const getProviderDashboardData = async () => {
     const response = await providerDashboard();
    return response;
}

