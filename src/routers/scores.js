const express = require('express')
const scoresRouter = express.Router()
const scoresController = require("../controllers/scores")
const authenticator = require("../middleware/auth")

scoresRouter.get("/", scoresController.index) // get all scores from every user
scoresRouter.get("/users", scoresController.showByUser) // get all scores from a user
scoresRouter.get("/game/:id", scoresController.showByGame) // get all scores from a user
scoresRouter.post("/", scoresController.create) // creates scores for a game
scoresRouter.put("/:id", scoresController.update) // update a score value passing the round_if
scoresRouter.delete("/:id", scoresController.destroy) // delete scores if a user decides not to create the game


module.exports = scoresRouter
