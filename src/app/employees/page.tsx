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

// Sample data for delivery boy employees
const initialEmployees = [
  {
    id: "d1",
    name: "Rajesh Kumar",
    contact: "+91 9876543210",
    status: "Available",
    orderStatus: "Assigned",
    schedule: "2025-05-10 10:00 AM",
    documentVerification: "Pending",
    assignedOrders: [
      { orderId: "1b0f88fe-e789-4689-afae-c3c1c1815051", total: 50, status: "Assigned" },
    ],
  },
  {
    id: "d2",
    name: "Amit Sharma",
    contact: "+91 9123456789",
    status: "Busy",
    orderStatus: "Completed",
    schedule: "2025-05-09 02:00 PM",
    documentVerification: "Verified",
    assignedOrders: [
      { orderId: "8782ee59-f15d-4cb4-932c-bbc69e8eda3f", total: 100, status: "Completed" },
    ],
  },
];

export default function DeliveryBoyManagement() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    contact: "",
    status: "Available",
    orderStatus: "Assigned",
    schedule: "",
    documentVerification: "Pending",
    assignedOrders: [],
  });

  const resetForm = () => {
    setNewEmployee({
      id: "",
      name: "",
      contact: "",
      status: "Available",
      orderStatus: "Assigned",
      schedule: "",
      documentVerification: "Pending",
      assignedOrders: [],
    });
    setEditingEmployee(null);
  };

  const addEmployeeHandler = () => {
    if (!newEmployee.name || !newEmployee.contact) {
      toast.error("Please fill out all fields.");
      return;
    }

    setEmployees([
      { ...newEmployee, id: Date.now().toString() },
      ...employees,
    ]);
    toast.success("Employee added!");
    resetForm();
  };

  const startEditingHandler = (employee: any) => {
    setEditingEmployee(employee);
    setNewEmployee(employee);
  };

  const saveEditHandler = () => {
    const updated = employees.map((employee) =>
      employee.id === editingEmployee.id ? { ...newEmployee } : employee
    );
    setEmployees(updated);
    toast.success("Employee updated!");
    resetForm();
  };

  const deleteEmployeeHandler = (id: string) => {
    const updated = employees.filter((employee) => employee.id !== id);
    setEmployees(updated);
    toast.success("Employee deleted!");
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center">Delivery Boy Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add/Edit Employee Form */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Add/Edit Delivery Boy</h2>
            <div className="grid md:grid-cols-6 gap-4">
              <Input
                placeholder="Employee Name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              />
              <Input
                placeholder="Contact Number"
                value={newEmployee.contact}
                onChange={(e) => setNewEmployee({ ...newEmployee, contact: e.target.value })}
              />
              <Select
                value={newEmployee.status}
                onValueChange={(value) => setNewEmployee({ ...newEmployee, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Busy">Busy</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={newEmployee.documentVerification}
                onValueChange={(value) => setNewEmployee({ ...newEmployee, documentVerification: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Document Verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Verified">Verified</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="datetime-local"
                value={newEmployee.schedule}
                onChange={(e) => setNewEmployee({ ...newEmployee, schedule: e.target.value })}
              />
              <Button onClick={editingEmployee ? saveEditHandler : addEmployeeHandler}>
                {editingEmployee ? "Save" : <IoAddCircle className="text-lg" />}
              </Button>
            </div>
          </div>

          {/* Employees Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Document Verification</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.contact}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        employee.status === "Available"
                          ? "default"
                          : employee.status === "Busy"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{employee.schedule}</TableCell>
                  <TableCell>
                    <Badge variant={employee.documentVerification === "Verified" ? "default" : "outline"}>
                      {employee.documentVerification}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => startEditingHandler(employee)}
                    >
                      <MdEdit />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteEmployeeHandler(employee.id)}
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
