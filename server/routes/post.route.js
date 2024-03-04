const express = require("express")
const { verifyToken } = require("../utils/verifyUser")
const {create, getPosts, deletePost, updatePost} = require("../controllers/post.controller")
const router = express.Router()

router.post('/create', verifyToken, create)
router.get("/getposts", getPosts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)
router.put('/updatepost/:postId/:userId', verifyToken, updatePost)

module.exports = router;