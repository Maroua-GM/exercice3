// Définir un routeur (Router)
const express = require("express");
const { body, validationResult } = require("express-validator");
const { getCats, createCat, getCatById, updateCat, deleteCat } = require("./../controllers/Chat-controller");
// Router:  le contructeur Router nous donne un objet router ,
// avec cet objet on peut utiliser les fonctions middleware
const router = express.Router();
// http://localhost:5000/cats/ + GET
router.get("/user/:id", getCats);

// http://localhost:5000/cats/ + POST
router.post("/", body("nom").notEmpty(), body("race").notEmpty(), body("image_url").notEmpty(), body("sexe").notEmpty(), body("age").isInt(), createCat);

// http://localhost:5000/cats/:id + get
router.get("/:id", getCatById);

// http://localhost:5000/cats/:id + put
router.put("/:id", body("nom").notEmpty(), body("race").notEmpty(), body("image_url").notEmpty(), updateCat);

// // http://localhost:5000/cats/ + delete
router.delete("/:id", deleteCat);

module.exports = router;
