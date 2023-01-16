const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000/",
        methods: ["GET", "POST"]
    }
})

module.exports = { app, server, io};
