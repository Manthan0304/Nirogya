export async function GET(request: Request) {
  try {
    const token = request.headers.get("authorization")
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
    const response = await fetch(`${backendUrl}/patient/reports`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })

    if (!response.ok) {
      return Response.json({ error: "Failed to fetch reports" }, { status: response.status })
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("Fetch reports error:", error)
    return Response.json({ error: "Failed to fetch reports" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get("authorization")
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

    const response = await fetch(`${backendUrl}/patient/reports/upload`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    })

    if (!response.ok) {
      return Response.json({ error: "Failed to upload report" }, { status: response.status })
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("Upload report error:", error)
    return Response.json({ error: "Failed to upload report" }, { status: 500 })
  }
}
