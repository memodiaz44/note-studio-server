const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  images: {
    type: [String], // Array of image URLs or file paths
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.addImage = function(imageURL) {
  this.images.push(imageURL);
  // You can perform additional logic or validation here if needed
  return this.save();
};
 
module.exports = mongoose.model('User', UserSchema);
