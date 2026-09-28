'use client'

import { useEffect, useEffectEvent, useState } from 'react'
import { Bot, ChevronDown, Copy, FileOutput, RefreshCw, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { DELIVERABLE_KINDS } from '@/lib/copilot/deliverables'
import { countResponseCharacters, responseToMarkdown } from '@/lib/copilot/format'
import type { DeliverableKind, Message } from '@/lib/copilot/types'
import { MODES } from '@/lib/copilot/use-cases'
import { ResponseContent } from './response-content'
import { SourceList } from './source-list'

const CHARS_PER_TICK = 14
const TICK_MS = 16

function AssistantAvatar() {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-copilot text-copilot-foreground">
      <Bot className="size-4" aria-hidden="true" />
    </span>
  )
}

export function AssistantMessageSkeleton() {
  return (
    <div className="flex gap-3 animate-in fade-in duration-300" aria-live="polite">
      <AssistantAvatar />
      <div className="flex min-w-0 flex-1 flex-col gap-4 rounded-xl border bg-card p-5">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="size-2 animate-pulse rounded-full bg-copilot" aria-hidden="true" />
          Recherche dans les sources connectées et préparation de la réponse…
        </p>
        <Skeleton className="h-16 w-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      </div>
    </div>
  )
}

export function AssistantMessage({
  message,
  isLatest,
  disabled,
  onStreamComplete,
  onRegenerate,
  onDeepen,
  onDeliverable,
}: {
  message: Message
  isLatest: boolean
  disabled: boolean
  onStreamComplete: (messageId: string) => void
  onRegenerate: (message: Message) => void
  onDeepen: (message: Message) => void
  onDeliverable: (message: Message, kind: DeliverableKind) => void
}) {
  const response = message.response!
  const total = countResponseCharacters(response)
  const isStreaming = message.status === 'streaming'
  const [revealed, setRevealed] = useState(isStreaming ? 0 : total)

  const completeStream = useEffectEvent(() => onStreamComplete(message.id))

  useEffect(() => {
    if (!isStreaming) return
    const timer = setInterval(() => {
      setRevealed((current) => {
        const next = current + CHARS_PER_TICK
        if (next >= total) {
          clearInterval(timer)
          completeStream()
          return total
        }
        return next
      })
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [isStreaming, total])

  const modeLabel = MODES.find((mode) => mode.id === message.mode)?.label

  async function handleCopy() {
    await navigator.clipboard.writeText(responseToMarkdown(response))
    toast.success('Réponse copiée dans le presse-papiers')
  }

  const streamingDone = !isStreaming

  return (
    <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-1 duration-300">
      <AssistantAvatar />
      <article
        aria-label="Réponse d'IFAP Copilot"
        aria-busy={isStreaming}
        className="flex min-w-0 flex-1 flex-col gap-5 rounded-xl border bg-card p-4 shadow-xs sm:p-5"
      >
        <header className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">IFAP Copilot</span>
          {modeLabel && <span className="rounded-md bg-secondary px-1.5 py-0.5 font-medium text-secondary-foreground">{modeLabel}</span>}
          {(message.variant ?? 0) > 0 && <span>Version {(message.variant ?? 0) + 1}</span>}
          {isStreaming && (
            <span className="flex items-center gap-1.5 text-copilot">
              <span className="size-1.5 animate-pulse rounded-full bg-copilot" aria-hidden="true" />
              Rédaction en cours
            </span>
          )}
        </header>

        <ResponseContent response={response} revealLimit={isStreaming ? revealed : null} />

        {streamingDone && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-500">
            <SourceList sources={message.sources ?? []} />

            <div className="flex flex-wrap items-center gap-1.5 border-t pt-4" role="toolbar" aria-label="Actions sur la réponse">
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy data-icon="inline-start" />
                Copier
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onRegenerate(message)} disabled={disabled || !isLatest}>
                <RefreshCw data-icon="inline-start" />
                Regénérer
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDeepen(message)} disabled={disabled}>
                <Sparkles data-icon="inline-start" />
                Approfondir
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="ml-auto" />}>
                  <FileOutput data-icon="inline-start" />
                  Transformer en livrable
                  <ChevronDown data-icon="inline-end" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Choisir un format</DropdownMenuLabel>
                    {DELIVERABLE_KINDS.map((kind) => (
                      <DropdownMenuItem key={kind.id} onClick={() => onDeliverable(message, kind.id)}>
                        <div className="flex flex-col">
                          <span className="font-medium">{kind.label}</span>
                          <span className="text-xs text-muted-foreground">{kind.description}</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
