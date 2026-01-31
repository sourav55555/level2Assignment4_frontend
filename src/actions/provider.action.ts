/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';


import { providerMeals, providerService } from "@/services/provider.service";

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
    // updateTag("blogPosts")
    console.log(response)
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

