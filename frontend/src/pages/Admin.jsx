import { useEffect, useState } from "react";
import api from "../api";

const STATUS_OPTIONS = ["Pending", "In Progress", "Completed"];

const Admin = ({ isAdmin }) => {
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("");

  const fetchComplaints = async () => {
    try {
      const { data } = await api.get("/complaints");
      setComplaints(data.complaints);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load complaints");
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchComplaints();
    }
  }, [isAdmin]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/complaints/${id}/status`, { status });
      fetchComplaints();
    } catch (error) {
      setMessage(error.response?.data?.message || "Update failed");
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await api.delete(`/complaints/${id}`);
      fetchComplaints();
    } catch (error) {
      setMessage(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <section className="mt-10">
      <div className="glass-card rounded-[32px] p-8">
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6 items-center">
          <div>
            <p className="text-sm text-ink/60">Admin Console</p>
            <h1 className="font-display text-3xl mt-2">Manage City Reports</h1>
            <p className="text-ink/70 mt-3">
              Update statuses, prioritize hotspots, and keep response teams aligned.
            </p>
          </div>
          <div className="image-card h-48">
            <img
              src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80"
              alt="City operations"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        {message && <p className="text-sm text-ink/60 mt-4">{message}</p>}
        <div className="mt-6 space-y-4">
          {complaints.length === 0 && (
            <p className="text-sm text-ink/60">No complaints available.</p>
          )}
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="rounded-3xl bg-white/80 p-6 border border-white flex flex-col gap-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <div>
                  <p className="font-semibold text-lg">{complaint.wasteType}</p>
                  <p className="text-sm text-ink/60 mt-1">{complaint.description}</p>
                  <p className="text-xs text-ink/50 mt-2">
                    {complaint.location?.latitude}, {complaint.location?.longitude}
                  </p>
                  <p className="text-xs text-ink/50 mt-1">
                    Reported by: {complaint.user?.name} ({complaint.user?.email})
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={complaint.status}
                    onChange={(event) => updateStatus(complaint._id, event.target.value)}
                    className="rounded-xl border-ink/10"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => deleteComplaint(complaint._id)}
                    className="px-4 py-2 rounded-xl bg-ink text-white text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Admin;
