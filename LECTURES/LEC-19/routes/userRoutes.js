const express = require('express');
const router = express.Router();
const{ postuser, getAllUsers, getUserById } = require("../controller/userController");

router.post("/",postuser)
router.get("/",getAllUsers)
router.get("/:id",getUserById)

module.exports = router;