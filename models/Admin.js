const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      role: {
        type: String,
        required: true,
        enum: ['admin', 'superadmin'] // Example of additional field specific to admins
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    });

    module.exports =  mongoose.model('Admin', AdminSchema)