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
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-blue-500" />
          <h3 className="font-semibold">Pre-Send Intelligence</h3>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={onClose}>
          <X className="size-4" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {data.hasIssues ? (
          <>
            {/* Issues Detected */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-600 mb-1">
                <AlertTriangle className="size-4" />
                <span className="text-sm font-medium">{data.issuesCount} Issues Detected</span>
              </div>
              <p className="text-sm text-red-600">{data.issueMessage}</p>
            </div>

            {/* Missing Info */}
            {data.missingInfo && (
              <div className="border border-red-200 rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="size-4 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{data.missingInfo.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {data.missingInfo.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-2 text-red-600 border-red-300 hover:bg-red-50"
                  onClick={() => onAddSuggestion(data.missingInfo!.suggestion)}
                >
                  {data.missingInfo.suggestion}
                </Button>
              </div>
            )}

            {/* Passed Checks */}
            <div className="border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span className="text-sm font-medium">Passed Checks</span>
              </div>
              <div className="space-y-2">
                {data.passedChecks.map((check, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-emerald-600">
                    <CheckCircle2 className="size-3.5" />
                    <span>{check}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              className="w-full bg-slate-900 hover:bg-slate-800 text-white gap-2"
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
            <div className="flex items-center gap-2 text-emerald-600 mb-3">
              <CheckCircle2 className="size-5" />
              <span className="font-semibold">Reply Looks Great!</span>
            </div>
            <div className="space-y-2">
              {data.passedChecks.map((check, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-emerald-600">
                  <CheckCircle2 className="size-3.5" />
                  <span>{check}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
