'use client';

import { useEffect, useState } from 'react';
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
import { Order } from '@/lib/types';
import Image from 'next/image';
import defaultUser from '@public/user.png'
import OrderStatusPopover from '@/components/module/authComponent/orderStatusPopover';
import { getLocalUserData } from '@/libs/localStorage';



export default function OrdersPage({data}:{data: Order[]}) {

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log(isOpen , "isopn")
  useEffect(() => {
    setOrders(data);
  }, [data]);
  const user = getLocalUserData();


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
    <div className="min-h-screen bg-primary">
      <div className=" bg-[url('/intro-bg.jpg')] bg-no-repeat bg-cover bg-center h-28 md:h-40  border-b sticky top-0 z-10">
        <div className="bg-black/50 flex items-center justify-center w-full h-full  px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center gap-4 justify-between ">
                <h1 className="text-2xl sm:text-4xl font-semibold text-secondary">
                    Order History
                </h1>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {orders.length === 0 ? (
          <div className="bg-primary rounded-xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-200 mb-2">No Orders Found</h2>


            <Link href="/menu">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Browse Menu
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4 ">
            <div className="text-sm text-gray-300">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
            </div>
            <div className='grid grid-cols-2 gap-6'>
            {/* Orders List */}
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={order.provider.image || defaultUser}
                        alt={order.provider.name}
                        height={65}
                        width={65}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{order.provider.name}</h3>
                        <p className="text-sm text-gray-600">Order #{order.id}</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                  
                    <OrderStatusPopover order={order} isOpen={isOpen} setIsOpen={setIsOpen} provider={order.providerId === user?.id} />
                  </div>

                  {/* Active Order Info */}
                  {(order.status === "OUT_FOR_DELIVERY" || order.status === "PREPARING") && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 text-orange-700 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium text-sm">
                          {order.status === 'OUT_FOR_DELIVERY' 
                            ? `Arriving in 20min`
                            : 'Your order is being prepared'}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{order.address}</span>
                      </div>
                    </div>
                  )}

                  {/* Order Items - Collapsed View */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">
                      {order.orderItems.length} {order.orderItems.length === 1 ? 'item' : 'items'}
                    </div>
                    
                    {expandedOrder === order.id ? (
                      <div className="space-y-3">
                        {order.orderItems.map((item) => (
                          <div key={item.id} className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">
                                {item.quantity}x {item.meal.name}
                              </div>
                           
                            </div>
                            <div className="font-medium text-gray-900">${item.price}</div>
                          </div>
                        ))}
                        
                        <Separator />
                        
                        {/* Price Breakdown */}
                        <div className="space-y-2 text-sm">
              
                   
                          <Separator />
                          <div className="flex justify-between font-bold text-gray-900">
                            <span>Total</span>
                            <span>${order.totalAmount}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-700">
                        {order.orderItems.slice(0, 2).map((item, index) => (
                          <span key={item.id}>
                            {item.quantity}x {item.meal.name}
                            {index < Math.min(order.orderItems.length, 2) - 1 ? ', ' : ''}
                          </span>
                        ))}
                        {order.orderItems.length > 2 && (
                          <span className="text-gray-500"> +{order.orderItems.length - 2} more</span>
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
                    
                    {order.status === 'OUT_FOR_DELIVERY' || order.status === 'PREPARING' ? (
                      <Button
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleTrackOrder(order)}
                      >
                        Track Order
                      </Button>
                    ) : order.status === 'DELIVERED' ? (
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
