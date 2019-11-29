const mongoose = require('mongoose')
const url_db = 'mongodb://localhost/list-task'

mongoose.connect(url_db, {useNewUrlParser: true, useUnifiedTopology: true})
                .then(db => console.log('Successful Connection.'))
                .catch(err => console.error('connection failed: '+err))

module.exports = mongoose 