const Post = require("../models/post.model")

exports.create = async (req, res) => {
  console.log("Hey: ", req.body)
  if (!req.user.isAdmin) {
    return res.status(401).json({
      success: false,
      message:
        "You are not allowed to create a post, because you are not an admin",
    });
  }
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: "Error while creating the post..",
    });
  }
};
