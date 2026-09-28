export type AssistantMode = 'rapide' | 'expert' | 'conception'

export type UseCaseId =
  | 'concevoir'
  | 'besoin'
  | 'cahier'
  | 'evaluations'
  | 'parcours'
  | 'synthese'
  | 'general'

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'table'; columns: string[]; rows: string[][] }
  | { type: 'callout'; text: string }

export interface ResponseSection {
  title: string
  blocks: ContentBlock[]
}

export interface StructuredResponse {
  summary: string
  sections: ResponseSection[]
  recommendations: string[]
  nextActions: string[]
}

/**
 * Where a source document comes from. `demo` is the only origin available
 * in V0.3; the others map to connectors that can be plugged in later.
 */
export type SourceOrigin =
  | 'demo'
  | 'sharepoint'
  | 'internal-docs'
  | 'moodle'
  | 'training-data'
  | 'knowledge-base'

export interface SourceDocument {
  id: string
  title: string
  type: string
  format: string
  date: string
  origin: SourceOrigin
  excerpt: string
  isDemo: boolean
  url?: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  createdAt: string
  content?: string
  mode?: AssistantMode
  prompt?: string
  response?: StructuredResponse
  sources?: SourceDocument[]
  useCaseId?: UseCaseId
  variant?: number
  status?: 'streaming' | 'done'
}

export interface Conversation {
  id: string
  title: string
  updatedAt: string
  isDemo: boolean
  messages: Message[]
}

export interface WorkContext {
  organisation: string
  shortName: string
  domains: string[]
}

export type DeliverableKind =
  | 'fiche-formation'
  | 'programme'
  | 'cahier-des-charges'
  | 'cctp'
  | 'synthese'
  | 'plan-action'
