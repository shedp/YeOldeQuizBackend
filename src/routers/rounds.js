const express = require("express")
const roundsRouter = express.Router()
const roundsController = require("../controllers/rounds")
const authenticator = require("../middleware/auth")

roundsRouter.get("/",authenticator, roundsController.index)
roundsRouter.get("/:id", authenticator,roundsController.showByRound)
roundsRouter.post("/game/:id", authenticator,roundsController.showByGame)


module.exports = roundsRouter