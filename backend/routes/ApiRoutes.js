/**
 * Load Depandancies
*/
const express = require("express");
const router  = express.Router();

const UserController        = require("../controllers/UserController");

/**
 * ==================  Define All API End Points Here========================
*/

router.post("/user",UserController.createUser);

router.get("/users",UserController.getUsers);

router.get("/user/:id",UserController.getUserDetail);

router.put("/user/:id",UserController.editUser);

router.delete("/user/:id",UserController.deleteUser);


module.exports = router;