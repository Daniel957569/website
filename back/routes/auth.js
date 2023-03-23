const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { Customer, generateAuthToken } = require('../models/customer')
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = schema.validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Customer.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = generateAuthToken(user._id, user.isAdmin, user.name, user.image);
  console.log(jwt.decode(token));
  res.send(token);
});

  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  });

module.exports = router; 
