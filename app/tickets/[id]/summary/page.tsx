"use client"

import { use } from "react"
import Link from "next/link"
import { 
  ArrowLeft, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  AlertTriangle,
  Calendar
} from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTicketById, formatCurrency } from "@/lib/data"
import { notFound } from "next/navigation"

const categoryColors: Record<string, string> = {
  refund: "bg-orange-500 text-white border-orange-500",
  payment: "bg-blue-500 text-white border-blue-500",
  delivery: "bg-amber-500 text-white border-amber-500",
  general: "bg-gray-500 text-white border-gray-500",
}

interface SummaryPageProps {
  params: Promise<{ id: string }>
}

export default function SummaryPage({ params }: SummaryPageProps) {
  const { id } = use(params)
  const ticket = getTicketById(id)
  
  if (!ticket) {
    notFound()
  }

  const aiGeneratedNotes = [
    `Customer reported damaged product with photo evidence`,
    "Damage reported within policy window (22 hours post-delivery, well under 72hr limit)",
    `Full refund approved: ${formatCurrency(ticket.order.total)} to original payment method (Visa ending in 4532)`,
    "Refund timeline communicated: 3-5 business days",
    "Acknowledged emotional context: birthday gift for customer's mother this weekend",
    "Policy applied: Damaged Item Refund Policy v2.3, Section 2.1 (shipping damage)",
    "Handle time: 3m 47s (48% better than average)",
  ]

  return (
    <AppLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/tickets/${ticket.id}`}>
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold">{ticket.title}</h1>
              <Badge className={categoryColors[ticket.category]}>
                {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span>{ticket.id}</span>
              <span>·</span>
              <span>{ticket.customer.name}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {ticket.createdAt}
              </span>
            </div>
          </div>
        </div>

        {/* Issue Summary Card */}
        <div className="bg-white rounded-xl border p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="size-5" />
            <h2 className="text-lg font-semibold">Issue Summary</h2>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Customer Name</p>
              <p className="font-medium">Sarah Chen</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-1">Issue Type</p>
            <p className="font-medium">Damaged Item - Refund Request</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-1">Issue Description</p>
            <p className="text-sm text-foreground leading-relaxed">
              Customer received damaged product (Order #{ticket.id}) and requested a full refund with timeline information.
              Damage was reported with photo evidence within policy window.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Priority</p>
              <Badge className="bg-red-500 text-white border-red-500">HIGH</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Category</p>
              <p className="font-medium">Damaged Item</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Value</p>
              <p className="font-medium">{formatCurrency(ticket.order.total)}</p>
            </div>
          </div>
        </div>

        {/* Resolution Outcome Card */}
        <div className="bg-white rounded-xl border p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="size-5 text-emerald-500" />
            <h2 className="text-lg font-semibold">Resolution Outcome</h2>
          </div>

          <div className="bg-emerald-50 rounded-lg p-4 mb-4">
            <p className="text-emerald-700 font-semibold mb-3">Full Refund Approved</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-600">Refund Amount:</span>
                <span className="text-emerald-700 font-medium">{formatCurrency(ticket.order.total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-600">Refund Method:</span>
                <span className="text-emerald-700 font-medium">Original Payment Method</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-600">Processing Time:</span>
                <span className="text-emerald-700 font-medium">3-5 business days</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Resolution Method</p>
              <p className="font-medium">Instant Approval via AI Recommendation</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Policy Applied</p>
              <p className="font-medium">Damaged Item Refund Policy v2.3</p>
            </div>
          </div>
        </div>

        {/* Internal Notes Card */}
        <div className="bg-white rounded-xl border p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="size-5" />
            <h2 className="text-lg font-semibold">Internal Notes</h2>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-amber-700 mb-3">
              <Sparkles className="size-4" />
              <span className="text-sm font-semibold">AI-Generated Summary</span>
            </div>
            <ul className="space-y-2">
              {aiGeneratedNotes.map((note, index) => (
                <li key={index} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Add Additional Notes (Optional)</p>
            <textarea
              placeholder="Add any additional context, observations, or notes for your team..."
              className="w-full h-24 p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="text-xs text-muted-foreground mt-2">
              These notes will be visible to all agents who access this ticket in the future
            </p>
          </div>
        </div>

        {/* Finalize Case Card */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Finalize Case</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
              <CheckCircle2 className="size-4" />
              Close Case
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
              <AlertTriangle className="size-4" />
              Escalate to Supervisor
            </Button>
            <Button className="bg-slate-700 hover:bg-slate-800 text-white gap-2">
              <Calendar className="size-4" />
              Schedule Follow-Up
            </Button>
          </div>

          <div className="text-center">
            <Link 
              href={`/tickets/${ticket.id}`}
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <ArrowLeft className="size-3.5" />
              Back to Case Details
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
