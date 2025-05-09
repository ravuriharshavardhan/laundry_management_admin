"use client"

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts"

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card"

// Mock data for summary stats
const summaryData = {
  todayOrders: 12,
  weekOrders: 395,
  monthOrders: 1420,
  completedOrders: 320,
  pendingOrders: 75,
  activeMachines: 12,
  totalRevenue: "$28,000",
  totalCustomers: 350,
}

// Weekly Orders data for bar chart
const weeklyOrdersData = [
  { name: "Mon", orders: 30 },
  { name: "Tue", orders: 45 },
  { name: "Wed", orders: 50 },
  { name: "Thu", orders: 40 },
  { name: "Fri", orders: 70 },
  { name: "Sat", orders: 100 },
  { name: "Sun", orders: 60 },
]

// Monthly Revenue data for line chart
const revenueData = [
  { name: "Week 1", revenue: 5000 },
  { name: "Week 2", revenue: 6200 },
  { name: "Week 3", revenue: 7500 },
  { name: "Week 4", revenue: 7300 },
]

// Machine Usage data for bar chart
const machineUsage = [
  { name: "Machine A", usage: 80 },
  { name: "Machine B", usage: 65 },
  { name: "Machine C", usage: 90 },
]

// Customer Growth Over Time data for line chart
const customerGrowth = [
  { month: "Jan", customers: 100 },
  { month: "Feb", customers: 150 },
  { month: "Mar", customers: 200 },
  { month: "Apr", customers: 260 },
  { month: "May", customers: 350 },
]

// Order Status data for pie chart
const statusPie = [
  { name: "Completed", value: summaryData.completedOrders },
  { name: "Pending", value: summaryData.pendingOrders },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

// Dashboard page component
export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Date Filter Buttons (Today / Week / Month / Custom) */}
      <div className="flex justify-start space-x-4 mb-6">
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">Today</button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">This Week</button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">This Month</button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">Custom Range</button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <p className="text-sm">Today's Orders</p>
            <p className="text-xl font-bold">{summaryData.todayOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm">This Week</p>
            <p className="text-xl font-bold">{summaryData.weekOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm">This Month</p>
            <p className="text-xl font-bold">{summaryData.monthOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm">Total Revenue</p>
            <p className="text-xl font-bold">{summaryData.totalRevenue}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm">Active Machines</p>
            <p className="text-xl font-bold">{summaryData.activeMachines}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm">Total Customers</p>
            <p className="text-xl font-bold">{summaryData.totalCustomers}</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Orders Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ id: "weekly-orders", type: "bar", name: "Weekly Orders" }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyOrdersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Completed vs. Pending Orders Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {statusPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Revenue Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Machine Usage Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Machine Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={machineUsage}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Customer Growth Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={customerGrowth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
