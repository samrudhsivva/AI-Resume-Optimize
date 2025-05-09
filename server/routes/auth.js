const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const users = new Map(); // Temporary in-memory user store

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (users.has(email))
    return res.status(400).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  users.set(email, hashed);
  res.json({ message: "Signup successful" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const hashed = users.get(email);
  if (!hashed || !(await bcrypt.compare(password, hashed))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

module.exports = router;
