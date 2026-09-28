import { DEMO_DOCUMENTS } from '../demo/demo-documents'
import type { SourceDocument, SourceOrigin, UseCaseId } from '../types'
import type { KnowledgeConnector } from './types'

const demoConnector: KnowledgeConnector = {
  id: 'demo',
  label: 'Bibliothèque de démonstration',
  description: 'Documents fictifs permettant de tester le prototype.',
  status: 'connected',
  isDemo: true,
  async search(_query, { useCaseId, limit }) {
    return DEMO_DOCUMENTS.filter((doc) => doc.useCases.includes(useCaseId))
      .slice(0, limit)
      .map(({ useCases: _useCases, ...doc }) => doc)
  },
}

function unavailableConnector(id: SourceOrigin, label: string, description: string): KnowledgeConnector {
  return {
    id,
    label,
    description,
    status: 'not_connected',
    isDemo: false,
    async search() {
      return []
    },
  }
}

export const KNOWLEDGE_CONNECTORS: KnowledgeConnector[] = [
  demoConnector,
  unavailableConnector('sharepoint', 'SharePoint IFAP', 'Espaces documentaires des services.'),
  unavailableConnector('internal-docs', 'Documents internes', 'Notes, procédures et modèles validés.'),
  unavailableConnector('moodle', 'Moodle', 'Parcours, activités et traces d’apprentissage.'),
  unavailableConnector('training-data', 'Données de formation', 'Sessions, inscriptions et évaluations.'),
  unavailableConnector('knowledge-base', 'Base de connaissances', 'Recherche sémantique (RAG) sur les contenus indexés.'),
]

export async function searchConnectedSources(
  query: string,
  useCaseId: UseCaseId,
  limit = 3,
): Promise<SourceDocument[]> {
  const connected = KNOWLEDGE_CONNECTORS.filter((connector) => connector.status === 'connected')
  const results = await Promise.all(connected.map((connector) => connector.search(query, { useCaseId, limit })))
  return results.flat().slice(0, limit)
}

export function getConnectorSummaries() {
  return KNOWLEDGE_CONNECTORS.map(({ id, label, description, status, isDemo }) => ({
    id,
    label,
    description,
    status,
    isDemo,
  }))
}

export type ConnectorSummary = ReturnType<typeof getConnectorSummaries>[number]
