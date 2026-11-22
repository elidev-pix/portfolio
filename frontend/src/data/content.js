// Source de vérité du contenu : le CV certifié exact le 20/11/2026.
// Ce fichier sert de contenu intégré tant que l'API n'est pas branchée.

export const profile = {
  name: 'Eliel Sawadogo',
  fullName: 'Sawadogo Rakiswilgri Eliel Rodrigue',
  title: 'Étudiant en Télécommunications & Informatique',
  tagline: 'Développement logiciel · Administration et Sécurité des Réseaux',
  hook: 'Je construis, j’explore et je comprends les technologies qui façonnent le numérique.',
  intro:
    'Passionné par le développement logiciel, les infrastructures numériques et les systèmes intelligents, je transforme progressivement mes connaissances en solutions concrètes.',
  location: 'Ouagadougou, Burkina Faso',
  status: 'Étudiant en Licence 3 LTI, option ASR',
  school: 'ESMT, antenne de Ouagadougou',
  phones: [
    { label: '+226 67 25 98 99', href: 'tel:+22667259899' },
    { label: '+226 01 23 81 55', href: 'tel:+22601238155' },
  ],
  email: 'elielrsawadogo@gmail.com',
  github: 'https://github.com/elidev-pix',
  linkedin: 'https://www.linkedin.com/in/eliel-r-sawadogo-b99ab4383/',
  cv: '/CV_ElielSawadogo.pdf',
}

export const nav = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/a-propos', label: 'À propos' },
  { to: '/experiences', label: 'Expériences' },
  { to: '/projets', label: 'Projets' },
  { to: '/competences', label: 'Compétences' },
  { to: '/blog', label: 'Blog' },
  { to: '/tutoriels', label: 'Tutoriels' },
  { to: '/contact', label: 'Contact' },
]

export const aboutText = [
  'Je suis étudiant à l’École Supérieure Multinationale des Télécommunications (ESMT), à Ouagadougou. Les deux premières années de la Licence en Télécommunications et Informatique (LTI) forment un tronc commun ; en troisième année, j’ai choisi l’option Administration et Sécurité des Réseaux (ASR).',
  'Mon parcours associe développement logiciel, administration des systèmes et infrastructures réseau. J’ai construit des applications web complètes avec React, Node.js et Laravel, et je configure en parallèle des services Linux, des routeurs et des environnements virtualisés en travaux pratiques.',
  'Depuis cette année, je consolide mes bases en Python, en programmation orientée objet, en mathématiques appliquées au Machine Learning et en analyse de données. Mon objectif est d’intégrer le cycle Ingénieur de Conception des Télécommunications de l’ESMT Dakar, parcours Ingénierie des données et Intelligence Artificielle (InDIA), pour développer des solutions adaptées aux enjeux des télécommunications et du numérique.',
]

export const motivations = [
  { title: 'Concevoir des solutions logicielles utiles', text: 'Partir d’un besoin réel, comme celui d’une association ou d’un commerce, et livrer une application qui fonctionne.' },
  { title: 'Comprendre et sécuriser les infrastructures', text: 'Savoir ce qui se passe entre un clic et une réponse : réseaux, services, accès, pare-feu.' },
  { title: 'Explorer les technologies émergentes', text: 'Rester curieux, tester, documenter ce que j’apprends.' },
  { title: 'Approfondir la Data Science et l’IA', text: 'Apprendre les bases solides, mathématiques et Python, avant de construire des systèmes intelligents.' },
]

// kind: past | now | next
export const timeline = [
  { date: 'Juillet 2024', title: 'Baccalauréat série D', place: 'Petit Séminaire de Baskouré', text: 'Fin des études secondaires.', kind: 'past' },
  { date: '2024 – 2026', title: 'Licence 1 et Licence 2 LTI', place: 'ESMT, Ouagadougou', text: 'Tronc commun en Télécommunications et Informatique : programmation, systèmes et réseaux.', kind: 'past' },
  { date: 'Juillet – Sept. 2025', title: 'Stage chez SWITCH-MAKER', place: 'Développement backend', text: 'Application web de gestion de tâches avec PHP et Laravel.', kind: 'past' },
  { date: 'Juillet 2026', title: 'Certificat en Data Science', place: 'GO AI', text: 'Premier jalon dans mon apprentissage de la Data Science.', kind: 'past' },
  { date: 'Août – Oct. 2026', title: 'Stage chez YIRMEA', place: 'Développeur Web Full Stack', text: 'Initiation à Java, Spring Boot et Angular ; tests et lancement de Yirmea Immo.', kind: 'past' },
  { date: '2026 – 2027', title: 'Licence 3 LTI, option ASR', place: 'ESMT, Ouagadougou', text: 'Administration et Sécurité des Réseaux : portail captif, services Linux, virtualisation, conteneurs.', kind: 'now' },
  { date: 'Objectif', title: 'Cycle Ingénieur, parcours InDIA', place: 'ESMT Dakar', text: 'Ingénieur de Conception des Télécommunications, parcours Ingénierie des données et Intelligence Artificielle.', kind: 'next' },
]

