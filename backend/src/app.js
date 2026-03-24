const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const predictRoutes = require("./routes/predictRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const uploadDir = process.env.UPLOAD_DIR || "uploads";
app.use("/uploads", express.static(path.join(process.cwd(), uploadDir)));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "swms-backend" });
});

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/predict", predictRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
