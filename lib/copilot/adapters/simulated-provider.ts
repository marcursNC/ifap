import { RESPONSE_LIBRARY } from '../demo/response-library'
import type { AssistantMode, ResponseSection, StructuredResponse, UseCaseId } from '../types'
import { detectUseCase } from '../use-cases'
import type { CopilotProvider } from './types'

function rotate<T>(items: T[], offset: number) {
  if (items.length === 0) return items
  const shift = offset % items.length
  return [...items.slice(shift), ...items.slice(0, shift)]
}

export function buildSimulatedResponse(
  useCaseId: UseCaseId,
  mode: AssistantMode,
  variant = 0,
): StructuredResponse {
  const template = RESPONSE_LIBRARY[useCaseId]

  let sections: ResponseSection[]
  if (mode === 'rapide') sections = template.core.slice(0, 2)
  else if (mode === 'expert') sections = [...template.core, ...template.expert]
  else sections = template.conception.length > 0 ? template.conception : template.core

  if (variant > 0) {
    sections = [{ title: 'Angle alternatif', blocks: [{ type: 'callout', text: template.alternativeAngle }] }, ...sections]
  }

  const recommendations = rotate(template.recommendations, variant)
  return {
    summary: template.summary[mode],
    sections,
    recommendations: mode === 'rapide' ? recommendations.slice(0, 3) : recommendations,
    nextActions: template.nextActions,
  }
}

export const simulatedProvider: CopilotProvider = {
  id: 'simulated',
  label: 'Moteur simulé (prototype)',
  isSimulated: true,
  async generate(request) {
    const useCaseId = request.useCaseId ?? detectUseCase(request.prompt)
    await new Promise((resolve) => setTimeout(resolve, 700))
    return {
      useCaseId,
      response: buildSimulatedResponse(useCaseId, request.mode, request.variant ?? 0),
    }
  },
}
