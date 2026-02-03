/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { Cart } from "@/components/module/publicComponent/menuDetails";
import { Env } from "@/env"
import { addToCartFunction, createCartFunction, deleteMeal, getCartFunction } from "@/services/meal.service";


export const getMealWithId = async (id:string) => {
    const data = await fetch(`${Env.BASE_URL}/meals/${id}`);
    const response = await data.json();
    return response;
}
export const getMealWithFilter = async (query:string) => {
      const res = await fetch(`${Env.NEXT_PUBLIC_BASE_URL}/meals?${query}`)
      const data = await res.json()

    return data;
}

export const deleteMealId = async (id: string) => {
    const res = await deleteMeal(id);
    return res
}

export const createCart = async (payload: Cart) => {
    const res = await createCartFunction(payload)
    return res
}
export const getCart = async () => {
    const res = await getCartFunction()
    return res
}
export const addToCart = async (payload: any) => {
     const response = await addToCartFunction(payload);

    return response
}