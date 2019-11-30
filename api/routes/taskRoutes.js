const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const controllerTask = require('../controllers/taskController')
router.get('/', controllerTask.lisTask)

router.get('/:id', controllerTask.task)

router.post('/', controllerTask.newTask)

router.put('/:id', controllerTask.updateTask)

router.put('/assign/:id', controllerTask.assignTask)

router.put('/unassign/:id', controllerTask.unassignUser)

router.delete('/:id', controllerTask.deleteTask)

module.exports = router
