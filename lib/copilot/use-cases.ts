import type { AssistantMode, UseCaseId } from './types'

export interface UseCase {
  id: Exclude<UseCaseId, 'general'>
  letter: string
  title: string
  description: string
  prompt: string
}

export const USE_CASES: UseCase[] = [
  {
    id: 'concevoir',
    letter: 'A',
    title: 'Concevoir une formation',
    description: 'Construire objectifs, compétences, séquence pédagogique et modalités.',
    prompt:
      "Aide-moi à concevoir une formation de 3 heures sur l'accueil des usagers pour des agents des collectivités : objectifs, compétences visées, séquence pédagogique et modalités d'évaluation.",
  },
  {
    id: 'besoin',
    letter: 'B',
    title: 'Analyser un besoin',
    description: 'Transformer un besoin exprimé en objectifs de formation et cahier des charges.',
    prompt:
      "Une direction nous indique : « nos agents ont du mal à rédiger des courriers administratifs clairs ». Transforme ce besoin en objectifs de formation et en éléments de cahier des charges.",
  },
  {
    id: 'cahier',
    letter: 'C',
    title: 'Préparer un cahier des charges',
    description: 'Structurer un CCTP, des livrables et des critères de consultation.',
    prompt:
      'Prépare une trame de CCTP pour une formation « Management de proximité » destinée aux encadrants intermédiaires : objet, livrables attendus et critères de consultation.',
  },
  {
    id: 'evaluations',
    letter: 'D',
    title: 'Analyser les évaluations',
    description: "Identifier les tendances, points forts, irritants et pistes d'amélioration.",
    prompt:
      "Analyse les résultats de satisfaction de la session « Marchés publics – niveau 1 » : tendances, points forts, irritants et pistes d'amélioration.",
  },
  {
    id: 'parcours',
    letter: 'E',
    title: 'Préparer un parcours',
    description: 'Construire un parcours blended learning cohérent.',
    prompt:
      'Construis un parcours blended learning de préparation au concours de rédacteur, combinant modules à distance et regroupements en présentiel.',
  },
  {
    id: 'synthese',
    letter: 'F',
    title: 'Synthétiser des documents',
    description: 'Produire une synthèse opérationnelle à partir de documents fournis.',
    prompt:
      'Produis une synthèse opérationnelle de la note de cadrage du plan de formation : points clés, décisions à prendre et prochaines étapes.',
  },
]

export const SUGGESTIONS: { label: string; useCaseId: UseCase['id'] }[] = [
  { label: 'Aide-moi à concevoir une formation de 3 heures.', useCaseId: 'concevoir' },
  { label: 'Transforme ce besoin en objectifs pédagogiques.', useCaseId: 'besoin' },
  { label: 'Prépare une trame de CCTP pour cette formation.', useCaseId: 'cahier' },
  { label: 'Comment construire un parcours blended learning ?', useCaseId: 'parcours' },
  { label: 'Analyse les résultats de satisfaction de cette session.', useCaseId: 'evaluations' },
]

export const MODES: { id: AssistantMode; label: string; description: string }[] = [
  { id: 'rapide', label: 'Mode rapide', description: 'Réponse synthétique et opérationnelle.' },
  {
    id: 'expert',
    label: 'Mode expert',
    description: 'Réponse approfondie avec méthodologie et justification.',
  },
  {
    id: 'conception',
    label: 'Mode conception',
    description: 'Produit directement un livrable structuré.',
  },
]

export function getUseCase(id: string | undefined) {
  return USE_CASES.find((useCase) => useCase.id === id)
}

const KEYWORDS: [UseCase['id'], string[]][] = [
  ['cahier', ['cctp', 'cahier des charges', 'consultation', 'marché de formation']],
  ['evaluations', ['évaluation', 'evaluation', 'satisfaction', 'résultats', 'questionnaire']],
  ['parcours', ['parcours', 'blended', 'hybride', 'distanciel']],
  ['synthese', ['synthèse', 'synthétise', 'synthetise', 'résume', 'document']],
  ['besoin', ['besoin', 'objectifs pédagogiques', 'demande de formation']],
  ['concevoir', ['concevoir', 'conception', 'formation de', 'séquence', 'atelier', 'module']],
]

export function detectUseCase(prompt: string): UseCaseId {
  const text = prompt.toLowerCase()
  for (const [id, words] of KEYWORDS) {
    if (words.some((word) => text.includes(word))) return id
  }
  return 'general'
}
