import { useEffect, useState } from "react";
import { authClient } from "../lib/auth";
import {
  useAdmin,
  useContent,
  useRequests,
  useSave,
  useStatus,
  useSetPassword,
} from "../queries/school";
import { PageIntro } from "../components/layout";
import type { SiteContent } from "../../shared/content";
function ContentEditor({ content }: { content: SiteContent }) {
  const [draft, setDraft] = useState<SiteContent>(() => structuredClone(content));
  const save = useSave();
  const fields: {
    key:
      | "teacher"
      | "city"
      | "intro"
      | "bio"
      | "experience"
      | "qualifications"
      | "fiqh"
      | "address";
    label: string;
  }[] = [
    { key: "teacher", label: "Nom de l’enseignant" },
    { key: "city", label: "Ville" },
    { key: "intro", label: "Présentation de l’accueil" },
    { key: "bio", label: "Biographie" },
    { key: "experience", label: "Expérience" },
    { key: "qualifications", label: "Diplômes et formations (uniquement vérifiés)" },
    { key: "fiqh", label: "Cadre et programme du fiqh" },
    { key: "address", label: "Adresse et zones de déplacement" },
  ];
  return (
    <form
      className="editor"
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate(draft);
      }}
    >
      <h2>Présentation et programme</h2>
      <p>
        Ne mentionnez que les informations exactes. Les champs entre crochets peuvent rester en
        attente.
      </p>
      <div className="form-grid">
        {fields.map((f) => (
          <label className={f.key === "teacher" || f.key === "city" ? "" : "full"} key={f.key}>
            {f.label}
            <textarea
              aria-label={f.label}
              rows={f.key === "teacher" || f.key === "city" ? 1 : 3}
              value={draft[f.key]}
              onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
              required={["teacher", "city", "intro", "bio"].includes(f.key)}
            />
          </label>
        ))}
      </div>
      <h2>Les enseignements</h2>
      {draft.courses.map((course, i) => (
        <fieldset key={i}>
          <legend>
            Enseignement {i + 1} — {course.name}
          </legend>
          <div className="form-grid">
            {(Object.keys(course) as (keyof typeof course)[]).map((k) => (
              <label key={k} className={k === "objectives" || k === "description" ? "full" : ""}>
                {
                  {
                    name: "Nom",
                    arabic: "Intitulé arabe",
                    description: "Présentation",
                    level: "Niveau",
                    objectives: "Objectifs",
                    duration: "Durée",
                    format: "Format",
                  }[k]
                }
                <textarea
                  aria-label={`Enseignement ${i + 1} : ${k}`}
                  rows={k === "objectives" ? 3 : 2}
                  value={course[k]}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      courses: draft.courses.map((x, j) =>
                        j === i ? { ...x, [k]: e.target.value } : x,
                      ),
                    })
                  }
                  required={k === "name"}
                />
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <h2>Formules et tarifs</h2>
      {draft.plans.map((plan, i) => (
        <fieldset key={i}>
          <legend>Formule {i + 1}</legend>
          <div className="form-grid">
            {(["name", "format", "duration"] as const).map((k) => (
              <label className={k === "duration" ? "full" : ""} key={k}>
                {{ name: "Nom affiché", format: "Format", duration: "Durée et fréquence" }[k]}
                <input
                  aria-label={`Formule ${i + 1} : ${k}`}
                  required
                  value={plan[k]}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      plans: draft.plans.map((x, j) =>
                        j === i ? { ...x, [k]: e.target.value } : x,
                      ),
                    })
                  }
                />
              </label>
            ))}
            {(["registration", "monthly"] as const).map((k) => (
              <label key={k}>
                {k === "registration" ? "Inscription" : "Mensualité"} (F CFA)
                <input
                  aria-label={k === "registration" ? "Inscription en F CFA" : "Mensualité en F CFA"}
                  type="number"
                  required
                  min={0}
                  max={10000000}
                  value={plan[k]}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      plans: draft.plans.map((x, j) =>
                        j === i ? { ...x, [k]: Number(e.target.value) } : x,
                      ),
                    })
                  }
                />
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <p className="small-note">
        Les noms affichés peuvent être modifiés. Les choix du formulaire restent Standard, Intensive
        et Complète pour identifier les trois formules.
      </p>
      {save.error && (
        <p className="error" role="alert">
          Enregistrement impossible : {save.error.message}
        </p>
      )}
      {save.isSuccess && (
        <p aria-live="polite">Les contenus ont été enregistrés et sont maintenant publiés.</p>
      )}
      <button className="button" disabled={save.isPending}>
        {save.isPending ? "Enregistrement…" : "Enregistrer les contenus"}
      </button>
    </form>
  );
}
function RequestList() {
  const requests = useRequests(true);
  const status = useStatus();
  const [filter, setFilter] = useState("Tous");
  if (requests.isLoading) return <p aria-live="polite">Chargement des demandes…</p>;
  if (requests.error)
    return (
      <p className="error" role="alert">
        Impossible de charger les demandes : {requests.error.message}
      </p>
    );
  const data = requests.data || [];
  return (
    <>
      <div className="admin-list-heading">
        <h2>Demandes d’informations</h2>
        <label>
          Filtrer par statut
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {["Tous", "Nouveau", "Contacté", "Inscrit", "Archivé"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <p>
        {data.length} demande{data.length > 1 ? "s" : ""} enregistrée{data.length > 1 ? "s" : ""}.
        Ces informations sont privées.
      </p>
      {status.error && (
        <p role="alert" className="error">
          Mise à jour impossible : {status.error.message}
        </p>
      )}
      {data
        .filter((r) => filter === "Tous" || r.status === filter)
        .map((r) => (
          <article className="request" key={r.id}>
            <div className="request-head">
              <div>
                <span className="eyebrow">{new Date(r.createdAt).toLocaleDateString("fr-FR")}</span>
                <h3>
                  {r.name} · {r.age}
                </h3>
              </div>
              <label>
                Statut
                <select
                  disabled={status.isPending}
                  value={r.status}
                  onChange={(e) => status.mutate({ id: r.id, status: e.target.value as "Nouveau" })}
                >
                  {["Nouveau", "Contacté", "Inscrit", "Archivé"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>
            <dl className="request-data">
              <div>
                <dt>Contact</dt>
                <dd>
                  {r.guardian && (
                    <>
                      Responsable : {r.guardian}
                      <br />
                    </>
                  )}
                  <a href={`mailto:${r.email}`}>{r.email}</a>
                  <br />
                  {r.phone} · Échange par {r.channel}
                </dd>
              </div>
              <div>
                <dt>Apprentissage</dt>
                <dd>
                  {r.course} · {r.level}
                  <br />
                  {r.format} · {r.plan}
                  <br />
                  {r.accompaniment}
                </dd>
              </div>
              <div>
                <dt>Disponibilités</dt>
                <dd>{r.availability}</dd>
              </div>
              {r.message && (
                <div>
                  <dt>Message</dt>
                  <dd>{r.message}</dd>
                </div>
              )}
            </dl>
          </article>
        ))}
      {data.filter((r) => filter === "Tous" || r.status === filter).length === 0 && (
        <div className="study-note">Aucune demande à afficher.</div>
      )}
    </>
  );
}
function PasswordSetup() {
  const setup = useSetPassword();
  const [error, setError] = useState("");
  return (
    <details className="password-setup">
      <summary>Activer une connexion par mot de passe</summary>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          const data = new FormData(e.currentTarget);
          const password = String(data.get("password"));
          if (password !== data.get("confirm")) {
            setError("Les deux mots de passe doivent correspondre.");
            return;
          }
          setup.mutate({ password });
        }}
      >
        <p className="small-note">
          Après votre première connexion Google, vous pouvez ajouter un mot de passe. Il est protégé
          par hachage et n’est jamais affiché. Si un mot de passe existe déjà, utilisez la connexion
          correspondante ou continuez avec Google.
        </p>
        <label>
          Nouveau mot de passe (12 caractères minimum)
          <input
            aria-label="Nouveau mot de passe"
            type="password"
            name="password"
            required
            minLength={12}
            maxLength={128}
            autoComplete="new-password"
          />
        </label>
        <label>
          Confirmer le mot de passe
          <input
            aria-label="Confirmer le mot de passe"
            type="password"
            name="confirm"
            required
            minLength={12}
            maxLength={128}
            autoComplete="new-password"
          />
        </label>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        {setup.error && (
          <p role="alert" className="error">
            Activation impossible. Un mot de passe existe peut-être déjà, ou votre connexion doit
            être renouvelée.
          </p>
        )}
        {setup.isSuccess && <p aria-live="polite">Votre connexion par mot de passe est activée.</p>}
        <button className="button" disabled={setup.isPending || setup.isSuccess}>
          {setup.isPending ? "Activation…" : "Activer le mot de passe"}
        </button>
      </form>
    </details>
  );
}
export default function Admin() {
  const { data: session, isPending } = authClient.useSession();
  const access = useAdmin(!!session);
  const content = useContent();
  const [tab, setTab] = useState("demandes");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    void authClient.managedAuth
      .handleRedirect()
      .catch(() => setError("Le retour de connexion n’a pas abouti. Veuillez réessayer."));
  }, []);
  async function google() {
    setBusy(true);
    setError("");
    try {
      const result = await authClient.managedAuth.signIn({ provider: "google" });
      if (result.error && result.error.code !== "POPUP_CLOSED")
        setError(result.error.message || "Connexion impossible.");
    } catch {
      setError("Connexion impossible. Veuillez réessayer.");
    } finally {
      setBusy(false);
    }
  }
  async function password(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(event.currentTarget);
    try {
      const r = await authClient.signIn.email({
        email: String(f.get("email")),
        password: String(f.get("password")),
      });
      if (r.error) setError("Connexion impossible. Vérifiez vos identifiants.");
    } catch {
      setError("Connexion impossible.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <PageIntro
        label="ESPACE ENSEIGNANT"
        title="Votre espace de gestion."
        text="Consultez les demandes et mettez à jour les contenus de DAARA JI. Cet espace est réservé à l’enseignant autorisé."
      />
      <section className="container admin-content">
        {isPending || (session && access.isLoading) ? (
          <p aria-live="polite">Vérification de l’accès…</p>
        ) : !session ? (
          <div className="login">
            <span className="eyebrow">CONNEXION SÉCURISÉE</span>
            <h2>Bienvenue, OUZTAAZ.</h2>
            <p>
              Utilisez votre compte Google <strong>laminebarrandiaye1@gmail.com</strong> pour la
              première connexion. Aucun compte visiteur ne peut accéder aux demandes.
            </p>
            <button className="button" disabled={busy} onClick={google}>
              {busy ? "Connexion…" : "Se connecter avec Google"}
            </button>
            <details className="password-login">
              <summary>Connexion avec un mot de passe déjà activé</summary>
              <p className="small-note">
                Disponible uniquement si votre compte vérifié possède déjà un mot de passe. La
                création publique de comptes est désactivée.
              </p>
              <form onSubmit={password}>
                <label>
                  E-mail
                  <input
                    aria-label="E-mail de connexion"
                    type="email"
                    name="email"
                    required
                    autoComplete="username"
                    defaultValue="laminebarrandiaye1@gmail.com"
                  />
                </label>
                <label>
                  Mot de passe
                  <input
                    aria-label="Mot de passe"
                    type="password"
                    name="password"
                    required
                    autoComplete="current-password"
                  />
                </label>
                <button className="button" disabled={busy}>
                  Se connecter
                </button>
              </form>
            </details>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
          </div>
        ) : access.error ? (
          <div role="alert">
            <h2>Accès non autorisé.</h2>
            <p>{access.error.message}</p>
            <button className="button" onClick={() => authClient.signOut()}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <>
            <div className="admin-toolbar">
              <div className="tabs">
                <button aria-pressed={tab === "demandes"} onClick={() => setTab("demandes")}>
                  Demandes
                </button>
                <button aria-pressed={tab === "contenus"} onClick={() => setTab("contenus")}>
                  Contenus & tarifs
                </button>
              </div>
              <button className="text-link" onClick={() => authClient.signOut()}>
                Se déconnecter
              </button>
            </div>
            {tab === "demandes" ? (
              <RequestList />
            ) : content.isLoading ? (
              <p aria-live="polite">Chargement du contenu…</p>
            ) : content.data ? (
              <ContentEditor key={content.data.intro + content.data.bio} content={content.data} />
            ) : (
              <p role="alert">Les contenus ne sont pas disponibles.</p>
            )}
            <PasswordSetup />
          </>
        )}
      </section>
    </>
  );
}
