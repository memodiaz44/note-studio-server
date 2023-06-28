const express = require('express');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin') 
const { registerController, getUser, login, addImageToUser } = require('../controller/authController')
const router = express.Router();

router.post('/register', registerController )


router.get('/users', getUser);


router.post('/login', login);
  

router.post('/users/:id/images', addImageToUser);


module.exports = router