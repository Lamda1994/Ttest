const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema =  new Schema ({
        name: {type: String, required: true},
        id: {type: Number, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        type: {type: String, default: 'normal'},
        status: {type: String, default: 'Active'}
})

module.exports = mongoose.model('User', userSchema)
