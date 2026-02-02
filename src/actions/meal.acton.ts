"use server"

import { Cart } from "@/components/module/publicComponent/menuDetails";
import { Env } from "@/env"
import { createCartFunction, deleteMeal, getCartFunction } from "@/services/meal.service";


export const getMealWithId = async (id:string) => {
    const data = await fetch(`${Env.BASE_URL}/meals/${id}`);
    const response = await data.json();
    return response;
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
