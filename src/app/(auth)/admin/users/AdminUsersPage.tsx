"use client";

import { useEffect, useState } from "react";
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

import { changeUserStatus } from "@/actions/admin.action";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { User } from "@/lib/types";
import defaultUser from '@public/user.png';





export default function AdminUsersPage({ data }: { data: User[] }) {
  const [users, setUsers] = useState<User[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (data && data.length > 0) {
      setUsers(data);
    }
  }, [data]);



  // Pagination
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle status change
  const handleStatusChange = async (userId: string, newStatus: "ACTIVE" | "INACTIVE") => {
    setLoading(true);
    const updateStatus = await changeUserStatus({ status: newStatus }, userId);
    if (updateStatus.data.success) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, status: newStatus, isActive: newStatus === "ACTIVE" }
            : user
        )

      );
    }
    setLoading(false);
    // console.log(updateStatus, "update status")
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
    <div className="min-h-screen bg-primary2 text-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">
            User Management
          </h1>
          <p className="">
            Manage and monitor all users in the system
          </p>
        </div>



        {/* User Cards */}
        <div className="space-y-4 mb-6">
          {currentUsers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="">No users found</p>
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
                        <AvatarImage
                          src={user.image ?? defaultUser.src}
                          alt={user.name}
                        />
                        <AvatarFallback className="text-lg font-semibold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold  mb-1 truncate">
                          {user.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className={getRoleColor(user.role!)}>
                            {user.role}
                          </Badge>
                          <Badge className={getStatusColor(user.status!)}>
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
                      <div className="flex items-center gap-2 ">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 ">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 ">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span className="truncate">{user.address || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 ">
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
                        <span className={`text-sm font-medium 
                        ${user.isActive ? "text-secondary" : "text-red-500"}`}>
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
                          className="
                          cursor-pointer
                              data-[state=checked]:bg-amber-600
                              data-[state=unchecked]:bg-gray-300
                            "
                        />
                        {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
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
                  {Math.min(endIndex, users.length)} of{" "}
                  {users.length} users
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
