import type { SourceDocument, UseCaseId } from '../types'

type DemoDocument = SourceDocument & { useCases: UseCaseId[] }

/** Fictitious documents. They do not come from any IFAP system. */
export const DEMO_DOCUMENTS: DemoDocument[] = [
  {
    id: 'demo-guide-ingenierie',
    title: "Guide d'ingénierie pédagogique",
    type: 'Guide méthodologique',
    format: 'PDF',
    date: '2026-03-12',
    origin: 'demo',
    isDemo: true,
    useCases: ['concevoir', 'parcours', 'besoin', 'general'],
    excerpt:
      "Toute action de formation est construite selon le principe d'alignement pédagogique : objectifs formulés avec un verbe d'action observable, activités cohérentes avec ces objectifs, évaluation vérifiant leur atteinte. Une séquence de 3 heures ne devrait pas dépasser trois objectifs opérationnels.",
  },
  {
    id: 'demo-referentiel-accueil',
    title: 'Référentiel de compétences – accueil des usagers',
    type: 'Référentiel',
    format: 'XLSX',
    date: '2025-11-04',
    origin: 'demo',
    isDemo: true,
    useCases: ['concevoir', 'besoin'],
    excerpt:
      "Compétence C2 : adapter sa communication au profil de l'usager. Compétence C3 : gérer une situation de tension en préservant la qualité du service. Compétence C4 : orienter l'usager vers le bon interlocuteur.",
  },
  {
    id: 'demo-modele-cctp',
    title: 'Modèle de CCTP – prestations de formation',
    type: 'Modèle de document',
    format: 'DOCX',
    date: '2026-01-20',
    origin: 'demo',
    isDemo: true,
    useCases: ['cahier', 'besoin'],
    excerpt:
      "Le CCTP précise l'objet de la prestation, le contexte, le public, les objectifs, les modalités pédagogiques attendues, les livrables, le calendrier prévisionnel et les modalités de suivi et d'évaluation de la prestation.",
  },
  {
    id: 'demo-grille-criteres',
    title: 'Grille de critères de consultation',
    type: "Grille d'analyse",
    format: 'XLSX',
    date: '2026-02-02',
    origin: 'demo',
    isDemo: true,
    useCases: ['cahier'],
    excerpt:
      'Pondération indicative : valeur pédagogique 50 %, prix 30 %, références et qualification des intervenants 20 %. Chaque critère est noté sur 10 avec une justification écrite.',
  },
  {
    id: 'demo-satisfaction-mp1',
    title: 'Résultats de satisfaction – Marchés publics N1',
    type: "Données d'évaluation",
    format: 'CSV',
    date: '2026-06-28',
    origin: 'demo',
    isDemo: true,
    useCases: ['evaluations'],
    excerpt:
      '54 répondants sur 61 participants. Satisfaction globale : 4,2 / 5. Qualité de l\'intervenant : 4,6 / 5. Rythme : 3,4 / 5. Applicabilité au poste : 3,8 / 5. Verbatims récurrents : « trop dense », « cas pratiques très utiles ».',
  },
  {
    id: 'demo-bilan-2025',
    title: 'Bilan pédagogique annuel 2025',
    type: 'Rapport',
    format: 'PDF',
    date: '2026-02-15',
    origin: 'demo',
    isDemo: true,
    useCases: ['evaluations', 'synthese'],
    excerpt:
      "Taux de satisfaction moyen de 91 %. Les formations hybrides progressent de 18 %. Principal irritant signalé : la charge de travail empêchant de suivre les modules à distance sur le temps de travail.",
  },
  {
    id: 'demo-charte-blended',
    title: 'Charte de conception des parcours hybrides',
    type: 'Charte',
    format: 'PDF',
    date: '2025-09-18',
    origin: 'demo',
    isDemo: true,
    useCases: ['parcours'],
    excerpt:
      "Un module à distance ne dépasse pas 45 minutes. Chaque regroupement présentiel est précédé d'une activité préparatoire et suivi d'une activité de transfert. Le tutorat est assuré par un référent identifié.",
  },
  {
    id: 'demo-note-cadrage',
    title: 'Plan de formation – note de cadrage',
    type: 'Note',
    format: 'DOCX',
    date: '2026-01-08',
    origin: 'demo',
    isDemo: true,
    useCases: ['synthese', 'besoin', 'general'],
    excerpt:
      "Trois priorités : accompagner la transformation numérique des services, renforcer les compétences managériales, sécuriser les procédures administratives. Objectif : 30 % de l'offre en format hybride d'ici fin 2027.",
  },
]
