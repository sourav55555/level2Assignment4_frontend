"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import useEffect from 'react';
import { changeUserStatus } from "@/actions/admin.action";

// Types
interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  role: "PROVIDER" | "ADMIN" | "USER";
  phone: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  address: string;
  description: string | null;
  isActive: boolean;
  restaurant_name: string | null;
}

// Sample data - replace with your actual data fetching
const mockUsers: User[] = [
  {
    id: "QlJyQzAQaDo1KDk33qMsfyWz8JqOgZvJ",
    name: "Soruav Singha",
    email: "souravsingha146@gmail.com",
    emailVerified: false,
    image:
      "https://img.freepik.com/free-photo/close-up-portrait-handsome-smiling-young-man-white-t-shirt-blurry-outdoor-nature_176420-6305.jpg?semt=ais_hybrid&w=740&q=80",
    createdAt: "2026-01-31T05:45:25.449Z",
    updatedAt: "2026-02-01T11:18:18.275Z",
    role: "PROVIDER",
    phone: "01674907646",
    status: "ACTIVE",
    address: "new test",
    description: null,
    isActive: true,
    restaurant_name: null,
  },
  {
    id: "AbCdEfGhIjKlMnOpQrStUvWxYz123456",
    name: "John Doe",
    email: "john.doe@example.com",
    emailVerified: true,
    image:
      "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?w=740&q=80",
    createdAt: "2026-01-28T10:20:15.449Z",
    updatedAt: "2026-02-01T09:30:18.275Z",
    role: "USER",
    phone: "01234567890",
    status: "ACTIVE",
    address: "123 Main Street, City",
    description: "Regular user account",
    isActive: true,
    restaurant_name: null,
  },
  {
    id: "ZyXwVuTsRqPoNmLkJiHgFeDcBa987654",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    emailVerified: true,
    image:
      "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=740&q=80",
    createdAt: "2026-01-25T14:30:25.449Z",
    updatedAt: "2026-01-30T16:45:18.275Z",
    role: "ADMIN",
    phone: "01987654321",
    status: "ACTIVE",
    address: "456 Oak Avenue, Town",
    description: "Administrator account",
    isActive: true,
    restaurant_name: null,
  },
  {
    id: "QwErTyUiOpAsDfGhJkLzXcVbNm456789",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    emailVerified: false,
    image:
      "https://img.freepik.com/free-photo/confident-handsome-guy-posing-against-white-wall_176420-32936.jpg?w=740&q=80",
    createdAt: "2026-01-20T08:15:25.449Z",
    updatedAt: "2026-01-29T11:20:18.275Z",
    role: "PROVIDER",
    phone: "01555666777",
    status: "INACTIVE",
    address: "789 Pine Street, Village",
    description: null,
    isActive: false,
    restaurant_name: "Mike's Bistro",
  },
  {
    id: "PlMoKnIjBhUgVfYtCdXrEsZwAq147258",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    emailVerified: true,
    image:
      "https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176420-10257.jpg?w=740&q=80",
    createdAt: "2026-01-15T12:45:25.449Z",
    updatedAt: "2026-01-28T14:10:18.275Z",
    role: "USER",
    phone: "01444555666",
    status: "SUSPENDED",
    address: "321 Elm Road, County",
    description: "Suspended due to policy violation",
    isActive: false,
    restaurant_name: null,
  },
];

export default function AdminUsersPage({data}: {data: User[]}) {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    // Replace with actual data fetching logic
    setUsers(data);
  }, [data]);

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Handle status change
  const handleStatusChange = async (userId: string, newStatus: "ACTIVE" | "INACTIVE") => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, status: newStatus, isActive: newStatus === "ACTIVE" }
          : user
      )
    );
    const updateStatus = await changeUserStatus({status: newStatus}, userId);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "INACTIVE":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      case "SUSPENDED":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "PROVIDER":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "USER":
        return "bg-slate-100 text-slate-800 hover:bg-slate-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            User Management
          </h1>
          <p className="text-slate-600">
            Manage and monitor all users in the system
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Role Filter */}
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="PROVIDER">Provider</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="SUSPENDED">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* User Cards */}
        <div className="space-y-4 mb-6">
          {currentUsers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-slate-500">No users found</p>
              </CardContent>
            </Card>
          ) : (
            currentUsers.map((user) => (
              <Card
                key={user.id}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left: Avatar and Basic Info */}
                    <div className="flex items-start gap-4 lg:w-1/3">
                      <Avatar className="h-16 w-16 border-2 border-slate-200">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback className="text-lg font-semibold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-slate-900 mb-1 truncate">
                          {user.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                          {user.emailVerified && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Contact Info */}
                    <div className="flex-1 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span className="truncate">{user.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>Joined {formatDate(user.createdAt)}</span>
                      </div>
                      {user.restaurant_name && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="font-medium">Restaurant:</span>
                          <span>{user.restaurant_name}</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-col items-end justify-between lg:w-1/5 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-700">
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                        <Switch
                          checked={user.isActive}
                          onCheckedChange={(checked) =>
                            handleStatusChange(
                              user.id,
                              checked ? "ACTIVE" : "INACTIVE"
                            )
                          }
                          disabled={user.status === "SUSPENDED"}
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-slate-600"
                        >
                          Edit User
                        </Button>
                      </div>
                    </div>
                  </div>

                  {user.description && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="text-sm text-slate-600">{user.description}</p>
                    </div>
                  )}
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
                <div className="text-sm text-slate-600">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredUsers.length)} of{" "}
                  {filteredUsers.length} users
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
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-9"
                        >
                          {page}
                        </Button>
                      )
                    )}
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
