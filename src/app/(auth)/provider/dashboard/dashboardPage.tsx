"use client"

import React, { useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { 
  ChefHat, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Package,
  TrendingUp,
  Users,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Eye
} from 'lucide-react';

// Mock data types
interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  items: string[];
  totalAmount: number;
  status: 'NEW' | 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';
  orderTime: string;
  tableNumber?: string;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#ORD-001',
    customerName: 'Ahmed Rahman',
    items: ['Chicken Biryani', 'Raita', 'Cold Drink'],
    totalAmount: 450,
    status: 'NEW',
    orderTime: '2 mins ago',
    tableNumber: 'T-12'
  },
  {
    id: '2',
    orderNumber: '#ORD-002',
    customerName: 'Fatima Khan',
    items: ['Beef Kacchi', 'Salad'],
    totalAmount: 580,
    status: 'PENDING',
    orderTime: '5 mins ago',
    tableNumber: 'T-8'
  },
  {
    id: '3',
    orderNumber: '#ORD-003',
    customerName: 'Shakib Hassan',
    items: ['Chicken Tikka', 'Naan', 'Lassi'],
    totalAmount: 390,
    status: 'PREPARING',
    orderTime: '12 mins ago',
    tableNumber: 'T-3'
  },
  {
    id: '4',
    orderNumber: '#ORD-004',
    customerName: 'Nusrat Ali',
    items: ['Mutton Rezala', 'Polao', 'Borhani'],
    totalAmount: 650,
    status: 'NEW',
    orderTime: '1 min ago',
    tableNumber: 'T-15'
  }
];

const statusConfig = {
  NEW: { 
    label: 'New Order', 
    color: 'from-amber-500 to-orange-600', 
    bg: 'bg-amber-50', 
    text: 'text-amber-700',
    border: 'border-amber-200',
    pulse: true
  },
  PENDING: { 
    label: 'Pending', 
    color: 'from-blue-500 to-indigo-600', 
    bg: 'bg-blue-50', 
    text: 'text-blue-700',
    border: 'border-blue-200',
    pulse: false
  },
  PREPARING: { 
    label: 'Preparing', 
    color: 'from-purple-500 to-pink-600', 
    bg: 'bg-purple-50', 
    text: 'text-purple-700',
    border: 'border-purple-200',
    pulse: false
  },
  READY: { 
    label: 'Ready', 
    color: 'from-green-500 to-emerald-600', 
    bg: 'bg-green-50', 
    text: 'text-green-700',
    border: 'border-green-200',
    pulse: false
  },
  COMPLETED: { 
    label: 'Completed', 
    color: 'from-gray-400 to-gray-600', 
    bg: 'bg-gray-50', 
    text: 'text-gray-700',
    border: 'border-gray-200',
    pulse: false
  },
  CANCELLED: { 
    label: 'Cancelled', 
    color: 'from-red-500 to-rose-600', 
    bg: 'bg-red-50', 
    text: 'text-red-700',
    border: 'border-red-200',
    pulse: false
  }
};

interface DashboardData {
     totalMeals: number,
      availableMeals: number,
      totalOrders: number,
    pendingOrders: any,
    totalRevenue: any
}

