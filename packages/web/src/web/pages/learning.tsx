import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, RotateCcw } from "lucide-react";
import { PageIntro, Invitation, ButtonLink, TextLink } from "../components/layout";
import { useContent } from "../queries/school";
import { steps } from "../../shared/content";
const money = (n: number) => `${new Intl.NumberFormat("fr-FR").format(n)} F CFA`;
export function Courses() {
  const { data: c, isLoading, error } = useContent();
  if (isLoading)
    return (
      <div className="loading container" aria-live="polite">
        Chargement des cours…
      </div>
    );
  if (!c || error)
    return (
      <div className="loading container" role="alert">
        Impossible de charger les cours.
      </div>
    );
  return (
    <>
      <PageIntro
        label="LES COURS"
        title="Choisir ce que vous souhaitez apprendre."
        text="Débuter, reprendre ou approfondir : les objectifs se construisent avec vous. Les exemples ci-dessous sont adaptés par l’enseignant selon vos acquis."
      />
      <section className="container course-details">
        {c.courses.map((course, i) => (
          <article className="course-detail" id={`cours-${i}`} key={i}>
            <div>
              <span className="eyebrow">ENSEIGNEMENT 0{i + 1}</span>
              <h2>{course.name}</h2>
              <span className="arabic" lang="ar" dir="rtl">
                {course.arabic}
              </span>
              <p>{course.description}</p>
              <TextLink to={`/contact?cours=${encodeURIComponent(course.name)}`}>
                Choisir ce cours
              </TextLink>
            </div>
            <dl>
              <div>
                <dt>Niveau</dt>
                <dd>{course.level}</dd>
              </div>
              <div>
                <dt>Objectifs d’apprentissage</dt>
                <dd>{course.objectives}</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>{course.format}</dd>
              </div>
              <div>
                <dt>Durée des séances</dt>
                <dd>{course.duration}</dd>
              </div>
              {i === 3 && (
                <div>
                  <dt>Cadre de l’enseignement</dt>
                  <dd>{c.fiqh}</dd>
                </div>
              )}
            </dl>
          </article>
        ))}
      </section>
      <section className="pricing">
        <div className="container">
          <span className="eyebrow">RYTHMES & TARIFS</span>
          <h2>
            Une formule qui trouve
            <br />
            sa place dans votre semaine.
          </h2>
          <p>
            Les frais d’inscription sont distincts de la mensualité. Les horaires et les modalités
            sont convenus lors du premier échange.
          </p>
          <div className="table-scroll">
            <table>
              <caption className="sr-only">Formules et tarifs en francs CFA</caption>
              <thead>
                <tr>
                  <th scope="col">Formule</th>
                  <th scope="col">Rythme</th>
                  <th scope="col">Inscription</th>
                  <th scope="col">Mensualité</th>
                  <th scope="col">
                    <span className="sr-only">Choisir</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.plans.map((p, i) => (
                  <tr key={i}>
                    <th scope="row">
                      {p.name}
                      <small>{p.format}</small>
                    </th>
                    <td>{p.duration}</td>
                    <td>{money(p.registration)}</td>
                    <td>
                      {money(p.monthly)}
                      <small>par mois</small>
                    </td>
                    <td>
                      <Link
                        className="text-link"
                        to={`/contact?formule=${["Standard", "Intensive", "Complète"][i]}`}
                      >
                        Choisir <ArrowRight size={17} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="small-note">
            Cours individuels : modalités à confirmer. Présentiel : {c.address}. Aucun paiement
            n’est demandé sur ce site.
          </p>
        </div>
      </section>
      <Invitation />
    </>
  );
}
const exercises = [
  {
    name: "alif",
    letter: "ا",
    options: ["ب", "ا", "ت"],
    hint: "Alif est un trait vertical, sans point.",
  },
  { name: "bāʾ", letter: "ب", options: ["ت", "ث", "ب"], hint: "Bāʾ possède un point en dessous." },
  {
    name: "tāʾ",
    letter: "ت",
    options: ["ت", "ب", "ا"],
    hint: "Tāʾ possède deux points au-dessus.",
  },
];
function LetterExercise() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);
  const e = exercises[index];
  const right = answer === e.letter;
  return (
    <section id="exercice" className="exercise">
      <div>
        <span className="eyebrow">À VOUS D’ESSAYER · ALPHABET</span>
        <h2>Reconnaître une lettre.</h2>
        <p>
          Observez les formes et les points. Cet exercice de découverte ne remplace pas le travail
          de prononciation avec l’enseignant.
        </p>
        <p className="small-note">Trois lettres à explorer, sans note ni classement.</p>
      </div>
      <div className="exercise-panel">
        {complete ? (
          <>
            <span className="eyebrow">EXERCICE TERMINÉ</span>
            <h3>Trois lettres découvertes.</h3>
            <p>
              Alif, bāʾ et tāʾ : prenez le temps de les revoir avant de poursuivre avec votre
              enseignant.
            </p>
            <button
              className="button"
              onClick={() => {
                setIndex(0);
                setAnswer(null);
                setComplete(false);
              }}
            >
              Recommencer <RotateCcw size={16} />
            </button>
          </>
        ) : (
          <>
            <span className="eyebrow">LETTRE {index + 1} SUR 3</span>
            <h3>
              Où est la lettre <em>{e.name}</em> ?
            </h3>
            <div className="letter-options">
              {e.options.map((l) => (
                <button
                  key={l}
                  aria-label={`Choisir la forme ${l}`}
                  aria-pressed={answer === l}
                  className={answer === l ? "chosen" : ""}
                  onClick={() => setAnswer(l)}
                >
                  <span lang="ar" dir="rtl">
                    {l}
                  </span>
                </button>
              ))}
            </div>
            <div aria-live="polite" className="exercise-response">
              {answer && (
                <p>{right ? `C’est bien ${e.name}. ${e.hint}` : `Regardez à nouveau. ${e.hint}`}</p>
              )}
            </div>
            <button
              className="text-link"
              disabled={!right}
              onClick={() => {
                if (index === 2) setComplete(true);
                else {
                  setIndex(index + 1);
                  setAnswer(null);
                }
              }}
            >
              {index === 2 ? "Terminer l’exercice" : "Lettre suivante"}
              <ArrowRight size={17} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
export function LearningPath() {
  return (
    <>
      <PageIntro
        label="PARCOURS D’APPRENTISSAGE"
        title="Chaque étape compte."
        text="De l’alphabet à une lecture plus fluide du Coran, un parcours progressif construit avec votre enseignant. Vous commencez à l’étape qui correspond à vos acquis."
      />
      <section className="container">
        <div className="learning-steps">
          {steps.map((s, i) => (
            <article key={i}>
              <span className="big-number">0{i + 1}</span>
              <div>
                <span className="eyebrow">{s.label}</span>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
                <div className="practice">
                  <strong>Une idée d’exercice</strong>
                  <p>{s.exercise}</p>
                </div>
              </div>
              <span className="step-label">
                {i === 0 ? "Découvrir" : i === 1 ? "Relier" : i === 2 ? "Pratiquer" : "Approfondir"}
              </span>
            </article>
          ))}
        </div>
        <p className="small-note">
          Les exercices proposés sont des exemples modifiables. Aucun délai de progression n’est
          imposé : la régularité, les acquis et les besoins de l’élève guident le parcours.
        </p>
        <LetterExercise />
        <div className="study-note">
          <span className="eyebrow">ENTRE DEUX COURS</span>
          <h3>Un peu de pratique, régulièrement.</h3>
          <p>
            Reprenez l’exercice du dernier cours, notez les difficultés et apportez vos questions à
            la prochaine séance. Pour les enfants, un adulte peut accompagner ce moment sans se
            substituer à l’enseignant.
          </p>
        </div>
      </section>
      <Invitation />
    </>
  );
}
export function About() {
  const { data: c, isLoading } = useContent();
  if (isLoading)
    return (
      <p className="container loading" aria-live="polite">
        Chargement de la présentation…
      </p>
    );
  if (!c)
    return (
      <p className="container loading" role="alert">
        Présentation indisponible.
      </p>
    );
  return (
    <>
      <PageIntro
        label="À PROPOS"
        title="Un enseignant à vos côtés."
        text="Faire connaissance est une première étape importante. Voici la présentation de votre enseignant et les principes qui guident l’accompagnement."
      />
      <section className="container about-grid">
        <div className="about-photo">
          <img src="/images/ouztaaz.jpg" alt={c.teacher} />
          <div className="portrait-caption">
            <strong>{c.teacher}</strong>
            <span>{c.city}, Sénégal</span>
          </div>
        </div>
        <div>
          <span className="eyebrow">VOTRE ENSEIGNANT</span>
          <h2>{c.teacher}</h2>
          <p>{c.bio}</p>
          <dl className="bio-list">
            <div>
              <dt>Expérience</dt>
              <dd>{c.experience}</dd>
            </div>
            <div>
              <dt>Diplômes et formations</dt>
              <dd>{c.qualifications}</dd>
            </div>
            <div>
              <dt>Lieu d’enseignement</dt>
              <dd>
                {c.city} · En ligne et à domicile
                <br />
                {c.address}
              </dd>
            </div>
          </dl>
          <ButtonLink to="/contact">Faire connaissance</ButtonLink>
        </div>
      </section>
      <section className="method">
        <div className="container">
          <span className="eyebrow">UNE APPROCHE ATTENTIVE</span>
          <h2>
            Expliquer clairement.
            <br />
            Pratiquer ensemble.
          </h2>
          <div className="about-principles">
            <div>
              <h3>Respecter chaque élève</h3>
              <p>
                L’âge et le niveau guident la façon d’expliquer. Chacun peut poser ses questions et
                avancer sans comparaison avec les autres.
              </p>
            </div>
            <div>
              <h3>Construire les acquis</h3>
              <p>
                Les nouvelles notions s’appuient sur ce qui est déjà compris, avec des exercices et
                des révisions adaptés.
              </p>
            </div>
          </div>
          <div className="religious-note">
            <h3>Le cadre des cours de fiqh</h3>
            <p>{c.fiqh}</p>
            <p>
              Le site présente une offre pédagogique. Il ne fournit pas d’avis religieux
              personnalisé.
            </p>
          </div>
        </div>
      </section>
      <Invitation />
    </>
  );
}
const faqGroups = [
  {
    name: "Commencer",
    questions: [
      [
        "Faut-il déjà connaître l’arabe ?",
        "Non pour le cours d’arabe débutant : vous pouvez commencer par l’alphabet. Pour la lecture du Coran et le tajwid, l’enseignant fait le point sur vos acquis afin de choisir le bon départ.",
      ],
      [
        "Comment connaître mon niveau ?",
        "Indiquez « Je ne sais pas encore » dans le formulaire. Le premier échange permet de préciser vos besoins et les notions déjà acquises.",
      ],
      [
        "Puis-je reprendre après une longue pause ?",
        "Oui. Le contenu et les révisions sont adaptés à votre niveau actuel, sans obligation de reprendre tout le parcours.",
      ],
    ],
  },
  {
    name: "Enfants et organisation",
    questions: [
      [
        "À partir de quel âge les enfants sont-ils accueillis ?",
        "Les enfants sont accueillis dès 6 ans. Le cours est ajusté à leur âge et à leur attention. Pour un mineur, la demande et les échanges sont assurés par un parent ou un responsable.",
      ],
      [
        "Quel matériel faut-il prévoir ?",
        "Un cahier et un stylo pour tous les cours. En ligne, prévoyez un téléphone, une tablette ou un ordinateur, une connexion stable et un endroit calme. Les supports de lecture sont précisés par l’enseignant avant le début.",
      ],
      [
        "Les cours sont-ils en ligne ou en présentiel ?",
        "Les deux possibilités sont proposées : en ligne ou à domicile à Dakar. L’adresse, la zone de déplacement et les modalités du présentiel sont à confirmer lors du premier échange.",
      ],
      [
        "Comment sont fixés les horaires ?",
        "Vous indiquez vos disponibilités dans le formulaire. L’enseignant vous contacte pour convenir d’un créneau ; aucun horaire n’est réservé automatiquement.",
      ],
    ],
  },
  {
    name: "Programme et inscription",
    questions: [
      [
        "Quelle école juridique est enseignée en fiqh ?",
        "L’école malikite. Le programme, les sujets et les supports sont précisés par l’enseignant. Aucun avis religieux personnalisé n’est délivré sur le site.",
      ],
      [
        "Quels sont les tarifs ?",
        "Les formules Standard et Intensive sont proposées en ligne ; la formule Complète est proposée à domicile. Consultez la rubrique « Rythmes & tarifs » de la page Cours pour les montants actuellement publiés. Les frais d’inscription sont distincts de la mensualité.",
      ],
      [
        "Le premier échange m’engage-t-il à m’inscrire ?",
        "Non. Il sert à poser vos questions et à préciser le cours, les horaires et les conditions. Les modalités de paiement, d’absence et d’annulation sont à confirmer avec l’enseignant avant toute inscription.",
      ],
      [
        "Qui peut consulter ma demande ?",
        "Seul l’enseignant autorisé peut consulter les demandes dans l’administration. Les coordonnées servent à vous recontacter. Vous pouvez demander la correction ou la suppression de votre demande par e-mail.",
      ],
    ],
  },
];
export function FAQ() {
  return (
    <>
      <PageIntro
        label="QUESTIONS FRÉQUENTES"
        title="Avant de commencer."
        text="Quelques réponses pour préparer votre apprentissage. Si votre question n’est pas ici, le premier échange est l’occasion d’en parler."
      />
      <section className="container faq-content">
        {faqGroups.map((g) => (
          <div className="faq-group" key={g.name}>
            <h2>{g.name}</h2>
            <div>
              {g.questions.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span aria-hidden="true" className="plus">
                      +
                    </span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
        <div className="study-note">
          <h3>Une autre question ?</h3>
          <TextLink to="/contact">Demander des informations</TextLink>
        </div>
      </section>
      <Invitation />
    </>
  );
}
