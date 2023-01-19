
const express = require("express");
const roundsRouter = express.Router();
const roundsController = require("../controllers/rounds");
const authenticator = require("../middleware/auth");

roundsRouter.get("/:id", roundsController.getRoundIDs);
roundsRouter.post("/", roundsController.create); // create rounds for a game
roundsRouter.delete("/:id", roundsController.destroy); // delete rounds when a user decides not to create a game


module.exports = roundsRouter;
