const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");

exports.test = (req, res) => {
  res.message("hello");
};

exports.updateUser = async (req, res) => {
  console.log("This is our params ", req.params.userId);
  console.log("This is our req.user.id:  ", req.params.userId);

  if (req.user.id !== req.params.userId) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to update this user",
    });
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.status(403).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return res.status(403).json({
        success: false,
        message: "Username must be between 7 and 20 characters",
      });
    }
    if (req.body.username.includes(" ")) {
      return res.status(403).json({
        success: false,
        message: "Username does not contain spaces",
      });
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: "Username must be in lowercase",
      });
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return res.status(403).json({
        success: false,
        message: "Username only contains letters and numbers",
      });
    }
  }
  console.log("Username: ", req.body.username);
  console.log("email: ", req.body.email);
  console.log("ProfilePicture: ", req.body.profilePicture);
  console.log("req.params.userId", req.params.userId);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...user } = updatedUser._doc;
    console.log("updatedUser._doc: User: ", user);
    res.status(200).json({
      success: true,
      message: "Yess now problem solved.",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while updating the user.",
    });
  }
};

exports.deleteUser = async (req, res) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return res.status(400).json({
      success: false,
      message: "You are not allowed to delete this user",
    });
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while deleting the user.",
    });
  }
};

exports.signout = (req, res) => {
  try {
    res.clearCookie("Bearer").status(200).json("User has been signed out");
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while deleting the user.",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    console.log("this is req.user: from getUser: ", req.params.userId);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "did not get user by the id",
      });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
    console.log("this is rest: ", rest)
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while getting the user.",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    console.log("final WHY NOT GETTING USER?: ", req.user);
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to see all users",
      });
    }
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
    console.log(
      "UserwithoutPassword, totalUsers, lastmonthUsers: ",
      usersWithoutPassword,
      totalUsers,
      lastMonthUsers
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while getting all the users..",
    });
  }
};
