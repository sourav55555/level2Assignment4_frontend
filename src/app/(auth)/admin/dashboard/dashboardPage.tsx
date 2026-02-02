import React, { useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import {
  Users,
  ChefHat,
  ShoppingBag,
  DollarSign,
  Star,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  Package,
  AlertCircle,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  UserCheck,
  Store
} from 'lucide-react';

// Types
interface AdminStats {
  totalUsers: number;
  totalCustomers: number;
  totalProviders: number;
  totalMeals: number;
  totalOrders: number;
  totalRevenue: number;
  totalReviews: number;
  averageRating: number;
  growthRate?: {
    users: number;
    orders: number;
    revenue: number;
  };
}

interface OrderStatusBreakdown {
  pending: number;
  accepted: number;
  preparing: number;
  delivered: number;
  cancelled: number;
}

// Mock Data
const mockAdminStats: AdminStats = {
  totalUsers: 1240,
  totalCustomers: 1060,
  totalProviders: 180,
  totalMeals: 820,
  totalOrders: 3540,
  totalRevenue: 2847500,
  totalReviews: 2156,
  averageRating: 4.6,
  growthRate: {
    users: 12.5,
    orders: 18.3,
    revenue: 24.7
  }
};

const mockOrderStatus: OrderStatusBreakdown = {
  pending: 14,
  accepted: 22,
  preparing: 8,
  delivered: 120,
  cancelled: 3
};

const orderStatusConfig = {
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-300',
    count: mockOrderStatus.pending
  },
  accepted: {
    label: 'Accepted',
    icon: CheckCircle2,
    color: 'from-blue-400 to-blue-600',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-300',
    count: mockOrderStatus.accepted
  },
  preparing: {
    label: 'Preparing',
    icon: Package,
    color: 'from-purple-400 to-purple-600',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-300',
    count: mockOrderStatus.preparing
  },
  delivered: {
    label: 'Delivered',
    icon: CheckCircle2,
    color: 'from-emerald-400 to-green-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-300',
    count: mockOrderStatus.delivered
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    color: 'from-red-400 to-rose-600',
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-300',
    count: mockOrderStatus.cancelled
  }
};

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState('30days');
  const stats = mockAdminStats;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-slate-400 text-sm">Complete system overview and analytics</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="year">This Year</option>
              </select>
              
              <button className="p-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-xl transition-colors">
                <Filter className="w-5 h-5 text-slate-300" />
              </button>
              
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
          {/* Total Users */}
          <div className="xl:col-span-2 group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              {stats.growthRate && (
                <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  {stats.growthRate.users}%
                </div>
              )}
            </div>
            <p className="text-slate-400 text-sm font-medium mb-2">Total Users</p>
            <p className="text-4xl font-bold text-white mb-3">{stats.totalUsers.toLocaleString()}</p>
            <div className="flex items-center gap-4 pt-3 border-t border-slate-700/50">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-green-400" />
                <div>
                  <p className="text-xs text-slate-500">Customers</p>
                  <p className="text-sm font-semibold text-white">{stats.totalCustomers}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-xs text-slate-500">Providers</p>
                  <p className="text-sm font-semibold text-white">{stats.totalProviders}</p>
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
            <p className="text-4xl font-bold text-white">{stats.totalMeals}</p>
          </div>

          {/* Total Orders */}
          <div className="xl:col-span-2 group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="w-6 h-6 text-purple-400" />
              </div>
              {stats.growthRate && (
                <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  {stats.growthRate.orders}%
                </div>
              )}
            </div>
            <p className="text-slate-400 text-sm font-medium mb-2">Total Orders</p>
            <p className="text-4xl font-bold text-white">{stats.totalOrders.toLocaleString()}</p>
          </div>

          {/* Total Revenue */}
          <div className="xl:col-span-2 group bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl p-6 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TbCurrencyTaka className="w-7 h-7 text-white" />
                </div>
                {stats.growthRate && (
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-white text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    {stats.growthRate.revenue}%
                  </div>
                )}
              </div>
              <p className="text-emerald-100 text-sm font-medium mb-2">Total Revenue</p>
              <div className="flex items-baseline gap-1">
                <TbCurrencyTaka className="w-6 h-6 text-white mt-1" />
                <p className="text-4xl font-bold text-white">{stats.totalRevenue.toLocaleString()}</p>
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

              {/* Visual Bar Chart */}
              <div className="space-y-3">
                {Object.entries(orderStatusConfig).map(([key, config]) => {
                  const total = Object.values(mockOrderStatus).reduce((a, b) => a + b, 0);
                  const percentage = (config.count / total) * 100;
                  
                  return (
                    <div key={key} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-300">{config.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-400">{config.count} orders</span>
                          <span className="text-xs text-slate-500">({percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${config.color} rounded-full transition-all duration-500 group-hover:opacity-80`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
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
              {/* Average Rating */}
              <div className="text-center mb-6 pb-6 border-b border-slate-700/50">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-2xl shadow-yellow-500/20">
                  <Star className="w-12 h-12 text-white fill-white" />
                </div>
                <p className="text-5xl font-bold text-white mb-2">{stats.averageRating}</p>
                <p className="text-slate-400 text-sm">Average Rating</p>
                <div className="flex items-center justify-center gap-1 mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(stats.averageRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Total Reviews */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-blue-400" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-slate-400 text-sm font-medium mb-1">Total Reviews</p>
                <p className="text-3xl font-bold text-white">{stats.totalReviews.toLocaleString()}</p>
              </div>

              {/* Quick Stats */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-400">5 Star Reviews</span>
                  <span className="text-sm font-semibold text-white">68%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-400">Response Rate</span>
                  <span className="text-sm font-semibold text-emerald-400">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-700/50 bg-slate-800/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                  <p className="text-slate-400 text-sm mt-1">Latest system updates</p>
                </div>
                <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">
                  View All
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {[
                  { icon: Users, color: 'from-cyan-500 to-blue-600', text: 'New user registration: Ahmed Rahman', time: '2 mins ago' },
                  { icon: ShoppingBag, color: 'from-purple-500 to-indigo-600', text: 'Order #ORD-3540 completed', time: '5 mins ago' },
                  { icon: ChefHat, color: 'from-orange-500 to-pink-600', text: 'New meal added: Chicken Tikka Masala', time: '12 mins ago' },
                  { icon: Star, color: 'from-yellow-400 to-orange-500', text: '5-star review received from customer', time: '18 mins ago' },
                  { icon: Users, color: 'from-emerald-500 to-green-600', text: 'Provider profile updated', time: '25 mins ago' }
                ].map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 group hover:bg-slate-800/30 p-3 rounded-lg transition-colors">
                      <div className={`w-10 h-10 bg-gradient-to-br ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-300 mb-1">{activity.text}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-700/50 bg-slate-800/30">
              <h3 className="text-xl font-bold text-white">Quick Actions</h3>
              <p className="text-slate-400 text-sm mt-1">Common administrative tasks</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: 'Manage Users', color: 'from-cyan-500 to-blue-600' },
                  { icon: ChefHat, label: 'Add Meal', color: 'from-orange-500 to-pink-600' },
                  { icon: ShoppingBag, label: 'View Orders', color: 'from-purple-500 to-indigo-600' },
                  { icon: BarChart3, label: 'Analytics', color: 'from-emerald-500 to-green-600' },
                  { icon: Star, label: 'Reviews', color: 'from-yellow-400 to-orange-500' },
                  { icon: Download, label: 'Reports', color: 'from-blue-500 to-cyan-600' }
                ].map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      className="group bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 rounded-xl p-4 transition-all duration-300 hover:shadow-lg text-left"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-sm font-medium text-white">{action.label}</p>
                    </button>
                  );
                })}
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
