// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const userDB = require("../models/User")

module.exports = async function (req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userDB.findOne({mobileNumber: decoded.mobileNumber});
    req.user = user; // Attach decoded payload (e.g., { id, mobileNumber }) to request
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
//   try {
//   const user = await userDB.findOne({ mobileNumber: decoded.mobileNumber });

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   if (!user) {
//     console.warn("⚠️ No user found for:", decoded.mobileNumber);
//   }
//   req.user = user;
//   next();
// } catch (dbErr) {
//   console.error("❌ Database error:", dbErr.message);
//   return res.status(500).json({ success: false, message: "Database error" });
// }

};
