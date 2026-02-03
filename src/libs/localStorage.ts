import { User } from "@/lib/types";


export const setLocalUserData = (data: User) => {
  if (typeof window === "undefined") return; 
  try {
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save user data:", error);
  }
};
export const removeLocalUserData = () => {
  if (typeof window === "undefined") return; 
  try {
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Failed to remove user data:", error);
  }
};


export const getLocalUserData = (): User | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("user");
    if (!stored) return null;

    const parsed: User = JSON.parse(stored);

    return parsed;
  } catch (error) {
    console.error("Failed to read user data:", error);
    return null;
  }
};

export const getCartCount = () => {
  if (typeof window === "undefined") return null;

   try {
    const stored = sessionStorage.getItem("cart");
    if (!stored) return null;

    const parsed: number = JSON.parse(stored);

    return parsed;
  } catch (error) {
    console.error("Failed to read user data:", error);
    return null;
  }
}

export const setCartCount = (count: number) => {
  if (typeof window === "undefined") return; 
  try {
    sessionStorage.setItem("cart", JSON.stringify(count));
  } catch (error) {
    console.error("Failed to save user data:", error);
  }
};
export const removeCartCount = () => {
  if (typeof window === "undefined") return; 
  try {
    sessionStorage.removeItem("cart");
  } catch (error) {
    console.error("Failed to remove user data:", error);
  }
};