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

const initialCustomers = [
  {
    id: "c1",
    name: "Ananya Gupta",
    contact: "+91 9988776655",
    email: "ananya@example.com",
    status: "Active",
    address: "123, Maple Street, Delhi",
    orderHistory: [
      { orderId: "1a2b3c4d", total: 500, status: "Delivered", date: "2025-05-01" },
      { orderId: "5d6e7f8g", total: 150, status: "Cancelled", date: "2025-04-15" },
    ],
  },
  {
    id: "c2",
    name: "Rahul Singh",
    contact: "+91 9123456789",
    email: "rahul@example.com",
    status: "Inactive",
    address: "456, Oak Avenue, Mumbai",
    orderHistory: [
      { orderId: "9h8g7f6e", total: 200, status: "Delivered", date: "2025-05-02" },
    ],
  },
];

export default function CustomerManagement() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [newCustomer, setNewCustomer] = useState({
    id: "",
    name: "",
    contact: "",
    email: "",
    status: "Active",
    address: "",
    orderHistory: [],
  });

  const resetForm = () => {
    setNewCustomer({
      id: "",
      name: "",
      contact: "",
      email: "",
      status: "Active",
      address: "",
      orderHistory: [],
    });
    setEditingCustomer(null);
  };

  const addCustomerHandler = () => {
    if (!newCustomer.name || !newCustomer.contact || !newCustomer.email) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setCustomers([
      { ...newCustomer, id: Date.now().toString() },
      ...customers,
    ]);
    toast.success("Customer added!");
    resetForm();
  };

  const startEditingHandler = (customer: any) => {
    setEditingCustomer(customer);
    setNewCustomer(customer);
  };

  const saveEditHandler = () => {
    const updated = customers.map((customer) =>
      customer.id === editingCustomer.id ? { ...newCustomer } : customer
    );
    setCustomers(updated);
    toast.success("Customer updated!");
    resetForm();
  };

  const deleteCustomerHandler = (id: string) => {
    const updated = customers.filter((customer) => customer.id !== id);
    setCustomers(updated);
    toast.success("Customer deleted!");
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl text-center">Customer Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Add/Edit Customer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Input
                placeholder="Customer Name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              />
              <Input
                placeholder="Contact Number"
                value={newCustomer.contact}
                onChange={(e) => setNewCustomer({ ...newCustomer, contact: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              />
              <Input
                placeholder="Address"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
              />
              <Select
                value={newCustomer.status}
                onValueChange={(value) => setNewCustomer({ ...newCustomer, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Account Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={editingCustomer ? saveEditHandler : addCustomerHandler}>
                {editingCustomer ? "Save" : <IoAddCircle className="text-lg" />}
              </Button>
            </div>
          </div>

          {/* Customer Table */}
          <div className="overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.contact}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      <Badge variant={customer.status === "Active" ? "default" : "outline"}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => startEditingHandler(customer)}
                      >
                        <MdEdit />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteCustomerHandler(customer.id)}
                      >
                        <FaTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Order History Section */}
          <div>
            <h2 className="text-lg font-medium mb-4">Order History</h2>
            {customers.map((customer) => (
              <div key={customer.id} className="mb-6">
                <h3 className="font-semibold">{customer.name}'s Orders</h3>
                <div className="overflow-x-auto">
                  <Table className="min-w-[500px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customer.orderHistory.map((order) => (
                        <TableRow key={order.orderId}>
                          <TableCell>{order.orderId}</TableCell>
                          <TableCell>₹{order.total}</TableCell>
                          <TableCell>
                            <Badge variant={order.status === "Delivered" ? "default" : "outline"}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
}
