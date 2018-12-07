const request = require('supertest');
const expect = require('chai').expect;

const app = require('../../api/OSMServer');

const db = require('../../api/database');
const flushDb = require("../testUtils").flushDb;

describe('unhandled route integration tests', function () {

    beforeEach(async () => {
        await flushDb(db);
    });

    it('should return 404 with error for unhandled route', function (done) {
        request(app)
            .get('/unknown-route')
            .expect(404)
            .then(response => {
                expect(response.body).to.deep.equal({
                    "error": "unknown route"
                });
                done();
            })
            .catch((err) => done(err));
    });

});
