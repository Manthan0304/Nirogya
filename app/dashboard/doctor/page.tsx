"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, LogOut, Users, Calendar, MessageSquare, FileText, Clock } from "lucide-react"
import DoctorSidebar from "@/components/doctor/sidebar"
import PatientsList from "@/components/doctor/patients-list"
import AppointmentsList from "@/components/doctor/appointments-list"

export default function DoctorDashboard() {
  const router = useRouter()
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    // TODO: Fetch doctor's patients and appointments from backend
    setTimeout(() => {
      setPatients([
        {
          id: 1,
          name: "Rajesh Kumar",
          age: 45,
          lastVisit: "2025-10-15",
          condition: "Hypertension",
          status: "Active",
        },
        {
          id: 2,
          name: "Priya Singh",
          age: 32,
          lastVisit: "2025-10-10",
          condition: "Diabetes",
          status: "Active",
        },
        {
          id: 3,
          name: "Amit Patel",
          age: 55,
          lastVisit: "2025-09-20",
          condition: "Heart Disease",
          status: "Follow-up",
        },
      ])
      setAppointments([
        {
          id: 1,
          patientName: "Rajesh Kumar",
          date: "2025-10-25",
          time: "10:00 AM",
          type: "Consultation",
          status: "Confirmed",
        },
        {
          id: 2,
          patientName: "Priya Singh",
          date: "2025-10-25",
          time: "11:30 AM",
          type: "Follow-up",
          status: "Confirmed",
        },
        {
          id: 3,
          patientName: "Amit Patel",
          date: "2025-10-26",
          time: "2:00 PM",
          type: "Check-up",
          status: "Pending",
        },
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
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <DoctorSidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
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
                    <p className="text-sm text-muted-foreground">Total Patients</p>
                    <p className="text-3xl font-bold mt-2">{patients.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Appointments</p>
                    <p className="text-3xl font-bold mt-2">2</p>
                  </div>
                  <Calendar className="w-8 h-8 text-secondary opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Messages</p>
                    <p className="text-3xl font-bold mt-2">5</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-accent opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Reports Reviewed</p>
                    <p className="text-3xl font-bold mt-2">12</p>
                  </div>
                  <FileText className="w-8 h-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <AppointmentsList appointments={appointments} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full bg-primary hover:bg-primary-dark justify-start gap-2">
                    <Users className="w-4 h-4" />
                    View All Patients
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Calendar className="w-4 h-4" />
                    Schedule Availability
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <FileText className="w-4 h-4" />
                    Review Reports
                  </Button>
                </CardContent>
              </Card>

              {/* Availability Status */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium">
                      Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Next Break</span>
                    <span className="text-sm font-medium">2:00 PM</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Update Schedule
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-3 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Report reviewed</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Patient message</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Appointment confirmed</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Patients List */}
          <PatientsList patients={patients} />
        </div>
      </div>
    </div>
  )
}
