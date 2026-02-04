import { Routes, Route } from "react-router-dom";
import { WorkInProgress } from "./components/shared/work-in-progress";
import { SEO } from "./components/shared/seo";
import { Layout } from "./components/layout";
import { ProtectedRoute } from "./auth";
import Dashboard from "./pages/Dashboard";
import Viewer from "./pages/Viewer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewer"
          element={
            <ProtectedRoute>
              <Viewer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
