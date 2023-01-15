const express = require('express')
const gamesRouter = express.Router()
const gamesController = require("../controllers/games")
const authenticator = require("../middleware/auth")

gamesRouter.get("/", gamesController.index) // show all created games
gamesRouter.get("/:id", gamesController.show) // show all games of a user
gamesRouter.post("/", gamesController.create) // create a game
gamesRouter.delete("/:id", gamesController.destroy) // delete a game when a user decides not to create a game 


module.exports = gamesRouter
