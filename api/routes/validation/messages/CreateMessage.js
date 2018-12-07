const Joi = require('joi');

module.exports = {
    options: {
        allowUnknownBody: false,
        allowUnknownQuery: false,
        allowUnknownParams: false
    },
    body: {
        destinationDeviceId: Joi.number().integer().required(),
        destinationRegistrationId: Joi.number().integer().required(),
        deviceId: Joi.number().required(),
        registrationId: Joi.number().required(),
        ciphertextMessage: Joi.object()
            .keys({
                body: Joi.string().required(),
                registrationId: Joi.number().required(),
                type: Joi.number().required()
            })
            .required(),
    }
};
