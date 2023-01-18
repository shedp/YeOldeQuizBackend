const express = require("express");
const cors = require("cors");
const { server, app, io } = require("./server_socket");
const socketEvents = require("./events");
// Routes
const userRouter = require("./routers/users");
const scoresRouter = require("./routers/scores");
const roundsRouter = require("./routers/rounds");
const gamesRouter = require("./routers/games");

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/scores", scoresRouter);
app.use("/rounds", roundsRouter);
app.use("/games", gamesRouter);

app.get("/", (req, res) => res.send("Welcome to the Ye Old Quizz API"));

io.on("connection", (socket) => socketEvents(socket));

module.exports = { server };
