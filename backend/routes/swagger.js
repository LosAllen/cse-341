const express = require('express');
const router = express.Router();
const { swaggerUi, swaggerSpec } = require('../swagger');

// Route for Swagger UI
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
