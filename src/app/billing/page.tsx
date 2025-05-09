// "use client";

// import React, { useState } from "react";
// import { IoAddCircle } from "react-icons/io5";
// import { FaTrashAlt } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableHeader,
// } from "@/components/ui/table";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";

// // Sample customer and laundry items data
// const initialOrder = {
//   customer: {
//     name: "Ananya Gupta",
//     contact: "+91 9988776655",
//     address: "123, Maple Street, Delhi",
//   },
//   items: [
//     {
//       id: "shirt",
//       name: "Cotton Shirt",
//       price: 150,
//       quantity: 1,
//       cleaningType: "Standard Clean",
//     },
//     {
//       id: "suit",
//       name: "Business Suit",
//       price: 300,
//       quantity: 1,
//       cleaningType: "Delicate Care",
//     },
//   ],
//   discount: 0,
//   paymentStatus: "Pending",
// };

// export default function BillingManagement() {
//   const [order, setOrder] = useState(initialOrder);

//   const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const discount = parseFloat(e.target.value);
//     if (isNaN(discount)) return;
//     setOrder({ ...order, discount });
//   };

//   const handlePaymentStatusChange = () => {
//     setOrder({
//       ...order,
//       paymentStatus: order.paymentStatus === "Paid" ? "Pending" : "Paid",
//     });
//   };

//   const calculateTotal = () => {
//     const totalAmount = order.items.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//     return totalAmount - (order.discount || 0);
//   };

//   const generateBill = () => {
//     const totalAmount = calculateTotal();
//     const billData = {
//       customer: order.customer,
//       items: order.items,
//       totalAmount,
//       discount: order.discount,
//       finalAmount: totalAmount,
//       paymentStatus: order.paymentStatus,
//     };
//     // Here we can integrate a bill generation API or library if needed
//     toast.success("Bill generated successfully!");
//     console.log(billData); // You can add more complex logic here to print/download the bill.
//   };

//   const handleItemQuantityChange = (id: string, quantity: number) => {
//     const updatedItems = order.items.map((item) =>
//       item.id === id ? { ...item, quantity } : item
//     );
//     setOrder({ ...order, items: updatedItems });
//   };

//   const deleteItemHandler = (id: string) => {
//     const updatedItems = order.items.filter((item) => item.id !== id);
//     setOrder({ ...order, items: updatedItems });
//     toast.success("Item deleted!");
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-3xl text-center">Billing Management</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Customer Details */}
//           <div className="grid md:grid-cols-3 gap-4">
//             <div>
//               <h3 className="font-medium">Customer Name:</h3>
//               <p>{order.customer.name}</p>
//             </div>
//             <div>
//               <h3 className="font-medium">Contact:</h3>
//               <p>{order.customer.contact}</p>
//             </div>
//             <div>
//               <h3 className="font-medium">Address:</h3>
//               <p>{order.customer.address}</p>
//             </div>
//           </div>

//           {/* Laundry Items */}
//           <h2 className="text-xl font-semibold">Laundry Items</h2>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Item Name</TableHead>
//                 <TableHead>Cleaning Type</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Quantity</TableHead>
//                 <TableHead>Total</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {order.items.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>{item.name}</TableCell>
//                   <TableCell>{item.cleaningType}</TableCell>
//                   <TableCell>₹{item.price}</TableCell>
//                   <TableCell>
//                     <Input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) =>
//                         handleItemQuantityChange(item.id, parseInt(e.target.value))
//                       }
//                     />
//                   </TableCell>
//                   <TableCell>₹{item.price * item.quantity}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="destructive"
//                       size="icon"
//                       onClick={() => deleteItemHandler(item.id)}
//                     >
//                       <FaTrashAlt />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {/* Discount */}
//           <div className="flex justify-between items-center mt-4">
//             <h3 className="text-lg font-semibold">Apply Discount</h3>
//             <Input
//               type="number"
//               placeholder="Discount Amount"
//               value={order.discount}
//               onChange={handleDiscountChange}
//             />
//           </div>

//           {/* Payment Status */}
//           <div className="flex justify-between items-center mt-4">
//             <h3 className="text-lg font-semibold">Payment Status</h3>
//             <Button variant="outline" onClick={handlePaymentStatusChange}>
//               {order.paymentStatus === "Paid" ? "Mark as Pending" : "Mark as Paid"}
//             </Button>
//           </div>

//           {/* Total Amount */}
//           <div className="flex justify-between mt-4">
//             <h2 className="text-lg font-semibold">Total Amount</h2>
//             <p className="text-xl font-semibold">
//               ₹{calculateTotal().toFixed(2)}
//             </p>
//           </div>

//           {/* Generate Bill */}
//           <Button className="mt-6 w-full" onClick={generateBill}>
//             Generate Bill
//           </Button>
//         </CardContent>
//       </Card>
//       <ToastContainer />
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { IoAddCircle, IoSearch } from "react-icons/io5";
import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { MdEdit, MdVisibility } from "react-icons/md";
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

// Initial data
const initialBills = [
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
  const [bills, setBills] = useState(initialBills);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [newBill, setNewBill] = useState({
    id: "",
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
      id: "",
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

    setBills([
      { ...newBill, id: Date.now().toString(), date: new Date().toLocaleString() },
      ...bills,
    ]);
    toast.success("Bill added!");
    resetForm();
  };

  const handlePaymentStatusChange = (billId: string) => {
    const updatedBills = bills.map((bill) =>
      bill.id === billId ? { ...bill, paymentStatus: bill.paymentStatus === "Paid" ? "Pending" : "Paid" } : bill
    );
    setBills(updatedBills);
    toast.success("Payment status updated!");
  };

  const deleteBillHandler = (id: string) => {
    const updatedBills = bills.filter((bill) => bill.id !== id);
    setBills(updatedBills);
    toast.success("Bill deleted!");
  };

  const filteredBills =
    filterStatus === "All"
      ? bills.filter((bill) => bill.customerName.toLowerCase().includes(searchQuery.toLowerCase()))
      : bills.filter(
          (bill) =>
            bill.paymentStatus === filterStatus &&
            bill.customerName.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center">Admin Billing Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Add New Bill</h2>
            <div className="grid md:grid-cols-6 gap-4">
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
                  setNewBill({ ...newBill, paymentStatus: value })
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
              <Button onClick={addBillHandler}>
                <IoAddCircle className="text-lg" />
                Add Bill
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center justify-between mt-4">
            <h2 className="text-lg font-medium">Search Bills:</h2>
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Search by customer name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[200px]"
              />
              <Button variant="outline" className="flex gap-2">
                <IoSearch />
                Search
              </Button>
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center justify-between mt-4">
            <h2 className="text-lg font-medium">Filter by Payment Status:</h2>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Table>
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
                    <Badge
                      variant={bill.paymentStatus === "Paid" ? "default" : "outline"}
                    >
                      {bill.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{bill.createdAt}</TableCell>
                  <TableCell className="flex gap-2">
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
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
}
