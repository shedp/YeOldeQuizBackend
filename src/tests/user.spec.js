describe('Testing with a test database (ElephantSQL)', () => {
    let api;
    let token;

    beforeAll(async() => {
        await resetTestDB();
        api = app.listen(5001, () => {
            console.log("Test server on port 5000")
        })
    });

    afterAll(done => {
        console.log("Stopping test server");
        api.close(done);
    });

    it('Creates a User', async() => {
        const res = await request(api)
        .post('/users/register')
        .send({username: 'testUser1', password: 'password1'});
        expect(res.statusCode).toEqual(201);
    });

    it('Logs into existing user', async() => {
        const res = await request(api)
        .post('/users/login')
        .send({username: 'testUser1', password: 'password1'});

        expect(res.statusCode).toEqual(200);
        token = res.body.session;
    });

    it('Finds and returns a user using the session token', async() => {
        const res = await request(api).get(`/users/${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual('testUser1');
    });
    
    it('creates a new game', async () => {
        const res = await request(api)
            .post('/games')
            .send({
                user_id: 1,
                level: 1,
                topics: ["topic1","topic2","topic3"]})
            .set({Authorization: token});
        expect(res.statusCode).toEqual(201);
    })

    it('Returns All games in data', async () => {
        const res = await request(api).get('/games').set({Authorization: token});
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    })

    it('Finds game by their game_id', async() => {
        const res = await request(api).get('/games/1')
        expect(res.statusCode).toEqual(200)
    })

    it('Updates a score', async() => {
        const res = await request(api).put('/scores/1')
                            .send({
                                score_id: 1,
                                score: 1
                            })
        expect(res.statusCode).toEqual(200);
    }) 

    it('Returns all rounds in rounds', async () => {
        const res = await request(api).get('/rounds').set({Authorization: token});
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    })

    // it('Create scores for new user', async () => {
    //     const newUser = await request(api)
    //     .post('/users/register')
    //     .send({username: 'testUser2', password: 'password2'});

    //     const res = await request(api).post('/scores')
    //     .send({game_id: 1, round_id: 1, user_id: 2})
    //     .set({Authorization: token});
    //     expect(res.statusCode).toEqual(201);
    // })

    it('Returns all scores in scores', async () => {
        const res = await request(api).get('/scores').set({Authorization: token});
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    })


    it('Delete score, round and game', async() => {
        const res = await request(api).delete('/games/1').set({Authorization: token})
        expect(res.statusCode).toEqual(204);
     const scores = await request(api).get('/scores').set({Authorization: token});
         expect(scores.body.length).toEqual(0);
    })

})