export const experiences = [
  {
    company: 'YIRMEA',
    role: 'Stagiaire, Développeur Web Full Stack',
    period: 'Août – Octobre 2026',
    points: [
      'Initiation à Java et à la programmation orientée objet.',
      'Découverte du développement backend avec Spring Boot.',
      'Découverte des notions d’API et de DTO, et des premiers concepts frontend avec Angular.',
      'Participation aux tests fonctionnels de Yirmea Immo à partir de cas d’utilisation.',
      'Participation aux activités de prospection et au lancement de Yirmea Immo.',
    ],
    tech: ['Java', 'Spring Boot', 'Angular'],
  },
  {
    company: 'SWITCH-MAKER',
    role: 'Stagiaire, initiation au développement backend',
    period: 'Juillet – Septembre 2025',
    points: [
      'Conception et développement d’une application web de gestion de tâches avec PHP et Laravel.',
      'Développement de fonctionnalités CRUD.',
      'Mise en œuvre de l’architecture MVC.',
      'Intégration et gestion des données avec MySQL.',
      'Suivi du code avec Git et GitHub.',
    ],
    tech: ['PHP', 'Laravel', 'MySQL', 'Git'],
  },
]

export const education = [
  { period: '2026 – 2027', title: 'Licence 3 LTI, option Administration et Sécurité des Réseaux', place: 'ESMT, Ouagadougou', note: 'En cours' },
  { period: '2024 – 2026', title: 'Licence 1 et Licence 2 LTI, tronc commun', place: 'ESMT, Ouagadougou' },
  { period: 'Juillet 2024', title: 'Baccalauréat série D', place: 'Petit Séminaire de Baskouré' },
]

export const certifications = [
  { date: 'Juillet 2026', title: 'Certificat en Data Science', issuer: 'GO AI' },
]

// Niveaux : Pratiqué (utilisé dans des projets ou stages), En apprentissage, Notions.
export const skillGroups = [
  {
    name: 'Programmation',
    items: [
      { name: 'JavaScript', level: 'Pratiqué' },
      { name: 'PHP', level: 'Pratiqué' },
      { name: 'Java', level: 'En apprentissage' },
      { name: 'Python', level: 'En apprentissage' },
    ],
  },
  {
    name: 'Développement backend et frontend',
    items: [
      { name: 'React', level: 'Pratiqué' },
      { name: 'Node.js', level: 'Pratiqué' },
      { name: 'Express', level: 'Pratiqué' },
      { name: 'Laravel', level: 'Pratiqué' },
      { name: 'HTML5', level: 'Pratiqué' },
      { name: 'CSS3', level: 'Pratiqué' },
      { name: 'Spring Boot', level: 'En apprentissage' },
      { name: 'Angular', level: 'Notions' },
    ],
  },
  {
    name: 'Bases de données',
    items: [
      { name: 'MySQL', level: 'Pratiqué' },
      { name: 'PostgreSQL', level: 'Pratiqué' },
      { name: 'MongoDB', level: 'Pratiqué' },
    ],
  },
  {
    name: 'Systèmes et réseaux',
    items: [
      { name: 'Linux', level: 'Pratiqué' },
      { name: 'SSH / SFTP', level: 'Pratiqué' },
      { name: 'OpenWrt', level: 'Pratiqué' },
      { name: 'DNS', level: 'Pratiqué' },
      { name: 'DHCP', level: 'Pratiqué' },
      { name: 'UFW', level: 'Pratiqué' },
    ],
  },
  {
    name: 'Virtualisation et conteneurs',
    items: [
      { name: 'VirtualBox', level: 'Pratiqué' },
      { name: 'KVM / QEMU', level: 'Pratiqué' },
      { name: 'Docker', level: 'Pratiqué' },
      { name: 'Docker Compose', level: 'Pratiqué' },
      { name: 'Docker Swarm', level: 'Notions' },
    ],
  },
  {
    name: 'Data Science et IA',
    items: [
      { name: 'Python', level: 'En apprentissage' },
      { name: 'Programmation orientée objet', level: 'En apprentissage' },
      { name: 'NumPy', level: 'En apprentissage' },
      { name: 'Pandas', level: 'En apprentissage' },
      { name: 'Mathématiques pour le ML', level: 'En apprentissage' },
    ],
  },
]

