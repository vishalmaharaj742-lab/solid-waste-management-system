const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/admin");
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateStatus,
  deleteComplaint
} = require("../controllers/complaintController");

const router = express.Router();

const uploadDir = process.env.UPLOAD_DIR || "uploads";
const absoluteUploadDir = path.join(process.cwd(), uploadDir);
if (!fs.existsSync(absoluteUploadDir)) {
  fs.mkdirSync(absoluteUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, absoluteUploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const upload = multer({ storage });

router.post("/", auth, upload.single("image"), createComplaint);
router.get("/mine", auth, getMyComplaints);
router.get("/", auth, adminOnly, getAllComplaints);
router.patch("/:id/status", auth, adminOnly, updateStatus);
router.delete("/:id", auth, adminOnly, deleteComplaint);

module.exports = router;
