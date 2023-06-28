const express = require('express');
const Drawing = require('../models/drawing');

const router = express.Router();

router.post('/save-drawing', (req, res) => {
  const drawingData = req.body;

  // Create a new instance of the Drawing model with the drawing data
  const drawing = new Drawing(drawingData);

  // Save the drawing object to the database
  drawing.save()
    .then((savedDrawing) => {
      res.json(savedDrawing);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to save drawing' });
    });
});

module.exports = router;
