const logger = require('../logging');

class MessageService {

    constructor(_database) {
        this.db = _database;
    }

    async get(deviceId, registrationId) {
        logger.info(`Looking up messages: device [${deviceId}] registration [${registrationId}]`);

        const messages = [];
        const stream = this.db
            .createReadStream({
                gte: `m-${deviceId}-${registrationId}`,
                lte: `m-${deviceId}-${registrationId}-999999999999999`
            })
            .on('data', function (data) {
                messages.push(data);
            });

        return new Promise((resolve, reject) => {
            stream.on('end', () => resolve(messages));
            stream.on('error', () => reject(new Error('Something went terribly wrong...')));
        });
    }

    async del(key) {
        logger.info(`Deleting message: key [${key}]`);

        return this.db.del(`${key}`);
    }

    async put(message, timestamp = new Date().getTime()) {
        const {destinationDeviceId, destinationRegistrationId} = message;
        logger.info(`Put message:  device [${destinationDeviceId}] registration [${destinationRegistrationId}]`);

        const msgObj = {
            ...message,
            timestamp: timestamp
        };
        return this.db.put(`m-${destinationDeviceId}-${destinationRegistrationId}-${timestamp}`, msgObj);
    }
}

module.exports = MessageService;
