"use server"

type UserType = {
    name: string,
    email: string,
    phone: string,
    password: string,
    role: string,
  };

export const signUpUser = async (user: UserType) => {
  console.log("signup calll")
    // const result = await authClient.signUp.email(user);
  const result = await fetch("http://localhost:3000/api/auth/sign-up/email", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
    })
    return result;
};

