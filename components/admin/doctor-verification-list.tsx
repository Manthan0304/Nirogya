import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

interface Doctor {
  id: number
  name: string
  email: string
  specialty: string
  license: string
  appliedDate: string
  status: string
}

interface DoctorVerificationListProps {
  doctors: Doctor[]
}

export default function DoctorVerificationList({ doctors }: DoctorVerificationListProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Doctor Verification Requests</CardTitle>
        <CardDescription>Review and verify doctor credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-lg">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                </div>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                  {doctor.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{doctor.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">License Number</p>
                  <p className="font-medium">{doctor.license}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Applied Date</p>
                  <p className="font-medium">{doctor.appliedDate}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-accent hover:bg-accent/90 gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent gap-2">
                  <XCircle className="w-4 h-4" />
                  Reject
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  View Documents
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
