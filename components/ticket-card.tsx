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
  new: { label: "New", className: "border-green-500 text-green-600 bg-green-50" },
  "in-progress": { label: "In Progress", className: "border-orange-500 text-orange-600 bg-orange-50" },
  closed: { label: "Closed", className: "border-gray-400 text-gray-500 bg-gray-50" },
}

interface TicketCardProps {
  ticket: Ticket
}

export function TicketCard({ ticket }: TicketCardProps) {
  const status = statusConfig[ticket.status]

  return (
    <Link href={`/tickets/${ticket.id}`} className="block group">
      <div className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-border/80 transition-all cursor-pointer">
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <span className="text-sm text-muted-foreground font-mono">{ticket.id}</span>
              <Badge className={cn("capitalize text-xs font-medium", categoryColors[ticket.category])}>
                {ticket.category}
              </Badge>
              <Badge className={cn("capitalize text-xs font-medium", priorityColors[ticket.priority])}>
                {ticket.priority}
              </Badge>
            </div>
            <Badge variant="outline" className={cn("text-xs shrink-0", status.className)}>
              {status.label}
            </Badge>
          </div>

          <h3 className="font-semibold text-base text-foreground mb-1.5 line-clamp-1">{ticket.title}</h3>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="truncate max-w-[150px]">{ticket.customer.name}</span>
            <span className="shrink-0">·</span>
            <span className="flex items-center gap-1 shrink-0">
              <Clock className="size-3.5" />
              {ticket.createdAt}
            </span>
          </div>
        </div>

        <div className="border-t border-border bg-secondary/30 px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
            <Sparkles className="size-4 shrink-0 text-primary" />
            <span className="truncate">AI: {ticket.aiSuggestion}</span>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-primary shrink-0 group-hover:gap-2 transition-all">
            Open
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
