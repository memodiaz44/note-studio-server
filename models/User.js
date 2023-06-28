const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  }
});


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
    type: [ImageSchema], // Array of image URLs or file paths
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.addImage = async function (name, imageURL) {
  const image = {
    name: name,
    imageURL: imageURL
  };

  this.images.push(image);
  await this.save(); // Save the user after modifying the images array
  return this; // Return the updated user object
};


 
module.exports = mongoose.model('User', UserSchema);
