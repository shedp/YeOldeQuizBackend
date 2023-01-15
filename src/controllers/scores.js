const Score = require("../models/Scores")

async function index(req, res) {
	try {
		const scores = await Score.all
		res.status(200).json(habitdates)
	} catch (err) {
		res.status(500).send(err)
	}
}

async function showByScore(req, res) {
	try {
		const score = await Score.findByScoreId(req.params.id)
		res.status(200).json(score)
	} catch (err) {
		res.status(500).send(err)
	}
}

async function showByUser(req, res) {
	try {
		const scores = await Score.showByUser(req.params.id)
		res.status(200).json(scores)
	} catch (err) {
		res.status(500).send(err)
	}
}

async function update(req, res) {
	try {
		const score = await Score.update(req.params.id, req.body)
		res.status(200).json(score)
	} catch (err) {
		res.status(404).send(err)
	}
}

module.exports = { index, showByScore, showByUser, showByGame, update }
