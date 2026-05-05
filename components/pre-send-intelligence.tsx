"use client"

import { Sparkles, X, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PreSendIntelligenceData {
  hasIssues: boolean
  issuesCount: number
  issueMessage?: string
  missingInfo?: {
    title: string
    description: string
    suggestion: string
  }
  passedChecks: string[]
}

interface PreSendIntelligenceProps {
  data: PreSendIntelligenceData
  onAddSuggestion: (suggestion: string) => void
  onClose: () => void
}

export function PreSendIntelligence({ data, onAddSuggestion, onClose }: PreSendIntelligenceProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-border bg-amber-50">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-amber-600" />
          <h3 className="font-semibold text-sm text-amber-900">Pre-Send Intelligence</h3>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={onClose} className="text-amber-600 hover:text-amber-700 hover:bg-amber-100">
          <X className="size-4" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {data.hasIssues ? (
          <>
            {/* Issues Detected */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-destructive mb-1">
                <AlertTriangle className="size-4" />
                <span className="text-sm font-medium">{data.issuesCount} Issue Detected</span>
              </div>
              <p className="text-sm text-destructive/90">{data.issueMessage}</p>
            </div>

            {/* Missing Info */}
            {data.missingInfo && (
              <div className="border border-destructive/20 rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="size-4 text-destructive mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{data.missingInfo.title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {data.missingInfo.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-2 text-destructive border-destructive/30 hover:bg-destructive/10 text-sm"
                  onClick={() => onAddSuggestion(data.missingInfo!.suggestion)}
                >
                  {data.missingInfo.suggestion}
                </Button>
              </div>
            )}

            {/* Passed Checks */}
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">Passed Checks</span>
              </div>
              <div className="space-y-2">
                {data.passedChecks.map((check, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-emerald-700">
                    <CheckCircle2 className="size-3.5 mt-0.5 shrink-0 text-emerald-500" />
                    <span className="leading-tight">{check}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              className="w-full bg-foreground hover:bg-foreground/90 text-background gap-2"
              onClick={() => {
                if (data.missingInfo) {
                  onAddSuggestion(data.missingInfo.suggestion)
                }
              }}
            >
              <Sparkles className="size-4" />
              Apply All Suggestions
            </Button>
          </>
        ) : (
          /* Reply Looks Great - all checks passed */
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-emerald-700 mb-3">
              <CheckCircle2 className="size-5 text-emerald-500" />
              <span className="font-semibold text-emerald-800">Reply Looks Great!</span>
            </div>
            <div className="space-y-2">
              {data.passedChecks.map((check, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-emerald-700">
                  <CheckCircle2 className="size-3.5 mt-0.5 shrink-0 text-emerald-500" />
                  <span className="leading-tight">{check}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
