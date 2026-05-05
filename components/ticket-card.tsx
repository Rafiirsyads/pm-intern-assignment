import Link from "next/link"
import { Clock, ArrowRight, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Ticket } from "@/lib/data"

const categoryColors: Record<string, string> = {
  refund: "bg-orange-500 text-white border-orange-500",
  payment: "bg-blue-500 text-white border-blue-500",
  delivery: "bg-amber-500 text-white border-amber-500",
  general: "bg-gray-500 text-white border-gray-500",
}

const priorityColors: Record<string, string> = {
  high: "bg-red-500 text-white border-red-500",
  medium: "bg-yellow-500 text-white border-yellow-500",
  low: "bg-green-500 text-white border-green-500",
}

const statusConfig: Record<string, { label: string; className: string }> = {
  new: { label: "New", className: "border-green-500 text-green-600 bg-white" },
  "in-progress": { label: "In Progress", className: "border-orange-500 text-orange-600 bg-white" },
  closed: { label: "Closed", className: "border-gray-400 text-gray-500 bg-white" },
}

interface TicketCardProps {
  ticket: Ticket
}

export function TicketCard({ ticket }: TicketCardProps) {
  const status = statusConfig[ticket.status]

  return (
    <Link href={`/tickets/${ticket.id}`} className="block">
      <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">{ticket.id}</span>
              <Badge className={cn("capitalize text-xs", categoryColors[ticket.category])}>
                {ticket.category}
              </Badge>
              <Badge className={cn("capitalize text-xs", priorityColors[ticket.priority])}>
                {ticket.priority}
              </Badge>
            </div>
            <Badge variant="outline" className={cn("text-xs", status.className)}>
              {status.label}
            </Badge>
          </div>

          <h3 className="font-semibold text-lg text-foreground mb-1">{ticket.title}</h3>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{ticket.customer.name}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {ticket.createdAt}
            </span>
          </div>
        </div>

        <div className="border-t px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
            <Sparkles className="size-4 shrink-0" />
            <span className="truncate">AI: {ticket.aiSuggestion}</span>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-foreground shrink-0">
            Open
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
