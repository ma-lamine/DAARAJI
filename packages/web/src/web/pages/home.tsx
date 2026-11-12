import { Link } from "wouter";
import { ArrowUpRight, BookOpen, Monitor, MapPin } from "lucide-react";
import { ButtonLink, TextLink, Invitation } from "../components/layout";
import { useContent } from "../queries/school";
import { steps } from "../../shared/content";
export default function Home() {
  const { data: c, isLoading, error } = useContent();
  if (isLoading)
    return (
      <div className="container loading" aria-live="polite">
        Préparation de votre espace d’apprentissage…
      </div>
    );
  if (error || !c)
    return (
      <div className="container loading" role="alert">
        Les contenus ne sont pas disponibles. Veuillez réessayer.
      </div>
    );
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="little-line" /> LE SAVOIR, PAS À PAS
          </span>
          <h1>
            Apprendre avec sens.
            <br />
            <em>
              Grandir avec
              <br className="desktop-break" /> confiance.
            </em>
          </h1>
          <p>{c.intro}</p>
          <ButtonLink to="/cours">Découvrir les cours</ButtonLink>
          <div className="hero-meta">
            <span>Enfants dès 6 ans & adultes</span>
            <i />
            <span>Tous niveaux</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="portrait-top">
            <span>VOTRE ENSEIGNANT</span>
            <span lang="ar" dir="rtl">
              أهلاً وسهلاً
            </span>
          </div>
          <img
            src="/images/ouztaaz.jpg"
            alt={`${c.teacher}, enseignant à ${c.city}`}
            fetchPriority="high"
          />
          <div className="portrait-caption">
            <div>
              <strong>{c.teacher}</strong>
              <span>Enseignant · {c.city}</span>
            </div>
            <Link to="/a-propos" aria-label="Faire connaissance avec l’enseignant">
              <ArrowUpRight size={25} />
            </Link>
          </div>
          <div className="portrait-note">
            <BookOpen size={17} />
            <span>Un accompagnement humain, à votre rythme.</span>
          </div>
        </div>
      </section>
      <div className="learning-strip">
        <div className="container">
          <span>
            <span className="strip-line" /> Un parcours adapté à votre niveau
          </span>
          <span>
            <Monitor size={17} /> Cours en ligne
          </span>
          <span>
            <MapPin size={17} /> À domicile à Dakar
          </span>
          <span>Débuter, reprendre, approfondir</span>
        </div>
      </div>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LES ENSEIGNEMENTS</span>
            <h2>
              Des bases solides.
              <br />
              Un savoir qui se construit.
            </h2>
          </div>
          <p>
            Quatre enseignements complémentaires,
            <br />
            un même engagement : vous accompagner
            <br />
            avec clarté et attention.
          </p>
        </div>
        <div className="course-index">
          {c.courses.map((course, i) => (
            <Link key={i} to={`/cours#cours-${i}`} className="course-line">
              <span className="number">0{i + 1}</span>
              <div>
                <h3>{course.name}</h3>
                <p>{course.description}</p>
              </div>
              <span className="arabic" lang="ar" dir="rtl">
                {course.arabic}
              </span>
              <ArrowUpRight size={23} />
            </Link>
          ))}
        </div>
        <div className="end-link">
          <TextLink to="/cours">Voir les objectifs et les formules</TextLink>
        </div>
      </section>
      <section className="method">
        <div className="container method-grid">
          <div>
            <span className="eyebrow">NOTRE APPROCHE</span>
            <h2>
              Prendre le temps
              <br />
              de <em>bien apprendre.</em>
            </h2>
            <p>
              Chacun arrive avec son histoire et ses acquis. Le premier échange permet de choisir un
              cours adapté et de fixer des étapes accessibles.
            </p>
            <TextLink to="/a-propos">Rencontrer votre enseignant</TextLink>
          </div>
          <div className="method-list">
            <article>
              <span>01</span>
              <div>
                <h3>Un point de départ juste</h3>
                <p>
                  Nous faisons le point sur votre niveau, sans jugement et sans prérequis pour
                  débuter l’arabe.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Apprendre, puis pratiquer</h3>
                <p>
                  Une explication simple, un exercice guidé, puis une révision pour consolider les
                  acquis.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Avancer à votre rythme</h3>
                <p>
                  Le contenu s’ajuste à l’âge, aux disponibilités et aux besoins de chaque élève.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">VOTRE PARCOURS</span>
            <h2>
              Une lettre aujourd’hui.
              <br />
              Une nouvelle étape demain.
            </h2>
          </div>
          <TextLink to="/parcours">Explorer le parcours</TextLink>
        </div>
        <div className="path-preview">
          {steps.map((s, i) => (
            <div key={i}>
              <span className="path-number">0{i + 1}</span>
              <span className="eyebrow">{s.label}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <p className="small-note">
          Les étapes sont des repères : leur durée dépend de vos acquis et de la pratique.
        </p>
      </section>
      <section className="first-letter container">
        <div>
          <span className="eyebrow">UN PREMIER PAS, DÈS MAINTENANT</span>
          <h2>
            Et si vous commenciez
            <br />
            par une lettre ?
          </h2>
          <p>Un petit exercice pour découvrir l’alphabet, sans compte ni inscription.</p>
          <TextLink to="/parcours#exercice">Essayer l’exercice</TextLink>
        </div>
        <div className="letter-art" aria-label="La lettre arabe alif">
          <span lang="ar" dir="rtl">
            ا
          </span>
          <div>
            <strong>Alif</strong>
            <span>Une première lettre à reconnaître.</span>
          </div>
        </div>
      </section>
      <Invitation />
    </>
  );
}