// cover : motif d'illustration utilisé tant qu'aucune capture d'écran n'est fournie.
// Les sections vides (difficulties, solutions) ne sont pas affichées : à compléter avec du vrai contenu.
export const projects = [
  {
    slug: 'solidarity-group',
    title: 'Solidarity Group',
    kind: 'Application web de gestion associative',
    status: 'Déployé',
    cover: 'network',
    summary: 'Une plateforme web pour gérer les membres, les cotisations, les activités et les initiatives d’une association solidaire.',
    context: 'Solidarity Group est une association à vocation solidaire dont je suis membre. Ce projet répond à son besoin de disposer d’une plateforme numérique pour organiser sa gestion.',
    problem: 'Comment donner à une association un outil unique pour suivre ses membres, leurs cotisations, ses activités et ses initiatives, avec des accès distincts pour les membres et pour les administrateurs ?',
    objectives: [
      'Centraliser la gestion des membres, des cotisations, des activités et des initiatives.',
      'Offrir un espace membre et un tableau de bord administratif séparés.',
      'Permettre à l’association de gérer elle-même ses contenus, images comprises.',
      'Mettre l’application en ligne.',
    ],
    features: [
      'Gestion des membres',
      'Gestion des cotisations',
      'Gestion des activités',
      'Gestion des initiatives',
      'Espace membre',
      'Tableau de bord administratif',
      'Gestion des contenus',
    ],
    tech: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'HTML5', 'CSS3', 'Git', 'GitHub', 'Vercel'],
    contributions: ['Conception et développement de l’application web complète.', 'Frontend en React et JavaScript, backend en Node.js et Express.', 'Modélisation des données dans MongoDB, avec intégration des images.', 'Déploiement de l’application sur Vercel.'],
    difficulties: [],
    solutions: [],
    skills: ['Conception d’une application full stack', 'Modélisation de données avec MongoDB', 'Séparation des accès membre et administration', 'Gestion des images', 'Déploiement sur Vercel'],
    demo: 'https://solidarity-app-two.vercel.app/',
    repo: null,
  },
  {
    slug: 'bk-coffee-shop',
    title: 'BK Coffee Shop',
    kind: 'Plateforme de commande et de gestion',
    status: 'En cours de développement',
    cover: 'order',
    summary: 'Un site de présentation avec commande en ligne, et un espace d’administration pour suivre les ventes et le personnel.',
    context: 'Projet de plateforme pour un coffee shop : présenter ses produits et ses tarifs, prendre des commandes en ligne et aider à la gestion quotidienne.',
    problem: 'Comment réunir au même endroit la vitrine du commerce, la prise de commande et le suivi des encaissements et du personnel ?',
    objectives: [
      'Présenter les produits et les tarifs sur un site responsive.',
      'Proposer un parcours de commande en ligne.',
      'Donner au gérant un espace d’administration pour piloter l’activité.',
    ],
    features: [
      'Présentation des produits et tarifs',
      'Parcours de commande en ligne',
      'Espace d’administration',
      'Suivi des commandes',
      'Suivi des encaissements et des produits vendus',
      'Gestion du personnel, des horaires et des activités',
    ],
    tech: ['React', 'Node.js', 'Express', 'Neon PostgreSQL'],
    contributions: ['Conception et développement en cours du site, du parcours de commande et de l’espace d’administration.'],
    difficulties: [],
    solutions: [],
    skills: ['Modélisation relationnelle avec PostgreSQL', 'Conception d’un parcours de commande', 'Interface d’administration'],
    demo: null,
    repo: null,
  },
  {
    slug: 'portail-captif-opennds',
    title: 'Portail captif et contrôle d’accès',
    kind: 'Projet académique · L3 ASR, ESMT',
    status: 'Réalisé',
    cover: 'router',
    summary: 'Un routeur OpenWrt virtualisé qui redirige les clients vers un portail captif avant de leur ouvrir l’accès à Internet.',
    context: 'Travail pratique de Licence 3 ASR sur le contrôle d’accès réseau, mené dans un environnement entièrement virtualisé.',
    problem: 'Comment contrôler l’accès à Internet d’un réseau local en imposant le passage par un portail captif ?',
    objectives: [
      'Déployer un routeur OpenWrt avec des interfaces WAN et LAN fonctionnelles.',
      'Installer openNDS et rediriger les clients vers le portail.',
      'Vérifier le comportement avec les outils et journaux du système.',
    ],
    features: [
      'Routeur OpenWrt sous VirtualBox',
      'Interfaces WAN et LAN configurées',
      'Installation et configuration d’openNDS',
      'Portail captif et contrôle de l’accès Internet',
      'Vérification avec ndsctl et les journaux système',
      'Personnalisation du portail',
    ],
    tech: ['OpenWrt', 'openNDS', 'VirtualBox', 'UCI', 'nftables', 'DHCP', 'DNS', 'Shell Linux'],
    contributions: ['Déploiement et configuration de l’ensemble de la chaîne : routeur, interfaces, openNDS, portail.'],
    difficulties: [],
    solutions: [],
    skills: ['Configuration d’OpenWrt avec UCI', 'Contrôle d’accès avec openNDS et nftables', 'Diagnostic par journaux et ndsctl'],
    demo: null,
    repo: null,
  },
  {
    slug: 'ftp-sftp-ubuntu-server',
    title: 'Services FTP et SFTP sous Ubuntu Server',
    kind: 'Projet académique · L2 LTI, ESMT',
    status: 'Réalisé',
    cover: 'lock',
    summary: 'Deux services de transfert de fichiers, FTP et SFTP, avec comptes cloisonnés et accès restreints.',
    context: 'Projet de Licence 2 sur les services de transfert de fichiers et leur sécurisation sur un serveur Ubuntu.',
    problem: 'Comment permettre le transfert de fichiers tout en limitant ce que chaque utilisateur peut voir et faire sur le serveur ?',
    objectives: [
      'Installer et configurer vsftpd et un service SFTP basé sur OpenSSH.',
      'Gérer les comptes et les permissions.',
      'Restreindre les accès et protéger le serveur par un pare-feu.',
    ],
    features: [
      'Installation de vsftpd',
      'Service SFTP basé sur OpenSSH',
      'Gestion des utilisateurs et des permissions',
      'Restriction des accès',
      'Cloisonnement chroot',
      'Restriction du shell',
      'Pare-feu UFW',
      'Tests depuis Windows et FileZilla',
    ],
    tech: ['Ubuntu Server', 'vsftpd', 'OpenSSH', 'UFW', 'VirtualBox', 'FileZilla'],
    contributions: ['Installation, configuration et tests de bout en bout des deux services.'],
    difficulties: [],
    solutions: [],
    skills: ['Administration d’un serveur Linux', 'Sécurisation des accès (chroot, shell, pare-feu)', 'Gestion des utilisateurs et des permissions'],
    demo: null,
    repo: null,
  },
  {
    slug: 'virtualisation-docker-infrastructures',
    title: 'Virtualisation, Docker et infrastructures',
    kind: 'Travaux pratiques · L3 ASR, ESMT',
    status: 'En apprentissage',
    cover: 'layers',
    summary: 'Une série de travaux pratiques, de la machine virtuelle aux conteneurs orchestrés, jusqu’au stockage objet compatible S3.',
    context: 'Travaux pratiques du module Virtualisation et Cloud Computing. Ce sont des exercices d’apprentissage, pas une expertise professionnelle en cloud.',
    problem: 'Comment passer d’une machine physique à des machines virtuelles, puis à des services conteneurisés qu’on peut déployer, exposer et mettre à l’échelle ?',
    objectives: [
      'Créer et administrer des machines virtuelles avec KVM, QEMU et libvirt.',
      'Conteneuriser et déployer des services avec Docker et Docker Compose.',
      'Mutualiser des ressources avec Docker Swarm.',
    ],
    features: [
      'KVM, QEMU et libvirt : création et administration de machines virtuelles',
      'Docker et Docker Compose',
      'Docker Swarm',
      'Déploiement de services',
      'Nginx et reverse proxy',
      'Mise à l’échelle des conteneurs',
      'Stockage objet compatible S3 avec Garage',
    ],
    tech: ['KVM', 'QEMU', 'libvirt', 'Docker', 'Docker Compose', 'Docker Swarm', 'Nginx', 'Garage (S3)'],
    contributions: ['Réalisation des travaux pratiques et rédaction des comptes rendus.'],
    difficulties: [],
    solutions: [],
    skills: ['Virtualisation avec KVM', 'Conteneurisation avec Docker', 'Reverse proxy avec Nginx', 'Stockage objet compatible S3'],
    demo: null,
    repo: null,
  },
]

export const statusTone = (s) => (s === 'Déployé' || s === 'Réalisé' ? 'done' : 'wip')
