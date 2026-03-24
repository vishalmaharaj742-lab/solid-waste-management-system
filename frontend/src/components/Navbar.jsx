import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-full text-sm font-semibold transition ${
        active ? "bg-ink text-white" : "text-ink/70 hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
};

const Navbar = ({ user, onLogout }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-white/60">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-ink text-white flex items-center justify-center font-bold">
            SW
          </div>
          <div>
            <p className="font-display text-lg">Smart Waste</p>
            <p className="text-xs text-ink/60">Solid Waste Management</p>
          </div>
        </Link>
        <nav className="flex items-center gap-2">
          {user && <NavLink to="/dashboard">Dashboard</NavLink>}
          {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
          {!user && <NavLink to="/login">Login</NavLink>}
          {!user && <NavLink to="/signup">Signup</NavLink>}
          {user && (
            <button
              onClick={onLogout}
              className="ml-2 px-4 py-2 rounded-full bg-ink text-white font-semibold text-sm shadow-soft"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
