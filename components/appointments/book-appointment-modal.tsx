"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface BookAppointmentModalProps {
  onClose: () => void
}

export default function BookAppointmentModal({ onClose }: BookAppointmentModalProps) {
  const [step, setStep] = useState(1)
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [reason, setReason] = useState("")

  const doctors = [
    { id: 1, name: "Dr. Sharma", specialty: "Cardiologist", rating: 4.8 },
    { id: 2, name: "Dr. Patel", specialty: "General Physician", rating: 4.6 },
    { id: 3, name: "Dr. Singh", specialty: "Neurologist", rating: 4.9 },
  ]

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]

  const handleBooking = () => {
    // TODO: Send booking request to backend
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Book an Appointment</CardTitle>
            <CardDescription>Step {step} of 3</CardDescription>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Select Doctor */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Select a Doctor</h3>
              <div className="grid gap-3">
                {doctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor.id.toString())}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      selectedDoctor === doctor.id.toString()
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    <p className="text-xs text-accent mt-1">★ {doctor.rating}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Select Date</h3>
                <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </div>

              <div>
                <h3 className="font-semibold mb-3">Select Time</h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 border rounded-lg text-sm transition-colors ${
                        selectedTime === time
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Reason & Confirmation */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Reason for Appointment</h3>
                <textarea
                  placeholder="Describe your symptoms or reason for visit..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>

              <div className="p-4 bg-input rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doctor:</span>
                  <span className="font-medium">{doctors.find((d) => d.id.toString() === selectedDoctor)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 justify-end">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="bg-transparent">
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                className="bg-primary hover:bg-primary-dark"
                onClick={() => setStep(step + 1)}
                disabled={(step === 1 && !selectedDoctor) || (step === 2 && (!selectedDate || !selectedTime))}
              >
                Next
              </Button>
            ) : (
              <Button className="bg-primary hover:bg-primary-dark" onClick={handleBooking}>
                Confirm Booking
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
