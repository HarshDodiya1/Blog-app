const express = require("express");
const verifyToken = require("../utils/verifyUser.js");
const {
  createComment,
  deleteComment,
  editComment,
  getPostComments,
  getcomments,
  likeComment,
} = require("../controllers/comment.controller.js");
const router = express.Router();
const middle = verifyToken.verifyToken;
router.post("/create", middle, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/likeComment/:commentId", middle, likeComment);
router.put("/editComment/:commentId", middle, editComment);
router.delete("/deleteComment/:commentId", middle, deleteComment);
router.get("/getcomments", middle, getcomments);

module.exports = router;
