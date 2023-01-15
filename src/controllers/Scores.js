const Score = require("../models/Scores")

async function index(req, res) {
	try {
		const scores = await Score.all
		res.status(200).json(scores)
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

async function showByGame(req, res) {
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

async function destroy(req, res){
    try {
        const round = await Round.findByRoundId(req.params.id);
        const resp = await round.destroy()
        res.status(204).end()
    } catch (err){
        res.status(404).json({err})
    }
}

async function create(req, res){
    try {
        const score = await Score.create(req.body);
        res.status(201).json(score)
    } catch (err){
        res.status(422).json({err})
    }
}

module.exports = { index, showByScore, showByUser, showByGame, update, destroy, create}
