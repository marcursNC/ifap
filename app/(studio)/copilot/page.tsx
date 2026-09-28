import type { Metadata } from 'next'
import { CopilotWorkspace } from '@/components/copilot/copilot-workspace'
import { getConnectorSummaries } from '@/lib/copilot/adapters/connectors'
import { IFAP_CONTEXT } from '@/lib/copilot/context'
import { getDemoConversations } from '@/lib/copilot/demo/demo-conversations'

export const metadata: Metadata = {
  title: 'IFAP Copilot',
  description: 'Votre assistant intelligent pour concevoir, analyser et piloter la formation.',
}

export default function CopilotPage() {
  return (
    <CopilotWorkspace
      initialConversations={getDemoConversations()}
      context={IFAP_CONTEXT}
      connectors={getConnectorSummaries()}
    />
  )
}
