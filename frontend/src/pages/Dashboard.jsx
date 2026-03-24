import { useEffect, useMemo, useState } from "react";
import api from "../api";
import StatCard from "../components/StatCard";

const Dashboard = ({ user }) => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [form, setForm] = useState({
    latitude: "",
    longitude: "",
    description: ""
  });
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchComplaints = async () => {
    try {
      const { data } = await api.get("/complaints/mine");
      setComplaints(data.complaints);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((c) => c.status === "Pending").length;
    const inProgress = complaints.filter((c) => c.status === "In Progress").length;
    return { total, pending, inProgress };
  }, [complaints]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setPrediction(null);
  };

  const handleDetect = async () => {
    if (!file) return;
    setLoading(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await api.post("/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setPrediction(data);
      setMessage("Prediction ready. You can submit your complaint.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage("Please upload an image first.");
      return;
    }
    if (!prediction?.label) {
      setMessage("Run detection before submitting.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("wasteType", prediction.label);
      formData.append("latitude", form.latitude);
      formData.append("longitude", form.longitude);
      formData.append("description", form.description);
      await api.post("/complaints", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setForm({ latitude: "", longitude: "", description: "" });
      setFile(null);
      setPrediction(null);
      setMessage("Complaint submitted successfully.");
      fetchComplaints();
    } catch (error) {
      setMessage(error.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-10 space-y-8">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
        <div className="glass-card rounded-[36px] p-8 flex flex-col justify-between hero-surface">
          <div>
            <p className="text-sm text-ink/60">Hello {user?.name}</p>
            <h1 className="font-display text-3xl mt-2">Your Waste Reporting Hub</h1>
            <p className="text-ink/70 mt-3 max-w-xl">
              Upload waste images, auto-detect the type, and submit location-aware complaints.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <StatCard label="Total Complaints" value={stats.total} />
            <StatCard label="Pending" value={stats.pending} />
            <StatCard label="In Progress" value={stats.inProgress} />
          </div>
        </div>
        <div className="image-card relative">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
            alt="Clean city"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 image-overlay flex items-end p-6">
            <div>
              <p className="text-xs text-white/70 uppercase tracking-[0.3em]">Live impact</p>
              <p className="text-white font-display text-2xl mt-2">
                Community-led sanitation in action.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <div className="glass-card rounded-[32px] p-8">
          <h2 className="font-display text-2xl">Submit a complaint</h2>
          <p className="text-sm text-ink/60 mt-2">
            Upload an image, detect waste type, and provide the location details.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-semibold">Waste image</label>
              <input
                type="file"
                accept="image/*"
                className="mt-2 w-full"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="button"
              onClick={handleDetect}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-sky text-white font-semibold"
            >
              {loading ? "Detecting..." : "Detect Waste Type"}
            </button>
            {prediction && (
              <div className="rounded-2xl bg-white/80 p-4 border border-white">
                <p className="text-sm text-ink/60">Detected type</p>
                <p className="font-display text-xl">{prediction.label}</p>
                <p className="text-xs text-ink/50 mt-1">
                  Confidence: {(prediction.confidence * 100).toFixed(1)}%
                </p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold">Latitude</label>
                <input
                  type="number"
                  name="latitude"
                  value={form.latitude}
                  onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                  className="mt-2 w-full rounded-xl border-ink/10"
                  placeholder="12.9716"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Longitude</label>
                <input
                  type="number"
                  name="longitude"
                  value={form.longitude}
                  onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                  className="mt-2 w-full rounded-xl border-ink/10"
                  placeholder="77.5946"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold">Complaint details</label>
              <textarea
                name="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="mt-2 w-full rounded-xl border-ink/10"
                rows="4"
                placeholder="Describe the waste situation..."
                required
              />
            </div>
            {message && <p className="text-sm text-ink/70">{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-ink text-white font-semibold"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>

        <div className="glass-card rounded-[32px] p-8">
          <div className="image-card h-48 mb-6">
            <img
              src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80"
              alt="Waste sorting"
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="font-display text-2xl">Recent complaints</h2>
          <p className="text-sm text-ink/60 mt-2">Track the status of your latest reports.</p>
          <div className="mt-6 space-y-4 max-h-[360px] overflow-y-auto pr-2">
            {complaints.length === 0 && (
              <p className="text-sm text-ink/60">No complaints yet. Submit your first one.</p>
            )}
            {complaints.map((complaint) => (
              <div key={complaint._id} className="rounded-2xl bg-white/80 p-4 border border-white">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{complaint.wasteType}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-ink/10 text-ink/70">
                    {complaint.status}
                  </span>
                </div>
                <p className="text-sm text-ink/60 mt-2">{complaint.description}</p>
                <p className="text-xs text-ink/50 mt-2">
                  {complaint.location?.latitude}, {complaint.location?.longitude}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
