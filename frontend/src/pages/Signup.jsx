import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Signup = ({ onAuth }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/signup", form);
      onAuth(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="mt-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
      <div className="relative">
        <div className="glass-card rounded-[36px] p-8 hero-surface">
          <p className="text-sm uppercase tracking-[0.3em] text-ink/50">Get started</p>
          <h1 className="font-display text-4xl mt-4 leading-tight">
            Create your clean-city profile.
          </h1>
          <p className="text-ink/70 mt-4 max-w-xl">
            Join the SWMS platform to report waste, track updates, and collaborate with local teams.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Smart detection", "Geo-tagged reports", "Admin tracking"].map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full bg-white/70 text-sm font-semibold text-ink/70"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="image-card mt-8 h-72 relative">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80"
            alt="Recycling effort"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 image-overlay flex items-end p-6">
            <div>
              <p className="text-xs text-white/70 uppercase tracking-[0.3em]">City teams</p>
              <p className="text-white font-display text-2xl mt-2">Coordinate cleanup in real time.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="glass-card rounded-[32px] p-8">
        <h2 className="font-display text-2xl">Signup</h2>
        <p className="text-sm text-ink/60 mt-1">It takes less than a minute.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border-ink/10"
              placeholder="Your name"
              required
            />
          </div>
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
              placeholder="Create a strong password"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="w-full py-3 rounded-xl bg-ink text-white font-semibold shadow-soft">
            Create account
          </button>
        </form>
        <p className="text-sm text-ink/60 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-ink font-semibold">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
