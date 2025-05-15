"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, User, Phone, Video, ImageIcon, Smile, Paperclip, MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import InstallButton from "./install-button"

type Message = {
  id: number
  text: string
  sender: "user" | "other"
  timestamp: Date
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Привет! Как дела?", sender: "other", timestamp: new Date(Date.now() - 3600000) },
    {
      id: 2,
      text: "Привет! Все хорошо, спасибо! А у тебя?",
      sender: "user",
      timestamp: new Date(Date.now() - 3500000),
    },
    {
      id: 3,
      text: "Тоже отлично! Что планируешь на выходные?",
      sender: "other",
      timestamp: new Date(Date.now() - 3400000),
    },
    {
      id: 4,
      text: "Думаю сходить в кино, а потом встретиться с друзьями. Ты как?",
      sender: "user",
      timestamp: new Date(Date.now() - 3300000),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    const newMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMsg: Message = {
        id: messages.length + 2,
        text: getRandomReply(),
        sender: "other",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, replyMsg])
    }, 1000)
  }

  const getRandomReply = () => {
    const replies = [
      "Звучит отлично!",
      "Интересно, расскажи подробнее.",
      "Я согласен с тобой.",
      "Хорошая идея!",
      "Давай встретимся на выходных?",
      "Что ты думаешь об этом?",
      "Я тоже так считаю!",
      "Отличные новости!",
      "Это здорово!",
      "Я рад за тебя!",
    ]
    return replies[Math.floor(Math.random() * replies.length)]
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="w-full max-w-md mx-auto h-[100vh] flex flex-col bg-white rounded-lg shadow-lg overflow-hidden fixed inset-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-sky-500 text-white">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border-2 border-white">
            <AvatarFallback className="bg-sky-700">JH</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-bold">Chat PWA</h1>
            <p className="text-xs text-sky-100">Online</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-sky-600 rounded-full">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-sky-600 rounded-full">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-sky-600 rounded-full">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages - This is the scrollable area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50" style={{ overflowY: "auto" }}>
        {messages.map((message) => (
          <div key={message.id} className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            {message.sender === "other" && (
              <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                <AvatarFallback className="bg-sky-700">JH</AvatarFallback>
              </Avatar>
            )}
            <div>
              <div
                className={`rounded-2xl px-4 py-2 max-w-[80%] break-words ${
                  message.sender === "user"
                    ? "bg-sky-500 text-white rounded-tr-none"
                    : "bg-white text-gray-800 shadow-sm rounded-tl-none"
                }`}
              >
                {message.text}
              </div>
              <div className={`text-xs mt-1 text-gray-500 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
            {message.sender === "user" && (
              <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="bg-sky-500">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Fixed at the bottom */}
      <div className="p-3 bg-white border-t">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Button type="button" variant="ghost" size="icon" className="text-gray-500 hover:text-sky-500">
            <Smile className="h-5 w-5" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="text-gray-500 hover:text-sky-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="text-gray-500 hover:text-sky-500">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Введите сообщение..."
            className="flex-1 rounded-full"
          />
          <Button type="submit" size="icon" className="bg-sky-500 hover:bg-sky-600 rounded-full">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>

      {/* Footer */}
      <div className="p-2 bg-gray-50 border-t text-center text-xs text-gray-500 flex justify-between items-center">
        <span>Автор: Жабборов Хусанбой</span>
        <InstallButton />
      </div>
    </div>
  )
}
