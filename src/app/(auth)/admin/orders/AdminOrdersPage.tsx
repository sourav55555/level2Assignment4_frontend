"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  User,
  Store,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  ChevronDown,
  ChevronUp,
  CreditCard,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Types
type OrderStatus = "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

interface OrderItem {
  id: string;
  orderId: string;
  userId: string;
  mealId: string;
  quantity: number;
  price: number;
  createdAt: string;
  meal: {
    id: string;
    name: string;
    image?: string;
    category?: string;
  };
}

interface Order {
  id: string;
  customerId: string;
  providerId: string;
  status: OrderStatus;
  totalAmount: number;
  address: string;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    image?: string;
  };
  provider: {
    id: string;
    name: string;
    restaurant_name?: string;
    phone: string;
    image?: string;
  };
  orderItems: OrderItem[];
}

// Mock data
const mockOrders: Order[] = [
  {
    id: "ORD-2026-001",
    customerId: "CUST-001",
    providerId: "PROV-001",
    status: "PREPARING",
    totalAmount: 1250.50,
    address: "123 Main Street, Apartment 4B, Dhaka 1207",
    paymentStatus: "PAID",
    createdAt: "2026-02-02T10:30:00.000Z",
    updatedAt: "2026-02-02T10:45:00.000Z",
    customer: {
      id: "CUST-001",
      name: "Ahmed Rahman",
      email: "ahmed.rahman@example.com",
      phone: "01712345678",
      image: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg",
    },
    provider: {
      id: "PROV-001",
      name: "Karim's Kitchen",
      restaurant_name: "Karim's Kitchen",
      phone: "01987654321",
      image: "https://img.freepik.com/free-photo/restaurant-interior_1127-3394.jpg",
    },
    orderItems: [
      {
        id: "ITEM-001",
        orderId: "ORD-2026-001",
        userId: "CUST-001",
        mealId: "MEAL-001",
        quantity: 2,
        price: 450,
        createdAt: "2026-02-02T10:30:00.000Z",
        meal: {
          id: "MEAL-001",
          name: "Beef Biryani",
          image: "https://img.freepik.com/free-photo/delicious-indian-food-tray_23-2148723505.jpg",
          category: "Main Course",
        },
      },
      {
        id: "ITEM-002",
        orderId: "ORD-2026-001",
        userId: "CUST-001",
        mealId: "MEAL-002",
        quantity: 1,
        price: 350.50,
        createdAt: "2026-02-02T10:30:00.000Z",
        meal: {
          id: "MEAL-002",
          name: "Chicken Tikka Masala",
          image: "https://img.freepik.com/free-photo/top-view-chicken-curry-with-rice_23-2148694744.jpg",
          category: "Main Course",
        },
      },
    ],
  },
  {
    id: "ORD-2026-002",
    customerId: "CUST-002",
    providerId: "PROV-002",
    status: "DELIVERED",
    totalAmount: 850,
    address: "456 Park Road, House 12, Gulshan, Dhaka 1212",
    paymentStatus: "PAID",
    createdAt: "2026-02-01T14:20:00.000Z",
    updatedAt: "2026-02-01T16:30:00.000Z",
    customer: {
      id: "CUST-002",
      name: "Fatima Khan",
      email: "fatima.khan@example.com",
      phone: "01823456789",
      image: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater_185396-896.jpg",
    },
    provider: {
      id: "PROV-002",
      name: "Spice Route",
      restaurant_name: "Spice Route",
      phone: "01765432109",
      image: "https://img.freepik.com/free-photo/restaurant-hall_140725-88.jpg",
    },
    orderItems: [
      {
        id: "ITEM-003",
        orderId: "ORD-2026-002",
        userId: "CUST-002",
        mealId: "MEAL-003",
        quantity: 3,
        price: 250,
        createdAt: "2026-02-01T14:20:00.000Z",
        meal: {
          id: "MEAL-003",
          name: "Chicken Burger",
          image: "https://img.freepik.com/free-photo/front-view-burger-stand_141793-15542.jpg",
          category: "Fast Food",
        },
      },
      {
        id: "ITEM-004",
        orderId: "ORD-2026-002",
        userId: "CUST-002",
        mealId: "MEAL-004",
        quantity: 2,
        price: 100,
        createdAt: "2026-02-01T14:20:00.000Z",
        meal: {
          id: "MEAL-004",
          name: "French Fries",
          category: "Sides",
        },
      },
    ],
  },
  {
    id: "ORD-2026-003",
    customerId: "CUST-003",
    providerId: "PROV-001",
    status: "PENDING",
    totalAmount: 600,
    address: "789 Lake View, Banani, Dhaka 1213",
    paymentStatus: "PENDING",
    createdAt: "2026-02-02T11:15:00.000Z",
    updatedAt: "2026-02-02T11:15:00.000Z",
    customer: {
      id: "CUST-003",
      name: "Rahim Mia",
      email: "rahim.mia@example.com",
      phone: "01934567890",
    },
    provider: {
      id: "PROV-001",
      name: "Karim's Kitchen",
      restaurant_name: "Karim's Kitchen",
      phone: "01987654321",
    },
    orderItems: [
      {
        id: "ITEM-005",
        orderId: "ORD-2026-003",
        userId: "CUST-003",
        mealId: "MEAL-005",
        quantity: 1,
        price: 600,
        createdAt: "2026-02-02T11:15:00.000Z",
        meal: {
          id: "MEAL-005",
          name: "Mixed Grill Platter",
          category: "BBQ",
        },
      },
    ],
  },
  {
    id: "ORD-2026-004",
    customerId: "CUST-004",
    providerId: "PROV-003",
    status: "CANCELLED",
    totalAmount: 450,
    address: "321 Green Street, Dhanmondi, Dhaka 1205",
    paymentStatus: "REFUNDED",
    createdAt: "2026-02-01T09:00:00.000Z",
    updatedAt: "2026-02-01T09:30:00.000Z",
    customer: {
      id: "CUST-004",
      name: "Sadia Islam",
      email: "sadia.islam@example.com",
      phone: "01645678901",
    },
    provider: {
      id: "PROV-003",
      name: "Pizza Palace",
      restaurant_name: "Pizza Palace",
      phone: "01876543210",
    },
    orderItems: [
      {
        id: "ITEM-006",
        orderId: "ORD-2026-004",
        userId: "CUST-004",
        mealId: "MEAL-006",
        quantity: 1,
        price: 450,
        createdAt: "2026-02-01T09:00:00.000Z",
        meal: {
          id: "MEAL-006",
          name: "Pepperoni Pizza (Large)",
          category: "Pizza",
        },
      },
    ],
  },
  {
    id: "ORD-2026-005",
    customerId: "CUST-005",
    providerId: "PROV-002",
    status: "READY",
    totalAmount: 1100,
    address: "555 Ring Road, Mirpur, Dhaka 1216",
    paymentStatus: "PAID",
    createdAt: "2026-02-02T12:00:00.000Z",
    updatedAt: "2026-02-02T12:30:00.000Z",
    customer: {
      id: "CUST-005",
      name: "Nabeel Hasan",
      email: "nabeel.hasan@example.com",
      phone: "01756789012",
    },
    provider: {
      id: "PROV-002",
      name: "Spice Route",
      restaurant_name: "Spice Route",
      phone: "01765432109",
    },
    orderItems: [
      {
        id: "ITEM-007",
        orderId: "ORD-2026-005",
        userId: "CUST-005",
        mealId: "MEAL-007",
        quantity: 2,
        price: 400,
        createdAt: "2026-02-02T12:00:00.000Z",
        meal: {
          id: "MEAL-007",
          name: "Mutton Korma",
          category: "Main Course",
        },
      },
      {
        id: "ITEM-008",
        orderId: "ORD-2026-005",
        userId: "CUST-005",
        mealId: "MEAL-008",
        quantity: 3,
        price: 100,
        createdAt: "2026-02-02T12:00:00.000Z",
        meal: {
          id: "MEAL-008",
          name: "Naan Bread",
          category: "Bread",
        },
      },
    ],
  },
];

