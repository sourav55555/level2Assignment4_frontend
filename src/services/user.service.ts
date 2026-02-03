import { Env } from "@/env";
import { cookies } from "next/headers"

export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();

        const res = await fetch(`${Env.BASE_URL}/api/auth/get-session`, {
            method: 'GET',
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: 'no-cache'
        })

            const session = await res.json();
            if (session === null) {
                return {data: null, error:{message: 'session is missing'}}
            }
            
            return {data: session, error: null}
        } catch (err) {
            console.error(err)
            return {data: null, error:{message: 'something went wrong'}}
        }
    }
}