"use client"

import { useState, useEffect } from "react"
import { Paperclip, Smile, ImageIcon, Type, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReplyComposerProps {
  onSend: (message: string) => void
  onTrySend?: (message: string) => boolean
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

// Parse text with **bold** markers for preview
function renderTextWithBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export function ReplyComposer({ 
  onSend, 
  onTrySend,
  placeholder = "Type a reply, or use the AI Resolution Card", 
  value = "",
  onChange
}: ReplyComposerProps) {
  const [internalMessage, setInternalMessage] = useState(value)
  const [isEditing, setIsEditing] = useState(true)
  
  useEffect(() => {
    setInternalMessage(value)
  }, [value])

  const message = value !== undefined && onChange ? value : internalMessage
  const setMessage = onChange || setInternalMessage

  const hasBoldText = message.includes("**")

  const handleSend = () => {
    if (message.trim()) {
      if (onTrySend) {
        const canSend = onTrySend(message)
        if (canSend) {
          onSend(message)
        }
      } else {
        onSend(message)
      }
    }
  }

  return (
    <div className="bg-white border rounded-xl p-4">
      {/* Show rich preview when there's bold text and not focused */}
      {hasBoldText && !isEditing ? (
        <div 
          className="w-full min-h-[120px] text-sm whitespace-pre-wrap cursor-text"
          onClick={() => setIsEditing(true)}
        >
          {renderTextWithBold(message)}
        </div>
      ) : (
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          placeholder={placeholder}
          className="w-full min-h-[120px] resize-none text-sm focus:outline-none"
        />
      )}
      <div className="flex items-center justify-between mt-3 pt-3 border-t">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
            <Paperclip className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
            <Smile className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
            <ImageIcon className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
            <Type className="size-4" />
          </Button>
        </div>
        <Button 
          onClick={handleSend}
          className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
        >
          Send
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  )
}
