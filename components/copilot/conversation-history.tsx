'use client'

import { MessageSquare, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatRelativeDay } from '@/lib/copilot/format'
import type { Conversation } from '@/lib/copilot/types'
import { cn } from '@/lib/utils'

function HistoryGroup({
  label,
  conversations,
  activeId,
  onSelect,
  hint,
}: {
  label: string
  conversations: Conversation[]
  activeId: string | null
  onSelect: (id: string) => void
  hint?: string
}) {
  if (conversations.length === 0) return null
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-2 pb-1">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        {hint && <span className="rounded bg-demo px-1.5 py-0.5 text-[10px] font-medium text-demo-foreground">{hint}</span>}
      </div>
      <ul className="flex flex-col gap-0.5">
        {conversations.map((conversation) => {
          const active = conversation.id === activeId
          return (
            <li key={conversation.id}>
              <button
                type="button"
                onClick={() => onSelect(conversation.id)}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'flex w-full items-start gap-2.5 rounded-lg px-2 py-2 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50',
                  active && 'bg-muted',
                )}
              >
                <MessageSquare
                  className={cn('mt-0.5 size-4 shrink-0', active ? 'text-copilot' : 'text-muted-foreground')}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{conversation.title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {formatRelativeDay(conversation.updatedAt)} · {Math.ceil(conversation.messages.length / 2)} échange
                    {conversation.messages.length > 2 ? 's' : ''}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ConversationHistory({
  conversations,
  activeId,
  onSelect,
  onNew,
}: {
  conversations: Conversation[]
  activeId: string | null
  onSelect: (id: string) => void
  onNew: () => void
}) {
  const userConversations = conversations.filter((conversation) => !conversation.isDemo)
  const demoConversations = conversations.filter((conversation) => conversation.isDemo)

  return (
    <div className="flex h-full flex-col gap-5">
      <Button onClick={onNew} variant="outline" className="w-full justify-start">
        <Plus data-icon="inline-start" />
        Nouvelle conversation
      </Button>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
        {userConversations.length === 0 ? (
          <div className="rounded-lg border border-dashed px-3 py-4 text-center">
            <p className="text-sm font-medium">Aucune conversation</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Vos échanges de cette session apparaîtront ici.
            </p>
          </div>
        ) : (
          <HistoryGroup label="Cette session" conversations={userConversations} activeId={activeId} onSelect={onSelect} />
        )}
        <HistoryGroup
          label="Exemples"
          hint="Démo"
          conversations={demoConversations}
          activeId={activeId}
          onSelect={onSelect}
        />
      </div>
    </div>
  )
}
