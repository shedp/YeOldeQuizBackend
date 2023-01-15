const Game = require("../models/Games")
const User = require("../models/User")
const Session = require("../models/Session")

async function index(req, res) {
	try {
		const userToken = req.headers["authorization"]
		const sesh = await Session.findBySessionToken(userToken)
		const games = await Game.all(sesh.user_id)
		res.status(200).json(games)
	} catch (err) {
		res.status(500).json(err)
	}
}

async function show(req, res) {
	try {
		const games = await Game.findById(req.params.id)
		res.status(200).json(Game)
	} catch (err) {
		res.status(404).json(err)
	}
}

async function create(req, res) {
	try {
		const userToken = req.headers["authorization"]
		const sesh = await Session.findBySessionToken(userToken)
		const newGame = await Game.create({ ...req.body, user_id: sesh.user_id })
		res.status(201).json(newGame)
	} catch (err) {
		res.status(422).json(err)
	}
}

async function destroy(req, res) {
	try {
		const Game = await Game.findById(req.params.id)
		const resp = await Game.destroy()
		res.status(204).send()
	} catch (err) {
		res.status(404).json(err)
		console.log(err)
	}
}


module.exports = { index, show, create, destroy }
