"use server"

import { Env } from "@/env"

export const getMealWithId = async (id:string) => {
    const data = await fetch(`${Env.BASE_URL}/meals/${id}`);
    const response = await data.json();
    return response;
}