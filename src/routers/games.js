const express = require("express")
const scoresRouter = express.Router()
const scoresController = require("../controllers/Scores")
const authenticator = require("../middleware/auth")

scoresRouter.get("/",authenticator, scoresController.index)
scoresRouter.get("/:id", authenticator,scoresController.show)
scoresRouter.post("/", authenticator,scoresController.create)
scoresRouter.delete("/:id", authenticator, scoresController.destroy)

module.exports = scoresRouter
