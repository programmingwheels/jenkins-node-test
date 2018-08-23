'use strict';

const swaggerTools = require('swagger-tools');
const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');
const jsyaml = require('js-yaml');

// const swaggerDefinition = {
//     info: {
//         // API informations (required)
//         title: 'Hello World', // Title (required)
//         version: '1.0.0', // Version (required)
//         description: 'A sample API', // Description (optional)
//       },
//       host: 'localhost:3000', // Host (optional)
//       basePath: '/', // Base path (optional)
// };
const spec = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

module.exports = app => {
    // const swaggerUntrustedRoutesSpecJSON = swaggerJSDoc({
    //     swaggerDefinition,
    //     apis: ['./routes/auth_route.js']
    // });
    // console.log(swaggerUntrustedRoutesSpecJSON);
    swaggerTools.initializeMiddleware(swaggerDoc, (m) => {
        app.use(m.swaggerUi());
    });
};