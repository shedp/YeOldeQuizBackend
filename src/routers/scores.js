const express = require("express")
const scoresRouter = express.Router()
const scoresController = require("../controllers/Scores")
const authenticator = require("../middleware/auth")

scoresRouter.get("/",authenticator, scoresController.index)
scoresRouter.get("/:id", authenticator,scoresController.showByScore)
scoresRouter.get("/user/:id", authenticator,scoresController.showByUser)
scoresRouter.get("/game/:id/", authenticator,scoresController.showByGame)
scoresRouter.put("/:id", authenticator, scoresController.update)

module.exports = scoresRouter
