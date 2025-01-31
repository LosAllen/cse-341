const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contacts API',
            version: '1.0.0',
            description: 'API for managing contacts',
            contact: {
                name: 'Lincoln Allen',
                email: 'Lincolnjallen@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
            {
                url: 'https://cse-341-30ua.onrender.com',
                description: 'Production server',
            },
        ],
    },
    apis: ['./routes/*.js'], // Points to all route files
};

// Initialize Swagger docs
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpec };
