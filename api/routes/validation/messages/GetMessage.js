const Joi = require('joi');

//?deviceId=123&registrationId=456
module.exports = {
    options: {
        allowUnknownBody: false,
        allowUnknownQuery: false,
        allowUnknownParams: false
    },
    query: {
        deviceId: Joi.number().integer().required(),
        registrationId: Joi.number().integer().required()
    }
};
