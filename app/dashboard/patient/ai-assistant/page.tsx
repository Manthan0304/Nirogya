"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Zap, Loader } from "lucide-react"
import PatientSidebar from "@/components/patient/sidebar"

interface Message {
  id: number
  sender: "user" | "ai"
  text: string
  timestamp: string
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm your AI Health Assistant powered by Google Gemini. I can help you with:\n\n• Understanding medical terms and conditions\n• Explaining your lab reports\n• Suggesting possible specialists based on symptoms\n• Providing general health guidance\n\nHow can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setLoading(true)

    try {
      // TODO: Call backend API that integrates with Google Gemini
      // Example: POST /api/ai/chat with { message: newMessage }
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      const aiMessage: Message = {
        id: messages.length + 2,
        sender: "ai",
        text: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      // Fallback response for demo
      const aiMessage: Message = {
        id: messages.length + 2,
        sender: "ai",
        text: "I'm here to help! Based on your question, I recommend consulting with a specialist. In the meantime, ensure you maintain a healthy lifestyle with regular exercise and a balanced diet.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, aiMessage])
    } finally {
      setLoading(false)
    }
  }

  const quickQuestions = [
    "What does high cholesterol mean?",
    "How do I interpret my blood test results?",
    "What specialist should I see for chest pain?",
    "What are the symptoms of diabetes?",
  ]

  return (
    <div className="flex h-screen bg-background">
      <PatientSidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold">AI Health Assistant</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col h-[calc(100vh-80px)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-md px-4 py-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-accent/10 text-foreground rounded-bl-none border border-accent/30"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <p className={`text-xs mt-2 ${msg.sender === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-accent/10 text-foreground rounded-lg rounded-bl-none px-4 py-3 border border-accent/30">
                  <div className="flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions (shown when no messages) */}
          {messages.length === 1 && !loading && (
            <div className="px-8 pb-4">
              <p className="text-sm text-muted-foreground mb-3">Quick questions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setNewMessage(question)
                    }}
                    className="text-left p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-input transition-colors text-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-border bg-background/50 p-4">
            <div className="flex gap-3">
              <Input
                placeholder="Ask me anything about your health..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={loading}
                className="flex-1"
              />
              <Button
                className="bg-accent hover:bg-accent/90 gap-2"
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || loading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Disclaimer: This AI assistant provides general health information and is not a substitute for professional
              medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
