"use server"

import { Env } from "@/env";
import { cookies } from "next/headers";

type UserType = {
    name: string,
    email: string,
    phone: string,
    password: string,
    role: string,
  };

export const signUpUser = async (user: UserType) => {


  const result = await fetch("http://localhost:3000/api/auth/sign-up/email", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
    })
    return result;
};


export const userData = async () => {
    const cookieStore = await cookies();
    const result = await fetch(`${Env.BASE_URL}/user/me`,{
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
