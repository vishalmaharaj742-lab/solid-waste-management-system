import { Routes, Route, Navigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import AuthGuard from "./components/AuthGuard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

const getStoredUser = () => {
  const raw = localStorage.getItem("swms_user");
  return raw ? JSON.parse(raw) : null;
};

function App() {
  const [user, setUser] = useState(getStoredUser());

  const onAuth = (payload) => {
    localStorage.setItem("swms_token", payload.token);
    localStorage.setItem("swms_user", JSON.stringify(payload.user));
    setUser(payload.user);
  };

  const onLogout = () => {
    localStorage.removeItem("swms_token");
    localStorage.removeItem("swms_user");
    setUser(null);
  };

  const isAdmin = useMemo(() => user?.role === "admin", [user]);

  return (
    <div className="min-h-screen page-gradient">
      <Navbar user={user} onLogout={onLogout} />
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <Routes>
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
          <Route path="/login" element={<Login onAuth={onAuth} />} />
          <Route path="/signup" element={<Signup onAuth={onAuth} />} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard user={user}>
                <Dashboard user={user} />
              </AuthGuard>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthGuard user={user} role="admin">
                <Admin isAdmin={isAdmin} />
              </AuthGuard>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
