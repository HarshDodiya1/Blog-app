const express = require("express")
const { verifyToken } = require("../utils/verifyUser")
const {create, getPosts, deletePost} = require("../controllers/post.controller")
const router = express.Router()

router.post('/create', verifyToken, create)
router.get("/getposts", getPosts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)

module.exports = router;