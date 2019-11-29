const express = require('express')
const router = express.Router()

const Users = require('../models/users.js');


router.get("/", async (req, res) => {
   try {
      const user = await Users.find()
      res.json(user);
   } catch (err) {
     console.log(err);
   }
})

router.get("/:id", async (req, res) => {
   try {
      const user = await Users.findById(req.params.id)
      res.json(user);
   } catch (err) {
     console.log(err);
   }
})

router.post("/", async (req, res) => {
   try {
      const {name, id, email, password, type} = req.body
      const user = new Users({name, id, email, password, type})
      await user.save()
      res.json({status: 'Data received'});
   } catch (err) {
     console.log(err);
   }
})

router.put("/:id", async (req, res) => {
   try {
      const {name, id, email, password, type, status} = req.body
      const data = {name, id, email, password, type, status}
      const user = await Users.findByIdAndUpdate(req.params.id, data)
      res.json({status: 'Data updated'});
   } catch (err) {
     console.log(err);
   }
})

router.delete('/:id', async (req, res) => {
  try {
    await Users.findByIdAndRemove(req.params.id)
    res.json({status: 'Data removed'})
  } catch (err) {
    console.log(err);
  }
})

module.exports = router
