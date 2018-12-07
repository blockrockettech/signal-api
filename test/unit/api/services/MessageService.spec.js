const expect = require('chai').expect;
const _ = require('lodash');

const MessageService = require('../../../../api/services/MessageService');

// DB should use test-db due to config
const db = require('../../../../api/database');
const flushDb = require("../../../testUtils").flushDb;

describe('MessageService tests', function () {

    beforeEach(async () => {
        await flushDb(db);
        this.messageService = new MessageService(db);
    });

    it('should be able to put & getAll a message', async () => {

        const msg = {
            destinationDeviceId: 456,
            destinationRegistrationId: 123,
            ciphertextMessage: "hello"
        };

        await this.messageService.put(msg, 1543929140915);

        let result = await this.messageService.get(msg.destinationDeviceId, msg.destinationRegistrationId);

        expect(_.size(result)).to.be.equal(1);

        expect(result[0]).to.be.deep.equal({
            key: 'm-456-123-1543929140915',
            value:
                {
                    destinationDeviceId: 456,
                    destinationRegistrationId: 123,
                    ciphertextMessage: 'hello',
                    timestamp: 1543929140915
                }
        });
    });

    it('should be able to put & delete a message', async () => {

        const msg = {
            destinationDeviceId: 456,
            destinationRegistrationId: 123,
            ciphertextMessage: "hello"
        };

        await this.messageService.put(msg, 1543929140915);

        let result = await this.messageService.get(msg.destinationDeviceId, msg.destinationRegistrationId);

        expect(_.size(result)).to.be.equal(1);

        await this.messageService.del('m-456-123-1543929140915');

        result = await this.messageService.get(msg.destinationDeviceId, msg.destinationRegistrationId);
        expect(_.size(result)).to.be.equal(0);
    });
});
