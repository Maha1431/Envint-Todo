const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
   // Check if role is valid (e.g., "user" or "admin")
   if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const user = await User.create({ username, email, password, role });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(400).json({ message: "Error creating user" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({message : "Successfully Logged in", token});
  } catch (error) {
    res.status(400).json({ message: "Error logging in" });
  }
};
