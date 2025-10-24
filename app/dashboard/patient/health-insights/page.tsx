"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Heart, TrendingUp, Activity, Droplet, AlertCircle } from "lucide-react"
import PatientSidebar from "@/components/patient/sidebar"

export default function HealthInsightsPage() {
  const [timeRange, setTimeRange] = useState("3m")

  // Sample health data
  const bloodPressureData = [
    { date: "Oct 1", systolic: 120, diastolic: 80 },
    { date: "Oct 8", systolic: 122, diastolic: 82 },
    { date: "Oct 15", systolic: 118, diastolic: 78 },
    { date: "Oct 22", systolic: 125, diastolic: 85 },
  ]

  const cholesterolData = [
    { date: "Sep 1", total: 210, hdl: 45, ldl: 140 },
    { date: "Sep 15", total: 205, hdl: 48, ldl: 135 },
    { date: "Oct 1", total: 200, hdl: 50, ldl: 130 },
    { date: "Oct 15", total: 195, hdl: 52, ldl: 125 },
  ]

  const weightData = [
    { date: "Sep 1", weight: 75 },
    { date: "Sep 15", weight: 74.5 },
    { date: "Oct 1", weight: 74 },
    { date: "Oct 15", weight: 73.5 },
  ]

  const healthMetrics = [
    {
      label: "Blood Pressure",
      value: "120/80",
      status: "Normal",
      icon: Heart,
      color: "text-accent",
    },
    {
      label: "Heart Rate",
      value: "72 bpm",
      status: "Normal",
      icon: Activity,
      color: "text-primary",
    },
    {
      label: "Cholesterol",
      value: "195 mg/dL",
      status: "Good",
      icon: Droplet,
      color: "text-secondary",
    },
    {
      label: "BMI",
      value: "24.5",
      status: "Healthy",
      icon: TrendingUp,
      color: "text-accent",
    },
  ]

  const recommendations = [
    {
      title: "Increase Physical Activity",
      description: "Aim for 150 minutes of moderate exercise per week",
      priority: "High",
    },
    {
      title: "Reduce Sodium Intake",
      description: "Keep daily sodium below 2,300mg to maintain healthy blood pressure",
      priority: "Medium",
    },
    {
      title: "Regular Health Checkups",
      description: "Schedule annual checkups to monitor your health trends",
      priority: "Medium",
    },
    {
      title: "Improve Sleep Quality",
      description: "Aim for 7-9 hours of quality sleep each night",
      priority: "Low",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <PatientSidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Health Insights</h1>
            <div className="flex gap-2">
              {["1m", "3m", "6m", "1y"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    timeRange === range ? "bg-primary text-white" : "bg-input text-foreground hover:bg-input/80"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            {healthMetrics.map((metric) => {
              const Icon = metric.icon
              return (
                <Card key={metric.label} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Icon className={`w-6 h-6 ${metric.color}`} />
                      <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">{metric.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Blood Pressure Chart */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Blood Pressure Trend</CardTitle>
                <CardDescription>Systolic and Diastolic readings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={bloodPressureData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
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
                      dataKey="systolic"
                      stroke="var(--color-primary)"
                      name="Systolic"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      stroke="var(--color-secondary)"
                      name="Diastolic"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cholesterol Chart */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Cholesterol Levels</CardTitle>
                <CardDescription>Total, HDL, and LDL cholesterol trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cholesterolData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-background)",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="total" fill="var(--color-primary)" name="Total" />
                    <Bar dataKey="hdl" fill="var(--color-accent)" name="HDL (Good)" />
                    <Bar dataKey="ldl" fill="var(--color-destructive)" name="LDL (Bad)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weight Trend */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Weight Trend</CardTitle>
                <CardDescription>Your weight progress over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" domain={[70, 76]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-background)",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="var(--color-secondary)"
                      name="Weight (kg)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Health Recommendations */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Health Recommendations</CardTitle>
                <CardDescription>Personalized suggestions based on your data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="p-3 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-sm">{rec.title}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          rec.priority === "High"
                            ? "bg-destructive/20 text-destructive"
                            : rec.priority === "Medium"
                              ? "bg-primary/20 text-primary"
                              : "bg-muted/20 text-muted-foreground"
                        }`}
                      >
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{rec.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <CardTitle>Health Alerts</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  Your recent blood pressure reading (125/85) is slightly elevated. Consider reducing sodium intake and
                  increasing physical activity.
                </p>
                <p className="text-sm">
                  You haven't had a checkup in 6 months. Schedule an appointment with your doctor for a comprehensive
                  health assessment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
