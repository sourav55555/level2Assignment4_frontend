import { Env } from "@/env";
import { cookies } from "next/headers";

export const getCustomerOrderData = async () => {
    const cookieStore = await cookies();
    const result = await fetch(`${Env.BASE_URL}/orders/user`,{
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
export const orderStatusChange = async (orderId: string, status: string) => {
    const cookieStore = await cookies();
    const result = await fetch(`${Env.BASE_URL}/orders/status/${orderId}`,{
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify({ status })
            });
    const data = await result.json();
        if (data.error) {
            return {data: null, error:{message: data.error || "post not created"}}
        }
    return {data:data, error: null}

}