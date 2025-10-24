"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Users, TrendingUp, Activity } from "lucide-react"
import AdminSidebar from "@/components/admin/sidebar"

export default function AnalyticsPage() {
  const userGrowthData = [
    { month: "Jan", patients: 120, doctors: 15, admins: 2 },
    { month: "Feb", patients: 180, doctors: 22, admins: 2 },
    { month: "Mar", patients: 250, doctors: 30, admins: 3 },
    { month: "Apr", patients: 320, doctors: 38, admins: 3 },
    { month: "May", patients: 420, doctors: 45, admins: 4 },
    { month: "Jun", patients: 520, doctors: 52, admins: 4 },
  ]

  const appointmentData = [
    { month: "Jan", completed: 45, pending: 12, cancelled: 5 },
    { month: "Feb", completed: 68, pending: 18, cancelled: 8 },
    { month: "Mar", completed: 92, pending: 22, cancelled: 10 },
    { month: "Apr", completed: 115, pending: 28, cancelled: 12 },
    { month: "May", completed: 145, pending: 35, cancelled: 15 },
    { month: "Jun", completed: 178, pending: 42, cancelled: 18 },
  ]

  const roleDistribution = [
    { name: "Patients", value: 520, color: "#0ea5e9" },
    { name: "Doctors", value: 52, color: "#06b6d4" },
    { name: "Admins", value: 4, color: "#10b981" },
  ]

  const stats = [
    { label: "Total Users", value: "576", icon: Users, change: "+12%" },
    { label: "Active Appointments", value: "42", icon: Activity, change: "+8%" },
    { label: "Platform Growth", value: "24%", icon: TrendingUp, change: "+5%" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-8 py-4">
            <h1 className="text-2xl font-bold">Platform Analytics</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                        <p className="text-xs text-accent mt-1">{stat.change} this month</p>
                      </div>
                      <Icon className="w-8 h-8 text-primary opacity-50" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* User Growth */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Monthly user registration trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-background)",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="patients"
                      stroke="var(--color-primary)"
                      name="Patients"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="doctors"
                      stroke="var(--color-secondary)"
                      name="Doctors"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Appointment Status */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Appointment Status</CardTitle>
                <CardDescription>Monthly appointment completion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={appointmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-background)",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="completed" fill="var(--color-accent)" name="Completed" />
                    <Bar dataKey="pending" fill="var(--color-primary)" name="Pending" />
                    <Bar dataKey="cancelled" fill="var(--color-destructive)" name="Cancelled" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Role Distribution */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Current user breakdown by role</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={roleDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {roleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Platform performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-input rounded-lg">
                  <span className="text-sm">Average Response Time</span>
                  <span className="font-semibold">245ms</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-input rounded-lg">
                  <span className="text-sm">System Uptime</span>
                  <span className="font-semibold">99.8%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-input rounded-lg">
                  <span className="text-sm">Active Sessions</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-input rounded-lg">
                  <span className="text-sm">API Calls (24h)</span>
                  <span className="font-semibold">45,230</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
