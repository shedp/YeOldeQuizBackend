const express = require('express')
const scoresRouter = express.Router()
const scoresController = require("../controllers/scores")
const authenticator = require("../middleware/auth")

scoresRouter.get("/", scoresController.index) // get all scores from every user
scoresRouter.get("/:id", scoresController.show) // get all scores from a user
scoresRouter.post("/", scoresController.create) // creates scores for a game
scoresRouter.put("/:id", scoresController.update) // update a score value
scoresRouter.delete("/:id", scoresController.destroy) // delete scores if a user decides not to create the game

module.exports = scoresRouter
