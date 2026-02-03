import { Routes, Route } from "react-router-dom";
import { WorkInProgress } from "./components/shared/work-in-progress";
import { SEO } from "./components/shared/seo";
import { Layout } from "./components/layout";
import Dashboard from "./pages/Dashboard";
import Viewer from "./pages/Viewer";
import environments from "./utils/environments";

function App() {
  const isProduction = process.env.NODE_ENV === environments.PRODUCTION;

  if (isProduction) {
    return (
      <>
        <SEO
          title="Coming Soon"
          description="Transforming veterinary medicine with artificial intelligence. Stay tuned!"
        />
        <WorkInProgress />
      </>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/viewer" element={<Viewer />} />
      </Routes>
    </Layout>
  );
}

export default App;
