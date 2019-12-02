//Configuration for connection to the mongo database.

require('dotenv').config({path:'vars.env'});
const mongoose = require('mongoose')
const url_db =  process.env.DB_URL 

//Creating connection
mongoose.connect(url_db, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(db => console.log('Successful Connection.'))
            .catch(err => console.error('connection failed: '+err))

module.exports = mongoose