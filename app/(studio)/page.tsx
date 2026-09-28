import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Route,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { USE_CASES } from '@/lib/copilot/use-cases'

const DEMO_INDICATORS: { label: string; value: string; detail: string; icon: LucideIcon }[] = [
  { label: 'Sessions programmées', value: '42', detail: 'Trimestre en cours', icon: CalendarDays },
  { label: 'Agents inscrits', value: '618', detail: '+12 % vs trimestre précédent', icon: Users },
  { label: 'Satisfaction moyenne', value: '4,3 / 5', detail: 'Sur 27 sessions évaluées', icon: BarChart3 },
  { label: 'Parcours blended', value: '9', detail: 'Dont 3 en conception', icon: Route },
]

const DEMO_ACTIVITY = [
  { title: 'Accueil des usagers – session Nord', status: 'En cours', date: '2 oct.' },
  { title: 'Préparation concours rédacteur territorial', status: 'Inscriptions', date: '14 oct.' },
  { title: 'Marchés publics – niveau 2', status: 'CCTP à valider', date: '21 oct.' },
  { title: 'Management de proximité (parcours hybride)', status: 'Conception', date: '4 nov.' },
]

export default function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-8 sm:py-10">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Tableau de bord</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">Bonjour, bienvenue dans IFAP Studio</h1>
        <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Pilotez l&apos;offre de formation, préparez vos dispositifs et appuyez-vous sur IFAP Copilot pour gagner du temps.
        </p>
      </header>

      <section
        aria-labelledby="copilot-cta"
        className="relative flex flex-col gap-5 overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground sm:flex-row sm:items-center sm:p-8"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-copilot text-copilot-foreground">
          <Bot className="size-6" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <h2 id="copilot-cta" className="text-xl font-semibold tracking-tight">
            IFAP Copilot
          </h2>
          <p className="mt-1 max-w-xl text-pretty text-sm leading-relaxed text-primary-foreground/80">
            Votre assistant intelligent pour concevoir, analyser et piloter la formation : objectifs pédagogiques, CCTP,
            parcours blended, analyse des évaluations.
          </p>
        </div>
        <Button
          variant="secondary"
          size="lg"
          nativeButton={false}
          render={<Link href="/copilot" />}
          className="self-start sm:self-center"
        >
          Ouvrir Copilot
          <ArrowRight data-icon="inline-end" />
        </Button>
      </section>

      <section aria-labelledby="indicators" className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h2 id="indicators" className="text-base font-semibold tracking-tight">
            Indicateurs
          </h2>
          <span className="rounded bg-demo px-1.5 py-0.5 text-[10px] font-medium text-demo-foreground">
            Données de démonstration
          </span>
        </div>
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {DEMO_INDICATORS.map((indicator) => (
            <li key={indicator.label} className="flex flex-col gap-3 rounded-xl border bg-card p-4">
              <indicator.icon className="size-4 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="text-2xl font-semibold tracking-tight">{indicator.value}</p>
                <p className="mt-1 text-sm font-medium">{indicator.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{indicator.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-8 lg:grid-cols-5">
        <section aria-labelledby="activity" className="flex flex-col gap-4 lg:col-span-3">
          <div className="flex items-center gap-2">
            <h2 id="activity" className="text-base font-semibold tracking-tight">
              Dispositifs à suivre
            </h2>
            <span className="rounded bg-demo px-1.5 py-0.5 text-[10px] font-medium text-demo-foreground">Démo</span>
          </div>
          <ul className="divide-y rounded-xl border bg-card">
            {DEMO_ACTIVITY.map((item) => (
              <li key={item.title} className="flex items-center gap-3 px-4 py-3.5">
                <GraduationCap className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <span className="shrink-0 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="shortcuts" className="flex flex-col gap-4 lg:col-span-2">
          <h2 id="shortcuts" className="text-base font-semibold tracking-tight">
            Démarrer avec Copilot
          </h2>
          <ul className="flex flex-col gap-2">
            {USE_CASES.slice(0, 4).map((useCase) => (
              <li key={useCase.id}>
                <Link
                  href="/copilot"
                  className="group flex items-center gap-3 rounded-xl border bg-card px-4 py-3 outline-none transition-colors hover:border-copilot/40 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <ClipboardList className="size-4 shrink-0 text-copilot" aria-hidden="true" />
                  <span className="flex-1 text-sm font-medium">{useCase.title}</span>
                  <ArrowRight
                    className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
