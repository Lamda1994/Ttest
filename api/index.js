//This is the starting point of our application.


//The libraries needed for the functionality of the api are required.
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { mongoose } = require('./database')
const cors = require('cors');

const app = express()
const c = console.log

//setting
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
  origin: '*',
  credentials: true
}));

//routes
//routing the application depending on the request.
app.use('/api/task', require('./routes/taskRoutes'))
app.use('/api/user', require('./routes/userRoutes'))

//static file
//declaration of the path of the public archives.
app.use(express.static(path.join(__dirname, 'public')))

//startin the server
app.listen(app.get('port'), ()=>{
    c(`Server running on port ${app.get('port')}`)
})
