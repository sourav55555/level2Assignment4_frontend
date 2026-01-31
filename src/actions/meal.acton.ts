"use server"

import { Env } from "@/env"
import { deleteMeal } from "@/services/meal.service";


export const getMealWithId = async (id:string) => {
    const data = await fetch(`${Env.BASE_URL}/meals/${id}`);
    const response = await data.json();
    return response;
}

export const deleteMealId = async (id: string) => {
    const res = await deleteMeal(id);
    return res
}

