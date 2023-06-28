const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerController = (req, res, next) => {
    User.findOne({ userName: req.body.userName })
      .then((existingUser) => {
        if (existingUser) {
          // User with the same username already exists
          return res.status(409).json({ message: 'Username already exists' });
        }
  
        const newUser = new User({
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
        });
  
        bcrypt.hash(req.body.password, 10)
          .then((hashedPassword) => {
            newUser.set('password', hashedPassword);
            newUser.save()
              .then(() => {
                return res.status(200).json(newUser);
              })
              .catch((err) => next(err));
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  };

  const getUser = (req, res) => {
    User.find()
    .then((user) => {
            res.status(200).json(user)
    }).catch((error) => {
        res.status(500).json({error: error.message})
    })

  };
  const login = (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
  
        bcrypt.compare(password, user.password)
          .then((isMatch) => {
            if (isMatch) {
              const token = jwt.sign({ userId: user._id }, 'secretKey');
              res.status(200).json({ token, userId: user._id, image: user.images , name: user.userName, hasAccount: true });
            } else {
              res.status(401).json({ error: "bones password", hasAccount: true });
            }
          });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  }

  const addImageToUser = async (req, res) => {
    try {
      const userId = req.params.id; // Access the user ID from the request parameters
      const imageURL = req.body.imageURL; // Access the imageURL from the request body
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Add the image URL to the user's images array
      user.addImage(imageURL);
  
      res.json(user); // Return the updated user object
    } catch (error) {
      res.status(500).json({ message: 'Error adding image to user', error: error.message });
    }
  };
  


  module.exports = {
    registerController,
    getUser, 
    login,
    addImageToUser
  };