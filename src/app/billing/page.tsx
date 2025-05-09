"use client";

import React, { useState } from "react";
import { IoAddCircle, IoSearch } from "react-icons/io5";
import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Define the Bill type
type Bill = {
  id: string;
  customerName: string;
  orderId: string;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  paymentStatus: "Pending" | "Paid";
  createdAt: string;
};

// Initial data
const initialBills: Bill[] = [
  {
    id: "bill001",
    customerName: "John Doe",
    orderId: "ORD12345",
    totalAmount: 500,
    discount: 50,
    finalAmount: 450,
    paymentStatus: "Pending",
    createdAt: new Date().toLocaleString(),
  },
  {
    id: "bill002",
    customerName: "Jane Smith",
    orderId: "ORD12346",
    totalAmount: 700,
    discount: 100,
    finalAmount: 600,
    paymentStatus: "Paid",
    createdAt: new Date().toLocaleString(),
  },
];

export default function AdminBilling() {
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Paid">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [newBill, setNewBill] = useState<Omit<Bill, "id">>({
    customerName: "",
    orderId: "",
    totalAmount: 0,
    discount: 0,
    finalAmount: 0,
    paymentStatus: "Pending",
    createdAt: new Date().toLocaleString(),
  });

  const resetForm = () => {
    setNewBill({
      customerName: "",
      orderId: "",
      totalAmount: 0,
      discount: 0,
      finalAmount: 0,
      paymentStatus: "Pending",
      createdAt: new Date().toLocaleString(),
    });
  };

  const addBillHandler = () => {
    if (!newBill.customerName || newBill.totalAmount <= 0 || newBill.orderId === "") {
      toast.error("Please fill out all fields.");
      return;
    }

    const bill: Bill = {
      ...newBill,
      id: Date.now().toString(),
    };

    setBills([bill, ...bills]);
    toast.success("Bill added!");
    resetForm();
  };

  const handlePaymentStatusChange = (billId: string) => {
    const updatedBills: Bill[] = bills.map((bill) =>
      bill.id === billId
        ? {
            ...bill,
            paymentStatus: bill.paymentStatus === "Paid" ? "Pending" : "Paid" as "Pending" | "Paid",
          }
        : bill
    );
    setBills(updatedBills);
    toast.success("Payment status updated!");
  };
  

  const deleteBillHandler = (id: string) => {
    const updatedBills = bills.filter((bill) => bill.id !== id);
    setBills(updatedBills);
    toast.success("Bill deleted!");
  };

  const filteredBills = bills.filter((bill) => {
    const matchesStatus = filterStatus === "All" || bill.paymentStatus === filterStatus;
    const matchesSearch = bill.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl text-center">
            Admin Billing Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Bill Form */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Add New Bill</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Input
                placeholder="Customer Name"
                value={newBill.customerName}
                onChange={(e) =>
                  setNewBill({ ...newBill, customerName: e.target.value })
                }
              />
              <Input
                placeholder="Order ID"
                value={newBill.orderId}
                onChange={(e) =>
                  setNewBill({ ...newBill, orderId: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Total Amount (₹)"
                value={newBill.totalAmount}
                onChange={(e) =>
                  setNewBill({ ...newBill, totalAmount: parseFloat(e.target.value) })
                }
              />
              <Input
                type="number"
                placeholder="Discount (₹)"
                value={newBill.discount}
                onChange={(e) =>
                  setNewBill({ ...newBill, discount: parseFloat(e.target.value) })
                }
              />
              <Input
                type="number"
                placeholder="Final Amount (₹)"
                value={newBill.finalAmount}
                onChange={(e) =>
                  setNewBill({ ...newBill, finalAmount: parseFloat(e.target.value) })
                }
              />
              <Select
                value={newBill.paymentStatus}
                onValueChange={(value) =>
                  setNewBill({ ...newBill, paymentStatus: value as "Pending" | "Paid" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={addBillHandler} className="flex items-center gap-2">
                <IoAddCircle className="text-lg" />
                Add Bill
              </Button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Input
                placeholder="Search by customer name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[200px]"
              />
              <Button variant="outline" className="flex items-center gap-2">
                <IoSearch />
                Search
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter by Payment Status:</span>
              <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as "All" | "Pending" | "Paid")}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bills Table */}
          <div className="overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Final Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell>{bill.customerName}</TableCell>
                    <TableCell>{bill.orderId}</TableCell>
                    <TableCell>₹{bill.totalAmount}</TableCell>
                    <TableCell>₹{bill.discount}</TableCell>
                    <TableCell>₹{bill.finalAmount}</TableCell>
                    <TableCell>
                      <Badge variant={bill.paymentStatus === "Paid" ? "default" : "outline"}>
                        {bill.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{bill.createdAt}</TableCell>
                    <TableCell className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => handlePaymentStatusChange(bill.id)}
                      >
                        <FaCheckCircle />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => alert(`Viewing Bill #${bill.id}`)}
                      >
                        <MdVisibility />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteBillHandler(bill.id)}
                      >
                        <FaTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
}
