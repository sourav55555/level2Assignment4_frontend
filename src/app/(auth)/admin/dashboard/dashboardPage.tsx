"use client";

import React, { useEffect, useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import {
  Users,
  ChefHat,
  ShoppingBag,

  Star,
  TrendingUp,

  Clock,
  CheckCircle2,
  XCircle,
  Package,

  MoreHorizontal,
  UserCheck,
  Store
} from 'lucide-react';
import { AdminDashboardData } from '@/lib/types';


export default function AdminDashboardPage({ data }: { data: AdminDashboardData }) {
    
    useEffect(() => {
        console.log(data, "dashboard data")
    }, [data]);

  const orderStatusConfig = {
    pending: {
        label: 'Pending',
        icon: Clock,
        color: 'from-amber-400 to-orange-500',
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-300',
        count: data.orderData?.pending
    },
    confirmed: {
        label: 'Accepted',
        icon: CheckCircle2,
        color: 'from-blue-400 to-blue-600',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-300',
        count: data.orderData?.confirmed
    },
    preparing: {
        label: 'Preparing',
        icon: Package,
        color: 'from-purple-400 to-purple-600',
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-300',
        count: data.orderData?.preparing
    },
    delivered: {
        label: 'Delivered',
        icon: CheckCircle2,
        color: 'from-emerald-400 to-green-600',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-300',
        count: data.orderData?.delivered
    },
    cancelled: {
        label: 'Cancelled',
        icon: XCircle,
        color: 'from-red-400 to-rose-600',
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-300',
        count: data.orderData?.cancelled
    }
    };

  return (
    <div className="min-h-screen bg-primary2">
 

      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
          {/* Total Users */}
          <div className="xl:col-span-2 group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
    
                <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  12%
                </div>
        
            </div>
            <p className="text-slate-400 text-sm font-medium mb-2">Total Users</p>
            <p className="text-4xl font-bold text-white mb-3">{data.totalUsers}</p>
            <div className="flex items-center gap-4 pt-3 border-t border-slate-700/50">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-green-400" />
                <div>
                  <p className="text-xs text-slate-500">Customers</p>
                  <p className="text-sm font-semibold text-white">{data.customers}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-xs text-slate-500">Providers</p>
                  <p className="text-sm font-semibold text-white">{data.providers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Meals */}
          <div className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-pink-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ChefHat className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-2">Total Meals</p>
            <p className="text-4xl font-bold text-white">{data.totalMeals}</p>
          </div>

          {/* Total Orders */}
          <div className="xl:col-span-2 group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="w-6 h-6 text-purple-400" />
              </div>
   
            </div>
            <p className="text-slate-400 text-sm font-medium mb-2">Total Orders</p>
            <p className="text-4xl font-bold text-white">{data.totalOrders}</p>
          </div>

          {/* Total Revenue */}
          <div className="xl:col-span-2 group bg-emerald-600  rounded-2xl p-6 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TbCurrencyTaka className="w-7 h-7 text-white" />
                </div>
  
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-white text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    14%
                  </div>
           
              </div>
              <p className="text-emerald-100 text-sm font-medium mb-2">Total Revenue</p>
              <div className="flex items-baseline gap-1">
                <TbCurrencyTaka className="w-6 h-6 text-white mt-1" />
                    <p className="text-4xl font-bold text-white">
                        {data?.totalRevenue?._sum?.totalAmount ?? 0}
                    </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Breakdown & Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Order Status Section */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-700/50 bg-slate-800/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Order Status Overview</h3>
                  <p className="text-slate-400 text-sm mt-1">Real-time order distribution</p>
                </div>
                <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Status Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                {Object.entries(orderStatusConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <div
                      key={key}
                      className="group bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className={`w-10 h-10 bg-gradient-to-br ${config.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-slate-400 text-xs font-medium mb-1">{config.label}</p>
                      <p className="text-3xl font-bold text-white">{config.count}</p>
                    </div>
                  );
                })}
              </div>

          
            </div>
          </div>

          {/* Reviews & Rating Section */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-700/50 bg-slate-800/30">
              <h3 className="text-xl font-bold text-white">Reviews & Ratings</h3>
              <p className="text-slate-400 text-sm mt-1">Customer feedback overview</p>
            </div>

            <div className="p-6">
         

              {/* Total Reviews */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-blue-400" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-slate-400 text-sm font-medium mb-1">Total Reviews</p>
                <p className="text-3xl font-bold text-white">{data.totalReviews}</p>
              </div>

              {/* Quick Stats */}
              <div className="mt-4 space-y-2">
            
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-400">Response Rate</span>
                  <span className="text-sm font-semibold text-emerald-400">94%</span>
                </div>
              </div>
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

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out backwards;
        }
      `}</style>
    </div>
  );
}
