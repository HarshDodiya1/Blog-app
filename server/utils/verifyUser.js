const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.Bearer;
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Unauthorized",
    });
  }
  const secret = process.env.JWT_SECRET;
  const verified = jwt.verify(token, secret);
  if (!verified) {
    return res.status(401).json({
      success: false,
      message: "unauthorized",
    });
  }
  req.user = verified;
  next();
};
