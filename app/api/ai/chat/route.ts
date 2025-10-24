import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
    const token = request.headers.get("authorization")

    try {
      // Try to use backend AI endpoint
      const backendResponse = await fetch(`${backendUrl}/ai-assistant/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: token }),
        },
        body: JSON.stringify({ message }),
      })

      if (backendResponse.ok) {
        const data = await backendResponse.json()
        return Response.json({ response: data.response })
      }
    } catch (backendError) {
      console.log("Backend AI unavailable, using Gemini fallback")
    }

    // Fallback to Gemini if backend is unavailable
    const { text } = await generateText({
      model: "google/gemini-2.0-flash",
      system: `You are Nirogya, a helpful AI health assistant. You provide:
- General health information and guidance
- Explanations of medical terms and conditions
- Suggestions for appropriate specialists based on symptoms
- Encouragement for healthy lifestyle habits

IMPORTANT: Always remind users that you're not a substitute for professional medical advice and they should consult with a doctor for serious concerns.

Keep responses concise and friendly.`,
      prompt: message,
    })

    return Response.json({ response: text })
  } catch (error) {
    console.error("AI Chat Error:", error)
    return Response.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
