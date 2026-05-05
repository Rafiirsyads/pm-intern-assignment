"use client"

import { useState, use } from "react"
import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageBubble } from "@/components/message-bubble"
import { ReplyComposer } from "@/components/reply-composer"
import { CustomerDetails } from "@/components/customer-details"
import { AIResolutionCard } from "@/components/ai-resolution-card"
import { PreSendIntelligence } from "@/components/pre-send-intelligence"
import { getTicketById, type Message, formatCurrency } from "@/lib/data"
import { notFound } from "next/navigation"

const categoryColors: Record<string, string> = {
  refund: "bg-orange-500 text-white border-orange-500",
  payment: "bg-blue-500 text-white border-blue-500",
  delivery: "bg-amber-500 text-white border-amber-500",
  general: "bg-gray-500 text-white border-gray-500",
}

interface TicketDetailPageProps {
  params: Promise<{ id: string }>
}

export default function TicketDetailPage({ params }: TicketDetailPageProps) {
  const { id } = use(params)
  const ticket = getTicketById(id)
  
  if (!ticket) {
    notFound()
  }

  const [messages, setMessages] = useState<Message[]>(ticket.messages)
  const [draftMessage, setDraftMessage] = useState("")
  const [showPreSend, setShowPreSend] = useState(false)
  const [showAICard, setShowAICard] = useState(true)

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
      isCustomer: false,
    }
    setMessages([...messages, newMessage])
    setDraftMessage("")
    setShowPreSend(false)
  }

  const handleTrySend = (content: string): boolean => {
    // Check if the message has timeline info
    const hasTimeline = content.includes("3-5 business days")
    
    if (!hasTimeline && content.trim()) {
      // Show pre-send intelligence with issues
      setShowPreSend(true)
      return false // Don't send yet
    }
    
    // All good, can send
    return true
  }

  const handleApplyDraft = (draft: string) => {
    setDraftMessage(draft)
    setShowPreSend(false) // Hide pre-send when applying draft from AI card
  }

  const handleApplySuggestion = () => {
    // Add the timeline information to the message with bold formatting
    const updatedMessage = draftMessage.replace(
      "I'm sorry to hear about the damaged product. I've reviewed your photos and can confirm that we'll process a full refund to your original payment method.",
      `I'm sorry to hear about the damaged product. I've reviewed your photos and can confirm that we'll process a full refund to your original payment method. **Your refund will be processed within 3-5 business days and you'll receive an email confirmation once it's complete.**`
    )
    setDraftMessage(updatedMessage)
  }

  // Calculate Pre-Send data based on current draft
  const hasTimeline = draftMessage.includes("3-5 business days")
  const preSendData = {
    hasIssues: !hasTimeline,
    issuesCount: hasTimeline ? 0 : 1,
    issueMessage: "Your reply may be incomplete or could be improved before sending",
    missingInfo: !hasTimeline ? {
      title: "Missing Critical Information",
      description: `You haven't answered the customer's question about the refund timeline. Customer explicitly asked: "Can you also tell me how long the refund will take to process?"`,
      suggestion: "Add Refund Timeline (3-5 business days)",
    } : undefined,
    passedChecks: [
      `Refund amount matches order total (${formatCurrency(ticket.order.total)})`,
      "No policy violations detected",
      "Professional language maintained",
      ...(hasTimeline ? ["Timeline given"] : []),
    ],
  }

  return (
    <AppLayout>
      <div className="flex h-screen">
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <Link href="/tickets">
                  <Button variant="ghost" size="icon-sm" className="shrink-0">
                    <ArrowLeft className="size-5" />
                  </Button>
                </Link>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-lg font-semibold truncate">{ticket.title}</h1>
                    <Badge className={`${categoryColors[ticket.category]} shrink-0`}>
                      {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span className="font-mono">{ticket.id}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {ticket.createdAt}
                    </span>
                  </div>
                </div>
              </div>
              <Link href={`/tickets/${ticket.id}/summary`} className="shrink-0">
                <Button variant="outline" className="bg-card">Close Ticket</Button>
              </Link>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-6 bg-background">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  customerName={ticket.customer.name}
                />
              ))}
            </div>
          </div>

          {/* Composer */}
          <div className="p-6 bg-background border-t border-border">
            <div className="max-w-3xl mx-auto">
              <ReplyComposer
                onSend={handleSendMessage}
                onTrySend={handleTrySend}
                value={draftMessage}
                onChange={setDraftMessage}
              />
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-96 border-l border-border bg-secondary/30 overflow-auto">
          <div className="p-5 space-y-5">
            <CustomerDetails customer={ticket.customer} order={ticket.order} />
            
            {/* Pre-Send Intelligence - shows ABOVE AI Resolution Card when active */}
            {showPreSend && draftMessage && (
              <PreSendIntelligence 
                data={preSendData}
                onAddSuggestion={handleApplySuggestion}
                onClose={() => setShowPreSend(false)}
              />
            )}

            {/* AI Resolution Card */}
            {ticket.aiResolution && showAICard && (
              <AIResolutionCard 
                resolution={ticket.aiResolution} 
                orderTotal={ticket.order.total}
                onApplyDraft={handleApplyDraft}
              />
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
