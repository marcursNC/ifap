import type { AssistantMode, ResponseSection, UseCaseId } from '../types'

export interface ResponseTemplate {
  summary: Record<AssistantMode, string>
  core: ResponseSection[]
  expert: ResponseSection[]
  conception: ResponseSection[]
  recommendations: string[]
  nextActions: string[]
  alternativeAngle: string
}

export const RESPONSE_LIBRARY: Record<UseCaseId, ResponseTemplate> = {
  concevoir: {
    summary: {
      rapide:
        'Voici une formation de 3 heures en 5 séquences, qui alterne apports courts, mises en situation et évaluation. Elle vise trois compétences directement mobilisables au poste.',
      expert:
        "Cette proposition suit une logique d'alignement pédagogique : chaque objectif est relié à une compétence observable, à une activité et à une modalité d'évaluation. Sur 3 heures, limiter le nombre d'objectifs à trois garantit un temps de pratique suffisant.",
      conception:
        "Livrable prêt à relire : fiche de conception d'une formation de 3 heures, avec rubriques administratives, séquençage minuté et dispositif d'évaluation.",
    },
    core: [
      {
        title: 'Objectifs pédagogiques',
        blocks: [
          { type: 'paragraph', text: "À l'issue de la formation, les participants seront capables de :" },
          {
            type: 'list',
            ordered: true,
            items: [
              "Identifier les attentes de l'usager et les situations d'accueil types.",
              "Adopter une posture d'accueil professionnelle, y compris en situation tendue.",
              "Apporter une réponse fiable ou orienter l'usager vers le bon interlocuteur.",
            ],
          },
        ],
      },
      {
        title: 'Séquence pédagogique',
        blocks: [
          {
            type: 'table',
            columns: ['Horaire', 'Séquence', 'Méthode', 'Durée'],
            rows: [
              ['0:00', 'Ouverture et recueil des attentes', 'Tour de table, photolangage', '20 min'],
              ['0:20', "Les fondamentaux de l'accueil", 'Apports courts, échanges', '40 min'],
              ['1:00', 'Mises en situation', 'Jeux de rôle en trinômes', '50 min'],
              ['1:50', 'Pause', '—', '10 min'],
              ['2:00', 'Gérer les situations difficiles', 'Études de cas', '40 min'],
              ['2:40', 'Évaluation et plan d’action individuel', 'Quiz, engagement personnel', '20 min'],
            ],
          },
        ],
      },
      {
        title: 'Modalités',
        blocks: [
          {
            type: 'list',
            items: [
              'Présentiel, groupe de 8 à 12 agents.',
              'Supports : livret participant et fiches réflexes.',
              'Évaluation : quiz de fin de session et questionnaire de satisfaction à chaud.',
            ],
          },
        ],
      },
    ],
    expert: [
      {
        title: 'Méthodologie',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Analyse du besoin et des situations de travail réelles des agents.',
              "Formulation d'objectifs opérationnels avec un verbe d'action observable.",
              'Choix de méthodes actives proportionnées à la durée (60 % de pratique minimum).',
              "Définition d'une évaluation vérifiant chaque objectif.",
            ],
          },
        ],
      },
      {
        title: 'Justification des choix',
        blocks: [
          {
            type: 'paragraph',
            text: "Les jeux de rôle sont placés en milieu de session, lorsque le groupe est constitué et que les apports sont disponibles. Le plan d'action individuel final favorise le transfert en situation de travail, principal facteur d'efficacité d'une formation courte.",
          },
          {
            type: 'callout',
            text: 'Point de vigilance : prévoir un intervenant expérimenté en animation de jeux de rôle, certains agents pouvant être réticents à la mise en situation.',
          },
        ],
      },
    ],
    conception: [
      {
        title: 'Fiche de conception',
        blocks: [
          {
            type: 'table',
            columns: ['Rubrique', 'Contenu'],
            rows: [
              ['Intitulé', "Accueillir et orienter l'usager avec professionnalisme"],
              ['Public', "Agents d'accueil des collectivités et établissements publics"],
              ['Prérequis', 'Aucun'],
              ['Durée', '3 heures'],
              ['Format', 'Présentiel, 8 à 12 participants'],
              ['Intervenant', "Formateur expert de la relation à l'usager"],
            ],
          },
        ],
      },
      {
        title: 'Déroulé minuté',
        blocks: [
          {
            type: 'table',
            columns: ['Horaire', 'Séquence', 'Objectif visé'],
            rows: [
              ['0:00', 'Ouverture et attentes', 'Objectif 1'],
              ['0:20', "Fondamentaux de l'accueil", 'Objectifs 1 et 2'],
              ['1:00', 'Mises en situation', 'Objectif 2'],
              ['2:00', 'Situations difficiles', 'Objectifs 2 et 3'],
              ['2:40', 'Évaluation et plan d’action', 'Objectifs 1 à 3'],
            ],
          },
        ],
      },
      {
        title: "Dispositif d'évaluation",
        blocks: [
          {
            type: 'list',
            items: [
              'Niveau 1 – satisfaction : questionnaire à chaud.',
              'Niveau 2 – apprentissages : quiz de 10 questions.',
              'Niveau 3 – transfert : relance du plan d’action à 1 mois.',
            ],
          },
        ],
      },
    ],
    recommendations: [
      'Recueillir 2 ou 3 situations réelles auprès des services pour construire les cas pratiques.',
      'Limiter les apports théoriques à 15 minutes consécutives.',
      'Prévoir une fiche réflexe remise en fin de session.',
      'Associer un encadrant de proximité à la relance à 1 mois.',
    ],
    nextActions: [
      'Valider les objectifs avec le commanditaire.',
      "Identifier l'intervenant et planifier la session.",
      'Transformer cette proposition en fiche formation.',
    ],
    alternativeAngle:
      "Variante proposée : une version en classe inversée, avec une capsule vidéo de 15 minutes en amont, libérant davantage de temps pour les mises en situation.",
  },
  besoin: {
    summary: {
      rapide:
        "Le besoin exprimé relève d'un écart de compétences rédactionnelles. Il peut être traduit en trois objectifs de formation et en un cahier des charges court.",
      expert:
        "Avant de conclure à un besoin de formation, il convient de vérifier que l'écart ne relève pas de l'organisation (modèles absents, circuits de validation). L'analyse ci-dessous distingue besoin exprimé, besoin réel et réponse formation.",
      conception:
        "Livrable : note d'analyse du besoin, structurée pour être partagée avec le commanditaire et servir de base au cahier des charges.",
    },
    core: [
      {
        title: 'Reformulation du besoin',
        blocks: [
          {
            type: 'table',
            columns: ['Niveau', 'Formulation'],
            rows: [
              ['Besoin exprimé', 'Les agents ont du mal à rédiger des courriers clairs.'],
              ['Situation attendue', 'Des courriers compréhensibles du premier coup par les usagers.'],
              ['Écart observé', 'Phrases longues, jargon administratif, structure peu lisible.'],
            ],
          },
        ],
      },
      {
        title: 'Objectifs de formation',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              "Structurer un courrier administratif selon un plan adapté à l'objet.",
              'Rédiger des phrases courtes et accessibles, sans jargon.',
              'Relire et améliorer un courrier à l’aide d’une grille de lisibilité.',
            ],
          },
        ],
      },
      {
        title: 'Éléments pour le cahier des charges',
        blocks: [
          {
            type: 'list',
            items: [
              'Public : agents rédacteurs de courriers, tous services.',
              "Format : 2 demi-journées espacées d'un mois, avec exercice intersession.",
              'Livrables : guide de rédaction et modèles de courriers types.',
            ],
          },
        ],
      },
    ],
    expert: [
      {
        title: 'Méthodologie d’analyse',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Entretien avec le commanditaire pour qualifier les situations problématiques.',
              'Analyse de 5 à 10 courriers réels anonymisés.',
              'Distinction des causes : compétence, organisation, outils.',
              'Validation des objectifs avec le commanditaire.',
            ],
          },
        ],
      },
      {
        title: 'Justification',
        blocks: [
          {
            type: 'paragraph',
            text: "Le format en deux temps permet d'évaluer le transfert : les agents appliquent la méthode entre les sessions, puis retravaillent leurs propres courriers. Cette approche est plus efficace qu'une journée unique pour une compétence rédactionnelle.",
          },
          {
            type: 'callout',
            text: "Point de vigilance : si aucun modèle de courrier n'existe dans le service, une réponse organisationnelle devrait accompagner la formation.",
          },
        ],
      },
    ],
    conception: [
      {
        title: "Note d'analyse du besoin",
        blocks: [
          {
            type: 'table',
            columns: ['Rubrique', 'Contenu'],
            rows: [
              ['Commanditaire', 'Direction demandeuse – à préciser'],
              ['Problème constaté', 'Courriers peu lisibles pour les usagers'],
              ['Causes identifiées', 'Compétences rédactionnelles, absence de modèles'],
              ['Réponse proposée', 'Formation en deux demi-journées et modèles types'],
              ['Indicateur de réussite', 'Baisse des demandes de clarification des usagers'],
            ],
          },
        ],
      },
      {
        title: 'Objectifs validables',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Structurer un courrier administratif.',
              'Rédiger de manière claire et accessible.',
              'Relire à l’aide d’une grille de lisibilité.',
            ],
          },
        ],
      },
    ],
    recommendations: [
      'Demander des exemples de courriers anonymisés avant de lancer la conception.',
      "Définir un indicateur mesurable avec le commanditaire dès l'analyse.",
      'Compléter la formation par des modèles de courriers partagés.',
    ],
    nextActions: [
      'Programmer un entretien de cadrage avec la direction.',
      'Transformer l’analyse en cahier des charges.',
      'Identifier un groupe pilote de 10 agents.',
    ],
    alternativeAngle:
      "Variante proposée : un accompagnement par ateliers d'écriture courts (1 h 30) intégrés au service, plutôt qu'une formation inter-services.",
  },
  cahier: {
    summary: {
      rapide:
        "Voici une trame de CCTP en 7 rubriques pour la formation « Management de proximité », avec les livrables attendus et des critères de consultation pondérés.",
      expert:
        "Cette trame sépare clairement les exigences (ce que doit produire le prestataire) des moyens (laissés à son initiative), afin de favoriser des offres pédagogiques différenciantes et comparables.",
      conception:
        'Livrable : trame de CCTP complète, directement exploitable pour une consultation après relecture juridique.',
    },
    core: [
      {
        title: 'Structure du CCTP',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Objet de la consultation et contexte.',
              'Public visé et nombre prévisionnel de participants.',
              'Objectifs pédagogiques attendus.',
              'Modalités pédagogiques et durée.',
              'Livrables attendus.',
              'Calendrier prévisionnel.',
              'Suivi et évaluation de la prestation.',
            ],
          },
        ],
      },
      {
        title: 'Livrables attendus',
        blocks: [
          {
            type: 'table',
            columns: ['Livrable', 'Échéance', 'Format'],
            rows: [
              ['Proposition de déroulé détaillé', 'J-30', 'Document éditable'],
              ['Supports participants', 'J-10', 'PDF et source'],
              ['Évaluation des acquis', 'Fin de session', 'Grille renseignée'],
              ['Bilan de la prestation', 'J+15', 'Rapport synthétique'],
            ],
          },
        ],
      },
      {
        title: 'Critères de consultation',
        blocks: [
          {
            type: 'table',
            columns: ['Critère', 'Pondération'],
            rows: [
              ['Valeur pédagogique de l’offre', '50 %'],
              ['Prix', '30 %'],
              ['Qualification des intervenants', '20 %'],
            ],
          },
        ],
      },
    ],
    expert: [
      {
        title: 'Méthodologie de rédaction',
        blocks: [
          {
            type: 'list',
            items: [
              'Exprimer les objectifs en résultats attendus et non en contenus.',
              'Laisser le prestataire proposer ses méthodes, dans un cadre défini.',
              'Définir des sous-critères notés pour la valeur pédagogique.',
            ],
          },
        ],
      },
      {
        title: 'Justification de la pondération',
        blocks: [
          {
            type: 'paragraph',
            text: "Une pondération majoritaire sur la valeur pédagogique limite le risque d'offres à bas prix de moindre qualité. Le critère intervenants sécurise l'expérience managériale des formateurs, essentielle pour la crédibilité auprès des encadrants.",
          },
          {
            type: 'callout',
            text: 'Point de vigilance : la trame doit être relue par le service des marchés afin de vérifier sa conformité aux règles de la commande publique applicables.',
          },
        ],
      },
    ],
    conception: [
      {
        title: 'Trame de CCTP',
        blocks: [
          {
            type: 'table',
            columns: ['Article', 'Contenu proposé'],
            rows: [
              ['1. Objet', 'Conception et animation d’une formation au management de proximité.'],
              ['2. Contexte', "Évolution des organisations et renforcement du rôle d'encadrant."],
              ['3. Public', 'Encadrants intermédiaires, 2 groupes de 12.'],
              ['4. Objectifs', 'Animer une équipe, conduire un entretien, gérer un conflit.'],
              ['5. Modalités', '3 jours en présentiel, dont 1 jour à distance de 6 semaines.'],
              ['6. Livrables', 'Déroulé, supports, évaluations, bilan.'],
              ['7. Évaluation', 'Satisfaction, acquis et bilan de transfert à 3 mois.'],
            ],
          },
        ],
      },
    ],
    recommendations: [
      'Joindre au CCTP une description du contexte des collectivités concernées.',
      "Demander une note méthodologique d'une page maximum pour faciliter la comparaison.",
      'Prévoir une réunion de lancement obligatoire avec le prestataire retenu.',
    ],
    nextActions: [
      'Faire valider la trame par le service des marchés.',
      'Compléter le calendrier prévisionnel.',
      'Transformer la trame en CCTP.',
    ],
    alternativeAngle:
      'Variante proposée : une consultation en deux lots (conception / animation) pour permettre à l’IFAP de réutiliser les supports en interne.',
  },
  evaluations: {
    summary: {
      rapide:
        'La session est globalement bien évaluée (4,2 / 5). Le point fort est l’intervenant ; l’irritant principal est la densité du programme, qui pèse sur l’applicabilité au poste.',
      expert:
        "L'analyse croise indicateurs chiffrés et verbatims. L'écart entre la qualité de l'intervenant (4,6) et l'applicabilité (3,8) indique un problème de format plutôt que de contenu.",
      conception:
        "Livrable : synthèse d'évaluation de session prête à être diffusée à l'équipe pédagogique, avec plan d'amélioration.",
    },
    core: [
      {
        title: 'Indicateurs clés',
        blocks: [
          {
            type: 'table',
            columns: ['Indicateur', 'Note', 'Tendance'],
            rows: [
              ['Satisfaction globale', '4,2 / 5', 'Stable'],
              ['Qualité de l’intervenant', '4,6 / 5', 'En hausse'],
              ['Applicabilité au poste', '3,8 / 5', 'À surveiller'],
              ['Rythme de la formation', '3,4 / 5', 'En baisse'],
            ],
          },
        ],
      },
      {
        title: 'Points forts',
        blocks: [
          {
            type: 'list',
            items: [
              "Expertise et pédagogie de l'intervenant.",
              'Cas pratiques jugés très utiles.',
              'Taux de réponse élevé (89 %).',
            ],
          },
        ],
      },
      {
        title: 'Irritants',
        blocks: [
          {
            type: 'list',
            items: [
              'Programme jugé trop dense pour la durée.',
              'Peu de temps pour les questions liées aux situations de chacun.',
            ],
          },
        ],
      },
    ],
    expert: [
      {
        title: "Méthode d'analyse",
        blocks: [
          {
            type: 'list',
            items: [
              'Comparaison des moyennes par critère et avec la session précédente.',
              'Codage thématique des verbatims (densité, pratique, supports).',
              "Croisement des résultats avec les objectifs pédagogiques.",
            ],
          },
        ],
      },
      {
        title: 'Interprétation',
        blocks: [
          {
            type: 'paragraph',
            text: "La note de rythme est corrélée aux verbatims « trop dense ». Réduire le volume de contenu, plutôt que d'allonger la formation, devrait améliorer l'applicabilité sans coût supplémentaire.",
          },
          {
            type: 'callout',
            text: 'Point de vigilance : avec 54 répondants, les écarts inférieurs à 0,2 point ne sont pas significatifs.',
          },
        ],
      },
    ],
    conception: [
      {
        title: "Synthèse d'évaluation",
        blocks: [
          {
            type: 'table',
            columns: ['Rubrique', 'Contenu'],
            rows: [
              ['Session', 'Marchés publics – niveau 1'],
              ['Répondants', '54 / 61 (89 %)'],
              ['Satisfaction', '4,2 / 5'],
              ['Point fort', "Qualité de l'intervenant"],
              ['Irritant', 'Densité du programme'],
            ],
          },
        ],
      },
      {
        title: "Plan d'amélioration",
        blocks: [
          {
            type: 'table',
            columns: ['Action', 'Échéance'],
            rows: [
              ['Alléger le module 3 et le déplacer en ressource à distance', 'Prochaine session'],
              ['Ajouter 30 min de questions sur situations réelles', 'Prochaine session'],
              ['Mesurer le transfert à 3 mois', 'Session suivante + 3 mois'],
            ],
          },
        ],
      },
    ],
    recommendations: [
      'Alléger le contenu plutôt que d’allonger la durée.',
      'Transformer une partie des apports en ressources à distance.',
      'Réserver un temps dédié aux situations apportées par les participants.',
    ],
    nextActions: [
      "Partager la synthèse avec l'intervenant.",
      'Ajuster le déroulé avant la prochaine session.',
      "Transformer l'analyse en plan d'action.",
    ],
    alternativeAngle:
      "Variante proposée : une lecture par profil de participant (encadrants / agents) pour vérifier si l'irritant de densité touche tous les publics.",
  },
  parcours: {
    summary: {
      rapide:
        'Voici un parcours hybride de 10 semaines, articulant modules à distance courts, 3 regroupements présentiels et un tutorat, pour préparer le concours de rédacteur.',
      expert:
        "Le parcours applique le principe « préparer – pratiquer – transférer » : chaque regroupement présentiel est encadré par une activité à distance en amont et en aval. Le rythme hebdomadaire est calibré pour des agents en poste.",
      conception:
        'Livrable : architecture de parcours blended learning, semaine par semaine, prête à être intégrée dans la plateforme de formation.',
    },
    core: [
      {
        title: 'Architecture du parcours',
        blocks: [
          {
            type: 'table',
            columns: ['Phase', 'Modalité', 'Contenu', 'Durée'],
            rows: [
              ['Semaine 1', 'Présentiel', 'Lancement, méthodologie du concours', '1 jour'],
              ['Semaines 2 à 4', 'À distance', 'Droit public, finances locales', '3 h / sem.'],
              ['Semaine 5', 'Présentiel', 'Note de synthèse – entraînement', '1 jour'],
              ['Semaines 6 à 9', 'À distance', 'Devoirs corrigés, quiz', '3 h / sem.'],
              ['Semaine 10', 'Présentiel', 'Concours blanc et oral', '1 jour'],
            ],
          },
        ],
      },
      {
        title: 'Principes de cohérence',
        blocks: [
          {
            type: 'list',
            items: [
              'Modules à distance de 45 minutes maximum.',
              'Une activité préparatoire avant chaque regroupement.',
              'Un tuteur référent pour chaque groupe.',
            ],
          },
        ],
      },
    ],
    expert: [
      {
        title: 'Méthodologie',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Analyse des épreuves et du référentiel du concours.',
              'Répartition des contenus selon leur nature : savoirs à distance, pratique en présentiel.',
              'Calibrage de la charge hebdomadaire compatible avec le poste.',
              'Définition des jalons d’évaluation formative.',
            ],
          },
        ],
      },
      {
        title: 'Justification',
        blocks: [
          {
            type: 'paragraph',
            text: "Les savoirs déclaratifs se prêtent bien au distanciel asynchrone, tandis que l'entraînement aux épreuves nécessite un retour individualisé. Les regroupements maintiennent la motivation, principal facteur d'abandon dans les préparations longues.",
          },
          {
            type: 'callout',
            text: 'Point de vigilance : sécuriser avec les employeurs du temps dédié à la formation à distance sur le temps de travail.',
          },
        ],
      },
    ],
    conception: [
      {
        title: 'Scénario du parcours',
        blocks: [
          {
            type: 'table',
            columns: ['Étape', 'Activité', 'Évaluation'],
            rows: [
              ['1. Lancement', 'Positionnement et méthodologie', 'Test de positionnement'],
              ['2. Fondamentaux', 'Modules à distance et quiz', 'Quiz automatisés'],
              ['3. Entraînement', 'Note de synthèse en présentiel', 'Correction individualisée'],
              ['4. Approfondissement', 'Devoirs à distance', 'Copies corrigées'],
              ['5. Mise en condition', 'Concours blanc et oral', 'Grille officielle simulée'],
            ],
          },
        ],
      },
    ],
    recommendations: [
      'Organiser un test de positionnement pour individualiser le parcours.',
      "Prévoir un forum d'entraide animé par le tuteur.",
      'Suivre l’assiduité à distance chaque semaine pour prévenir les abandons.',
    ],
    nextActions: [
      'Valider le calendrier avec la date du concours.',
      'Identifier les tuteurs et les correcteurs.',
      'Transformer ce parcours en programme détaillé.',
    ],
    alternativeAngle:
      'Variante proposée : un parcours en deux niveaux (fondamentaux / perfectionnement) selon les résultats du test de positionnement.',
  },
  synthese: {
    summary: {
      rapide:
        'La note de cadrage fixe trois priorités et un objectif de 30 % d’offre hybride d’ici fin 2027. Deux décisions sont à prendre rapidement pour tenir ce calendrier.',
      expert:
        "La synthèse distingue les orientations stratégiques, les engagements chiffrés et les points non arbitrés. Elle signale les dépendances entre priorités pour faciliter l'arbitrage.",
      conception:
        'Livrable : synthèse opérationnelle d’une page, structurée pour une réunion de direction.',
    },
    core: [
      {
        title: 'Points clés',
        blocks: [
          {
            type: 'list',
            items: [
              'Priorité 1 : accompagner la transformation numérique des services.',
              'Priorité 2 : renforcer les compétences managériales.',
              'Priorité 3 : sécuriser les procédures administratives.',
              'Objectif : 30 % de l’offre en format hybride d’ici fin 2027.',
            ],
          },
        ],
      },
      {
        title: 'Décisions à prendre',
        blocks: [
          {
            type: 'table',
            columns: ['Décision', 'Enjeu', 'Échéance suggérée'],
            rows: [
              ['Choix des formations à hybrider en priorité', 'Tenir l’objectif 2027', 'Trimestre en cours'],
              ['Moyens de tutorat à distance', 'Qualité et assiduité', 'Trimestre suivant'],
            ],
          },
        ],
      },
    ],
    expert: [
      {
        title: 'Méthode de synthèse',
        blocks: [
          {
            type: 'list',
            items: [
              'Extraction des orientations, engagements et échéances.',
              'Identification des points non arbitrés.',
              'Mise en évidence des dépendances entre priorités.',
            ],
          },
        ],
      },
      {
        title: 'Analyse',
        blocks: [
          {
            type: 'paragraph',
            text: "L'objectif d'hybridation dépend directement des moyens de tutorat, non chiffrés dans la note. La priorité numérique peut servir de levier : les formations au numérique sont de bonnes candidates pour une première vague d'hybridation.",
          },
          {
            type: 'callout',
            text: 'Point de vigilance : la synthèse ne remplace pas la lecture du document source pour toute décision officielle.',
          },
        ],
      },
    ],
    conception: [
      {
        title: 'Synthèse opérationnelle',
        blocks: [
          {
            type: 'table',
            columns: ['Rubrique', 'Contenu'],
            rows: [
              ['Objet', 'Note de cadrage du plan de formation'],
              ['Priorités', 'Numérique, management, sécurisation des procédures'],
              ['Engagement chiffré', '30 % d’offre hybride fin 2027'],
              ['Points à arbitrer', 'Formations prioritaires, moyens de tutorat'],
              ['Risque principal', "Capacité de tutorat insuffisante"],
            ],
          },
        ],
      },
    ],
    recommendations: [
      'Lancer une première vague d’hybridation sur 5 formations à fort volume.',
      'Chiffrer les besoins de tutorat avant tout arbitrage.',
      "Définir un indicateur de suivi trimestriel de l'objectif d'hybridation.",
    ],
    nextActions: [
      'Inscrire les deux décisions à l’ordre du jour du prochain comité.',
      'Préparer la liste des formations candidates.',
      "Transformer la synthèse en plan d'action.",
    ],
    alternativeAngle:
      'Variante proposée : une synthèse orientée risques, classant les priorités selon leur faisabilité à court terme.',
  },
  general: {
    summary: {
      rapide:
        "IFAP Copilot vous accompagne sur les activités d'ingénierie et de pilotage de la formation. Précisez votre objectif pour obtenir une réponse adaptée.",
      expert:
        "Pour produire une réponse approfondie, IFAP Copilot a besoin du contexte : public visé, objectif, contraintes et livrable attendu. Voici comment structurer votre demande.",
      conception:
        'Pour produire un livrable directement exploitable, indiquez le type de document attendu et les éléments de contexte disponibles.',
    },
    core: [
      {
        title: 'Ce que je peux faire pour vous',
        blocks: [
          {
            type: 'list',
            items: [
              'Concevoir une formation ou une séquence pédagogique.',
              'Analyser un besoin et le traduire en objectifs.',
              'Structurer un cahier des charges ou un CCTP.',
              'Analyser des résultats d’évaluation.',
              'Construire un parcours blended learning.',
              'Synthétiser des documents.',
            ],
          },
        ],
      },
      {
        title: 'Pour une réponse plus précise',
        blocks: [
          {
            type: 'table',
            columns: ['Élément', 'Exemple'],
            rows: [
              ['Public', 'Encadrants intermédiaires des communes'],
              ['Objectif', 'Conduire un entretien professionnel'],
              ['Contraintes', '1 journée, 12 participants'],
              ['Livrable', 'Fiche formation'],
            ],
          },
        ],
      },
    ],
    expert: [
      {
        title: 'Approche',
        blocks: [
          {
            type: 'paragraph',
            text: "IFAP Copilot applique les principes de l'ingénierie de formation : partir du besoin, formuler des objectifs observables, aligner méthodes et évaluation, et prévoir le transfert en situation de travail.",
          },
        ],
      },
    ],
    conception: [],
    recommendations: [
      'Choisir un cas d’usage pour démarrer avec une question structurée.',
      'Utiliser le mode conception pour obtenir directement un livrable.',
    ],
    nextActions: [
      'Préciser le public et l’objectif.',
      'Sélectionner un mode de réponse.',
    ],
    alternativeAngle:
      'Variante proposée : décrivez une situation de travail concrète, IFAP Copilot vous proposera la démarche la plus adaptée.',
  },
}
