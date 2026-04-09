import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = localStorage.getItem("admin_auth");

  if (!auth) {
    return <Navigate to="/acesso" replace />;
  }

  return <>{children}</>;
}
