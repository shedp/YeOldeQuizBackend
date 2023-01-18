const express = require('express');
const request = require('supertest');
const app = express();

describe('Testing with a test database (ElephantSQL)', () => {
    let api;
    let token;
    beforeEach(async () => {
        await resetTestDB();
    });

    beforeAll(async() => {
        api = await request(app).listen(5001);
        console.log("Test server on port 5001");
    });

    afterAll(done => {
        console.log("Stopping test server");
        api.close(done);
    });

    // it('Returns All users in data', async () => {
    //     const res = await request(api).get('/users');
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body.length).toEqual(2);
    // })
    

    it('Creates a User', async() => {
        const res = await request(api)
        .post('/users/register')
        .send({username: 'testUser1', password: 'password1'});
        expect(res.statusCode).toEqual(201);
    });

    it('Logs into existing user', async() => {
        const res = await request(api)
        .post('/users/login')
        .send({username: 'test', password: '123'});

        expect(res.statusCode).toEqual(200);
        token = res.body.session;
    });

    it('Finds and returns a user using the session token', async() => {
        const res = await request(api).get(`/users/${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual('test');
    });
});