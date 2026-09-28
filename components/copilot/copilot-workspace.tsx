'use client'

import { useEffect, useRef, useState } from 'react'
import { History, PanelRight, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { ConnectorSummary } from '@/lib/copilot/adapters/connectors'
import type { CopilotResult } from '@/lib/copilot/adapters/types'
import { buildDeliverable, type Deliverable } from '@/lib/copilot/deliverables'
import type { AssistantMode, Conversation, DeliverableKind, Message, UseCaseId, WorkContext } from '@/lib/copilot/types'
import type { UseCase } from '@/lib/copilot/use-cases'
import { AssistantMessage, AssistantMessageSkeleton } from './assistant-message'
import { Composer } from './composer'
import { ContextPanel } from './context-panel'
import { ConversationHistory } from './conversation-history'
import { DeliverableDialog } from './deliverable-dialog'
import { DemoBadge } from './source-list'
import { UserMessage } from './user-message'
import { WelcomeState } from './welcome-state'

function titleFromPrompt(prompt: string) {
  const clean = prompt.replace(/\s+/g, ' ').trim()
  return clean.length > 48 ? `${clean.slice(0, 46)}…` : clean
}

async function requestAnswer(payload: {
  prompt: string
  mode: AssistantMode
  useCaseId?: UseCaseId
  variant?: number
}): Promise<CopilotResult> {
  const res = await fetch('/api/copilot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(data?.error ?? 'Le service est momentanément indisponible.')
  }
  return res.json()
}

export function CopilotWorkspace({
  initialConversations,
  context,
  connectors,
}: {
  initialConversations: Conversation[]
  context: WorkContext
  connectors: ConnectorSummary[]
}) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [pinnedUseCase, setPinnedUseCase] = useState<{ id: UseCaseId; prompt: string } | null>(null)
  const [mode, setMode] = useState<AssistantMode>('expert')
  const [pending, setPending] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [contextOpen, setContextOpen] = useState(false)
  const [deliverable, setDeliverable] = useState<Deliverable | null>(null)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const active = conversations.find((conversation) => conversation.id === activeId) ?? null
  const messages = active?.messages ?? []
  const isStreaming = messages.some((message) => message.status === 'streaming')
  const busy = pending || isStreaming

  useEffect(() => {
    const node = scrollRef.current
    if (node) node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' })
  }, [messages.length, pending])

  function updateConversation(id: string, update: (conversation: Conversation) => Conversation) {
    setConversations((current) => current.map((conversation) => (conversation.id === id ? update(conversation) : conversation)))
  }

  async function ask({
    prompt,
    useCaseId,
    askMode = mode,
    variant = 0,
    replaceMessageId,
  }: {
    prompt: string
    useCaseId?: UseCaseId
    askMode?: AssistantMode
    variant?: number
    replaceMessageId?: string
  }) {
    const now = new Date().toISOString()
    let conversationId = active?.id

    if (!conversationId) {
      conversationId = crypto.randomUUID()
      const created: Conversation = { id: conversationId, title: titleFromPrompt(prompt), updatedAt: now, isDemo: false, messages: [] }
      setConversations((current) => [created, ...current])
      setActiveId(conversationId)
    }

    const targetId = conversationId
    updateConversation(targetId, (conversation) => ({
      ...conversation,
      updatedAt: now,
      messages: replaceMessageId
        ? conversation.messages.filter((message) => message.id !== replaceMessageId)
        : [...conversation.messages, { id: crypto.randomUUID(), role: 'user', content: prompt, createdAt: now }],
    }))

    setPending(true)
    try {
      const result = await requestAnswer({ prompt, mode: askMode, useCaseId, variant })
      const answer: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        createdAt: new Date().toISOString(),
        mode: askMode,
        prompt,
        useCaseId: result.useCaseId,
        variant,
        status: 'streaming',
        response: result.response,
        sources: result.sources,
      }
      updateConversation(targetId, (conversation) => ({ ...conversation, messages: [...conversation.messages, answer] }))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue.')
    } finally {
      setPending(false)
    }
  }

  function handleSubmit() {
    const prompt = input.trim()
    if (!prompt || busy) return
    const useCaseId = pinnedUseCase && pinnedUseCase.prompt === input ? pinnedUseCase.id : undefined
    setInput('')
    setPinnedUseCase(null)
    ask({ prompt, useCaseId })
  }

  function prefill(prompt: string, useCaseId: UseCaseId) {
    setInput(prompt)
    setPinnedUseCase({ id: useCaseId, prompt })
    requestAnimationFrame(() => {
      const node = textareaRef.current
      if (!node) return
      node.focus()
      node.setSelectionRange(node.value.length, node.value.length)
    })
  }

  function handlePickUseCase(useCase: UseCase) {
    prefill(useCase.prompt, useCase.id)
    if (useCase.id === 'cahier' || useCase.id === 'parcours') setMode('conception')
  }

  function handleNewConversation() {
    setActiveId(null)
    setInput('')
    setPinnedUseCase(null)
    setHistoryOpen(false)
  }

  function handleSelectConversation(id: string) {
    if (busy) return
    setActiveId(id)
    setHistoryOpen(false)
  }

  function handleStreamComplete(messageId: string) {
    if (!activeId) return
    updateConversation(activeId, (conversation) => ({
      ...conversation,
      messages: conversation.messages.map((message) => (message.id === messageId ? { ...message, status: 'done' } : message)),
    }))
  }

  function handleRegenerate(message: Message) {
    ask({
      prompt: message.prompt!,
      useCaseId: message.useCaseId,
      askMode: message.mode,
      variant: (message.variant ?? 0) + 1,
      replaceMessageId: message.id,
    })
  }

  function handleDeepen(message: Message) {
    ask({
      prompt: `Approfondis ta réponse précédente avec la méthodologie et les justifications : ${message.prompt}`,
      useCaseId: message.useCaseId,
      askMode: 'expert',
      variant: (message.variant ?? 0) + 1,
    })
  }

  function handleDeliverable(message: Message, kind: DeliverableKind) {
    setDeliverable(buildDeliverable(kind, message, active?.title ?? 'Conversation'))
  }

  const lastAssistantId = [...messages].reverse().find((message) => message.role === 'assistant')?.id

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] min-h-0 lg:h-dvh">
      <aside aria-label="Historique des conversations" className="hidden w-72 shrink-0 flex-col border-r bg-muted/20 p-4 lg:flex">
        <ConversationHistory
          conversations={conversations}
          activeId={activeId}
          onSelect={handleSelectConversation}
          onNew={handleNewConversation}
        />
      </aside>

      <section aria-label="Conversation" className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 shrink-0 items-center gap-2 border-b px-3 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Historique des conversations"
            onClick={() => setHistoryOpen(true)}
          >
            <History />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{active ? active.title : 'IFAP Copilot'}</p>
            <p className="hidden truncate text-xs text-muted-foreground sm:block">
              {active ? 'Conversation' : 'Assistant métier pour les professionnels de la formation'}
            </p>
          </div>
          {active?.isDemo && <DemoBadge className="hidden sm:inline-flex" />}
          <Button variant="ghost" size="sm" onClick={handleNewConversation} disabled={busy} aria-label="Nouvelle conversation">
            <Plus data-icon="inline-start" />
            <span className="hidden sm:inline">Nouvelle</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            aria-label="Contexte de travail"
            onClick={() => setContextOpen(true)}
          >
            <PanelRight />
          </Button>
        </div>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
          {!active ? (
            <WelcomeState onPickUseCase={handlePickUseCase} onPickSuggestion={(label, id) => prefill(label, id)} />
          ) : (
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-3 py-6 sm:px-6 sm:py-8">
              {active.isDemo && (
                <p className="rounded-lg border border-demo-foreground/15 bg-demo px-4 py-2.5 text-xs leading-relaxed text-demo-foreground">
                  Conversation de démonstration : contenus et documents fictifs, sans lien avec des données réelles de l&apos;IFAP.
                </p>
              )}
              {messages.map((message) =>
                message.role === 'user' ? (
                  <UserMessage key={message.id} content={message.content ?? ''} />
                ) : (
                  <AssistantMessage
                    key={message.id}
                    message={message}
                    isLatest={message.id === lastAssistantId}
                    disabled={busy}
                    onStreamComplete={handleStreamComplete}
                    onRegenerate={handleRegenerate}
                    onDeepen={handleDeepen}
                    onDeliverable={handleDeliverable}
                  />
                ),
              )}
              {pending && <AssistantMessageSkeleton />}
            </div>
          )}
        </div>

        <Composer
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          mode={mode}
          onModeChange={setMode}
          disabled={busy}
          textareaRef={textareaRef}
        />
      </section>

      <aside aria-label="Contexte de travail" className="hidden w-80 shrink-0 overflow-y-auto border-l p-5 xl:block">
        <h2 className="mb-5 text-base font-semibold tracking-tight">Contexte de travail</h2>
        <ContextPanel context={context} connectors={connectors} />
      </aside>

      <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
        <SheetContent side="left" className="w-80 p-4">
          <SheetHeader className="p-0 pr-8">
            <SheetTitle>Conversations</SheetTitle>
            <SheetDescription className="sr-only">Historique des conversations IFAP Copilot</SheetDescription>
          </SheetHeader>
          <ConversationHistory
            conversations={conversations}
            activeId={activeId}
            onSelect={handleSelectConversation}
            onNew={handleNewConversation}
          />
        </SheetContent>
      </Sheet>

      <Sheet open={contextOpen} onOpenChange={setContextOpen}>
        <SheetContent side="bottom" className="max-h-[85dvh] overflow-y-auto rounded-t-2xl p-5">
          <SheetHeader className="p-0 pr-8">
            <SheetTitle>Contexte de travail</SheetTitle>
            <SheetDescription>Contexte institutionnel et état des sources de données.</SheetDescription>
          </SheetHeader>
          <ContextPanel context={context} connectors={connectors} />
        </SheetContent>
      </Sheet>

      <DeliverableDialog deliverable={deliverable} onOpenChange={(open) => !open && setDeliverable(null)} />
    </div>
  )
}
