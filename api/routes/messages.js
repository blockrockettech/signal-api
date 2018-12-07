const messages = require('express').Router();
const validate = require('express-validation');

const logger = require('../logging');

const db = require('../database');

const MessageService = require('../services/MessageService');
const messageService = new MessageService(db);

const validation = require('./validation/messages');

const getMessages = async (req, res) => {
    logger.info(`Get messages: device [${req.query.deviceId}] registration [${req.query.registrationId}]`);

    try {
        const resp = await messageService.get(req.query.deviceId, req.query.registrationId);

        logger.info(`Found messages: ${JSON.stringify(resp)}`);

        res.json(resp);
    } catch (ex) {
        logger.error(ex);

        res.status(404).send(ex.toString());
    }
};

const putMessage = async (req, res) => {
    logger.info(`Put message: ${JSON.stringify(req.body)}`);

    try {
        await messageService.put({...req.body});

        res.status(200).send(`OK`);
    } catch (ex) {
        logger.error(ex);

        res.status(500).send(ex.toString());
    }
};

const deleteMessage = async (req, res) => {
    logger.info(`Delete message: key [${req.query.key}]`);

    try {
        await messageService.del(req.query.key);

        res.status(200).send(`OK`);
    } catch (ex) {
        logger.error(ex);

        res.status(500).send(ex.toString());
    }
};

messages.get('/', validate(validation.GetMessage), getMessages);
messages.put('/', validate(validation.CreateMessage), putMessage);
messages.delete('/', validate(validation.DeleteMessage), deleteMessage);

module.exports = messages;
