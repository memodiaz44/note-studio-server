const mongoose = require('mongoose');

const drawingSchema = new mongoose.Schema({
  name: String,
  data: Object, // Assuming your drawing object is stored as an object
  created_at: { type: Date, default: Date.now },
});

const Drawing = mongoose.model('Drawing', drawingSchema);
