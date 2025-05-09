"use client";

import React, { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type ClothItem = {
  id: string;
  name: string;
  quantity: number;
  cleaningType: string;
  price: number;
  status: string;
  date: string;
};

export default function AddLaundry() {
  const [cloths, setCloths] = useState<ClothItem[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [editingItem, setEditingItem] = useState<ClothItem | null>(null);
  const [newCloth, setNewCloth] = useState<Omit<ClothItem, "id">>({
    name: "",
    quantity: 1,
    cleaningType: "Standard Clean",
    price: 0,
    status: "Pending",
    date: "",
  });

  useEffect(() => {
    const now = new Date().toLocaleString();
    setCloths([
      {
        id: "shirt",
        name: "Cotton Shirt",
        quantity: 1,
        cleaningType: "Standard Clean",
        price: 150,
        status: "Pending",
        date: now,
      },
      {
        id: "suit",
        name: "Business Suit",
        quantity: 1,
        cleaningType: "Standard Clean",
        price: 300,
        status: "In Progress",
        date: now,
      },
    ]);
  }, []);

  const resetForm = () => {
    setNewCloth({
      name: "",
      quantity: 1,
      cleaningType: "Standard Clean",
      price: 0,
      status: "Pending",
      date: "",
    });
    setEditingItem(null);
  };

  const addClothHandler = () => {
    if (!newCloth.name || newCloth.price <= 0) {
      toast.error("Please fill out all fields.");
      return;
    }

    const newItem: ClothItem = {
      ...newCloth,
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
    };

    setCloths([newItem, ...cloths]);
    toast.success("Item added!");
    resetForm();
  };

  const startEditingHandler = (item: ClothItem) => {
    setEditingItem(item);
    setNewCloth({ ...item });
  };

  const saveEditHandler = () => {
    const updated = cloths.map((item) =>
      item.id === editingItem?.id ? { ...newCloth, id: item.id, date: item.date } : item
    );
    setCloths(updated);
    toast.success("Item updated!");
    resetForm();
  };

  const deleteClothHandler = (id: string) => {
    setCloths(cloths.filter((item) => item.id !== id));
    toast.success("Item deleted!");
  };

  const filteredCloths =
    filterStatus === "All"
      ? cloths
      : cloths.filter((item) => item.status === filterStatus);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <ToastContainer />
      <Card className="rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            Laundry Management
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Form */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Add Laundry Item</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Input
                placeholder="Cloth Name"
                value={newCloth.name}
                onChange={(e) => setNewCloth({ ...newCloth, name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Price (₹)"
                value={newCloth.price}
                onChange={(e) =>
                  setNewCloth({ ...newCloth, price: parseFloat(e.target.value) })
                }
              />
              <Select
                value={newCloth.cleaningType}
                onValueChange={(value) =>
                  setNewCloth({ ...newCloth, cleaningType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard Clean">Standard Clean</SelectItem>
                  <SelectItem value="Delicate Care">Delicate Care</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={newCloth.quantity.toString()}
                onValueChange={(value) =>
                  setNewCloth({ ...newCloth, quantity: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Qty" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={newCloth.status}
                onValueChange={(value) =>
                  setNewCloth({ ...newCloth, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={editingItem ? saveEditHandler : addClothHandler}
                className="w-full"
              >
                {editingItem ? "Save" : <span className="flex items-center gap-1"><IoAddCircle /> Add</span>}
              </Button>
            </div>
          </section>

          {/* Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-medium">Filter by Status:</h2>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCloths.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell><Badge>{item.quantity}</Badge></TableCell>
                    <TableCell>{item.cleaningType}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "Completed"
                            ? "default"
                            : item.status === "In Progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{item.price}</TableCell>
                    <TableCell className="whitespace-nowrap">{item.date}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => startEditingHandler(item)}
                      >
                        <MdEdit />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteClothHandler(item.id)}
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
    </div>
  );
}
