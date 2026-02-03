"use client";

import * as React from "react";
import { Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderStatus } from "@/actions/order.aciton";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

interface Props {
  order: {
    id: string;
    status: OrderStatus;
      totalAmount: number;
  };
    onStatusChange?: (status: OrderStatus) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    provider?: boolean;
}

/* ================= CONSTANTS ================= */

const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

/* ================= COMPONENT ================= */

export default function OrderStatusPopover({
    order,
    provider

}: Props) {

    const onStatusChange = async (status: OrderStatus) => {
        // Implement status change logic here
        console.log(`Order ${order.id} status changed to ${status}`);
        const response = await orderStatus(order.id, status);
        console.log("Response from orderStatus action:", response);
        if (response.data.success) {
            toast.success("Order status updated successfully!");
        } else {
            toast.error("Failed to update order status.");
        }
    }

  return (
    <div className="flex flex-col items-start sm:items-end gap-2">
      <Popover  >
              <PopoverTrigger asChild disabled={order.status === "DELIVERED" || !provider}>
                    <div className="flex cursor-pointer flex-col  items-start sm:items-end gap-2">
                        <Badge
                            className={`bg-gray-100 text-gray-700 border-gray-300
                            border flex items-center gap-1 px-3 py-1`}
                        >
                            <Clock className="w-4 h-4" />
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace(/-/g, ' ')}
                        </Badge>
                        <div className="text-lg font-bold text-gray-900">৳{order.totalAmount}</div>
                        </div>
            </PopoverTrigger>

        <PopoverContent className="w-52 p-2 bg-amber-50">
          <Select
            defaultValue={order.status}
            onValueChange={(value) =>
              onStatusChange(value as OrderStatus)
            }
            disabled={order.status === "DELIVERED"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Change status" />
            </SelectTrigger>

            <SelectContent className="bg-yellow-100">
              {ORDER_STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PopoverContent>
      </Popover>

    </div>
  );
}
