import { buildSimulatedResponse } from '../adapters/simulated-provider'
import { DEMO_DOCUMENTS } from './demo-documents'
import type { AssistantMode, Conversation, UseCaseId } from '../types'

function demoSources(useCaseId: UseCaseId) {
  return DEMO_DOCUMENTS.filter((doc) => doc.useCases.includes(useCaseId))
    .slice(0, 3)
    .map(({ useCases: _useCases, ...doc }) => doc)
}

function demoConversation(
  id: string,
  title: string,
  date: string,
  prompt: string,
  useCaseId: UseCaseId,
  mode: AssistantMode,
): Conversation {
  return {
    id,
    title,
    updatedAt: date,
    isDemo: true,
    messages: [
      { id: `${id}-q`, role: 'user', content: prompt, createdAt: date },
      {
        id: `${id}-a`,
        role: 'assistant',
        createdAt: date,
        mode,
        prompt,
        useCaseId,
        variant: 0,
        status: 'done',
        response: buildSimulatedResponse(useCaseId, mode),
        sources: demoSources(useCaseId),
      },
    ],
  }
}

export function getDemoConversations(): Conversation[] {
  return [
    demoConversation(
      'demo-accueil-usagers',
      'Formation accueil des usagers – 3 h',
      '2026-09-28T09:14:00+11:00',
      "Aide-moi à concevoir une formation de 3 heures sur l'accueil des usagers pour des agents des collectivités.",
      'concevoir',
      'expert',
    ),
    demoConversation(
      'demo-satisfaction-mp1',
      'Satisfaction – Marchés publics N1',
      '2026-09-24T15:40:00+11:00',
      'Analyse les résultats de satisfaction de la session « Marchés publics – niveau 1 ».',
      'evaluations',
      'rapide',
    ),
    demoConversation(
      'demo-parcours-redacteur',
      'Parcours hybride – concours rédacteur',
      '2026-09-17T11:05:00+11:00',
      'Construis un parcours blended learning de préparation au concours de rédacteur.',
      'parcours',
      'conception',
    ),
  ]
}
