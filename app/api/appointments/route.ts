export async function GET(request: Request) {
  try {
    const token = request.headers.get("authorization")
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
    const response = await fetch(`${backendUrl}/appointments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })

    if (!response.ok) {
      return Response.json({ error: "Failed to fetch appointments" }, { status: response.status })
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("Fetch appointments error:", error)
    return Response.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get("authorization")
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

    const response = await fetch(`${backendUrl}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      return Response.json({ error: "Failed to book appointment" }, { status: response.status })
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("Book appointment error:", error)
    return Response.json({ error: "Failed to book appointment" }, { status: 500 })
  }
}
