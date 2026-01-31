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