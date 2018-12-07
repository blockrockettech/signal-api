'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ev = require('express-validation');

const app = express();
app.use(cors());
app.use(express.json({strict: true}));
app.use(bodyParser.json());

// TODO add authentication

const keys = require('./routes/keys');
const messages = require('./routes/messages');

app.use('/keys', keys);
app.use('/messages', messages);

// Catch all others
app.get('*', function (req, res) {
    res.status(404).json({
        error: "unknown route"
    });
});

// global error handler
app.use(function (err, req, res, next) {
    // specific for validation errors
    if (err instanceof ev.ValidationError) {
        return res.status(err.status).json(err);
    }
    return res.status(500).send(err.stack);
});

module.exports = app;
