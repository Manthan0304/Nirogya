"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Phone } from "lucide-react"
import PatientSidebar from "@/components/patient/sidebar"
import BookAppointmentModal from "@/components/appointments/book-appointment-modal"

export default function AppointmentsPage() {
  const [showBookModal, setShowBookModal] = useState(false)
  const [appointments] = useState([
    {
      id: 1,
      doctor: "Dr. Sharma",
      specialty: "Cardiologist",
      date: "2025-10-25",
      time: "10:00 AM",
      status: "Confirmed",
      location: "Apollo Hospital, Delhi",
      phone: "+91-9876543210",
    },
    {
      id: 2,
      doctor: "Dr. Patel",
      specialty: "General Physician",
      date: "2025-10-28",
      time: "2:30 PM",
      status: "Pending",
      location: "Max Hospital, Delhi",
      phone: "+91-9876543211",
    },
  ])

  return (
    <div className="flex h-screen bg-background">
      <PatientSidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Appointments</h1>
            <Button className="bg-primary hover:bg-primary-dark gap-2" onClick={() => setShowBookModal(true)}>
              <Calendar className="w-4 h-4" />
              Book Appointment
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="space-y-4">
            {appointments.map((apt) => (
              <Card key={apt.id} className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{apt.doctor}</h3>
                      <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        apt.status === "Confirmed" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{apt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{apt.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{apt.phone}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-primary hover:bg-primary-dark">Join Consultation</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Reschedule
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent text-destructive">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {showBookModal && <BookAppointmentModal onClose={() => setShowBookModal(false)} />}
      </div>
    </div>
  )
}
