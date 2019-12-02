//Here is the data model or scheme for creating the tasks.

//Importing mongoose for creation of the mongo data model.
const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema =  new Schema ({
        name: {type: String, required: true},
        id: {type: Number, unique:true, required: true},
        email: {type: String, required: true, lowercase:true},
        password: {type: String, required: true},
        type: {type: String, default: 'normal'},
        status: {type: String, default: 'Active'}
})

module.exports = mongoose.model('User', userSchema)
