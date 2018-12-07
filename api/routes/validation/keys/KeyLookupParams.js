const Joi = require('joi');

//?deviceId=123&registrationId=456
module.exports = {
    options: {
        allowUnknownBody: false,
        allowUnknownQuery: false,
        allowUnknownParams: false
    },
    query: {
        // FIXME - a common pattern is emerging for account lookups - refactor to use this common validation check
        deviceId: Joi.number().integer().required(),
        registrationId: Joi.number().integer().required()
    }
};
