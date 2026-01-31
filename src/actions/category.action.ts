"use server"
import { Env } from "@/env"

export const getAllCategory = async () => {
    const result = await fetch(`${Env.BASE_URL}/cuisine`);
    const data = await result.json();
    return data.data
}