const Score = require("../models/Score");
const Session = require("../models/Session");

async function index(req, res) {
  try {
    const scores = await Score.all;
    res.status(200).json(scores);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function showByUser(req, res) {
  try {
    const userToken = req.headers["authorization"];
    const sesh = await Session.findBySessionToken(userToken);
    const scores = await Score.findByUserId(sesh.user_id);
    res.status(200).json(scores);
  } catch (err) {
    console.log(err);
    res.status(402).json(err);
  }
}

async function showByGame(req, res) {
  try {
    const scores = await Score.findByGameId(req.params.id);
    res.status(200).json(scores);
  } catch (err) {
    res.status(402).json(err);
  }
}

async function create(req, res) {
  try {
    const userToken = req.headers["authorization"];
    const sesh = await Session.findBySessionToken(userToken);
    const game_id = req.body.game_id;
    const round_id = req.body.round_id;

    const newScore = await Score.create(game_id, round_id, sesh.user_id);
    res.status(201).json(newScore);
  } catch (err) {
    res.status(422).json(err);
  }
}

async function destroy(req, res) {
  try {
    const score = await Score.findAllByGameId(req.params.id);
    const resp = await score.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(404).json(err);
  }
}

async function update(req, res) {
  try {
    const userToken = req.headers["authorization"];
    const sesh = await Session.findBySessionToken(userToken);
    const score = await Score.update(
      req.body.score,
      req.params.id,
      sesh.user_id
    );
    res.status(200).json(score);
  } catch (err) {
    res.status(417).json(err);
  }
}

module.exports = { index, showByUser, showByGame, create, destroy, update };
