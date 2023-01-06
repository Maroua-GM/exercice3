const express = require("express");
const { getUsers, createUser, loginUser } = require("../Controllers/User-Controller");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", body("pseudo").notEmpty(), body("email").isEmail(), body("password").isLength({ min: 5 }), createUser);
router.post("/login", body("email").isEmail(), body("password").isLength({ min: 5 }), body("password").notEmpty(), loginUser);
module.exports = router;
