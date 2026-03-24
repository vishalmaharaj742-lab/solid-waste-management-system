const Complaint = require("../models/Complaint");

const createComplaint = async (req, res) => {
  const { wasteType, latitude, longitude, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  if (!wasteType || !latitude || !longitude || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  const complaint = await Complaint.create({
    user: req.user._id,
    imageUrl,
    wasteType,
    location: {
      latitude: Number(latitude),
      longitude: Number(longitude)
    },
    description
  });

  res.status(201).json({ complaint });
};

const getMyComplaints = async (req, res) => {
  const complaints = await Complaint.find({ user: req.user._id }).sort({
    createdAt: -1
  });
  res.json({ complaints });
};

const getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json({ complaints });
};

const updateStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  const complaint = await Complaint.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  res.json({ complaint });
};

const deleteComplaint = async (req, res) => {
  const { id } = req.params;
  const complaint = await Complaint.findByIdAndDelete(id);

  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  res.json({ message: "Complaint deleted" });
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateStatus,
  deleteComplaint
};
