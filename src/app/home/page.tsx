'use client'

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  ArrowUpRight,
  CheckCircle,
  Hourglass,
  Clock,
} from "lucide-react"

const weeklyData = [
  { name: "Mon", orders: 30 },
  { name: "Tue", orders: 45 },
  { name: "Wed", orders: 50 },
  { name: "Thu", orders: 40 },
  { name: "Fri", orders: 70 },
  { name: "Sat", orders: 100 },
  { name: "Sun", orders: 60 },
]

const recentOrders = [
  { id: "001", customer: "John Doe", status: "Pending", machine: "Washer 3" },
  { id: "002", customer: "Jane Smith", status: "Completed", machine: "Dryer 1" },
  { id: "003", customer: "Ali Khan", status: "In Progress", machine: "Washer 5" },
]

export default function DashboardPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of metrics and recent activity</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Total Orders</CardTitle>
            <ArrowUpRight className="text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">350</p>
            <p className="text-sm text-muted-foreground">+12% this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Active Machines</CardTitle>
            <CheckCircle className="text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Pending Deliveries</CardTitle>
            <Hourglass className="text-yellow-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24</p>
            <p className="text-sm text-muted-foreground">Awaiting dispatch</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Tabs defaultValue="week" className="mb-8">
        <TabsList>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>
        <TabsContent value="week">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="month">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Monthly chart data coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Input
            placeholder="Search customer..."
            className="w-full md:w-64 mt-2 md:mt-0"
          />
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="border-b">
              <tr>
                <th className="py-2 px-4">Order ID</th>
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Machine</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-muted">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.customer}</td>
                  <td className="py-2 px-4">
                    <Badge variant={
                      order.status === "Completed" ? "success"
                        : order.status === "Pending" ? "destructive"
                          : "warning"
                    }>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-2 px-4">{order.machine}</td>
                  <td className="py-2 px-4">
                    <Button size="sm" variant="outline">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  )
}
