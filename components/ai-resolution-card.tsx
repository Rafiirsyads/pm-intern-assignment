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
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 p-4 border-b">
        <Sparkles className="size-5 text-blue-500" />
        <h3 className="font-semibold">AI Resolution Card</h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Issue Summary */}
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Issue Summary</p>
          <p className="text-sm">{resolution.issueSummary}</p>
        </div>

        {/* Intent & Confidence */}
        <div className="flex gap-3">
          <div className="flex-1 bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Detected Intent</p>
            <p className="text-sm font-medium">{resolution.detectedIntent}</p>
          </div>
          <div className="bg-emerald-500 text-white rounded-lg p-3 min-w-[100px]">
            <p className="text-xs opacity-90 mb-1">AI Confidence</p>
            <p className="text-sm font-semibold">{resolution.confidence}% Confident</p>
          </div>
        </div>

        {/* Policy Match */}
        <div className="border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <span className="text-sm font-medium">Refund Policy Match</span>
          </div>
          <p className="text-sm mb-2">
            Customer is <span className="text-emerald-600 font-medium">eligible for full refund</span>
          </p>
          <div className="space-y-1">
            {resolution.policyMatch.reasons.map((reason, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-emerald-600">
                <CheckCircle2 className="size-3.5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Action */}
        <div className="bg-emerald-500 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="size-4" />
            <span className="text-sm font-semibold">Recommended Action</span>
          </div>
          <p className="text-sm mb-2">{resolution.recommendedAction}</p>
          <p className="text-xs opacity-80">
            Based on {resolution.similarCases} similar cases • {resolution.satisfactionRate}% satisfaction rate
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
            onClick={handleApproveRefund}
          >
            <Check className="size-4" />
            Approve Refund
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="text-sm">
              Ask for More Evidence
            </Button>
            <Button variant="outline" className="text-sm">
              Escalate
            </Button>
          </div>
          <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">
            Reject with Explanation
          </Button>
        </div>

        {/* Evidence Section */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setShowEvidence(!showEvidence)}
            className="w-full flex items-center justify-between p-3 hover:bg-slate-50 transition-colors"
          >
            <span className="text-sm font-medium">Why? / View Evidence</span>
            {showEvidence ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>

          {showEvidence && (
            <div className="border-t p-3 space-y-4">
              {/* Applied Policy */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Applied Policy</p>
                <div className="flex items-start gap-2">
                  <ExternalLink className="size-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{resolution.appliedPolicy.name}</p>
                    <p className="text-xs text-muted-foreground">{resolution.appliedPolicy.description}</p>
                  </div>
                </div>
              </div>

              {/* Photo Evidence */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Photo Evidence</p>
                <div className="flex gap-2">
                  <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
                    <div className="w-10 h-12 bg-emerald-600 rounded-sm" />
                  </div>
                  <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-8 bg-slate-400 rounded-sm" />
                  </div>
                </div>
              </div>

              {/* Timeline Verification */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Timeline Verification</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery:</span>
                    <span>{resolution.timeline.delivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Report:</span>
                    <span>{resolution.timeline.report}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={cn(
                      "flex items-center gap-1",
                      resolution.timeline.withinWindow ? "text-emerald-600" : "text-red-500"
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
