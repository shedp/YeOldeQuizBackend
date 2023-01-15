const express = require("express");
const scoresRouter = express.Router();
const scoresController = require("../controllers/Scores");
const authenticator = require("../middleware/auth");

scoresRouter.get("/", scoresController.index)
scoresRouter.get("/:id",scoresController.showByScore)
scoresRouter.get("/user/:id",scoresController.showByUser)
scoresRouter.get("/game/:id/",scoresController.showByGame)
scoresRouter.put("/:id", scoresController.update)
scoresRouter.delete("/:id", scoresController.destroy)
scoresRouter.post("/", scoresController.create)

module.exports = scoresRouter
