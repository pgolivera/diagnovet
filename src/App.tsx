import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import { ProtectedRoute } from "./auth";
import Dashboard from "./pages/Dashboard";
import Viewer from "./pages/Viewer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
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
