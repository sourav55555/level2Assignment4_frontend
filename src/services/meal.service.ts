import { Cart } from "@/components/module/publicComponent/menuDetails";
import { Env } from "@/env";
import { cookies } from "next/headers";

export const deleteMeal = async (id: string) => {
    const cookieStore = await cookies();
    const result = await fetch(`${Env.BASE_URL}/meals/${id}`,{
                method: "DELETE",
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
export const getCartFunction = async () => {
    const cookieStore = await cookies();
    const result = await fetch(`${Env.BASE_URL}/orders/cart`,{
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
export const createCartFunction = async (payload: Cart) => {
    const cookieStore = await cookies();
    const result = await fetch(`${Env.BASE_URL}/orders/cart`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(payload)
        
            });
    const data = await result.json();
        if (data.error) {
            return {data: null, error:{message: data.error || "post not created"}}
        }
    return {data:data, error: null}

}
export const addToCartFunction = async (payload: Cart) => {
    const cookieStore = await cookies();
    const result = await fetch(`${Env.BASE_URL}/orders`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(payload)
        
            });
    const data = await result.json();
        if (data.error) {
            return {data: null, error:{message: data.error || "post not created"}}
        }
    return {data:data, error: null}

}