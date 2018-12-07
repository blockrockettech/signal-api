const expect = require('chai').expect;

const KeyService = require('../../../../api/services/KeyService');

// DB should use test-db due to config
const db = require('../../../../api/database');
const flushDb = require("../../../testUtils").flushDb;

describe('KeyService tests', function () {

    beforeEach(async () => {
        await flushDb(db);
        this.keyService = new KeyService(db);
    });

    it('should be able to put & getAll the same key', async () => {
        const deviceId = "123";
        const registrationId = "ABC";
        const someOtherData = {test: [1], bool: true, sting: "A string"};

        const key = {
            deviceId,
            registrationId,
            someOtherData
        };
        await this.keyService.put(key);

        const found = await this.keyService.getAll(deviceId, registrationId);

        expect(found).to.be.deep.equal(key);
    });
});
