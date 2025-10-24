import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MessageSquare } from "lucide-react"

interface Appointment {
  id: number
  patientName: string
  date: string
  time: string
  type: string
  status: string
}

interface AppointmentsListProps {
  appointments: Appointment[]
}

export default function AppointmentsList({ appointments }: AppointmentsListProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Your scheduled consultations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-input/50 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium">{apt.patientName}</p>
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {apt.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {apt.time}
                  </span>
                  <span>{apt.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    apt.status === "Confirmed" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                  }`}
                >
                  {apt.status}
                </span>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
