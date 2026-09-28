import { runCopilot } from '@/lib/copilot/adapters'
import { IFAP_CONTEXT } from '@/lib/copilot/context'
import type { AssistantMode, UseCaseId } from '@/lib/copilot/types'

const MODES: AssistantMode[] = ['rapide', 'expert', 'conception']
const USE_CASES: UseCaseId[] = ['concevoir', 'besoin', 'cahier', 'evaluations', 'parcours', 'synthese', 'general']
const MAX_PROMPT_LENGTH = 4000

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const { prompt, mode, useCaseId, variant } = (body ?? {}) as Record<string, unknown>

  if (typeof prompt !== 'string' || prompt.trim().length === 0 || prompt.length > MAX_PROMPT_LENGTH) {
    return Response.json({ error: 'La question est vide ou trop longue.' }, { status: 400 })
  }
  if (typeof mode !== 'string' || !MODES.includes(mode as AssistantMode)) {
    return Response.json({ error: 'Mode inconnu.' }, { status: 400 })
  }
  if (useCaseId !== undefined && !USE_CASES.includes(useCaseId as UseCaseId)) {
    return Response.json({ error: "Cas d'usage inconnu." }, { status: 400 })
  }

  const safeVariant = typeof variant === 'number' && Number.isInteger(variant) ? Math.min(Math.max(variant, 0), 20) : 0

  const result = await runCopilot({
    prompt: prompt.trim(),
    mode: mode as AssistantMode,
    useCaseId: useCaseId as UseCaseId | undefined,
    variant: safeVariant,
    context: IFAP_CONTEXT,
  })

  return Response.json(result)
}
