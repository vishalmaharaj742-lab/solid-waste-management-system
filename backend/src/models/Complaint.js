const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true },
    wasteType: {
      type: String,
      enum: ["Dry", "Wet", "Plastic", "Metal"],
      required: true
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
