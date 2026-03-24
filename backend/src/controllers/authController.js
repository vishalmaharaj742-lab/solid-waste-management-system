const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (user) =>
  jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  const token = createToken(user);

  res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = createToken(user);
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

const me = async (req, res) => {
  res.json({ user: req.user });
};

module.exports = { signup, login, me };
