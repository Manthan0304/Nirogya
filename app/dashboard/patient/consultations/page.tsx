"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Phone, Video } from "lucide-react"
import PatientSidebar from "@/components/patient/sidebar"

interface Message {
  id: number
  sender: "patient" | "doctor"
  text: string
  timestamp: string
  attachment?: string
}

export default function ConsultationsPage() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "doctor",
      text: "Hello! How are you feeling today?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: "patient",
      text: "I've been having some chest pain lately",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      sender: "doctor",
      text: "I see. Can you describe the pain? Is it sharp or dull?",
      timestamp: "10:33 AM",
    },
    {
      id: 4,
      sender: "patient",
      text: "It's more of a dull ache, especially when I exert myself",
      timestamp: "10:35 AM",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: messages.length + 1,
      sender: "patient",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const chats = [
    { id: 1, doctor: "Dr. Sharma", specialty: "Cardiologist", status: "Online" },
    { id: 2, doctor: "Dr. Patel", specialty: "General Physician", status: "Offline" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <PatientSidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-8 py-4">
            <h1 className="text-2xl font-bold">Consultations</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Chat List */}
          <div className="w-64 border-r border-border bg-background/50 overflow-y-auto">
            <div className="p-4 space-y-2">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedChat === chat.id
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-input border border-transparent"
                  }`}
                >
                  <p className="font-medium">{chat.doctor}</p>
                  <p className="text-xs text-muted-foreground">{chat.specialty}</p>
                  <p className={`text-xs mt-1 ${chat.status === "Online" ? "text-accent" : "text-muted-foreground"}`}>
                    {chat.status === "Online" ? "● Online" : "● Offline"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="border-b border-border bg-background/50 px-8 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Dr. Sharma</h2>
                <p className="text-sm text-muted-foreground">Cardiologist • Online</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Video className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "patient"
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-input text-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${msg.sender === "patient" ? "text-white/70" : "text-muted-foreground"}`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border bg-background/50 p-4">
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  className="bg-primary hover:bg-primary-dark gap-2"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
