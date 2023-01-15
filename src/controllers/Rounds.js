const Score = require("../models/Scores")


async function index(req, res) {
	try {
		const rounds = await Round.all
		res.status(200).json(rounds)
	} catch (err) {
		res.status(500).send(err)
	}
}

async function showByRound(req, res) {
	try {
		const rounds = await Round.findByRoundId(req.params.id)
		res.status(200).json(rounds)
	} catch (err) {
		res.status(404).json(err)
	}
}

async function showByGame(req, res) {
	try {
		const rounds = await Round.findByGameId(req.params.id)
		res.status(200).json(rounds)
	} catch (err) {
		res.status(404).json(err)
	}
}

module.exports = { index, showByRound, showByGame}
