const Task = require('../models/task')

exports.lisTask = async (req, res, next)=>{
    try{
        const task = await Task.find()
        res.json(task)    
    } catch (err) {
        console.log(err)
        next()
    }    
}

exports.newTask =  async (req,res, next)=>{
    try {
        const {title, description} = req.body
        const task = new Task({title, description})
        await task.save()
        res.json({status:'Data received'})
    } catch (err) {
        console.log(err)
        next()
    }   
}

exports.task = async (req, res, next)=>{
    try{
        const task = await Task.findById(req.params.id)
        res.json(task)    
    } catch (err) {
        console.log(err)
        next()
    }    
}

exports.updateTask = async (req,res, next)=>{
    try {
        const {title, description, status} = req.body
        const update = {title : title, description : description, status : status}
        await Task.findByIdAndUpdate(req.params.id, update)
        res.json({status:'Task updated'})
    } catch (err) {
        console.log(err)
        next()
    }
}

exports.deleteTask = async (req,res,next) => {
    try{
        await Task.findByIdAndRemove(req.params.id)
        res.json({status: 'Data removed'})
    } catch (err) {
        console.log(err)
        next()
    }
}

exports.assignTask = async (req,res,next)=>{
    try {
        const {user} = req.body
        const data = await Task.findById(req.params.id)
        data.user = user
        data.assigned = true
        await Task.findByIdAndUpdate(req.params.id, data)
        res.json({status:'Assigned task'})
    } catch (err) {
        console.log(err)
        next()
    }
}

exports.unassignUser = async (req,res,next)=>{
    try {
        const data = await Task.findById(req.params.id)
        data.user = null
        data.assigned = false
        await Task.findByIdAndUpdate(req.params.id, data)
        res.json({status:'Unassigned task'})
    } catch (err) {
        console.log(err)
        next()
    }
}