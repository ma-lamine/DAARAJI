import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X, MapPin, ArrowRight } from "lucide-react";
const links = [
  ["/", "Accueil"],
  ["/cours", "Cours"],
  ["/parcours", "Parcours"],
  ["/a-propos", "À propos"],
  ["/faq", "FAQ"],
] as const;
export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="DAARA JI — Accueil">
      <span className="brand-mark" aria-hidden="true">
        <span>د</span>
      </span>
      <span>
        DAARA JI<small>APPRENDRE · COMPRENDRE · GRANDIR</small>
      </span>
    </Link>
  );
}
export function Layout({ children }: { children: React.ReactNode }) {
  const [path] = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
    const names: Record<string, string> = {
      "/": "Accueil",
      "/cours": "Cours",
      "/parcours": "Parcours d’apprentissage",
      "/a-propos": "À propos",
      "/faq": "Questions fréquentes",
      "/contact": "Contact et inscription",
      "/admin": "Administration",
    };
    document.title = `${names[path] || "Page"} — DAARA JI`;
    let observer: MutationObserver | undefined;
    let frame = 0;
    const followFragment = () => {
      observer?.disconnect();
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const scroll = () => {
        const target = document.getElementById(decodeURIComponent(hash));
        if (target) {
          target.scrollIntoView({ block: "start" });
          observer?.disconnect();
          return true;
        }
        return false;
      };
      if (!scroll()) {
        observer = new MutationObserver(scroll);
        observer.observe(document.getElementById("contenu")!, { childList: true, subtree: true });
      }
    };
    const afterNavigation = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(followFragment);
    };
    afterNavigation();
    window.addEventListener("pushState", afterNavigation);
    window.addEventListener("hashchange", afterNavigation);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("pushState", afterNavigation);
      window.removeEventListener("hashchange", afterNavigation);
    };
  }, [path]);
  return (
    <>
      <a href="#contenu" className="skip">
        Aller au contenu
      </a>
      <div className="topbar">
        <span>Un apprentissage pour chaque âge, à chaque étape.</span>
        <span>
          <MapPin size={12} aria-hidden="true" /> Dakar, Sénégal <i /> En ligne & à domicile
        </span>
      </div>
      <header>
        <div className="nav-wrap">
          <Brand />
          <nav className={open ? "open" : ""} aria-label="Navigation principale">
            {links.map(([url, label]) => (
              <Link key={url} to={url} aria-current={path === url ? "page" : undefined}>
                {label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="nav-contact"
              aria-current={path === "/contact" ? "page" : undefined}
            >
              Premier échange <ArrowUpRight size={16} />
            </Link>
          </nav>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="contenu">{children}</main>
      <footer>
        <div className="footer-main">
          <div>
            <Brand />
            <p>
              L’arabe, le Coran et les bases du fiqh.
              <br />
              Un savoir qui se construit, pas à pas.
            </p>
          </div>
          <div>
            <span className="eyebrow">EXPLORER</span>
            <Link to="/cours">Les cours</Link>
            <Link to="/parcours">Le parcours</Link>
            <Link to="/faq">Questions fréquentes</Link>
          </div>
          <div>
            <span className="eyebrow">ÉCHANGEONS</span>
            <a href="mailto:laminebarrandiaye1@gmail.com">
              Par e-mail <ArrowUpRight size={14} />
            </a>
            <a href="https://wa.me/221767263149" target="_blank" rel="noreferrer">
              Sur WhatsApp <ArrowUpRight size={14} />
            </a>
            <Link to="/contact">Demander des informations</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DAARA JI · Dakar</span>
          <span>
            <Link to="/contact#confidentialite">Confidentialité</Link>
            <Link to="/admin">Espace enseignant</Link>
          </span>
        </div>
      </footer>
    </>
  );
}
export function TextLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-link">
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function ButtonLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="button">
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function PageIntro({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <section className="page-intro container">
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
export function Invitation() {
  return (
    <section className="invitation">
      <div className="container invitation-inner">
        <div>
          <span className="eyebrow">LA PREMIÈRE ÉTAPE, C’EST UN ÉCHANGE</span>
          <h2>Parlons de votre apprentissage.</h2>
          <p>Votre niveau, vos envies, votre rythme. Trouvons ensemble le point de départ.</p>
        </div>
        <Link to="/contact" className="button light">
          Demander des informations <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
