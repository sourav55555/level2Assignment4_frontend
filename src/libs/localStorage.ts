import { User } from "@/lib/types";


export const setLocalUserData = (data: User) => {
  if (typeof window === "undefined") return; 
  try {
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save user data:", error);
  }
};


export const getLocalUserData = (): User | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("user");
    if (!stored) return null;

    const parsed: User = JSON.parse(stored);

    // Convert createdAt string back to Date
    parsed.createdAt = new Date(parsed.createdAt);

    return parsed;
  } catch (error) {
    console.error("Failed to read user data:", error);
    return null;
  }
};