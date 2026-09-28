import { blockToMarkdown } from './format'
import type { ContentBlock, DeliverableKind, Message, ResponseSection } from './types'

export const DELIVERABLE_KINDS: { id: DeliverableKind; label: string; description: string }[] = [
  { id: 'fiche-formation', label: 'Fiche formation', description: 'Présentation synthétique d’une action.' },
  { id: 'programme', label: 'Programme', description: 'Déroulé détaillé et objectifs.' },
  { id: 'cahier-des-charges', label: 'Cahier des charges', description: 'Besoin, attendus et contraintes.' },
  { id: 'cctp', label: 'CCTP', description: 'Clauses techniques d’une consultation.' },
  { id: 'synthese', label: 'Synthèse', description: 'Note courte et opérationnelle.' },
  { id: 'plan-action', label: "Plan d'action", description: 'Actions, responsables et échéances.' },
]

const HEADER_FIELDS: Record<DeliverableKind, [string, string][]> = {
  'fiche-formation': [
    ['Public cible', 'À préciser'],
    ['Durée', 'À préciser'],
    ['Modalité', 'À préciser'],
  ],
  programme: [
    ['Public cible', 'À préciser'],
    ['Durée totale', 'À préciser'],
    ['Lieu', 'À préciser'],
  ],
  'cahier-des-charges': [
    ['Commanditaire', 'À préciser'],
    ['Budget prévisionnel', 'À préciser'],
    ['Calendrier', 'À préciser'],
  ],
  cctp: [
    ['Référence de la consultation', 'À attribuer'],
    ['Service acheteur', 'IFAP'],
    ['Relecture juridique', 'Requise'],
  ],
  synthese: [
    ['Destinataires', 'À préciser'],
    ['Diffusion', 'Interne'],
  ],
  'plan-action': [
    ['Pilote', 'À préciser'],
    ['Période', 'À préciser'],
  ],
}

export interface Deliverable {
  kind: DeliverableKind
  label: string
  title: string
  fields: [string, string][]
  sections: ResponseSection[]
}

export function buildDeliverable(kind: DeliverableKind, message: Message, conversationTitle: string): Deliverable {
  const response = message.response!
  const meta = DELIVERABLE_KINDS.find((item) => item.id === kind)!

  const sections: ResponseSection[] = [
    { title: 'Objet', blocks: [{ type: 'paragraph', text: response.summary }] },
    ...response.sections.filter((section) => section.title !== 'Angle alternatif'),
  ]

  if (kind === 'plan-action') {
    const rows = [...response.nextActions, ...response.recommendations].map((action) => [
      action,
      'À désigner',
      'À définir',
      'À lancer',
    ])
    sections.push({
      title: "Plan d'action",
      blocks: [{ type: 'table', columns: ['Action', 'Responsable', 'Échéance', 'Statut'], rows }],
    })
  } else {
    if (response.recommendations.length) {
      sections.push({ title: 'Recommandations', blocks: [{ type: 'list', items: response.recommendations }] })
    }
    sections.push({ title: 'Prochaines étapes', blocks: [{ type: 'list', ordered: true, items: response.nextActions }] })
  }

  return {
    kind,
    label: meta.label,
    title: `${meta.label} – ${conversationTitle}`,
    fields: [['Statut', 'Brouillon à valider'], ...HEADER_FIELDS[kind]],
    sections,
  }
}

export function deliverableToMarkdown(deliverable: Deliverable) {
  const fields = deliverable.fields.map(([key, value]) => `- **${key}** : ${value}`).join('\n')
  const body = deliverable.sections
    .map((section) => [`## ${section.title}`, ...section.blocks.map((block: ContentBlock) => blockToMarkdown(block))].join('\n\n'))
    .join('\n\n')
  return [
    `# ${deliverable.title}`,
    fields,
    body,
    '---',
    '_Document généré par IFAP Copilot (prototype V0.3, données de démonstration). À vérifier avant toute utilisation officielle._',
  ].join('\n\n')
}
