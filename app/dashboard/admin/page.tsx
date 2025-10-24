"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, LogOut, Users, CheckCircle, AlertCircle, BarChart3 } from "lucide-react"
import AdminSidebar from "@/components/admin/sidebar"
import DoctorVerificationList from "@/components/admin/doctor-verification-list"
import UserManagement from "@/components/admin/user-management"

export default function AdminDashboard() {
  const router = useRouter()
  const [pendingDoctors, setPendingDoctors] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    // TODO: Fetch admin data from backend
    setTimeout(() => {
      setPendingDoctors([
        {
          id: 1,
          name: "Dr. Sharma",
          email: "sharma@example.com",
          specialty: "Cardiologist",
          license: "MCI/2020/12345",
          appliedDate: "2025-10-20",
          status: "Pending",
        },
        {
          id: 2,
          name: "Dr. Patel",
          email: "patel@example.com",
          specialty: "Neurologist",
          license: "MCI/2019/54321",
          appliedDate: "2025-10-18",
          status: "Pending",
        },
      ])
      setUsers([
        { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", role: "PATIENT", joinDate: "2025-10-01" },
        { id: 2, name: "Priya Singh", email: "priya@example.com", role: "PATIENT", joinDate: "2025-10-05" },
        { id: 3, name: "Dr. Sharma", email: "sharma@example.com", role: "DOCTOR", joinDate: "2025-10-20" },
      ])
      setLoading(false)
    }, 500)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("userId")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Heart className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-3xl font-bold mt-2">{users.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Verifications</p>
                    <p className="text-3xl font-bold mt-2">{pendingDoctors.length}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-destructive opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Verified Doctors</p>
                    <p className="text-3xl font-bold mt-2">8</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-accent opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Platform Health</p>
                    <p className="text-3xl font-bold mt-2">98%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-secondary opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-border">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("verification")}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === "verification"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Doctor Verification
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === "users"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              User Management
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">New doctor registration</p>
                        <p className="text-sm text-muted-foreground">Dr. Sharma applied for verification</p>
                      </div>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">Doctor verified</p>
                        <p className="text-sm text-muted-foreground">Dr. Patel's credentials confirmed</p>
                      </div>
                      <span className="text-xs text-muted-foreground">5 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">New patient joined</p>
                        <p className="text-sm text-muted-foreground">Rajesh Kumar created account</p>
                      </div>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* System Status */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-medium">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Server</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-medium">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">File Storage</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-medium">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Service</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-medium">Healthy</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "verification" && <DoctorVerificationList doctors={pendingDoctors} />}

          {activeTab === "users" && <UserManagement users={users} />}
        </div>
      </div>
    </div>
  )
}
