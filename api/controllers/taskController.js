//This is the controller of all requests to the task collection.

//Import the data model.
const Task = require('../models/task')


//Request list of tasks.
exports.lisTask = async (req, res, next)=>{
    try{
        const task = await Task.find()
        res.json(task)
    } catch (err) {
        res.status(500).json({status: 'Error loading TASK: '+err})
    }
}

//Request to register a new task.
exports.newTask =  async (req,res, next)=>{
    try {
        const {title, description} = req.body
        const task = new Task({title, description})
        await task.save()
        res.json({status:'Data received'})
    } catch (err) {
        res.status(500).json({status: 'Error registering task: '+err})
    }
}

//Request to find a task.
exports.task = async (req, res, next)=>{
    try{
        const task = await Task.findById(req.params.id)
        res.json(task)
    } catch (err) {
        res.status(500).json({status: 'Task searching error: '+err})
    }
}

//Request to update a task.
exports.updateTask = async (req,res, next)=>{
    try {
        const {title, description, status} = req.body
        const update = {title : title, description : description, status : status}
        await Task.findByIdAndUpdate(req.params.id, update)
        res.json({status:'Task updated'})
    } catch (err) {
        res.status(500).json({status: 'Error updating task: '+err})
    }
}

//Requests to delete a task.
exports.deleteTask = async (req,res,next) => {
    try{
        await Task.findByIdAndRemove(req.params.id)
        res.json({status: 'Data removed'})
    } catch (err) {
        res.status(500).json({status: 'Error deleting a task: '+err})
    }
}


//Requests to assign a user to a task.
exports.assignTask = async (req,res,next)=>{
    try {
        const {user} = req.body
        const data = await Task.findById(req.params.id)
        data.user = user
        data.assigned = true
        await Task.findByIdAndUpdate(req.params.id, data)
        res.json({status:'Assigned task'})
    } catch (err) {
        res.status(500).json({status: 'Error assigning  task: '+err})
    }
}

//Requests to deallocate a user from a task.
exports.unassignUser = async (req,res,next)=>{
    try {
        const data = await Task.findById(req.params.id)
        data.user = null
        data.assigned = false
        await Task.findByIdAndUpdate(req.params.id, data)
        res.json({status:'Unassigned task'})
    } catch (err) {
        res.status(500).json({status: 'Failed to deallocate the task: '+err})
    }
}
