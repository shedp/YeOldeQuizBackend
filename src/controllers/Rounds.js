const Round = require("../models/Rounds")

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
        const round = await Round.create(req.body);
        res.status(201).json(round)
    } catch (err){
        res.status(422).json({err})
    }
}

module.exports = { index, showByRound, showByGame, destroy, create}
