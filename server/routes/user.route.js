const express = require('express')
const router = express.Router();
const {test, updateUser, signout, deleteUser} = require("../controllers/user.controller");
const { verifyToken } = require('../utils/verifyUser');

router.get("/test", test);
router.put('/update/:userId', verifyToken, updateUser);
router.put('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);



module.exports = router;