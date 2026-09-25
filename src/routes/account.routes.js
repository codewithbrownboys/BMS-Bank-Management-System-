const express = require("express");
const authmiddleware = require("../middleware/auth.middleware");
const accountcontroller = require("../constroller/")

const router = express.Router();


router.post("/",authmiddleware.authmiddleware,account)


module.exports = router;