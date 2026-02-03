/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ChevronLeft, Tag, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { OrderItem } from '@/lib/types';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { addToCart } from '@/actions/meal.acton';



export default function CartPage({data}:{data: OrderItem[]}) {
  const [cartItems, setCartItems] = useState<OrderItem[]>(data);
  const [loading, setLoading] = useState<boolean>(false);

  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  useEffect(() => {
      setCartItems(data);
   }, [data])

  const updateQuantity = (id: string, action: 'increase' | 'decrease') => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = action === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };


  const calculateItemTotal = (item: any) => {

    return item.meal.price * item.quantity;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);


  const total = subtotal

  const handleCheckout = async () => {

    if (!deliveryAddress) { 
      toast.error('Please enter a delivery address.');
      return;
    }
    setLoading(true);
    const payload = {
          address: deliveryAddress,
          totalAmount: total,
          orderItemIds: cartItems.map(item => item.id),
    }
    const res = await addToCart(payload);

    if(res.error){
      toast.error(res.error.message)
      setLoading(false);
    }else{
      toast.success("Order placed successfully");
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-primary">
        {/* Header */}
        <div className="bg-primary border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/menu" className="inline-flex items-center text-gray-600 hover:text-gray-900">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Menu
            </Link>
          </div>
        </div>

        {/* Empty Cart */}
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link href="/menu">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Browse Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* Header */}
      <div className="bg-primary border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/menu" className="inline-flex items-center  hover:text-gray-900">
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline">Back to Menu</span>
            </Link>
            <h1 className="text-xl sm:text-2xl font-medium ">
              Shopping Cart ({cartItems.length})
            </h1>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
        

            {/* Cart Items List */}
            <div className="bg-primary2 rounded-lg sm:rounded-xl shadow-sm divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 sm:p-6">
                  <div className="flex gap-4">
                    {/* Item Image */}
                    <Link href={`/meal/${item.mealId}`} className="flex-shrink-0">
                      <Image
                        src={item.meal.imageUrl || ''}
                        alt={item.meal?.name || 'Meal Image'}
                        width={100}
                        height={100}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
                      />
                    </Link>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div>
                          <Link
                            href={`/meal/${item.mealId}`}
                            className="font-semibold  hover:text-orange-600 text-sm sm:text-base"
                          >
                            {item.meal.name}
                          </Link>

                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className=" hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>


                      {/* Quantity and Price */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, 'decrease')}
                            disabled={item.quantity === 1}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange-600 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="text-sm sm:text-base font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 'increase')}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange-600 hover:text-orange-600 transition-colors"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-secondary text-sm sm:text-base">
                            ৳{calculateItemTotal(item).toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-200">
                            ৳{(item.meal.price).toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <Link href="/menu">
              <Button variant="outline" className="w-full sm:w-auto">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-amber-100 rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 sticky top-24">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              

              <Separator className="my-4" />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-800">Subtotal</span>
                  <span className="font-medium text-gray-900">৳ {subtotal.toFixed(2)}</span>
                </div>
             

              </div>

              <Separator className="my-4" />

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-secondary">
                  ৳{total.toFixed(2)}
                </span>
              </div>
              <div>
                <Input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Delivery Address**"
                  className="mb-4 bg-white text-gray-900"
                />
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || loading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-base font-semibold"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              {/* Additional Info */}
              <div className="mt-4 space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Free delivery on orders over $30</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Estimated delivery: 25-35 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>All prices include applicable taxes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
