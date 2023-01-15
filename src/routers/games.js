const express = require("express");
const gamesRouter = express.Router();
const gamesController = require("../controllers/Games");
const authenticator = require("../middleware/auth");

gamesRouter.get("/",authenticator, gamesController.index)
gamesRouter.get("/:id", authenticator,gamesController.show)
gamesRouter.post("/", authenticator,gamesController.create)
gamesRouter.delete("/:id", authenticator, gamesController.destroy)

module.exports = gamesRouter
