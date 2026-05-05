import { Image } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Message } from "@/lib/data"

interface MessageBubbleProps {
  message: Message
  customerName: string
}

export function MessageBubble({ message, customerName }: MessageBubbleProps) {
  if (message.isCustomer) {
    return (
      <div className="flex gap-3">
        <Avatar className="size-9 shrink-0">
          <AvatarFallback className="bg-foreground text-background text-sm font-medium">
            {customerName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="bg-foreground text-background rounded-2xl rounded-tl-md p-4 max-w-xl">
            <p className="text-sm leading-relaxed">{message.content}</p>
            {message.attachments && message.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {message.attachments.map((attachment) => (
                  <div
                    key={attachment}
                    className="flex items-center gap-2 bg-background/10 rounded-lg px-3 py-2 text-sm"
                  >
                    <Image className="size-4" />
                    <span className="truncate max-w-[120px]">{attachment}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 ml-1">
            {message.timestamp}
          </p>
        </div>
      </div>
    )
  }

  // Parse text with **bold** markers
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  return (
    <div className="flex justify-end">
      <div className="max-w-xl">
        <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-md p-4 shadow-sm">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {renderTextWithBold(message.content)}
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 text-right mr-1">
          {message.timestamp}
        </p>
      </div>
    </div>
  )
}
