import { Route, Switch } from "wouter";
import Home from './pages/home';
import { Courses, LearningPath, About, FAQ } from './pages/learning';
import Contact from './pages/contact';
import Admin from './pages/admin';
import { Layout, ButtonLink } from './components/layout';
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      <Layout><Switch>
        <Route path="/" component={Home} />
        <Route path="/cours" component={Courses} />
        <Route path="/parcours" component={LearningPath} />
        <Route path="/a-propos" component={About} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
        <Route><section className="container page-intro"><h1>Page introuvable.</h1><ButtonLink to="/">Retour à l’accueil</ButtonLink></section></Route>
      </Switch></Layout>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
