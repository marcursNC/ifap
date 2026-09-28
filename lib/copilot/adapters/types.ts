import type {
  AssistantMode,
  Conversation,
  SourceDocument,
  SourceOrigin,
  StructuredResponse,
  UseCaseId,
  WorkContext,
} from '../types'

export interface CopilotRequest {
  prompt: string
  mode: AssistantMode
  context: WorkContext
  useCaseId?: UseCaseId
  variant?: number
}

export interface CopilotResult {
  response: StructuredResponse
  sources: SourceDocument[]
  useCaseId: UseCaseId
  provider: { id: string; label: string; isSimulated: boolean }
}

/**
 * Generates an assistant answer. V0.3 ships a simulated provider; a Vercel AI
 * SDK provider (e.g. `streamObject` with a schema matching StructuredResponse)
 * can implement the same contract without touching the UI.
 */
export interface CopilotProvider {
  id: string
  label: string
  isSimulated: boolean
  generate(request: CopilotRequest, sources: SourceDocument[]): Promise<Omit<CopilotResult, 'provider' | 'sources'>>
}

export type ConnectorStatus = 'connected' | 'not_connected'

/**
 * A searchable document source (SharePoint, Moodle, RAG index…). Only
 * connectors with `status: 'connected'` are ever queried, so the assistant
 * can never cite a source that is not actually available.
 */
export interface KnowledgeConnector {
  id: SourceOrigin
  label: string
  description: string
  status: ConnectorStatus
  isDemo: boolean
  search(query: string, options: { useCaseId: UseCaseId; limit: number }): Promise<SourceDocument[]>
}

/** Persistence contract for conversations (future: Supabase table with RLS). */
export interface ConversationStore {
  list(userId: string): Promise<Conversation[]>
  get(userId: string, conversationId: string): Promise<Conversation | null>
  save(userId: string, conversation: Conversation): Promise<void>
  remove(userId: string, conversationId: string): Promise<void>
}

/** Authentication contract (future: Supabase Auth). */
export interface AuthAdapter {
  getCurrentUser(): Promise<{ id: string; email: string; displayName: string } | null>
}
