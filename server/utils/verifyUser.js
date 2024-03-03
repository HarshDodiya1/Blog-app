const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.Bearer;

  // console.log("This is our req.body: ", req.body);
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Unauthorized",
    });
  }
  const secret = process.env.JWT_SECRET;
  // console.log("This is out secret for the jwt : " , secret)
  const verified = jwt.verify(token, secret);
    if(!verified){
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
    console.log("This is the verifed : ", verified);
    console.log(req.user);
    req.user = verified;
    console.log("Now req.user is : ", req.user)
    next();
};
