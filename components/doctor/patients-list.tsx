import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"

interface Patient {
  id: number
  name: string
  age: number
  lastVisit: string
  condition: string
  status: string
}

interface PatientsListProps {
  patients: Patient[]
}

export default function PatientsList({ patients }: PatientsListProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>My Patients</CardTitle>
        <CardDescription>Manage and view your patient list</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Patient Name</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Age</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Condition</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Visit</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-border hover:bg-input/50 transition-colors">
                  <td className="py-3 px-4 font-medium">{patient.name}</td>
                  <td className="py-3 px-4">{patient.age}</td>
                  <td className="py-3 px-4">{patient.condition}</td>
                  <td className="py-3 px-4 text-muted-foreground">{patient.lastVisit}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        patient.status === "Active" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
