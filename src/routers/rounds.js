const express = require("express");
const roundsRouter = express.Router();
const roundsController = require("../controllers/Rounds");
const authenticator = require("../middleware/auth");

roundsRouter.get("/",authenticator, roundsController.index)
roundsRouter.get("/:id", authenticator,roundsController.showByRound)
roundsRouter.get("/game/:id", authenticator,roundsController.showByGame)
roundsRouter.post("/", roundsController.create)
roundsRouter.delete("/:id", roundsController.destroy)

module.exports = roundsRouter