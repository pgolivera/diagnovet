import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { WorkInProgress } from "./components/shared/work-in-progress";
import { SEO } from "./components/shared/seo";
import environments from "./utils/environments";

function App() {
  const isProduction = process.env.NODE_ENV === environments.PRODUCTION;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isProduction ? (
            <>
              <SEO
                title="Coming Soon"
                description="Transforming veterinary medicine with artificial intelligence. Stay tuned!"
              />
              <WorkInProgress />
            </>
          ) : (
            <Home />
          )
        }
      />
    </Routes>
  );
}

export default App;
