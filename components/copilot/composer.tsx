'use client'

import { ArrowUp, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MODES } from '@/lib/copilot/use-cases'
import type { AssistantMode } from '@/lib/copilot/types'
import { cn } from '@/lib/utils'

export function ModeSelector({ mode, onChange }: { mode: AssistantMode; onChange: (mode: AssistantMode) => void }) {
  return (
    <div role="radiogroup" aria-label="Mode de l'assistant" className="flex rounded-lg bg-muted p-0.5">
      {MODES.map((item) => {
        const active = item.id === mode
        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={active}
            title={item.description}
            onClick={() => onChange(item.id)}
            className={cn(
              'rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground outline-none transition-all hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50',
              active && 'bg-background text-foreground shadow-xs',
            )}
          >
            <span className="sm:hidden">{item.label.replace('Mode ', '')}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export function Composer({
  value,
  onChange,
  onSubmit,
  mode,
  onModeChange,
  disabled,
  textareaRef,
}: {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  mode: AssistantMode
  onModeChange: (mode: AssistantMode) => void
  disabled: boolean
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
}) {
  const canSubmit = value.trim().length > 0 && !disabled
  const activeMode = MODES.find((item) => item.id === mode)

  return (
    <div className="border-t bg-background/95 px-3 pb-3 pt-3 backdrop-blur sm:px-6 sm:pb-4">
      <form
        className="mx-auto flex w-full max-w-3xl flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault()
          if (canSubmit) onSubmit()
        }}
      >
        <div className="rounded-xl border bg-card shadow-xs transition-colors focus-within:border-copilot/50 focus-within:ring-3 focus-within:ring-copilot/15">
          <label htmlFor="copilot-input" className="sr-only">
            Votre question pour IFAP Copilot
          </label>
          <Textarea
            id="copilot-input"
            ref={textareaRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== 'Enter' || event.shiftKey) return
              if (event.nativeEvent.isComposing || event.keyCode === 229) return
              event.preventDefault()
              if (canSubmit) onSubmit()
            }}
            placeholder="Décrivez votre besoin, collez un texte ou posez une question…"
            maxLength={4000}
            rows={2}
            className="max-h-48 min-h-14 resize-none border-0 bg-transparent px-4 pt-3 text-[15px] shadow-none focus-visible:ring-0 dark:bg-transparent"
          />
          <div className="flex items-center justify-between gap-2 px-2 pb-2">
            <ModeSelector mode={mode} onChange={onModeChange} />
            <Button type="submit" size="icon" disabled={!canSubmit} aria-label="Envoyer" className="rounded-lg">
              <ArrowUp />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-1 px-1 text-[11px] leading-relaxed text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="hidden sm:inline">{activeMode?.description}</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />
            Les réponses de l&apos;IA doivent être vérifiées avant utilisation dans une décision ou un document officiel.
          </span>
        </div>
      </form>
    </div>
  )
}
