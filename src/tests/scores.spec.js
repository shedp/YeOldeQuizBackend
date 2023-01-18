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


    it('Creates a set of scores when rounds are created', async() => {
        const res = await request(api).post('/scores')
                            .send({
                            game_id: 1,
                            round_id: 1,
                            user_id: 1
                            })
                            .set({Authorization: token})
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("score_id")})


    it('Updates a score', async() => {
        const res = await request(api).put('/score/1')
                            .send({
                                score_id: 1,
                                score: 1
                            })
        expect(res.statusCode).toEqual(200);
    }) 

    it('Finds score by their score_id', async() => {
        const res = await request(api).get('/scores/1')
        expect(res.statusCode).toEqual(200)
    })
})