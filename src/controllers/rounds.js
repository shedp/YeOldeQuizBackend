const Round = require("../models/Round")

async function create(req, res){
    try {
        const round = await Round.create(req.body);
        res.status(201).json(round)
    } catch (err){
        res.status(422).json({err})
    }
}

async function destroy(req, res){
    try {
        const round = await Round.findByGameId(req.params.id);
        const resp = await round.destroy()
        res.status(204).end()
    } catch (err){
        res.status(404).json({err})
    }
}

module.exports = {create, destroy}
