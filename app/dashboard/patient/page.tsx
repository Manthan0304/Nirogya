"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, LogOut, Upload, Calendar, MessageSquare, Zap, FileText } from "lucide-react"
import PatientSidebar from "@/components/patient/sidebar"
import ReportUploadModal from "@/components/patient/report-upload-modal"
import UpcomingAppointments from "@/components/patient/upcoming-appointments"
import HealthInsights from "@/components/patient/health-insights"

export default function PatientDashboard() {
  const router = useRouter()
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [reports, setReports] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchPatientData = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      try {
        // Fetch reports
        const reportsResponse = await fetch("/api/patient/reports", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (reportsResponse.ok) {
          const reportsData = await reportsResponse.json()
          setReports(reportsData.reports || [])
        }

        // Fetch appointments
        const appointmentsResponse = await fetch("/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (appointmentsResponse.ok) {
          const appointmentsData = await appointmentsResponse.json()
          setAppointments(appointmentsData.appointments || [])
        }
      } catch (err) {
        console.error("Error fetching patient data:", err)
        setError("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchPatientData()
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
      <PatientSidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Patient Dashboard</h1>
            <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-border hover:border-primary/50 cursor-pointer transition-colors">
              <CardContent className="p-6 flex items-center gap-4">
                <Upload className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-semibold">Upload Report</p>
                  <p className="text-sm text-muted-foreground">Add medical documents</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 cursor-pointer transition-colors">
              <CardContent className="p-6 flex items-center gap-4">
                <Calendar className="w-8 h-8 text-secondary" />
                <div>
                  <p className="font-semibold">Book Appointment</p>
                  <p className="text-sm text-muted-foreground">Schedule with doctors</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 cursor-pointer transition-colors">
              <CardContent className="p-6 flex items-center gap-4">
                <Zap className="w-8 h-8 text-accent" />
                <div>
                  <p className="font-semibold">AI Assistant</p>
                  <p className="text-sm text-muted-foreground">Get health guidance</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Reports */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Reports */}
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Medical Reports</CardTitle>
                    <CardDescription>Your uploaded health documents</CardDescription>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary-dark gap-2"
                    onClick={() => setShowUploadModal(true)}
                  >
                    <Upload className="w-4 h-4" />
                    Upload
                  </Button>
                </CardHeader>
                <CardContent>
                  {reports.length > 0 ? (
                    <div className="space-y-3">
                      {reports.map((report: any) => (
                        <div
                          key={report.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-input transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">{report.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {report.type} • {report.date} • {report.doctor}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-muted mx-auto mb-2 opacity-50" />
                      <p className="text-muted-foreground">No reports uploaded yet</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 bg-transparent"
                        onClick={() => setShowUploadModal(true)}
                      >
                        Upload Your First Report
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <UpcomingAppointments appointments={appointments} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <HealthInsights />

              {/* Quick Stats */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Reports</span>
                    <span className="font-semibold text-lg">{reports.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Upcoming Appointments</span>
                    <span className="font-semibold text-lg">{appointments.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Connected Doctors</span>
                    <span className="font-semibold text-lg">2</span>
                  </div>
                </CardContent>
              </Card>

              {/* AI Assistant Card */}
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    AI Health Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get instant health guidance, understand medical terms, and receive specialist recommendations.
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary-dark gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && <ReportUploadModal onClose={() => setShowUploadModal(false)} onUpload={setReports} />}
    </div>
  )
}
