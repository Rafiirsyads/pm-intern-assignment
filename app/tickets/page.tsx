import { Search, SlidersHorizontal } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { TicketCard } from "@/components/ticket-card"
import { Button } from "@/components/ui/button"
import { tickets, ticketStats } from "@/lib/data"

const statsCards = [
  { label: "All Tickets", value: ticketStats.all },
  { label: "High Priority", value: ticketStats.highPriority },
  { label: "In Progress Tickets", value: ticketStats.inProgress },
  { label: "Closed Tickets", value: ticketStats.closed },
]

export default function TicketsPage() {
  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Tickets</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsCards.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border p-5 shadow-sm"
            >
              <p className="text-sm text-muted-foreground mb-1 truncate">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tickets..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
            />
          </div>
          <Button variant="outline" className="gap-2 shadow-sm shrink-0">
            <SlidersHorizontal className="size-4" />
            Filters
          </Button>
        </div>

        <div className="space-y-4">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
