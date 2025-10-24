export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 })
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
    const response = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      return Response.json({ error: error.message || "Invalid credentials" }, { status: response.status })
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("Login error:", error)
    return Response.json({ error: "Failed to connect to authentication service. Please try again." }, { status: 500 })
  }
}
