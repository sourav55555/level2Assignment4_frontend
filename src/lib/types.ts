export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  phone?: string | null;
  role?: "USER" | "PROVIDER" | "ADMIN"; // optional now
  status?: "ACTIVE" | "INACTIVE" | "SUSPENDED"; // optional now
  image?: string | null;
  createdAt: Date;
};

export type CategoryType = {
  id: string;
  name: string
}


// Option 1: Simple and clean interface (most common)
export interface MenuItem {
  cuisine: CategoryType;
  cuisineId: string;
  description: string;
  dietPreference: string; // or just string if not strict
  id: string; // UUID format
  imageUrl: string;
  ingredient: string; // comma-separated or could be string[]
  name: string;
  price: number;
  provider: CategoryType;
  providerId: string;
  status: string; // adjust as needed
  tags: string; // comma-separated string
}