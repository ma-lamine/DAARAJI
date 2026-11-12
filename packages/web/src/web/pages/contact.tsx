import { useState } from "react";
import { ArrowUpRight, ArrowRight, Mail, MessageCircle } from "lucide-react";
import { PageIntro } from "../components/layout";
import { useSubmit } from "../queries/school";

export default function Contact() {
  const params = new URLSearchParams(window.location.search);
  const initialCourse = params.get("cours") || "À définir ensemble";
  const initialPlan = params.get("formule") || "À définir ensemble";
  const [age, setAge] = useState("18 ans et plus");
  const [channel, setChannel] = useState("E-mail");
  const [format, setFormat] = useState(initialPlan === "Complète" ? "À domicile" : "En ligne");
  const [plan, setPlan] = useState(initialPlan);
  const submit = useSubmit();
  const [localError, setLocalError] = useState("");
  const minor = age !== "18 ans et plus";
  const send = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError("");
    const f = new FormData(event.currentTarget);
    const val = (key: string) => String(f.get(key) || "").trim();
    if (
      (plan === "Complète" && format === "En ligne") ||
      ((plan === "Standard" || plan === "Intensive") && format === "À domicile")
    ) {
      setLocalError(
        "Choisissez une formule correspondant au format souhaité, ou « À définir ensemble ».",
      );
      return;
    }
    submit.mutate({
      accompaniment: val("accompaniment") as "Cours individuels",
      name: val("name"),
      age: age as "18 ans et plus",
      guardian: val("guardian"),
      email: val("email"),
      phone: val("phone"),
      level: val("level") as "Débutant",
      course: val("course") as "Langue arabe",
      format: format as "En ligne",
      plan: plan as "Standard",
      availability: val("availability"),
      message: val("message"),
      channel: channel as "E-mail",
      consent: true,
      website: val("website"),
    });
  };
  return (
    <>
      <PageIntro
        label="CONTACT & INSCRIPTION"
        title="Commençons par un échange."
        text="Présentez-nous votre projet d’apprentissage. OUZTAAZ pourra vous recontacter par e-mail ou sur WhatsApp pour préciser le cours et les disponibilités."
      />
      <section className="container contact-grid">
        <aside>
          <span className="eyebrow">EN TOUTE SIMPLICITÉ</span>
          <h2>
            Une question,
            <br />
            un premier pas.
          </h2>
          <p>
            Aucun paiement sur ce site, aucune réservation automatique. Nous convenons des modalités
            ensemble avant l’inscription.
          </p>
          <div className="contact-method">
            <Mail size={20} />
            <div>
              <strong>Par e-mail</strong>
              <a href="mailto:laminebarrandiaye1@gmail.com">
                laminebarrandiaye1@gmail.com <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <div className="contact-method">
            <MessageCircle size={20} />
            <div>
              <strong>Sur WhatsApp</strong>
              <a href="https://wa.me/221767263149" target="_blank" rel="noreferrer">
                +221 76 726 31 49 <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <p className="small-note">
            À Dakar, en ligne ou à domicile.
            <br />
            [Zones de déplacement à préciser]
          </p>
        </aside>
        <div className="form-wrap">
          {submit.isSuccess ? (
            <div className="success" aria-live="polite">
              <span className="eyebrow">DEMANDE ENREGISTRÉE</span>
              <h2>Merci pour votre message.</h2>
              <p>
                Votre demande est bien enregistrée dans l’espace privé de l’enseignant. Aucun
                créneau n’est encore réservé.
              </p>
              <p>
                Pour poursuivre directement le premier échange, vous pouvez contacter OUZTAAZ sur
                WhatsApp ou par e-mail.
              </p>
              <a
                className="button"
                href="https://wa.me/221767263149?text=Bonjour%20OUZTAAZ%2C%20je%20viens%20de%20remplir%20le%20formulaire%20sur%20DAARA%20JI."
                target="_blank"
                rel="noreferrer"
              >
                Continuer sur WhatsApp <ArrowUpRight size={17} />
              </a>
              <button className="text-link" onClick={() => submit.reset()}>
                Faire une autre demande
              </button>
            </div>
          ) : (
            <form onSubmit={send}>
              <span className="eyebrow">VOTRE DEMANDE</span>
              <p className="small-note">Les champs marqués * sont obligatoires.</p>
              <div className="form-grid">
                <label>
                  Prénom de l’élève *
                  <input
                    aria-label="Prénom de l’élève"
                    name="name"
                    required
                    maxLength={100}
                    autoComplete="name"
                  />
                </label>
                <label>
                  Tranche d’âge *
                  <select name="age" value={age} onChange={(e) => setAge(e.target.value)}>
                    <option>6–11 ans</option>
                    <option>12–17 ans</option>
                    <option>18 ans et plus</option>
                  </select>
                </label>
                {minor && (
                  <label className="full">
                    Nom du parent ou du responsable *
                    <input
                      aria-label="Nom du parent ou du responsable"
                      name="guardian"
                      required
                      maxLength={200}
                      autoComplete="name"
                    />
                    <small>
                      Le responsable remplit la demande et sera le contact de l’enseignant.
                    </small>
                  </label>
                )}
                <label>
                  {minor ? "E-mail du responsable" : "Votre e-mail"} *
                  <input
                    aria-label={minor ? "E-mail du responsable" : "Votre e-mail"}
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    maxLength={254}
                  />
                </label>
                <label>
                  Numéro WhatsApp {channel === "WhatsApp" ? "*" : "(facultatif)"}
                  <input
                    aria-label="Numéro WhatsApp"
                    type="tel"
                    name="phone"
                    required={channel === "WhatsApp"}
                    autoComplete="tel"
                    placeholder="+221 …"
                    maxLength={40}
                  />
                </label>
                <label>
                  Niveau actuel *
                  <select name="level">
                    <option>Débutant</option>
                    <option>Intermédiaire</option>
                    <option>Avancé</option>
                    <option>Je ne sais pas encore</option>
                  </select>
                </label>
                <label>
                  Cours souhaité *
                  <select name="course" defaultValue={initialCourse}>
                    <option>À définir ensemble</option>
                    <option>Langue arabe</option>
                    <option>Lecture du Coran</option>
                    <option>Tajwid</option>
                    <option>Bases du fiqh</option>
                  </select>
                </label>
                <label>
                  Format souhaité *
                  <select
                    name="format"
                    value={format}
                    onChange={(e) => {
                      setFormat(e.target.value);
                      setPlan("À définir ensemble");
                    }}
                  >
                    <option>En ligne</option>
                    <option>À domicile</option>
                    <option>Présentiel à préciser</option>
                  </select>
                </label>
                <label>
                  Formule souhaitée *
                  <select name="plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
                    <option>À définir ensemble</option>
                    {format !== "À domicile" && (
                      <>
                        <option>Standard</option>
                        <option>Intensive</option>
                      </>
                    )}
                    {format !== "En ligne" && <option>Complète</option>}
                  </select>
                </label>
                <label className="full">
                  Accompagnement souhaité *
                  <select name="accompaniment">
                    <option>Cours individuels</option>
                    <option>À préciser ensemble</option>
                  </select>
                </label>
                <label className="full">
                  Vos disponibilités *
                  <textarea
                    aria-label="Vos disponibilités"
                    name="availability"
                    required
                    maxLength={1200}
                    rows={3}
                    placeholder="Exemple : mardi et jeudi après 18 h, ou samedi matin."
                  />
                </label>
                <label className="full">
                  Une précision à partager (facultatif)
                  <textarea
                    aria-label="Une précision à partager"
                    name="message"
                    maxLength={2000}
                    rows={3}
                    placeholder="Vos objectifs ou vos questions. Évitez les informations sensibles."
                  />
                </label>
                <label className="full">
                  Premier échange souhaité *
                  <select value={channel} onChange={(e) => setChannel(e.target.value)}>
                    <option>E-mail</option>
                    <option>WhatsApp</option>
                  </select>
                </label>
              </div>
              <div className="honeypot" aria-hidden="true">
                <label>
                  Site web
                  <input aria-label="Site web" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <label className="consent">
                <input
                  aria-label="Consentement au traitement de la demande et confirmation du responsable pour un mineur"
                  type="checkbox"
                  required
                  name="consent"
                />
                <span>
                  J’accepte que l’enseignant conserve ces informations pour traiter ma demande et me
                  recontacter. Pour un mineur, je suis son parent ou son responsable. *
                </span>
              </label>
              <p className="small-note">
                Les demandes sont consultées dans l’espace privé de l’enseignant. Aucun e-mail
                automatique de notification n’est envoyé.
              </p>
              {(submit.error || localError) && (
                <p role="alert" className="error">
                  {localError ||
                    submit.error?.message ||
                    "Votre demande n’a pas pu être enregistrée. Veuillez réessayer."}
                </p>
              )}
              <button type="submit" className="button" disabled={submit.isPending}>
                {submit.isPending ? "Enregistrement…" : "Demander un premier échange"}
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </section>
      <section id="confidentialite" className="container privacy">
        <span className="eyebrow">VOS INFORMATIONS</span>
        <h2>Confidentialité des demandes</h2>
        <p>
          Responsable du traitement : OUZTAAZ, Dakar. Contact :{" "}
          <a href="mailto:laminebarrandiaye1@gmail.com">laminebarrandiaye1@gmail.com</a>. Les
          informations transmises servent uniquement à organiser les cours et le premier échange.
          Les demandes sont enregistrées dans une base de données accessible depuis l’espace
          d’administration protégé.
        </p>
        <p>
          Pour demander l’accès, la correction ou la suppression de vos informations, écrivez à
          l’adresse ci-dessus. [Durée de conservation à préciser avant la mise en service publique].
          N’indiquez pas de données sensibles dans votre message.
        </p>
      </section>
    </>
  );
}
