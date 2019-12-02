const Users = require('../models/users')
const jwt = require('jsonwebtoken')

exports.listUser = async (req, res, next) => {
   try {
      const user = await Users.find()
      res.json(user);
   } catch (err) {
     console.log(err);
   }
}

exports.User = async (req, res, next) => {
   try {
      const user = await Users.findById(req.params.id)
      res.json(user);
   } catch (err) {
     console.log(err);
   }
}

exports.newUser = async (req, res, next) => {
   try {
      const {name, id, email, password, type} = req.body
      const user = new Users({name, id, email, password, type})
      await user.save()
      res.json({status: 'Data received'});
   } catch (err) {
     console.log(err);
   }
}

exports.updateUser = async (req, res, next) => {
   try {
      const {name, id, email, password, type, status} = req.body
      const data = {name, id, email, password, type, status}
      const user = await Users.findByIdAndUpdate(req.params.id, data)
      res.json({status: 'Data updated'});
   } catch (err) {
     console.log(err);
   }
}

exports.deleteUser = async (req, res, next) => {
  try {
    await Users.findByIdAndRemove(req.params.id)
    res.json({status: 'Data removed'})
  } catch (err) {
    console.log(err);
  }
}

exports.login = async (req, res, next)=>{
    const {email, password} = req.body
    const user = await Users.findOne({email: email})
    console.log(req.body)
    if (!user) {
      await res.status(401).json({msj:"Username does not exist!"})
      next()
    } else {
      if(!(user.password == password)){
        await res.status(401).json({msj:"Invalided password"})
        next()
      }else{
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
