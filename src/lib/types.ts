export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  phone?: string | null;
  role?: "USER" | "PROVIDER" | "ADMIN"; // optional now
  status?: "ACTIVE" | "INACTIVE" | "SUSPENDED"; // optional now
  image?: string | null;
  createdAt: string;
  address?: string;
  description?: string | null;
  isActive: boolean;
  restaurant_name: string | null;

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

export interface AdminDashboardData {
  totalUsers: number;
  providers: number;
  customers: number;
  totalMeals: number;
  totalOrders: number;

  totalRevenue: {
    _sum: {
      totalAmount: number | null;
    };
  };

  totalReviews: number;

  orderData: {
    pending: number;
    confirmed: number;
    preparing: number;
    outForDelivery: number;
    delivered: number;
    cancelled: number;
  };
}

export interface OrderItem {
  id: string;
  orderId: string | null;
  userId: string;
  mealId: string;
  quantity: number;
  price: number;
  createdAt: string; // ISO string

  meal: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}


// Types
