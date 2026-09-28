'use client'

import { useState } from 'react'
import { ExternalLink, FileText, Library } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { formatDate } from '@/lib/copilot/format'
import type { SourceDocument } from '@/lib/copilot/types'

export function DemoBadge({ className }: { className?: string }) {
  return (
    <Badge variant="outline" className={`border-demo-foreground/20 bg-demo text-demo-foreground ${className ?? ''}`}>
      Démonstration
    </Badge>
  )
}

export function SourceList({ sources }: { sources: SourceDocument[] }) {
  const [openSource, setOpenSource] = useState<SourceDocument | null>(null)

  return (
    <section aria-label="Sources utilisées" className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Library className="size-4 text-muted-foreground" aria-hidden="true" />
        <h3 className="text-sm font-semibold tracking-tight">Sources utilisées</h3>
        <span className="text-xs text-muted-foreground">({sources.length})</span>
      </div>

      {sources.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
          Aucune source documentaire connectée n&apos;a été mobilisée pour cette réponse.
        </p>
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {sources.map((source) => (
            <li
              key={source.id}
              className="flex items-start gap-3 rounded-lg border bg-card p-3 transition-colors hover:border-primary/25"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-[10px] font-semibold text-secondary-foreground">
                {source.format}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{source.title}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {source.type} · {formatDate(source.date)}
                </p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  {source.isDemo ? <DemoBadge /> : <span />}
                  <Button variant="ghost" size="xs" onClick={() => setOpenSource(source)}>
                    Consulter
                    <ExternalLink data-icon="inline-end" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={openSource !== null} onOpenChange={(open) => !open && setOpenSource(null)}>
        <DialogContent className="sm:max-w-lg">
          {openSource && (
            <>
              <DialogHeader>
                <div className="mb-1 flex items-center gap-2">
                  <FileText className="size-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground">
                    {openSource.type} · {openSource.format} · {formatDate(openSource.date)}
                  </span>
                </div>
                <DialogTitle>{openSource.title}</DialogTitle>
                <DialogDescription>
                  {openSource.isDemo
                    ? "Document fictif de la bibliothèque de démonstration. Il ne provient d'aucun système de l'IFAP."
                    : 'Document issu d’une source connectée.'}
                </DialogDescription>
              </DialogHeader>
              <blockquote className="rounded-lg border-l-2 border-copilot bg-muted/50 px-4 py-3 text-sm leading-relaxed">
                {openSource.excerpt}
              </blockquote>
              {openSource.isDemo && <DemoBadge className="self-start" />}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
