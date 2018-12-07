const level = require('level');

// Config
const config = require('config');
const dbConfig = config.get('levelDb');

const db = level(dbConfig.path, {
    valueEncoding: 'json'
});

module.exports = db;
