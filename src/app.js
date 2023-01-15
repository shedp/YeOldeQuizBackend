const express = require('express');
const cors = require('cors');
const server = express();

const userRouter = require('./routers/users')
const scoresRouter = require('./routers/scores')
const roundsRouter = require('./routers/rounds')
const gamesRouter = require('./routers/games')

server.use(cors());
server.use(express.json())

server.use('/users', userRouter);
server.use('/scores', scoresRouter);
server.use('/rounds', roundsRouter);
server.use('/games', gamesRouter);

server.get('/', (req, res) => res.send('Welcome to the Ye Olde Quiz API'))

module.exports = server;
