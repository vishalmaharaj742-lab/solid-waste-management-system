const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const predictRoutes = require("./routes/predictRoutes");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const isVercel = process.env.VERCEL === "1";
const uploadDir = process.env.UPLOAD_DIR || (isVercel ? "/tmp/uploads" : "uploads");
const resolvedUploadDir = path.isAbsolute(uploadDir)
  ? uploadDir
  : path.join(process.cwd(), uploadDir);
if (!fs.existsSync(resolvedUploadDir)) {
  fs.mkdirSync(resolvedUploadDir, { recursive: true });
}
app.use("/uploads", express.static(resolvedUploadDir));

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