export default function RestaurantDashboard({ data }: { data: DashboardData }) {
    console.log(data, "client data")
    
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Dashboard metrics
  const metrics = {
    totalMeals: 24,
    availableMeals: 18,
    todaysOrders: 6,
    pendingOrders: 4,
    todaysRevenue: 3450
  };

  return (
    <div className="min-h-screen bg-primary2 ">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Total Meals */}
          <div className="group bg-white rounded-2xl p-6 border border-slate-200/60 hover:border-orange-300 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-sm text-slate-500 font-medium mb-1">Total Meals</p>
            <p className="text-3xl font-bold text-slate-900">{data.totalMeals}</p>
          </div>

          {/* Available Meals */}
          <div className="group bg-white rounded-2xl p-6 border border-slate-200/60 hover:border-green-300 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-1">Available</p>
            <p className="text-3xl font-bold text-slate-900">{data.availableMeals}</p>
          </div>

          {/* Today's Orders */}
          <div className="group bg-white rounded-2xl p-6 border border-slate-200/60 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-slate-900">{data.totalOrders}</p>
          </div>

          {/* Pending Orders */}
          <div className="group bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 border border-transparent hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-1 transition-all duration-300 animate-pulse-slow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="px-2 py-1 bg-white/30 backdrop-blur-sm rounded-lg text-xs text-white font-semibold">
                URGENT
              </span>
            </div>
            <p className="text-sm text-amber-100 font-medium mb-1">Pending Orders</p>
            <p className="text-3xl font-bold text-white">{0}</p>
          </div>

          {/* Today's Revenue */}
          <div className="group bg-white rounded-2xl p-6 border border-slate-200/60 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TbCurrencyTaka className="w-7 h-7 text-purple-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-sm text-slate-500 font-medium mb-1">Total Revenue</p>
            <div className="flex items-baseline gap-1">
              <TbCurrencyTaka className="w-5 h-5 text-slate-900 mt-1" />
              <p className="text-3xl font-bold text-slate-900">{data?.totalRevenue["_sum"].totalAmount || 0}</p>
            </div>
          </div>
        </div>

        {/* Incoming Orders Section */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-600 px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Incoming Orders</h2>
                <p className="text-orange-100">Manage and track all orders in real-time</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 w-48"
                  />
                </div>
                <button className="p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/30 transition-colors">
                  <Filter className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
              {['all', 'NEW', 'PENDING', 'PREPARING', 'READY'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                    selectedFilter === filter
                      ? 'bg-white text-orange-600 shadow-lg'
                      : 'bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20'
                  }`}
                >
                  {filter === 'all' ? 'All Orders' : statusConfig[filter as keyof typeof statusConfig].label}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Grid/Table */}
          <div className="p-6">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Order #</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Customer</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Items</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Table</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Amount</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Status</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Time</th>
                    <th className="text-right py-4 px-4 text-sm font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order, index) => {
                    const config = statusConfig[order.status];
                    return (
                      <tr 
                        key={order.id} 
                        className="border-b border-slate-100 hover:bg-orange-50/50 transition-colors group"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="py-4 px-4">
                          <span className="font-semibold text-slate-900">{order.orderNumber}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {order.customerName.charAt(0)}
                            </div>
                            <span className="text-slate-700 font-medium">{order.customerName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col gap-1">
                            {order.items.slice(0, 2).map((item, idx) => (
                              <span key={idx} className="text-sm text-slate-600">
                                • {item}
                              </span>
                            ))}
                            {order.items.length > 2 && (
                              <span className="text-xs text-slate-400">+{order.items.length - 2} more</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-slate-100 rounded-lg text-sm font-semibold text-slate-700">
                            {order.tableNumber}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 font-bold text-slate-900">
                            <TbCurrencyTaka className="w-4 h-4" />
                            {order.totalAmount}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${config.bg} border ${config.border}`}>
                            {config.pulse && (
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                              </span>
                            )}
                            <span className={`text-sm font-semibold ${config.text}`}>
                              {config.label}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-slate-500">{order.orderTime}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-orange-100 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-slate-600" />
                            </button>
                            <button className="p-2 hover:bg-orange-100 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4 text-slate-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {mockOrders.map((order, index) => {
                const config = statusConfig[order.status];
                return (
                  <div 
                    key={order.id}
                    className="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-lg text-slate-900">{order.orderNumber}</p>
                        <p className="text-sm text-slate-500">{order.orderTime}</p>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${config.bg} border ${config.border}`}>
                        {config.pulse && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                          </span>
                        )}
                        <span className={`text-xs font-semibold ${config.text}`}>
                          {config.label}
                        </span>
                      </div>
                    </div>

                    {/* Customer */}
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {order.customerName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{order.customerName}</p>
                        <p className="text-sm text-slate-500">Table {order.tableNumber}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-slate-500 mb-2">ITEMS ORDERED</p>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-sm text-slate-700">• {item}</p>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1 font-bold text-lg text-slate-900">
                        <TbCurrencyTaka className="w-5 h-5" />
                        {order.totalAmount}
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors">
                          View
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                          <MoreVertical className="w-5 h-5 text-slate-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.95;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        tr {
          animation: fadeInUp 0.5s ease-out backwards;
        }
      `}</style>
    </div>
  );
}
