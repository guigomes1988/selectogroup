import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rota Pública: Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Rota de Acesso: Login */}
        <Route path="/acesso" element={<Login />} />

        {/* Rota Protegida: Painel de Leads */}
        <Route 
          path="/painel" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}
