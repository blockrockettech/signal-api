const request = require('supertest');
const expect = require('chai').expect;

const {
    validateMissingQueryElement,
    validateMissingBodyElement
} = require("../assertionutils");


const app = require('../../api/OSMServer');
const db = require('../../api/database');
const flushDb = require("../testUtils").flushDb;

describe('/messages integration tests', function () {

    beforeEach(async () => {
        await flushDb(db);
    });

    it('should return 200 and empty body when no messages found for keys', function (done) {
        request(app)
            .get('/messages')
            .query({
                deviceId: 123,
                registrationId: 456,
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.deep.equal([]);
                done();
            })
            .catch((err) => done(err));
    });

    describe('validation', function () {

        describe('GET message', function () {
            it('should validate missing query param [deviceId]', function (done) {
                request(app)
                    .get('/messages')
                    .query({
                        registrationId: 456,
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .then(response => {
                        validateMissingQueryElement(response, "deviceId");
                        return done();
                    })
                    .catch((err) => done(err));
            });

            it('should validate missing query param [registrationId]', function (done) {
                request(app)
                    .get('/messages')
                    .query({
                        deviceId: 123,
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .then(response => {
                        validateMissingQueryElement(response, "registrationId");
                        return done();
                    })
                    .catch((err) => done(err));
            });
        });

        describe('PUT messages', function () {
            it('should validate missing body param [destinationDeviceId]', function (done) {
                request(app)
                    .put('/messages')
                    .send({
                        // destinationDeviceId: 456,
                        destinationRegistrationId: 456,
                        registrationId: 123,
                        deviceId: 456,
                        ciphertextMessage: {
                            body: "some message",
                            registrationId: 123,
                            type: 1,
                        },
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .then(response => {
                        validateMissingBodyElement(response, "destinationDeviceId");
                        return done();
                    })
                    .catch((err) => done(err));
            });

            it('should validate missing body param [destinationRegistrationId]', function (done) {
                request(app)
                    .put('/messages')
                    .send({
                        destinationDeviceId: 456,
                        // destinationRegistrationId: 456,
                        registrationId: 123,
                        deviceId: 456,
                        ciphertextMessage: {
                            body: "some message",
                            registrationId: 123,
                            type: 1,
                        },
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .then(response => {
                        validateMissingBodyElement(response, "destinationRegistrationId");
                        return done();
                    })
                    .catch((err) => done(err));
            });

            it('should validate missing body param [ciphertextMessage.registrationId]', function (done) {
                request(app)
                    .put('/messages')
                    .send({
                        destinationDeviceId: 456,
                        destinationRegistrationId: 456,
                        deviceId: 456,
                        ciphertextMessage: {
                            body: "some message",
                            // registrationId: 123,
                            type: 1,
                        },
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .then(response => {
                        expect(response.body.errors).to.deep.equal([
                            {
                                field: ['registrationId'],
                                location: 'body',
                                messages: ['"registrationId" is required'],
                                types: ['any.required']
                            },
                            {
                                field: ['ciphertextMessage', 'registrationId'],
                                location: 'body',
                                messages: ['"registrationId" is required'],
                                types: ['any.required']
                            }
                        ]);
                        return done();
                    })
                    .catch((err) => done(err));
            });
        });

        describe('DELETE messages', function () {
            it('should validate missing query param [key]', function (done) {
                request(app)
                    .delete('/messages')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .then(response => {
                        validateMissingQueryElement(response, "key");
                        return done();
                    })
                    .catch((err) => done(err));
            });
        });
    });
});
