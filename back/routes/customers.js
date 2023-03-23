const {Customer, generateAuthToken} = require('../models/customer'); 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require("../middleware/auth");
const _ = require('lodash');
const Joi = require('joi');

router.post("/", async (req, res) => {
  const { error } = Schema.validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findOne({ email: req.body.email });
  if (customer) return res.status(400).send('User already registered.');
  
  user = new Customer(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = generateAuthToken(user._id, user.isAdmin, user.name);
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
})

router.get('/:id', async (req, res) => {
  const user = await Customer.findById(req.params.id);
  res.send(user);
});


  const Schema = Joi.object({
      name: Joi.string().min(5).max(255).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(255).required(),
  });


module.exports = router;
