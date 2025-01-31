const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'));

router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

module.exports = router;
