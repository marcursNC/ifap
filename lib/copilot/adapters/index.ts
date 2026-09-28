import { detectUseCase } from '../use-cases'
import { searchConnectedSources } from './connectors'
import { simulatedProvider } from './simulated-provider'
import type { CopilotProvider, CopilotRequest, CopilotResult } from './types'

/**
 * Single switch point for the answer engine. Replace with an AI SDK provider
 * (Vercel AI Gateway) once the real integration is enabled.
 */
export function getCopilotProvider(): CopilotProvider {
  return simulatedProvider
}

export async function runCopilot(request: CopilotRequest): Promise<CopilotResult> {
  const provider = getCopilotProvider()
  const useCaseId = request.useCaseId ?? detectUseCase(request.prompt)
  const sources = await searchConnectedSources(request.prompt, useCaseId)
  const result = await provider.generate({ ...request, useCaseId }, sources)
  return {
    ...result,
    sources,
    provider: { id: provider.id, label: provider.label, isSimulated: provider.isSimulated },
  }
}
