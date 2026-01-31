/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "@/env";
import { MenuItem } from "@/lib/types";
import { cookies } from "next/headers";

export const providerService = {
    
   createProvider: async (providerData: any) => {
        try {
        
              const cookieStore = await cookies();
                    const res = await fetch(`${Env.BASE_URL}/provider/create`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            Cookie: cookieStore.toString()
                        },
                        body: JSON.stringify(providerData)
                        
                    })
            const data = await res.json();
            if (data.error) {
                return {data: null, error:{message: data.error || "post not created"}}
            }
            return {data:data, error: null}
        } catch (e) {
            console.error("Create provider error:", e);
            return { data: null, error: { message: "something went wrong" } };
        }
    },
    
    updateProviderMeal: async(mealData: any, mealId: string) => {
        try {
        
              const cookieStore = await cookies();
                    const res = await fetch(`${Env.BASE_URL}/meals/${mealId}`, {
                        method: "PUT",
                        headers: {
                            "content-type": "application/json",
                            Cookie: cookieStore.toString()
                        },
                        body: JSON.stringify(mealData)
                        
                    })
            const data = await res.json();
            if (data.error) {
                return {data: null, error:{message: data.error || "post not created"}}
            }
            return {data:data, error: null}
        } catch (e) {
            console.error("Create provider error:", e);
            return { data: null, error: { message: "something went wrong" } };
        }
    }
}

export const providerMeals = async () => {
    const cookieStore = await cookies();
    const result = await fetch(`${Env.BASE_URL}/provider/meals`,{
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Cookie: cookieStore.toString()
                },
        
            });
    const data = await result.json();
        if (data.error) {
            return {data: null, error:{message: data.error || "post not created"}}
        }
    return {data:data, error: null}

}