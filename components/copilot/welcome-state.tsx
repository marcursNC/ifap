'use client'

import {
  ArrowUpRight,
  ClipboardList,
  FileSearch,
  FileText,
  GraduationCap,
  Route,
  BarChart3,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { SUGGESTIONS, USE_CASES, type UseCase } from '@/lib/copilot/use-cases'

const ICONS: Record<UseCase['id'], LucideIcon> = {
  concevoir: GraduationCap,
  besoin: FileSearch,
  cahier: ClipboardList,
  evaluations: BarChart3,
  parcours: Route,
  synthese: FileText,
}

export function WelcomeState({
  onPickUseCase,
  onPickSuggestion,
}: {
  onPickUseCase: (useCase: UseCase) => void
  onPickSuggestion: (label: string, useCaseId: UseCase['id']) => void
}) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12 animate-in fade-in duration-500">
      <header className="flex flex-col gap-4">
        <span className="flex size-11 items-center justify-center rounded-xl bg-copilot text-copilot-foreground">
          <Sparkles className="size-5" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">IFAP Copilot</h1>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Votre assistant intelligent pour concevoir, analyser et piloter la formation.
          </p>
        </div>
        <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
          Dans cette version, les réponses s&apos;appuient sur le contexte institutionnel de l&apos;IFAP et une bibliothèque de
          démonstration. Elles pourront ultérieurement être fondées sur les données et documents internes de l&apos;IFAP, une
          fois les sources connectées.
        </p>
      </header>

      <section aria-labelledby="use-cases-title" className="flex flex-col gap-4">
        <h2 id="use-cases-title" className="text-sm font-semibold tracking-tight">
          Que souhaitez-vous faire ?
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((useCase) => {
            const Icon = ICONS[useCase.id]
            return (
              <li key={useCase.id}>
                <button
                  type="button"
                  onClick={() => onPickUseCase(useCase)}
                  className="group flex h-full w-full flex-col gap-3 rounded-xl border bg-card p-4 text-left outline-none transition-all hover:-translate-y-0.5 hover:border-copilot/40 hover:shadow-sm focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-copilot-soft text-copilot">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold">{useCase.title}</span>
                    <span className="text-pretty text-sm leading-relaxed text-muted-foreground">{useCase.description}</span>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section aria-labelledby="suggestions-title" className="flex flex-col gap-3">
        <h2 id="suggestions-title" className="text-sm font-semibold tracking-tight">
          Suggestions
        </h2>
        <ul className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <li key={suggestion.label}>
              <button
                type="button"
                onClick={() => onPickSuggestion(suggestion.label, suggestion.useCaseId)}
                className="rounded-full border bg-background px-3.5 py-1.5 text-sm text-foreground/85 outline-none transition-colors hover:border-copilot/40 hover:bg-copilot-soft hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {suggestion.label}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
