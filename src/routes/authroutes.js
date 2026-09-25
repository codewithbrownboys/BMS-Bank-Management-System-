const express = require("express");
const authcontroller = require("../constroller/authcontroller");
const router = express.Router();

router.post("/register",authcontroller.useregistercontroller);
router.post("/login",authcontroller.userlogincontroller);


module.exports  = router;