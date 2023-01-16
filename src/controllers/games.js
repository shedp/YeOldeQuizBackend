const Game = require("../models/Game")
const User = require("../models/User")
const Session = require("../models/Session")

async function index(req, res){
    try{
        const userToken = req.headers["authorization"]
        const sesh = await Session.findBySessionToken(userToken)
        const games = await Game.all(sesh.user_id)
        res.status(200).json(games)
    }catch(err){
        res.status(500).json(err)
    }
}

async function show(req, res){
    try{
        const games = await Game.findByGameId(req.params.id)
        res.status(200).json(games)
    }catch(err){
        res.status(404).json(err)
    }
}

async function create(req, res){
    try{
        const userToken = req.headers["authorization"]
        const sesh = await Session.findBySessionToken(userToken)
        const newGame = await Game.create({...req.body, user_id: sesh.user_id})
        res.status(201).json(newGame)
    }catch(err){
        res.status(422).json(err)
    }
}

async function destroy(req, res){
    try{
        const game = await Game.findByGameId(req.params.id)
        
        const resp = await game.destroy()
        res.status(204).end()
    }catch(err){
        res.status(404).json(err);
    }
}

module.exports = {index, show, create, destroy}
