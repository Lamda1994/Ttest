//This is the user request handler.

//The jwt library and the user data model were imported.
const Users = require('../models/users')
const jwt = require('jsonwebtoken')

//Request to list users.
exports.listUser = async (req, res, next) => {
   try {
      const user = await Users.find()
      res.json(user);
   } catch (err) {
      res.status(500).json({status: 'Error loading users: '+err})
   }
}


exports.User = async (req, res, next) => {
   try {
      const user = await Users.findById(req.params.id)
      res.json(user);
   } catch (err) {
      res.status(500).json({status: 'User searching error: '+err})
   }
}

//Request to register a new user.
exports.newUser = async (req, res, next) => {
   try {
      const {name, id, email, password, type} = req.body
      const user = new Users({name, id, email, password, type})
      await user.save()
      res.json({status: 'Data received'});
   } catch (err) {
     res.status(500).json({status: 'Error registering user: '+err})
   }
}

//Request update users.
exports.updateUser = async (req, res, next) => {
   try {
      const {name, id, email, password, type, status} = req.body
      const data = {name, id, email, password, type, status}
      await Users.findByIdAndUpdate(req.params.id, data)
      res.json({status: 'Data updated'});
   } catch (err) {
     res.status(500).json({status: 'Error updating user: '+err});
   }
}

//Request to delete users.
exports.deleteUser = async (req, res, next) => {
  try {
    await Users.findByIdAndRemove(req.params.id)
    res.json({status: 'Data removed'})
  } catch (err) {
    res.status(500).json({status: 'Error deleting a user: '+err});
  }
}

//Login request.
exports.login = async (req, res)=>{
    const {email, password} = req.body
    const user = await Users.findOne({email: email})
    console.log(req.body)
    if (!user) {
       return res.status(401).json({msj:"Username does not exist!"})
    } else {
      if(!(user.password == password)){
        return res.status(401).json({msj:"Invalided password"})
      }else{
        //Create a web token
        const token = jwt.sign({
           email: user.email,
           name: user.name,
           id: user.id,
           _id: user._id,
           type:user.type
        },
        'SECRETKEY',
        {
          expiresIn: '1h'
        })
        res.json({token})
      }
    }
}
