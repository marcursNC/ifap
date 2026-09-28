import type { WorkContext } from './types'

/**
 * Public, non-sensitive institutional context injected into every request.
 * Private data (documents, learners, evaluations) must come exclusively from
 * knowledge connectors, never from this object.
 */
export const IFAP_CONTEXT: WorkContext = {
  shortName: 'IFAP',
  organisation: "Institut de Formation à l'Administration Publique de Nouvelle-Calédonie",
  domains: [
    'Formation des agents publics',
    'Ingénierie pédagogique',
    'Formation à distance',
    'Blended learning',
    'Préparation aux concours',
    'Développement des compétences',
    'Accompagnement des collectivités',
  ],
}
