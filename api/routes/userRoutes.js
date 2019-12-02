//All routes for interaction with user data collection are hosted here.

//libraries.
const express = require('express')
const router = express.Router()

//data model and controllers
const controllerUser = require('../controllers/userController')
const auth = require('../Middleware/Auth');

//routes
router.get("/", controllerUser.listUser)

router.get("/:id", controllerUser.User)

router.post("/", controllerUser.newUser)

router.put("/:id", controllerUser.updateUser)

router.delete('/:id', controllerUser.deleteUser)

router.post("/login", controllerUser.login)

module.exports = router
