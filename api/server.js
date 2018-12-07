'use strict';

const server = require('./OSMServer');

const config = require('config');
const apiConfig = config.get('api');

server.listen(apiConfig.port, () => {
    console.log(`listening on ${apiConfig.port}`)
});
