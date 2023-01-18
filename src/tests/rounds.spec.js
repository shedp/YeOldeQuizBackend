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

    //testing rounds 
    it('Creates a set of rounds', async() => {
        const res = await request(api).post('/rounds')
                          .send({
                            user_id: 1,
                            id: 1,
                            topic: "topic1"
                          })
                          .set({Authorization: token})
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("round_id")
    })

    it('Delete a round', async() => {
        const res1 = await request(api).delete('/round/1').set({Authorization: token})
        expect(res1.statusCode).toEqual(204);

        const res2 = await request(api).delete('/round/2').set({Authorization: token})
        expect(res2.statusCode).toEqual(204);

        const res3 = await request(api).delete('/round/3').set({Authorization: token})
        expect(res3.statusCode).toEqual(204);
    })
})