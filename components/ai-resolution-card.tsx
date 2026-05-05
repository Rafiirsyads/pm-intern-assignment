"use client"

import { useState } from "react"
import { 
  Sparkles, 
  CheckCircle2, 
  ChevronUp, 
  ChevronDown,
  ExternalLink,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { AIResolution } from "@/lib/data"
import { formatCurrency } from "@/lib/data"

interface AIResolutionCardProps {
  resolution: AIResolution
  orderTotal: number
  onApplyDraft: (draft: string) => void
}

export function AIResolutionCard({ resolution, orderTotal, onApplyDraft }: AIResolutionCardProps) {
  const [showEvidence, setShowEvidence] = useState(true)

  const handleApproveRefund = () => {
    // Draft WITHOUT timeline - user needs to add it via Pre-Send Intelligence
    const draft = `Hi John,

I'm sorry to hear about the damaged product. I've reviewed your photos and can confirm that we'll process a full refund to your original payment method.

Again, I sincerely apologize for this experience. If there's anything else I can help with, please don't hesitate to reach out.

Best regards,
Customer Support Team`
    onApplyDraft(draft)
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 p-4 border-b border-border bg-primary/5">
        <Sparkles className="size-5 text-primary" />
        <h3 className="font-semibold text-sm">AI Resolution Card</h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Issue Summary */}
        <div className="bg-secondary/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1 font-medium">Issue Summary</p>
          <p className="text-sm leading-relaxed">{resolution.issueSummary}</p>
        </div>

        {/* Intent & Confidence */}
        <div className="flex gap-3">
          <div className="flex-1 bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1 font-medium">Detected Intent</p>
            <p className="text-sm font-medium text-foreground">{resolution.detectedIntent}</p>
          </div>
          <div className="bg-emerald-500 text-white rounded-lg p-3 min-w-[110px] flex flex-col justify-center">
            <p className="text-xs opacity-90 mb-0.5">AI Confidence</p>
            <p className="text-2xl font-bold leading-none">{resolution.confidence}%</p>
            <p className="text-xs opacity-80 mt-0.5">Very High</p>
          </div>
        </div>

        {/* Policy Match */}
        <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-800">Refund Policy Match</span>
          </div>
          <p className="text-sm mb-2 text-emerald-700">
            Customer is <span className="font-semibold">eligible for full refund</span>
          </p>
          <div className="space-y-1.5">
            {resolution.policyMatch.reasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-emerald-700">
                <CheckCircle2 className="size-3.5 mt-0.5 shrink-0 text-emerald-500" />
                <span className="leading-tight">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Action */}
        <div className="bg-emerald-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="size-4" />
            <span className="text-sm font-semibold">Recommended Action</span>
          </div>
          <p className="text-sm mb-2 leading-relaxed">{resolution.recommendedAction}</p>
          <p className="text-xs opacity-75">
            Based on {resolution.similarCases} similar cases · {resolution.satisfactionRate}% satisfaction rate
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2 font-semibold shadow-sm"
            onClick={handleApproveRefund}
          >
            <Check className="size-4" />
            Approve Refund
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="text-sm bg-card text-amber-600 border-amber-300 hover:bg-amber-50">
              More Evidence
            </Button>
            <Button variant="outline" className="text-sm bg-card text-orange-600 border-orange-300 hover:bg-orange-50">
              Escalate
            </Button>
          </div>
          <Button variant="outline" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 bg-card">
            Reject with Explanation
          </Button>
        </div>

        {/* Evidence Section */}
        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setShowEvidence(!showEvidence)}
            className="w-full flex items-center justify-between p-3 hover:bg-secondary/50 transition-colors"
          >
            <span className="text-sm font-medium">Why? / View Evidence</span>
            {showEvidence ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
          </button>

          {showEvidence && (
            <div className="border-t border-border p-3 space-y-4 bg-secondary/30">
              {/* Applied Policy */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium">Applied Policy</p>
                <div className="flex items-start gap-2">
                  <ExternalLink className="size-4 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{resolution.appliedPolicy.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{resolution.appliedPolicy.description}</p>
                  </div>
                </div>
              </div>

              {/* Photo Evidence */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium">Photo Evidence</p>
                <div className="flex gap-2">
                  <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center border border-border">
                    <div className="w-8 h-10 bg-primary rounded-sm" />
                  </div>
                  <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center border border-border">
                    <div className="w-10 h-6 bg-muted-foreground/30 rounded-sm" />
                  </div>
                </div>
              </div>

              {/* Timeline Verification */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium">Timeline Verification</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery:</span>
                    <span className="font-medium">{resolution.timeline.delivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Report:</span>
                    <span className="font-medium">{resolution.timeline.report}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={cn(
                      "flex items-center gap-1 font-medium",
                      resolution.timeline.withinWindow ? "text-emerald-600" : "text-destructive"
                    )}>
                      Within 72h window
                      {resolution.timeline.withinWindow && <Check className="size-3" />}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
