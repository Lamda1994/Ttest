//All routes for interaction with task data collection are hosted here.

//libraries.
const express = require('express')
const router = express.Router()

//data model and controllers
const Task = require('../models/task')
const controllerTask = require('../controllers/taskController')

//routes
router.get('/', controllerTask.lisTask)

router.get('/:id', controllerTask.task)

router.get('/search/:name', controllerTask.search)

router.post('/', controllerTask.newTask)

router.put('/:id', controllerTask.updateTask)

router.put('/assign/:id', controllerTask.assignTask)

router.put('/unassign/:id', controllerTask.unassignUser)

router.delete('/:id', controllerTask.deleteTask)

module.exports = router
