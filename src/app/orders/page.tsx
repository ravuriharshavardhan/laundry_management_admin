"use client";

import React, { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Sample order data
const initialOrders = [
  {
    orderId: "1b0f88fe-e789-4689-afae-c3c1c1815051",
    serviceTypes: ["Standard Clean", "Delicate Care"],
    total: 66,
    status: "Scheduled",
    date: new Date().toLocaleString(),
    items: [
      { id: "shirt", name: "Cotton Shirt", quantity: 1, cleaningType: "Standard Clean", price: 5 },
      { id: "suit", name: "Business Suit", quantity: 1, cleaningType: "Standard Clean", price: 15 },
    ],
  },
  {
    orderId: "8782ee59-f15d-4cb4-932c-bbc69e8eda3f",
    serviceTypes: ["Standard Carpet Cleaning", "Deep Carpet Cleaning"],
    total: 94,
    status: "In Progress",
    date: new Date().toLocaleString(),
    items: [
      { id: "carpet-small", name: "Small Carpet (3x5 ft)", quantity: 1, cleaningType: "Standard Carpet Cleaning", price: 10 },
      { id: "carpet-large", name: "Large Carpet (8x10 ft)", quantity: 1, cleaningType: "Deep Carpet Cleaning", price: 25 },
    ],
  },
];

export default function OrdersManagement() {
  const [orders, setOrders] = useState(initialOrders);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [newOrder, setNewOrder] = useState({
    orderId: "",
    serviceTypes: ["Standard Clean"],
    total: 0,
    status: "Scheduled",
    date: new Date().toLocaleString(),
    items: [],
  });

  const resetForm = () => {
    setNewOrder({
      orderId: "",
      serviceTypes: ["Standard Clean"],
      total: 0,
      status: "Scheduled",
      date: new Date().toLocaleString(),
      items: [],
    });
    setEditingOrder(null);
  };

  const addOrderHandler = () => {
    if (!newOrder.orderId || newOrder.total <= 0) {
      toast.error("Please fill out all fields.");
      return;
    }

    setOrders([
      { ...newOrder, orderId: Date.now().toString(), date: new Date().toLocaleString() },
      ...orders,
    ]);
    toast.success("Order added!");
    resetForm();
  };

  const startEditingHandler = (order: any) => {
    setEditingOrder(order);
    setNewOrder(order);
  };

  const saveEditHandler = () => {
    const updated = orders.map((order) =>
      order.orderId === editingOrder.orderId ? { ...newOrder, date: order.date } : order
    );
    setOrders(updated);
    toast.success("Order updated!");
    resetForm();
  };

  const deleteOrderHandler = (orderId: string) => {
    const updated = orders.filter((order) => order.orderId !== orderId);
    setOrders(updated);
    toast.success("Order deleted!");
  };

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center">Orders Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Order Form */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Add Order</h2>
            <div className="grid md:grid-cols-6 gap-4">
              <Input
                placeholder="Order ID"
                value={newOrder.orderId}
                onChange={(e) => setNewOrder({ ...newOrder, orderId: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Total (₹)"
                value={newOrder.total}
                onChange={(e) => setNewOrder({ ...newOrder, total: parseFloat(e.target.value) })}
              />
              <Select
                value={newOrder.status}
                onValueChange={(value) => setNewOrder({ ...newOrder, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={editingOrder ? saveEditHandler : addOrderHandler}>
                {editingOrder ? "Save" : <IoAddCircle className="text-lg" />}
              </Button>
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center justify-between mt-4">
            <h2 className="text-lg font-medium">Filter by Status:</h2>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Completed"
                          ? "default"
                          : order.status === "In Progress"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>₹{order.total}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => startEditingHandler(order)}
                    >
                      <MdEdit />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteOrderHandler(order.orderId)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
}
