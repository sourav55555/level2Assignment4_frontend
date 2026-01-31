'use client';

import { useState } from 'react';
import { Clock, MapPin, Package, CheckCircle, XCircle, ChevronRight, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

// Order status types
type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  customizations?: string[];
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  restaurant: string;
  restaurantImage: string;
  deliveryAddress: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  estimatedDelivery?: string;
  deliveredAt?: string;
}

// Sample order history data
const orderHistory: Order[] = [
  {
    id: '1',
    orderNumber: 'FH-2024-001234',
    date: '2024-01-28T14:30:00',
    status: 'on-the-way',
    restaurant: 'Pizza Palace',
    restaurantImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop',
    deliveryAddress: '123 Main St, City, State 12345',
    estimatedDelivery: '15 mins',
    items: [
      {
        id: '1',
        name: 'Margherita Pizza',
        quantity: 2,
        price: 20.98,
        customizations: ['Large', 'Extra Cheese'],
      },
      {
        id: '2',
        name: 'Garlic Bread',
        quantity: 1,
        price: 4.99,
      },
    ],
    subtotal: 25.97,
    deliveryFee: 4.99,
    tax: 2.48,
    discount: 0,
    total: 33.44,
  },
  {
    id: '2',
    orderNumber: 'FH-2024-001233',
    date: '2024-01-27T19:45:00',
    status: 'delivered',
    restaurant: 'Burger House',
    restaurantImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop',
    deliveryAddress: '123 Main St, City, State 12345',
    deliveredAt: '2024-01-27T20:20:00',
    items: [
      {
        id: '1',
        name: 'Chicken Burger',
        quantity: 2,
        price: 17.98,
        customizations: ['Add Bacon', 'Extra Pickles'],
      },
      {
        id: '2',
        name: 'French Fries',
        quantity: 1,
        price: 3.99,
      },
      {
        id: '3',
        name: 'Coke',
        quantity: 2,
        price: 3.98,
      },
    ],
    subtotal: 25.95,
    deliveryFee: 4.99,
    tax: 2.47,
    discount: 5.19,
    total: 28.22,
  },
  {
    id: '3',
    orderNumber: 'FH-2024-001232',
    date: '2024-01-25T12:15:00',
    status: 'delivered',
    restaurant: 'Tokyo Sushi',
    restaurantImage: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop',
    deliveryAddress: '123 Main St, City, State 12345',
    deliveredAt: '2024-01-25T13:05:00',
    items: [
      {
        id: '1',
        name: 'Sushi Platter',
        quantity: 1,
        price: 18.99,
      },
      {
        id: '2',
        name: 'Miso Soup',
        quantity: 2,
        price: 7.98,
      },
    ],
    subtotal: 26.97,
    deliveryFee: 4.99,
    tax: 2.56,
    discount: 0,
    total: 34.52,
  },
  {
    id: '4',
    orderNumber: 'FH-2024-001231',
    date: '2024-01-23T18:30:00',
    status: 'cancelled',
    restaurant: 'Thai Delight',
    restaurantImage: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=100&h=100&fit=crop',
    deliveryAddress: '123 Main St, City, State 12345',
    items: [
      {
        id: '1',
        name: 'Pad Thai',
        quantity: 1,
        price: 10.99,
      },
    ],
    subtotal: 10.99,
    deliveryFee: 4.99,
    tax: 1.28,
    discount: 0,
    total: 17.26,
  },
  {
    id: '5',
    orderNumber: 'FH-2024-001230',
    date: '2024-01-20T13:00:00',
    status: 'delivered',
    restaurant: 'Green Bowl',
    restaurantImage: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop',
    deliveryAddress: '123 Main St, City, State 12345',
    deliveredAt: '2024-01-20T13:35:00',
    items: [
      {
        id: '1',
        name: 'Caesar Salad',
        quantity: 1,
        price: 7.99,
      },
      {
        id: '2',
        name: 'Vegan Bowl',
        quantity: 1,
        price: 9.99,
      },
    ],
    subtotal: 17.98,
    deliveryFee: 4.99,
    tax: 1.84,
    discount: 0,
    total: 24.81,
  },
];

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: JSX.Element }> = {
  pending: {
    label: 'Pending',
    color: 'bg-gray-100 text-gray-700 border-gray-300',
    icon: <Clock className="w-4 h-4" />,
  },
  confirmed: {
    label: 'Confirmed',
    color: 'bg-blue-100 text-blue-700 border-blue-300',
    icon: <CheckCircle className="w-4 h-4" />,
  },
  preparing: {
    label: 'Preparing',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    icon: <Package className="w-4 h-4" />,
  },
  'on-the-way': {
    label: 'On the Way',
    color: 'bg-purple-100 text-purple-700 border-purple-300',
    icon: <Package className="w-4 h-4" />,
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-100 text-green-700 border-green-300',
    icon: <CheckCircle className="w-4 h-4" />,
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-700 border-red-300',
    icon: <XCircle className="w-4 h-4" />,
  },
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = orderHistory.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    } else if (diffInDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const handleReorder = (order: Order) => {
    console.log('Reordering:', order);
    alert('Items added to cart! Redirecting to cart...');
    // Here you would add items to cart and redirect
  };

  const handleTrackOrder = (order: Order) => {
    console.log('Tracking order:', order);
    // Navigate to order tracking page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Order History</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search orders, restaurants, or items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="All Orders" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="on-the-way">On the Way</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {filteredOrders.length === 0 ? (
          <div className="bg-primary rounded-xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Found</h2>
            <p className="text-gray-600 mb-8">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : "You haven't placed any orders yet."}
            </p>
            <Link href="/menu">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Browse Menu
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4 ">
            <div className="text-sm text-gray-600">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
            </div>
            <div className='grid grid-cols-2 gap-6'>
            {/* Orders List */}
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={order.restaurantImage}
                        alt={order.restaurant}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{order.restaurant}</h3>
                        <p className="text-sm text-gray-600">Order #{order.orderNumber}</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          {formatDate(order.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2">
                      <Badge
                        className={`${statusConfig[order.status].color} border flex items-center gap-1 px-3 py-1`}
                      >
                        {statusConfig[order.status].icon}
                        {statusConfig[order.status].label}
                      </Badge>
                      <div className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Active Order Info */}
                  {(order.status === 'on-the-way' || order.status === 'preparing') && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 text-orange-700 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium text-sm">
                          {order.status === 'on-the-way' 
                            ? `Arriving in ${order.estimatedDelivery}`
                            : 'Your order is being prepared'}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{order.deliveryAddress}</span>
                      </div>
                    </div>
                  )}

                  {/* Order Items - Collapsed View */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </div>
                    
                    {expandedOrder === order.id ? (
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">
                                {item.quantity}x {item.name}
                              </div>
                              {item.customizations && item.customizations.length > 0 && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {item.customizations.join(', ')}
                                </div>
                              )}
                            </div>
                            <div className="font-medium text-gray-900">${item.price.toFixed(2)}</div>
                          </div>
                        ))}
                        
                        <Separator />
                        
                        {/* Price Breakdown */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Delivery Fee</span>
                            <span>${order.deliveryFee.toFixed(2)}</span>
                          </div>
                          {order.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>Discount</span>
                              <span>-${order.discount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-gray-600">
                            <span>Tax</span>
                            <span>${order.tax.toFixed(2)}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold text-gray-900">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-700">
                        {order.items.slice(0, 2).map((item, index) => (
                          <span key={item.id}>
                            {item.quantity}x {item.name}
                            {index < Math.min(order.items.length, 2) - 1 ? ', ' : ''}
                          </span>
                        ))}
                        {order.items.length > 2 && (
                          <span className="text-gray-500"> +{order.items.length - 2} more</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    >
                      {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                      <ChevronRight
                        className={`w-4 h-4 ml-2 transition-transform ${
                          expandedOrder === order.id ? 'rotate-90' : ''
                        }`}
                      />
                    </Button>
                    
                    {order.status === 'on-the-way' || order.status === 'preparing' ? (
                      <Button
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleTrackOrder(order)}
                      >
                        Track Order
                      </Button>
                    ) : order.status === 'delivered' ? (
                      <Button
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleReorder(order)}
                      >
                        Reorder
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
