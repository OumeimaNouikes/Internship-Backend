const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "Authorization denied - Token not provided" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), `${process.env.jwtSecret}`);

    // Attach the user object from the token to the request
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
