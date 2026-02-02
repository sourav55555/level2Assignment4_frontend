import { Env } from '@/env';
import { cookies } from 'next/headers';
export const getUsersListAdmin = async () => {
    const cookieStore = await cookies();
    const result = await fetch(`${Env.BASE_URL}/user`,{
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
export const getOrdersListAdmin = async () => {
    const cookieStore = await cookies();
    const result = await fetch(`${Env.BASE_URL}/orders`,{
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
export const getDashboardDataAdmin = async () => {
    const cookieStore = await cookies();
    const result = await fetch(`${Env.BASE_URL}/orders`,{
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
export const userStatusChangeAdmin = async (payload: any, userId: string) => {
    const cookieStore = await cookies();
    const result = await fetch(`${Env.BASE_URL}/user/${userId}`,{
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(payload),
        
            });
    const data = await result.json();
        if (data.error) {
            return {data: null, error:{message: data.error || "post not created"}}
        }
    return {data:data, error: null}

}