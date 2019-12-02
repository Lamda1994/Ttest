const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/userController')
const auth = require('../Middleware/Auth');
router.get("/", controllerUser.listUser)

router.get("/:id", controllerUser.User)

router.post("/", controllerUser.newUser)

router.put("/:id", controllerUser.updateUser)

router.delete('/:id', controllerUser.deleteUser)

router.post("/login", controllerUser.login)

module.exports = router
