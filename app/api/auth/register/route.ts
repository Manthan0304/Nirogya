export async function POST(request: Request) {
  try {
    const { fullName, email, password, role } = await request.json()

    if (!fullName || !email || !password || !role) {
      return Response.json({ error: "All fields are required" }, { status: 400 })
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
    const response = await fetch(`${backendUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password, role }),
    })

    if (!response.ok) {
      const error = await response.json()
      return Response.json({ error: error.message || "Registration failed" }, { status: response.status })
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("Registration error:", error)
    return Response.json({ error: "Failed to connect to registration service. Please try again." }, { status: 500 })
  }
}
