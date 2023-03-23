// const Joi = require("joi");
const mongoose  = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');

const customerSchema = new mongoose.Schema({
    name: {
        require,
        type: String,
        minlength: 5,
        maxlength: 255
    },
    email: {
        require,
        type: String,
        minlength: 5,
        maxlength: 255
    },
    password: {
        require,
        type: String,
        minlength: 3,
        maxlength: 255

    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        require,
        maxlength: 1000,
        default: null
    },
    imageUrl: {
        type: String,
        require,
        maxlength: 1000,
        default: null
    },
})

const Customer = mongoose.model('Customer', customerSchema );

 function generateAuthToken(id, admin, name, image) { 
    const token = jwt.sign(
        { _id: id, isAdmin: admin, userName: name, image },
         config.get('jwtPrivateKey'));
    return token;
  }
  

exports.Customer = Customer;
exports.Schema = customerSchema;
exports.generateAuthToken = generateAuthToken;
// exports.validate = validateCustomer;