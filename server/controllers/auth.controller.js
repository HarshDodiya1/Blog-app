const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.signup = async (req, res) => {
  try {
    // fetch the data from req.body
    const { email, username, password } = req.body;
    console.log(req.body);

    // validate the data
    if (!email || !username || !password) {
      return res.status(403).json({
        success: false,
        messaeg: "All fields are required.",
      });
    }

    // check if the user already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist, Please Sign Up.",
      });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create entry in db
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      user,
      message: "User created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while signup, please try again later.",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    // fetch the data from req.body
    const { email, password } = req.body;
    console.log(req.body);

    // validate the provided values
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All the fields are required to sign in.",
      });
    }

    // find the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(300).json({
        success: false,
        message:
          "No user is found with the provided email. Please enter registered email.",
      });
    }

    // check the password is validate for the user or not if it is validate then create a jwt token
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      // This might give error in upcoming days
      user.password = undefined;

      // set the cookie for response and return success;
      const options = {
        expiresIn: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("Bearer", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Login Success",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "password is incorrect.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while sign-in, please try again later.",
    });
  }
};


exports.googleAuth = async (req, res) => {
  try {
    const { email, profilePhoto, name } = req.body;

    // validate the provided values
    if (!email || !name || !profilePhoto) {
      return res.status(400).json({
        success: false,
        message: "Not getting enough details via google auth.",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      user.password = undefined;
      // set the cookie for response and return success;
      const options = {
        expiresIn: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("Bearer", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Login Success",
      });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const newUser = await User.create({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(10).slice(-4), // Harsh Dodiya => harshdodiya
        email,
        password: generatedPassword,
        profilePicture: profilePhoto,
      });
      // await newUser.save();

      const token = jwt.sign(
        {
          email: newUser.email,
          id: newUser._id,
          isAdmin: newUser.isAdmin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      newUser.password = undefined;
      const options = {
        expiresIn: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("Bearer", token, options).status(200).json({
        success: true,
        token,
        newUser,
        message: "User Login Success",
      });
      console.log("yepp created")
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while authentication with google. try again later.",
    });
  }
};
