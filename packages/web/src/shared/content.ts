import { z } from "zod";

export const contentSchema = z.object({
  teacher: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  intro: z.string().min(1).max(1200),
  bio: z.string().min(1).max(4000),
  experience: z.string().max(2000),
  qualifications: z.string().max(2000),
  fiqh: z.string().max(2000),
  address: z.string().max(300),
  courses: z
    .array(
      z.object({
        name: z.string().min(1).max(100),
        arabic: z.string().max(100),
        description: z.string().max(600),
        level: z.string().max(200),
        objectives: z.string().max(1200),
        duration: z.string().max(300),
        format: z.string().max(300),
      }),
    )
    .length(4),
  plans: z
    .array(
      z.object({
        name: z.string().min(1).max(100),
        format: z.string().max(100),
        duration: z.string().max(200),
        registration: z.number().int().min(0).max(10000000),
        monthly: z.number().int().min(0).max(10000000),
      }),
    )
    .length(3),
});
export type SiteContent = z.infer<typeof contentSchema>;
export const defaults: SiteContent = {
  teacher: "OUZTAAZ",
  city: "Dakar",
  intro:
    "Des cours d’arabe, de lecture du Coran et de fiqh, pour les enfants dès 6 ans et les adultes. Un accompagnement attentif, à votre rythme et selon votre niveau.",
  bio: "[Biographie de l’enseignant à compléter]",
  experience: "[Expérience pédagogique à compléter]",
  qualifications: "[Diplômes et formations à compléter]",
  fiqh: "Les bases du fiqh sont enseignées selon l’école malikite. Les sujets, les supports et les références seront précisés par l’enseignant : [Programme détaillé à compléter].",
  address: "[Adresse et zones de déplacement à préciser]",
  courses: [
    {
      name: "Langue arabe",
      arabic: "العربية",
      description: "De vos premières lettres à la compréhension de phrases simples.",
      level: "Débutant, intermédiaire et avancé",
      objectives:
        "Reconnaître les lettres ; associer sons et écriture ; enrichir le vocabulaire ; lire des phrases adaptées au niveau.",
      duration: "30 min en ligne ; séances de 2 h à domicile selon la formule.",
      format: "En ligne ou à domicile ; accompagnement individuel à préciser.",
    },
    {
      name: "Lecture du Coran",
      arabic: "القرآن",
      description: "Construire une lecture attentive, avec un accompagnement pas à pas.",
      level: "Débutant après acquisition de l’alphabet, intermédiaire et avancé",
      objectives:
        "Assembler lettres et voyelles ; lire progressivement ; pratiquer une lecture suivie avec les corrections de l’enseignant.",
      duration: "30 min en ligne ; séances de 2 h à domicile selon la formule.",
      format: "En ligne ou à domicile ; rythme adapté à l’élève.",
    },
    {
      name: "Tajwid",
      arabic: "التجويد",
      description: "Travailler la prononciation et les règles de récitation progressivement.",
      level: "Premières bases de lecture acquises ; intermédiaire et avancé",
      objectives:
        "Être attentif à l’articulation ; découvrir les règles étudiées avec l’enseignant ; s’exercer à partir du support choisi en cours.",
      duration: "30 min en ligne ; séances de 2 h à domicile selon la formule.",
      format: "En ligne ou à domicile ; pratique guidée par l’enseignant.",
    },
    {
      name: "Bases du fiqh",
      arabic: "الفقه",
      description: "Une introduction structurée à la jurisprudence islamique.",
      level: "Débutant, intermédiaire et avancé selon le programme",
      objectives:
        "Découvrir les notions du programme malikite ; comprendre les termes étudiés ; poser ses questions à l’enseignant.",
      duration: "30 min en ligne ; séances de 2 h à domicile selon la formule.",
      format: "En ligne ou à domicile ; programme à convenir avec l’enseignant.",
    },
  ],
  plans: [
    {
      name: "Standard",
      format: "En ligne",
      duration: "30 min par séance · 2 fois par semaine",
      registration: 10000,
      monthly: 10000,
    },
    {
      name: "Intensive",
      format: "En ligne",
      duration: "30 min par séance · 4 fois par semaine",
      registration: 15000,
      monthly: 15000,
    },
    {
      name: "Complète",
      format: "À domicile",
      duration: "2 h par séance · 2 fois par semaine",
      registration: 25000,
      monthly: 25000,
    },
  ],
};

export const steps = [
  {
    title: "Reconnaître les lettres",
    text: "Découvrir l’alphabet arabe, le nom des lettres et leurs formes.",
    exercise: "Repérer une lettre parmi trois propositions.",
    label: "Alphabet",
  },
  {
    title: "Assembler les sons",
    text: "Étudier les voyelles courtes et relier les lettres à l’aide du support de cours.",
    exercise: "Lire lentement les syllabes préparées par l’enseignant.",
    label: "Premières lectures",
  },
  {
    title: "Lire avec attention",
    text: "Passer aux mots puis à des passages choisis selon les acquis.",
    exercise: "Relire un passage court et noter les points à revoir ensemble.",
    label: "Lecture accompagnée",
  },
  {
    title: "Affiner sa récitation",
    text: "Travailler les règles de tajwid étudiées et développer une lecture plus fluide.",
    exercise: "Répéter un passage avec les corrections de l’enseignant.",
    label: "Approfondissement",
  },
];
