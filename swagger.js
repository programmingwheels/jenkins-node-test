'use strict';

const swaggerTools = require('swagger-tools');
const Path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
    info: {
        title: 'API DOCUMENTATION',
        description: 'Whole Description Here',
        version: 'Version 1'
    },
    basePath: '/api/v1',
    schemes: ['http']
};

module.exports = app => {
    const swaggerUntrustedRoutesSpecJSON = swaggerJSDoc({
        swaggerDefinition,
        apis: [Path.resolve(__dirname, '/routes/**/*_routes.js')]
    });

    swaggerTools.initializeMiddleware(swaggerUntrustedRoutesSpecJSON, (m) => {
        app.use(m.swaggerUi());
    });
};