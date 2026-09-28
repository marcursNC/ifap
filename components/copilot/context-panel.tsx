import { Building2, CircleCheck, CircleDashed, Database, Lock } from 'lucide-react'
import type { ConnectorSummary } from '@/lib/copilot/adapters/connectors'
import type { WorkContext } from '@/lib/copilot/types'

export function ContextPanel({ context, connectors }: { context: WorkContext; connectors: ConnectorSummary[] }) {
  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="context-org" className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Building2 className="size-4 text-muted-foreground" aria-hidden="true" />
          <h3 id="context-org" className="text-sm font-semibold tracking-tight">
            Contexte institutionnel
          </h3>
        </div>
        <div className="rounded-lg border bg-card p-3.5">
          <p className="text-xs text-muted-foreground">Organisation</p>
          <p className="mt-0.5 text-pretty text-sm font-medium leading-relaxed">
            {context.shortName} – {context.organisation}
          </p>
        </div>
        <div>
          <p className="mb-2 text-xs text-muted-foreground">Domaines d&apos;intervention</p>
          <ul className="flex flex-wrap gap-1.5">
            {context.domains.map((domain) => (
              <li key={domain} className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                {domain}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Informations publiques transmises à chaque requête. Elles ne contiennent aucune donnée privée.
        </p>
      </section>

      <section aria-labelledby="context-sources" className="flex flex-col gap-3 border-t pt-6">
        <div className="flex items-center gap-2">
          <Database className="size-4 text-muted-foreground" aria-hidden="true" />
          <h3 id="context-sources" className="text-sm font-semibold tracking-tight">
            Données privées et sources
          </h3>
        </div>
        <ul className="flex flex-col gap-1.5">
          {connectors.map((connector) => {
            const connected = connector.status === 'connected'
            return (
              <li key={connector.id} className="flex items-start gap-2.5 rounded-lg px-1 py-1.5">
                {connected ? (
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-copilot" aria-hidden="true" />
                ) : (
                  <CircleDashed className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-sm font-medium">
                    {connector.label}
                    {connector.isDemo && (
                      <span className="rounded bg-demo px-1.5 py-0.5 text-[10px] font-medium text-demo-foreground">Démo</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {connected ? 'Actif' : 'Non connecté'} · {connector.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="flex gap-2 rounded-lg bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
          <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          <p>
            Seules les sources connectées sont interrogées. Copilot ne cite jamais SharePoint, Moodle ou une autre base tant
            qu&apos;elle n&apos;est pas réellement branchée.
          </p>
        </div>
      </section>
    </div>
  )
}
