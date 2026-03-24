import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Login = ({ onAuth }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      onAuth(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="mt-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
      <div className="relative">
        <div className="glass-card rounded-[36px] p-8 hero-surface">
          <p className="text-sm uppercase tracking-[0.3em] text-ink/50">Welcome back</p>
          <h1 className="font-display text-4xl mt-4 leading-tight">
            Keep your city clean with smarter reporting.
          </h1>
          <p className="text-ink/70 mt-4 max-w-xl">
            Log in to classify waste, attach images, and track the cleanup progress in one place.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="ringed rounded-2xl p-4 bg-white/70">
              <p className="text-xs text-ink/50">Faster Resolution</p>
              <p className="font-display text-2xl mt-2">48 hrs</p>
            </div>
            <div className="ringed rounded-2xl p-4 bg-white/70">
              <p className="text-xs text-ink/50">Active Cities</p>
              <p className="font-display text-2xl mt-2">120+</p>
            </div>
          </div>
        </div>
        <div className="image-card mt-8 h-72 relative">
          <img
            src="https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=900&q=80"
            alt="Clean city initiative"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 image-overlay flex items-end p-6">
            <div>
              <p className="text-xs text-white/70 uppercase tracking-[0.3em]">Community impact</p>
              <p className="text-white font-display text-2xl mt-2">Cleaner streets, healthier lives.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="glass-card rounded-[32px] p-8">
        <h2 className="font-display text-2xl">Login</h2>
        <p className="text-sm text-ink/60 mt-1">Use your account credentials.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border-ink/10"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border-ink/10"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="w-full py-3 rounded-xl bg-ink text-white font-semibold shadow-soft">
            Login
          </button>
        </form>
        <p className="text-sm text-ink/60 mt-4">
          New here?{" "}
          <Link to="/signup" className="text-ink font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
