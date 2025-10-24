import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Heart, Activity } from "lucide-react"

export default function HealthInsights() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Health Insights</CardTitle>
        <CardDescription>Based on your reports</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
          <Heart className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Heart Health</p>
            <p className="text-xs text-muted-foreground">Normal range</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
          <Activity className="w-5 h-5 text-secondary" />
          <div>
            <p className="text-sm font-medium">Blood Pressure</p>
            <p className="text-xs text-muted-foreground">120/80 mmHg</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
          <TrendingUp className="w-5 h-5 text-accent" />
          <div>
            <p className="text-sm font-medium">Overall Health</p>
            <p className="text-xs text-muted-foreground">Good condition</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
