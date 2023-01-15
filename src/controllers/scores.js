const Score = require("../models/Score");

async function index (req, res) {
    try{
        const scores = await Score.all
        res.status(200).json(scores);
    } catch(err) {
        res.status(500).send(err)
    }
}

async function showByUser (req, res){
    try{
        const userToken = req.headers["authorization"]
		const sesh = await Session.findBySessionToken(userToken)
        const scores = await Score.findByUserId(sesh.user_id)
        res.status(200).json(scores)
    } catch (err){
        res.status(402).json(err)
    }
}

async function showByGame(req, res){
    try{
        const scores = await Score.findByGameId(req.params.id)
        res.status(200).json(scores)
    } catch(err){
        res.status(402).json(err)
    }
}

async function create(req, res){
    try{
        const userToken = req.headers["authorization"]
		const sesh = await Session.findBySessionToken(userToken)
        const newScore = await Score.create({...req.body, user_id: sesh.user_id})
        res.status(201).json(newScore)
    }catch(err){
        res.status(422).json(err)
    }
}

async function destroy(req, res){
    try{
        const score = await Score.findAllByGameId(req.params.id)
        const resp = await score.destroy()
        res.status(204).end()
    } catch (err){
        res.status(404).json(err)
    }
}

async function update(req, res){
    try{
        const score = await Score.update(req.params.id, req.body)
        res.status(200).json(score)
    } catch(err){
        res.status(417).json(err)
    }
}

module.exports = {index, showByUser, showByGame, create, destroy, update}

