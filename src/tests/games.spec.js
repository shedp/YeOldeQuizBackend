const express = require('express');
const app = express();

describe('Testing with a test database (ElephantSQL)', () => {
    let api;
    let token;
    beforeEach(async () => {
        await resetTestDB()
    })

    beforeAll(async() => {
        api = app.listen(5001, () => {
            console.log("Test server on port 5001")
        })
    });

    afterAll(done => {
        console.log("Stopping test server");
        api.close(done)
    })

    it('Creates a User', async() => {
        const res = await request(api)
        .post('/users/register')
        .send({username: 'test', password: '123'})
        expect(res.statusCode).toEqual(201);
    })

    it('Log into existing user', async() => {
        const res = await request(api)
        .post('/users/login')
        .send({username: 'test', password: '123'})

        expect(res.statusCode).toEqual(200);
        token = res.body.session
    })

    it('Finds and returns a user using the session token', async() => {
        const res = await request(api).get(`/users/${token}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body.title).toEqual('test')
    })

    // Testing games routes
    it('Returns all games dates', async() => {
        const res = await request(api).get('/games')
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    })

    it('Finds game by their game_id', async() => {
        const res = await request(api).get('/games/1')
        expect(res.statusCode).toEqual(200)
    })

    it('Delete a game', async() => {
        const res = await request(api).delete('/games/1').set({Authorization: token})
        expect(res.statusCode).toEqual(204);
    })

    it('creates a new game', async () => {
        const res = await request(api)
            .post('/games')
            .send({user_id: 1, level: 1, topics: ["topic1","topic2","topic3"]
            })
            .set({Authorization: token});
        expect(res.statusCode).toEqual(201);
        expect(res.body.user_id).toEqual(user_id);
        expect(res.body.level).toEqual(level);
    })

})