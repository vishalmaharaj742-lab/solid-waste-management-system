const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const { predictWasteType } = require("../controllers/predictController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", auth, upload.single("image"), predictWasteType);

module.exports = router;