export default function AdminOrdersPage({data}:{data: Order[]}) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const itemsPerPage = 5;



  // Pagination
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  // Toggle order expansion
  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  // Handle status change
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `৳${amount.toFixed(2)}`;
  };

  // Get status color
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "PREPARING":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "READY":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "DELIVERED":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "CANCELLED":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  // Get payment status color
  const getPaymentColor = (status: PaymentStatus) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "FAILED":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "REFUNDED":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  // Calculate statistics
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "PENDING").length,
    delivered: orders.filter((o) => o.status === "DELIVERED").length,
    revenue: orders
      .filter((o) => o.paymentStatus === "PAID")
      .reduce((sum, o) => sum + o.totalAmount, 0),
  };

  return (
    <div className="min-h-screen bg-primary2 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary  mb-2">
            Order Management
          </h1>
          <p className="">
            Monitor and manage all orders in the system
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Total Orders</p>
                  <p className="text-2xl font-bold ">{stats.total}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Pending</p>
                  <p className="text-2xl font-bold ">{stats.pending}</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Delivered</p>
                  <p className="text-2xl font-bold ">{stats.delivered}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Total Revenue</p>
                  <p className="text-2xl font-bold ">
                    {formatCurrency(stats.revenue)}
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>



        {/* Order Cards */}
        <div className="space-y-4 mb-6">
          {currentOrders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No orders found</p>
              </CardContent>
            </Card>
          ) : (
            currentOrders.map((order) => (
              <Card
                key={order.id}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col lg:flex-row gap-6 mb-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold  mb-1">
                            {order.id}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                            <Badge className={getPaymentColor(order.paymentStatus)}>
                              <CreditCard className="h-3 w-3 mr-1" />
                              {order.paymentStatus}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold ">
                            {formatCurrency(order.totalAmount)}
                          </p>
                          <p className="text-sm text-slate-500">
                            {order.orderItems.length} item(s)
                          </p>
                        </div>
                      </div>

                      {/* Customer & Provider Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        {/* Customer */}
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10 border-2 border-slate-200">
                            <AvatarImage
                              src={order.customer.image}
                              alt={order.customer.name}
                            />
                            <AvatarFallback>
                              {order.customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <User className="h-4 w-4 text-slate-400" />
                              <p className="text-sm font-medium ">
                                Customer
                              </p>
                            </div>
                            <p className="text-sm text-slate-200 font-medium truncate">
                              {order.customer.name}
                            </p>
                            <p className="text-xs text-slate-100 truncate">
                              {order.customer.email}
                            </p>
                            <p className="text-xs text-slate-100">
                              {order.customer.phone}
                            </p>
                          </div>
                        </div>

                        {/* Provider */}
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10 border-2 border-slate-200">
                            <AvatarImage
                              src={order.provider.image}
                              alt={order.provider.name}
                            />
                            <AvatarFallback>
                              {order.provider.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Store className="h-4 w-4 text-slate-100" />
                              <p className="text-sm font-medium ">
                                Provider
                              </p>
                            </div>
                            <p className="text-sm text-slate-300 font-medium truncate">
                              {order.provider.restaurant_name || order.provider.name}
                            </p>
                            <p className="text-xs text-slate-100">
                              {order.provider.phone}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Address & Date */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2 ">
                          <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                          <span className="break-words">{order.address}</span>
                        </div>
                        <div className="flex items-center gap-2 ">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <span>Ordered: {formatDate(order.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    {/* <div className="flex flex-col gap-2 lg:w-48">
                      <Select
                        value={order.status}
                        onValueChange={(value) =>
                          handleStatusChange(order.id, value as OrderStatus)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                          <SelectItem value="PREPARING">Preparing</SelectItem>
                          <SelectItem value="READY">Ready</SelectItem>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Print Receipt
                      </Button>
                    </div> */}
                  </div>

                  {/* Collapsible Order Items */}
                  <Collapsible
                    open={expandedOrders.has(order.id)}
                    onOpenChange={() => toggleOrderExpansion(order.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between mt-2"
                      >
                        <span className="font-medium">
                          Order Items ({order.orderItems.length})
                        </span>
                        {expandedOrders.has(order.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 text-black">
                      <div className="border-t border-slate-200 pt-4">
                        <div className="space-y-3">
                          {order.orderItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg"
                            >
                              {/* Meal Image */}
                              {item.meal.image ? (
                                <img
                                  src={item.meal.image}
                                  alt={item.meal.name}
                                  className="h-16 w-16 object-cover rounded-md"
                                />
                              ) : (
                                <div className="h-16 w-16 bg-slate-200 rounded-md flex items-center justify-center">
                                  <Package className="h-6 w-6 text-slate-400" />
                                </div>
                              )}

                              {/* Meal Info */}
                              <div className="flex-1 min-w-0">
                                <p className="font-medium  truncate">
                                  {item.meal.name}
                                </p>
                                {item.meal.category && (
                                  <p className="text-xs text-slate-500">
                                    {item.meal.category}
                                  </p>
                                )}
                                <p className="text-sm  mt-1">
                                  Quantity: {item.quantity} × {formatCurrency(item.price)}
                                </p>
                              </div>

                              {/* Item Total */}
                              <div className="text-right">
                                <p className="font-semibold ">
                                  {formatCurrency(item.quantity * item.price)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Total */}
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold ">
                              Total Amount
                            </span>
                            <span className="text-xl font-bold ">
                              {formatCurrency(order.totalAmount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm ">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredOrders.length)} of{" "}
                  {filteredOrders.length} orders
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let page;
                      if (totalPages <= 5) {
                        page = i + 1;
                      } else if (currentPage <= 3) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i;
                      } else {
                        page = currentPage - 2 + i;
                      }
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-9"
                        >
                          {page}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
