'use strict';

const app = require('./app');
const PORT = process.env.PORT || 8001
const server = app.listen(PORT);

server.on('error', (error) => {
    console.log(`Cannot start express server at port 0.0.0.0`, error);
    server.close();
});

server.on('listening', () => {
    const address = server.address();
    console.log(address);
    const host = address.address;
    const port = address.port;
    console.log(`Server listening on http://${host}:${port}`);
});
