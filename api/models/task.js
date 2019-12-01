const mongoose = require('mongoose')
const {Schema} = mongoose

const taskSchema =  new Schema ({
        title: {type: String, required: true},
        description: {type: String, required: true},
        assigned:{type: Boolean, default: false},
        user:{type: Schema.ObjectId, ref: "users"},
        status: {type: String, default: 'Open'}
})

module.exports = mongoose.model('Task', taskSchema)
