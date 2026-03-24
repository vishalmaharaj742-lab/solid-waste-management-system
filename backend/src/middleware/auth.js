const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId).select("-passwordHash");
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
