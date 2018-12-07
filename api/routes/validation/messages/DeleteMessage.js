const Joi = require('joi');

//?key=m-123-456-1543931456014
module.exports = {
    options: {
        allowUnknownBody: false,
        allowUnknownQuery: false,
        allowUnknownParams: false
    },
    query: {
        // TODO add regex for key pattern once fully defined
        key: Joi.string().required()
    }
};
