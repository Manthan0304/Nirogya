import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Lock, Users, Zap, FileText } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Nirogya</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary-dark">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-balance">
            Your Health, <span className="text-primary">Secured</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Manage your medical records, connect with doctors, and access AI-powered health guidance — all in one secure
            platform.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/register">
              <Button size="lg" className="bg-primary hover:bg-primary-dark">
                Start Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <Card className="border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <FileText className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Secure Storage</CardTitle>
              <CardDescription>Encrypted medical records</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Upload and organize your medical reports, prescriptions, and health documents with end-to-end
                encryption.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <Users className="w-8 h-8 text-secondary mb-2" />
              <CardTitle>Doctor Connect</CardTitle>
              <CardDescription>Direct consultation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Book appointments and chat with verified doctors for personalized medical guidance and consultations.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <Zap className="w-8 h-8 text-accent mb-2" />
              <CardTitle>AI Health Assistant</CardTitle>
              <CardDescription>24/7 guidance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get instant health insights, understand medical terms, and receive specialist recommendations powered by
                AI.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Trust Section */}
        <div className="mt-20 p-8 bg-primary/5 border border-primary/20 rounded-lg text-center">
          <Lock className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Enterprise-Grade Security</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            JWT authentication, role-based access control, and end-to-end encryption ensure your health data is always
            protected.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2025 Nirogya. Secure healthcare for everyone.</p>
        </div>
      </footer>
    </div>
  )
}
