const express = require('express')
const roundsRouter = express.Router()
const roundsController = require("../controllers/rounds")


// roundsRouter.get("/", roundsController.index) // get all scores
// roundsRouter.get("/:id", roundsController.showById) // get scores from every user
// roundsRouter.get("/game/:id", roundsController.showByGame) //get rounds by game_id
roundsRouter.post("/", roundsController.create) // create rounds for a game
roundsRouter.delete("/:id", roundsController.destroy) // delete rounds when a user decides not to create a game

module.exports = roundsRouter;
